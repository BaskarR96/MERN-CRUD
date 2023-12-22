import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Bars } from 'react-loader-spinner'
import Button from './Button';
import { useGetUserQuery } from '../slices/userApiSlice';

const ModalForm = ({
    modalTitle,
    isOpen,
    customFormBody = null,
    isCancelBtn = true,
    cancelBtnText = "Cancel",
    cancelHandler = null,
    isSubmitBtn = true,
    submitBtnText = "Submit",
    isLoading = false,
    submitHandler = null,
    fields,
    initialValues,
    schema = yup.object(),
    ...props
}) => {

    const {
        register,
        handleSubmit,
        reset,
        trigger,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues
    })

    const {
        data: userDetails = null,
        error: userDetailsError = false,
        isLoading: userDetailsLoading = false,
        refetch: userDetailsRefetch,
    } = modalTitle === "Edit User" && props?.userId && useGetUserQuery(props.userId);

    useEffect(() => {
        if (isOpen && userDetails?.data) {
            setValue('firstName', userDetails.data?.first_name);
            setValue('lastName', userDetails.data?.last_name);
            setValue('email', userDetails.data?.email);
        }
    }, [isOpen, userDetails])
    useEffect(() => {
        isOpen && modalTitle === "Edit User" && props?.userId && userDetails && userDetailsRefetch(props.userId)
    }, [isOpen])

    return (
        <Modal
            title={<div className="text-[18px]">{modalTitle}</div>}
            open={isOpen}
            onCancel={
                cancelHandler ?
                    () => {
                        cancelHandler();
                        reset(initialValues)
                    } : () => null
            }
            footer={null}
        >
            {
                userDetailsError ?
                    <p className="mt-2 text-sm text-gray-700">
                        {`${userDetailsError?.data?.errorMessage ? `${userDetailsError.data.errorMessage}` : ''}`}
                    </p> :
                    userDetailsLoading ?
                        <Bars
                            height="20"
                            width="20"
                            color="#000"
                            ariaLabel="bars-loading"
                            wrapperStyle={{ justifyContent: "center" }}
                            wrapperClass=""
                            visible={true}
                        /> :
                        <form className={"mt-4"} onSubmit={handleSubmit((data) => submitHandler(data, reset))}>
                            {
                                Array.isArray(fields) && fields.length > 0 ?
                                    fields.map((field, index) => {
                                        const {
                                            type,
                                            className,
                                            labelClassName,
                                            inputClassName,
                                            name,
                                            id,
                                            placeholder,
                                            label,
                                            helperText,
                                            isRequired,
                                        } = field
                                        switch (type) {
                                            case 'text':
                                                return (
                                                    <div key={index} className={`${className ? className : ""} mb-5`} >
                                                        {
                                                            label ?
                                                                <label
                                                                    htmlFor={id}
                                                                    className={`block text-sm font-medium leading-6 text-gray-900 mb-2 ${labelClassName ? labelClassName : ""}`
                                                                    }
                                                                >
                                                                    {label} {isRequired ? <span className='text-[#bb251a]'>*</span> : ''}
                                                                </label> : ''
                                                        }
                                                        <input
                                                            type={type}
                                                            name={name}
                                                            id={id}
                                                            className={`${inputClassName ? inputClassName : ""} block w-full rounded-md border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                                            placeholder={placeholder}
                                                            onKeyUp={() => trigger(name)}
                                                            autoComplete='off'
                                                            {...register(name)}
                                                        />
                                                        {
                                                            helperText && (
                                                                <label
                                                                    htmlFor={id}
                                                                    className={"block text-sm font-medium leading-6 text-gray-900 mt-2"}
                                                                    dangerouslySetInnerHTML={{ __html: helperText }}
                                                                />
                                                            )
                                                        }
                                                        {
                                                            errors?.[name]?.message && (
                                                                <small
                                                                    type={'error'}
                                                                    className={"error mt-0.5 text-[12px] text-[#bb251a] absolute"}
                                                                >
                                                                    {errors[name].message}
                                                                </small>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            case 'password':
                                                return (
                                                    <div key={index} className={`${className ? className : ""} mb-5`} >
                                                        {
                                                            label ?
                                                                <label
                                                                    htmlFor={id}
                                                                    className={`block text-sm font-medium leading-6 text-gray-900 mb-2 ${labelClassName ? labelClassName : ""}`
                                                                    }
                                                                >
                                                                    {label} {isRequired ? <span className='text-[#bb251a]'>*</span> : ''}
                                                                </label> : ''
                                                        }
                                                        <input
                                                            type={type}
                                                            name={name}
                                                            id={id}
                                                            className={`${inputClassName ? inputClassName : ""} block w-full rounded-md border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                                            placeholder={placeholder}
                                                            onKeyUp={() => trigger(name)}
                                                            autoComplete='off'
                                                            {...register(name)}
                                                        />
                                                        {
                                                            helperText && (
                                                                <label
                                                                    htmlFor={id}
                                                                    className={"block text-sm font-medium leading-6 text-gray-900 mt-2"}
                                                                    dangerouslySetInnerHTML={{ __html: helperText }}
                                                                />
                                                            )
                                                        }
                                                        {
                                                            errors?.[name]?.message && (
                                                                <small
                                                                    type={'error'}
                                                                    className={"error mt-0.5 text-[12px] text-[#bb251a] absolute"}
                                                                >
                                                                    {errors[name].message}
                                                                </small>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            default:
                                                return null;
                                        }
                                    }) : ''
                            }
                            {
                                customFormBody ? customFormBody : ''
                            }
                            <div className="form-footer flex justify-end">
                                {
                                    isCancelBtn ?
                                        <Button
                                            key='cancel'
                                            type='button'
                                            name='cancel'
                                            id='cancel'
                                            className='block rounded-md border border-[#646464] px-3 py-2 mr-2 text-center text-sm font-semibold text-[#000] shadow-sm hover:bg-[#e9e9e9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e9e9e9] min-w-[93px]'
                                            onClick={
                                                cancelHandler ?
                                                    () => {
                                                        cancelHandler();
                                                        reset(initialValues);
                                                    } : () => null
                                            }
                                        >
                                            {cancelBtnText}
                                        </Button> : ''
                                }
                                {
                                    isSubmitBtn ?
                                        <Button
                                            key='submit'
                                            type='submit'
                                            name='submit'
                                            id='submit'
                                            className={`${/delete/i.test(submitBtnText) ? `${isLoading ? 'bg-[#cf7973]' : 'bg-[#bb251a] hover:bg-[#cf7973] focus-visible:outline-[#bb251a]'}` : `${isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'}`} block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 min-w-[93px]`}
                                            isLoading={isLoading}
                                        >
                                            {submitBtnText}
                                        </Button> : ''
                                }
                            </div>
                        </form >
            }
        </Modal>
    )
}

export default ModalForm