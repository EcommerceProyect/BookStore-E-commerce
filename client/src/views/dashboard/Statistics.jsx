import React from 'react'
import Dashboard from "./Dashboard";

export default function Statistics() {
  return (
    <div className='flex'>
    <Dashboard/>
        <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:py-24 lg:px-8">
    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Estadísticas</h2>
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mt-4">
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total de libros</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">1.6M</dd>
                </dl>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total de ventas</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">19.2K</dd>
                </dl>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Ventas semanales</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">4.9K</dd>
                </dl>
            </div>
        </div>
        <div className="bg-white overflow-hidden shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
                <dl>
                    <dt className="text-sm leading-5 font-medium text-gray-500 truncate">Total de usuarios</dt>
                    <dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600">166.7K</dd>
                </dl>
            </div>
        </div>
    </div>
    <h2 className=" pt-12 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Libros más vendidos</h2>
</div>

    </div>
  )
}
