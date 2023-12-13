import React, { useState } from 'react'
import Button from './Button'
import ModalForm from './ModalForm'
import { deleteUser, updateUser } from '../utilis/formConfigs'

const Table = ({
    columns = [],
    rows = [],
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const renderModal = () => {
        switch (modalType) {
            case "edit":
                return (
                    <ModalForm
                        modalTitle={'Edit User'}
                        isOpen={isModalOpen}
                        cancelBtnText="Cancel"
                        cancelHandler={() => setIsModalOpen(false)}
                        submitBtnText="Update"
                        submitHandler={(data, reset) => {
                            console.log(data);
                            reset(updateUser?.initialValues);
                            setIsModalOpen(false);
                        }}
                        fields={updateUser?.fields}
                        initialValues={updateUser?.initialValues}
                        schema={updateUser?.schema}
                    />
                );
            case "delete":
                return (
                    <ModalForm
                        modalTitle={'Are you sure?'}
                        isOpen={isModalOpen}
                        cancelBtnText="Cancel"
                        cancelHandler={() => setIsModalOpen(false)}
                        submitBtnText="Yes, Delete"
                        submitHandler={(data, reset) => {
                            console.log(data);
                            reset(deleteUser?.initialValues);
                            setIsModalOpen(false);
                        }}
                        fields={deleteUser?.fields}
                        initialValues={deleteUser?.initialValues}
                        schema={deleteUser?.schema}
                    />
                );
            default:
                return null;
        }
    }
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
                        Array.isArray(rows) && rows.length > 0 ?
                            rows.map((row, index) => (
                                <tr key={index}>
                                    {
                                        Array.isArray(columns) && columns.length > 0 ?
                                            columns.map((column, index) => {
                                                return (
                                                    <td key={index} scope="col" className={`${index === 0 ? 'py-4 pl-4 pr-3 font-medium text-gray-900 sm:pl-0' : 'px-3 py-4 text-gray-500'} whitespace-nowrap text-sm`}>
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
                                            onClick={() => { setIsModalOpen(true); setModalType("edit"); }}
                                        >
                                            Edit
                                        </Button>
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <Button
                                            type="button"
                                            className="text-[#bb251a] hover:text-red-900"
                                            name="delete"
                                            onClick={() => { setIsModalOpen(true); setModalType("delete"); }}
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
            {renderModal()}
        </>
    )
}

export default Table
