import React, { useState } from 'react';
import Table from './components/Table';
import Button from './components/Button';
import ModalForm from './components/ModalForm';
import { addUser } from './utilis/formConfigs';

function App() {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const columns = [
        {
            name: 'First Name',
            key: 'first_name'
        },
        {
            name: 'Last Name',
            key: 'last_name'
        },
        {
            name: 'Email ID',
            key: 'email'
        },
    ]
    const rows = [
        { first_name: 'Lindsay', last_name: 'Walton', email: 'lindsay.walton@example.com' },
    ]

    return (
        <div className="p-4 sm:p-6 lg:p-8 xl:w-[50%] h-[100vh] mx-auto">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users including their first name, last name and email.
                    </p>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <Button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Add user
                    </Button>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <Table
                            columns={columns}
                            rows={rows}
                        />
                    </div>
                </div>
            </div>
            <ModalForm
                modalTitle={'Add User'}
                isOpen={isModalOpen}
                cancelHandler={() => setIsModalOpen(false)}
                submitHandler={(data, reset) => {
                    console.log(data);
                    reset(addUser?.initialValues);
                    setIsModalOpen(false);
                }}
                fields={addUser?.fields}
                initialValues={addUser?.initialValues}
                schema={addUser?.schema}
            />
        </div>
    )
}

export default App
