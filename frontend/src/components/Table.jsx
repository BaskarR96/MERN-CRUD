import React, { useState } from 'react'
import Button from './Button'
import ModalForm from './ModalForm'
import { deleteUser as deleteUserConfig, updateUser as updateUserConfig } from '../utilis/formConfigs'
import { Bars } from 'react-loader-spinner'
import { toast } from 'react-toastify'
import { useDeleteUserMutation, useUpdateUserMutation } from '../slices/userApiSlice'

const Table = ({
    columns = [],
    rows = [],
    isLoading = true,
    ...props
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [userId, setUserId] = useState(null)

    const [updateUser, { isLoading: userUpdateLoading }] = useUpdateUserMutation();
    const [deleteUser, { isLoading: userDeleteLoading }] = useDeleteUserMutation();

    return (
        <>
            <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
                        {
                            Array.isArray(columns) && columns.length > 0 ?
                                columns.map((column, index) => {
                                    return (
                                        <th key={index} scope="col" className={`${index === 0 ? 'py-3.5 pl-4 pr-3 sm:pl-0' : 'px-3 py-3.5'} text-left text-sm font-semibold text-gray-900 min-w-[110px]`}>
                                            {column?.name}
                                        </th>
                                    )
                                }) : ''
                        }
                        <th scope="col" colSpan={2} className="relative py-3.5 pl-3 pr-4 sm:pr-0 min-w-[110px]">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        isLoading ?
                            <tr>
                                <td colSpan={columns.length + 2} className='p-4 font-medium text-gray-900 sm:px-0 whitespace-nowrap text-sm text-center'>
                                    <Bars
                                        height="20"
                                        width="20"
                                        color="#000"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{ justifyContent: "center" }}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </td>
                            </tr> :
                            Array.isArray(rows) && rows.length > 0 ?
                                rows.map((row, index) => (
                                    <tr key={index}>
                                        {
                                            Array.isArray(columns) && columns.length > 0 ?
                                                columns.map((column, index) => {
                                                    return (
                                                        <td key={index} scope="col" className={`${index === 0 ? 'py-4 pl-4 pr-3 font-medium sm:pl-0' : 'px-3 py-4'} text-gray-900 whitespace-nowrap text-sm`}>
                                                            {row?.[column?.key]}
                                                        </td>
                                                    )
                                                }) : ''
                                        }
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Button
                                                type="button"
                                                className="text-indigo-600 hover:text-indigo-900"
                                                name="edit"
                                                onClick={(e) => {
                                                    const userId = e.target.getAttribute('data-custom-attribute');
                                                    setIsModalOpen(true);
                                                    setModalType("edit");
                                                    userId ? setUserId(userId) : toast.error("Something went wrong. Try again later!!");
                                                }}
                                                dataCustomAttribute={row?.['_id']}
                                            >
                                                Edit
                                            </Button>
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <Button
                                                type="button"
                                                className="text-[#bb251a] hover:text-red-900"
                                                name="delete"
                                                onClick={(e) => {
                                                    const userId = e.target.getAttribute('data-custom-attribute');
                                                    setIsModalOpen(true);
                                                    setModalType("delete");
                                                    userId ? setUserId(userId) : toast.error("Something went wrong. Try again later!!");
                                                }}
                                                dataCustomAttribute={row?.['_id']}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )) :
                                <tr>
                                    <td colSpan={columns.length + 2} className='p-4 font-medium text-gray-900 sm:px-0 whitespace-nowrap text-sm text-center'>
                                        NO RECORDS
                                    </td>
                                </tr>

                    }
                </tbody>
            </table >
            {
                modalType === "edit" &&
                <ModalForm
                    modalTitle={'Edit User'}
                    isOpen={isModalOpen}
                    cancelBtnText="Close"
                    cancelHandler={() => setIsModalOpen(false)}
                    isLoading={userUpdateLoading}
                    submitBtnText="Update"
                    submitHandler={
                        async (data, reset) => {
                            try {
                                const { firstName, lastName, email } = data
                                const updatedData = {
                                    first_name: firstName,
                                    last_name: lastName,
                                    email,
                                }
                                const res = await updateUser({ userId, updatedData }).unwrap();
                                console.log(res)
                                reset(updateUserConfig?.initialValues);
                                setIsModalOpen(false);
                                toast.success(res.message);
                                props.userListRefetch();
                            } catch (err) {
                                toast.error(err?.data?.message || err.error)
                            }
                        }
                    }
                    fields={updateUserConfig?.fields}
                    initialValues={updateUserConfig?.initialValues}
                    schema={updateUserConfig?.schema}
                    userId={userId}
                />
            }
            {
                modalType === "delete" &&
                <ModalForm
                    modalTitle={'Are you sure?'}
                    isOpen={isModalOpen}
                    cancelBtnText="Close"
                    cancelHandler={() => setIsModalOpen(false)}
                    isLoading={userDeleteLoading}
                    submitBtnText="Yes, Delete"
                    submitHandler={
                        async (data, reset) => {
                            try {
                                const res = await deleteUser(userId).unwrap();
                                console.log(res)
                                reset(deleteUserConfig?.initialValues);
                                setIsModalOpen(false);
                                toast.success(res.message);
                                props.userListRefetch();
                            } catch (err) {
                                toast.error(err?.data?.message || err.error)
                            }
                        }
                    }
                    fields={deleteUserConfig?.fields}
                    initialValues={deleteUserConfig?.initialValues}
                    schema={deleteUserConfig?.schema}
                />
            }
        </>
    )
}

export default Table
