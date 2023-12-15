import React from 'react'
import { useState } from 'react'

import { useDispatch } from 'react-redux'
import { postProduct } from '../../redux/services/postProduct'

import bookValidation from './bookValidation'

import { Button, Label, TextInput } from 'flowbite-react'

const CreateBook = () => {
  const dispatch = useDispatch()

  const [bookData, setBookData] = useState({
    title: '',
    price: '',
    image: '',
    // author: '',
    // genre: '',
    synopsis: '',
    // publisher: '',
    // isbn: '',
  })

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    image: '',
    // author: '',
    // genre: '',
    synopsis: '',
    // publisher: '',
    // isbn: '',
  })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await dispatch(postProduct(bookData))
      if (response && response.status === 201) {
        alert('Libro creado exitosamente.')
      } else {
        console.error('Error creando el libro.')
      }
    } catch (error) {
      console.error('Error creando libro:', error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Título" />
        </div>
        <TextInput
          id="title"
          type="text"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          color={errors.title ? 'failure' : 'gray'}
          helperText={errors.title ? errors.title : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Precio"></Label>
        </div>
        <TextInput
          id="price"
          type="text"
          name="price"
          pattern="\d+(\.\d{1,2})?"
          value={bookData.price}
          onChange={handleChange}
          color={errors.price ? 'failure' : 'gray'}
          helperText={errors.price ? errors.price : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Imagen"></Label>
        </div>
        <TextInput
          type="url"
          name="image"
          id="image"
          value={bookData.image}
          onChange={handleChange}
          color={errors.image ? 'failure' : 'gray'}
          helperText={errors.image ? errors.image : null}
        />
      </div>

      {/* <div>
        <div className="mb-2 block">
          <Label
            htmlFor="author"
            value="Autor"
          />
        </div>
          <TextInput
            type="text"
            name="author"
            id="author"
            value={bookData.author}
            onChange={handleChange}
            color={errors.author ? 'failure' : 'gray'}
            helperText={errors.author ? errors.author : null}
          />
        </div>

        <div>
        <div className="mb-2 block">
          <Label
            htmlFor="genre"
            value="Género"
          />
        </div>
          <TextInput
            type="text"
            name="genre"
            id="genre"
            value={bookData.genre}
            onChange={handleChange}
            color={errors.genre ? 'failure' : 'gray'}
            helperText={errors.genre ? errors.genre : null}
          />
        </div> */}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="synopsis" value="Sinopsis" />
        </div>
        <TextInput
          type="text"
          name="synopsis"
          id="synopsis"
          value={bookData.synopsis}
          onChange={handleChange}
          color={errors.synopsis ? 'failure' : 'gray'}
          helperText={errors.synopsis ? errors.synopsis : null}
        />
      </div>

      {/* <div>
        <div className="mb-2 block">
          <Label
            htmlFor="publisher"
            value="Editorial"
          />
          </div>
          <TextInput
            type="text"
            name="publisher"
            id="publisher"
            value={bookData.publisher}
            onChange={handleChange}
            color={errors.publisher ? 'failure' : 'gray'}
            helperText={errors.publisher ? errors.publisher : null}

          />
        </div>

        <div>
        <div className="mb-2 block">
          <Label
            htmlFor="isbn"
            value="ISBN"
          />
          </div>
          <TextInput
            type="text"
            name="isbn"
            id="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            color={errors.isbn ? 'failure' : 'gray'}
            helperText={errors.isbn ? errors.isbn : null}

          />
        </div> */}

      <Button
        type="submit"
        disabled={Object.values(errors).some((error) => error)}
      >
        Crear
      </Button>
    </form>
  )
}

export default CreateBook
