import React, { useState } from 'react';
import { useForm } from './useForm';
import { validationSchema } from './validationSchema';
import { Button, FileInput, Label, TextInput, Alert, Textarea } from 'flowbite-react'
import CreatableSelect from 'react-select/creatable';


const CreateBook = () => {
  const { values, errors, handleChange, handleSubmit, handleSelectChange, handleImageChange } = useForm(validationSchema);

  const generos = ['Ficción', 'Aventura', 'Acción']; // cuando estén disponibles las rutas para hacer
  const autores = ['Autor 1', 'Autor 2']; // GET de géneros, autores y editoriales,
  const editoriales = ['editorial1', 'editorial2']; // voy a reemplazar esto.

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Título" />
        </div>
        <TextInput name="title" id="title" type="text" placeholder="" value={values.title} onChange={handleChange} />
      </div>
      {errors.title && <Alert color="failure">
        <span className="font-medium">{errors.title}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Precio" />
        </div>
        <TextInput name="price" id="price" type="number" value={values.price} onChange={handleChange} />
      </div>
      {errors.price && <Alert color="failure">
        <span className="font-medium">{errors.price}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="image" value="Subir Imagen" />
        </div>
        <FileInput name="image" id="image" accept="image/*" helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)." onChange={handleImageChange} />
      </div>
      {errors.image && <Alert color="failure">
        <span className="font-medium">{errors.image}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="releaseDate" value="Fecha de publicación" />
        </div>
        <TextInput
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={values.releaseDate}
          onChange={handleChange}
        />
      </div>
      {errors.releaseDate && <Alert color="failure">
        <span className="font-medium">{errors.releaseDate}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="author" value="Autor" />
        </div>
        <CreatableSelect
          id="author"
          name='author'
          isMulti
          onChange={handleSelectChange}
          options={autores.map((autor) => ({ value: autor, label: autor }))} />
      </div>
      {errors.author && <Alert color="failure">
        <span className="font-medium">{errors.author}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="genre" value="Género" />
        </div>
        <CreatableSelect
          id="genre"
          name='genre'
          isMulti
          onChange={handleSelectChange}
          options={generos.map((genre) => ({ value: genre, label: genre }))}
        />
      </div>
      {errors.genre && <Alert color="failure">
        <span className="font-medium">{errors.genre}</span>
      </Alert>}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="editorial" value="Editorial" />
        </div>
        <CreatableSelect
          id="editorial"
          name='editorial'
          onChange={handleSelectChange}
          options={editoriales.map((editorial) => ({
            value: editorial,
            label: editorial,
          }))}
        />
      </div>
      {errors.editorial && <Alert color="failure">
        <span className="font-medium">{errors.editorial}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="isbn" value="ISBN" />
        </div>
        <TextInput name='isbn' id="isbn" type="text" placeholder="" value={values.isbn} onChange={handleChange} />
      </div>
      {errors.isbn && <Alert color="failure">
        <span className="font-medium">{errors.isbn}</span>
      </Alert>}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="stock" value="Stock" />
        </div>
        <TextInput name="stock" id="stock" type="number" value={values.stock} onChange={handleChange} />
      </div>
      {errors.stock && <Alert color="failure">
        <span className="font-medium">{errors.stock}</span>
      </Alert>}
      <div className="max-w-md">
        <div className="mb-2 block">
          <Label htmlFor="synopsis" value="Sipnosis" />
        </div>
        <Textarea name='synopsis' id="synopsis" rows={4} value={values.synopsis} onChange={handleChange} />
      </div>
      {errors.synopsis && <Alert color="failure">
        <span className="font-medium">{errors.synopsis}</span>
      </Alert>}


      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateBook;
