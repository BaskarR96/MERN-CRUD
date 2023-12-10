import React from 'react'

const Table = ({
    columns = [],
    rows = [],
}) => {
    return (
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
                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                        Edit
                                    </a>
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                    <a href="#" className="text-red-600 hover:text-red-900">
                                        Delete
                                    </a>
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
    )
}

export default Table
