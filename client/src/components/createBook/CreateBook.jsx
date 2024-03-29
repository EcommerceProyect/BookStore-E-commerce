import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from './useForm';
import { validationSchema } from './validationSchema';
import { Toaster, toast } from 'sonner';

import {
  Button,
  FileInput,
  Label,
  TextInput,
  Alert,
  Textarea,
} from 'flowbite-react';
import CreatableSelect from 'react-select/creatable';
//actions
import { fetchGenres } from '../../redux/services/getGenres';
import { fetchEditorial } from '../../redux/services/getEditorial';
import { fetchAuthors } from '../../redux/services/getAuthors';
import Dashboard from '../../views/dashboard/Dashboard';

const CreateBook = () => {
  const dispatch = useDispatch();
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleSelectChange,
    handleImageChange,
    resetValues
  } = useForm(validationSchema);

  const { allAuthors } = useSelector((state) => state.authors);
  useEffect(() => {
    dispatch(fetchAuthors());
  }, [dispatch]);

  const { allGenres } = useSelector((state) => state.genres);
  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const { allEditorial } = useSelector((state) => state.editorial);
  useEffect(() => {
    dispatch(fetchEditorial());
  }, [dispatch]);

  const { loading, error } = useSelector((state) => state.products);

  return (
    <div className="flex ">
      <Dashboard />
      <div className="max-w-7xl mx-auto  px-4 sm:px-6 lg:py-24 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="flex max-w-md flex-col gap-4 border p-6 rounded-md w-full"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Título" />
            </div>
            <TextInput
              name="title"
              id="title"
              type="text"
              placeholder=""
              value={values.title}
              onChange={handleChange}
            />
          </div>
          {errors.title && (
            <Alert color="failure">
              <span className="font-medium">{errors.title}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Precio" />
            </div>
            <TextInput
              name="price"
              id="price"
              type="number"
              value={values.price}
              onChange={handleChange}
            />
          </div>
          {errors.price && (
            <Alert color="failure">
              <span className="font-medium">{errors.price}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="image" value="Subir Imagen" />
            </div>
            <FileInput
              name="image"
              id="image"
              accept="image/*"
              helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
              onChange={handleImageChange}
            />
          </div>
          {errors.image && (
            <Alert color="failure">
              <span className="font-medium">{errors.image}</span>
            </Alert>
          )}
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
          {errors.releaseDate && (
            <Alert color="failure">
              <span className="font-medium">{errors.releaseDate}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="autor" value="Autor" />
            </div>
            <CreatableSelect
              id="autor"
              name="autor"
              isMulti
              onChange={handleSelectChange}
              options={allAuthors.map((autor) => ({
                value: autor.name,
                label: autor.name,
              }))}
            />
          </div>
          {errors.autor && (
            <Alert color="failure">
              <span className="font-medium">{errors.autor}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="genre" value="Género" />
            </div>
            <CreatableSelect
              id="genre"
              name="genre"
              isMulti
              onChange={handleSelectChange}
              options={allGenres.map((genre) => ({
                value: genre.name,
                label: genre.name,
              }))}
            />
          </div>
          {errors.genre && (
            <Alert color="failure">
              <span className="font-medium">{errors.genre}</span>
            </Alert>
          )}

          <div>
            <div className="mb-2 block">
              <Label htmlFor="editorial" value="Editorial" />
            </div>
            <CreatableSelect
              id="editorial"
              name="editorial"
              onChange={handleSelectChange}
              options={allEditorial.map((editorial) => ({
                value: editorial.name,
                label: editorial.name,
              }))}
            />
          </div>
          {errors.editorial && (
            <Alert color="failure">
              <span className="font-medium">{errors.editorial}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="ISBNname" value="ISBN" />
            </div>
            <TextInput
              name="ISBNname"
              id="ISBNname"
              type="text"
              placeholder=""
              value={values.ISBNname}
              onChange={handleChange}
            />
          </div>
          {errors.ISBNname && (
            <Alert color="failure">
              <span className="font-medium">{errors.ISBNname}</span>
            </Alert>
          )}
          <div>
            <div className="mb-2 block">
              <Label htmlFor="stock" value="Stock" />
            </div>
            <TextInput
              name="stock"
              id="stock"
              type="number"
              value={values.stock}
              onChange={handleChange}
            />
          </div>
          {errors.stock && (
            <Alert color="failure">
              <span className="font-medium">{errors.stock}</span>
            </Alert>
          )}
          <div className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="synopsis" value="Sipnosis" />
            </div>
            <Textarea
              name="synopsis"
              id="synopsis"
              rows={4}
              value={values.synopsis}
              onChange={handleChange}
            />
          </div>
          {errors.synopsis && (
            <Alert color="failure">
              <span className="font-medium">{errors.synopsis}</span>
            </Alert>
          )}

          <Button className="bg-accents dark:bg-primary" type="submit" disabled={loading || error === "El libro no pudo ser creado correctamente"}>
            Crear libro
          </Button>

          {error && 
          <div className="mb-2 block">
              <p className='bg-accents text-lg'>Hubo un error creando el libro, porfavor, refresque la página.</p>
          </div>
          }
        </form>
        <Toaster closeButton={true} duration={4000} />
      </div>
    </div>
  );
};

export default CreateBook;