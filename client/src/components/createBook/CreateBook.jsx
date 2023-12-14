import React from 'react'
import { useState } from 'react'

import bookValidation from './bookValidation'

const CreateBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    price: null,
    image: '',
    author: '',
    genre: '',
    synopsis: '',
    publisher: '',
    isbn: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    })
    setErrors(
      bookValidation({
        ...bookData,
        [e.target.name]: e.target.value,
      }),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center h-screen"
    >
      <div>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Título
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={bookData.title}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Precio
          </label>
          <input
            type="text"
            name="price"
            pattern="\d+(\.\d{1,2})?"
            id="price"
            value={bookData.price}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Imagen
          </label>
          <input
            type="url"
            name="image"
            id="image"
            value={bookData.image}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
          {errors.image ? (
            <a className="block text-sm font-semibold text-red-600">
              {errors.image}
            </a>
          ) : null}
        </div>

        <div className="mb-6">
          <label
            htmlFor="author"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Autor
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={bookData.author}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="genre"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Género
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={bookData.genre}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="synopsis"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Sinopsis
          </label>
          <input
            type="text"
            name="synopsis"
            id="synopsis"
            value={bookData.synopsis}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="publisher"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            Editorial
          </label>
          <input
            type="text"
            name="publisher"
            id="publisher"
            value={bookData.publisher}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="isbn"
            className="block text-sm font-semibold text-gray-600 text-center"
          >
            ISBN
          </label>
          <input
            type="text"
            name="isbn"
            id="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            className="w-full border p-2 mt-1"
          />
          {errors.isbn ? (
            <a className="block text-sm font-semibold text-red-600 text-center">
              {errors.isbn}
            </a>
          ) : null}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded"
          >
            Crear
          </button>
        </div>
      </div>
    </form>
  )
}

export default CreateBook
