import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { putProduct } from '../../redux/services/putProduct';
import bookValidation from '../createBook/bookValidation';

import { Label, TextInput, Alert } from 'flowbite-react';
import CreatableSelect from 'react-select/creatable';

const PutBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsById(id));
    return () => {
      dispatch(clearProductDetail()); // limpia el detail cuando desmonto
    };
  }, [dispatch, id]);

  const generos = ['Ficción', 'Aventura', 'Acción']; // cuando estén disponibles las rutas para hacer
  const autores = ['max', 'un random']; // GET de géneros, autores y editoriales,
  const editoriales = ['editorial1', 'editorial2']; // voy a reemplazar esto.

  const [bookData, setBookData] = useState({
    title: detail.title,
    price: detail.price,
    image: detail.image,
    releaseDate: detail.releaseDate,
    autor: detail.autor,
    genre: detail.genre,
    synopsis: detail.synopsis,
    editorial: detail.editorial,
    ISBNname: detail.ISBNname,
    stock: detail.stock,
  });

  const [errors, setErrors] = useState({
    title: '',
    price: '',
    image: '',
    autor: '',
    genre: '',
    synopsis: '',
    editorial: '',
    ISBNname: '',
    stock: '',
  });

  const handleChange = (e) => {
    setBookData({
      ...bookData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      bookValidation({
        ...bookData,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSelectChangeGenre = (e) => {
    const updatedGenres = e.map((selectedGenre) => selectedGenre.value);
    setBookData({ ...bookData, genre: updatedGenres });
  };

  const handleSelectChangeAutor = (e) => {
    const updatedAutores = e.map((selectedAutor) => selectedAutor.value);
    setBookData({ ...bookData, autor: updatedAutores });
  };

  const handleSelectChangeEditorial = (e) => {
    setBookData({ ...bookData, editorial: e.value });
  };

  const genresNotInArray = bookData.genre.filter(
    (genre) => !generos.includes(genre),
  );

  const autoresNotInArray = bookData.autor.filter(
    (autor) => !autores.includes(autor),
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(putProduct(bookData, id));
      if (response && response.status === 200) {
        alert('Libro actualizado exitosamente.');
      } else {
        console.error('Error actualizando el libro.');
      }
    } catch (error) {
      console.error('Error actualizando libro:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4">
      <div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Modificar libro
        </h3>
      </div>
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

      <div>
        <div className="mb-2 block">
          <Label htmlFor="releaseDate" value="Fecha de lanzamiento"></Label>
        </div>
        <TextInput
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={bookData.releaseDate}
          color="gray"
          onChange={handleChange}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="autor" value="Autor" />
        </div>
        <CreatableSelect
          id="autor"
          onChange={handleSelectChangeAutor}
          isMulti
          options={autores.map((autor) => ({ value: autor, label: autor }))}
          value={bookData.autor}
        />
        {autoresNotInArray.length > 0 && (
          <Alert color="info">
            <span className="font-medium">Cuidado!</span> Los siguientes autores
            no se encuentran actualmente en la base de datos, por lo tanto se
            crearán: {autoresNotInArray.join(', ')}.
          </Alert>
        )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="genre" value="Género" />
        </div>
        <CreatableSelect
          id="genre"
          onChange={handleSelectChangeGenre}
          isMulti
          options={generos.map((genre) => ({ value: genre, label: genre }))}
          value={bookData.genre}
        />
        {genresNotInArray.length > 0 && (
          <Alert color="info">
            <span className="font-medium">Cuidado!</span> Los siguientes géneros
            no se encuentran actualmente en la base de datos, por lo tanto se
            crearán: {genresNotInArray.join(', ')}.
          </Alert>
        )}
      </div>

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

      <div>
        <div className="mb-2 block">
          <Label htmlFor="editorial" value="Editorial" />
        </div>
        <CreatableSelect
          id="editorial"
          onChange={handleSelectChangeEditorial}
          options={editoriales.map((editorial) => ({
            value: editorial,
            label: editorial,
          }))}
          value={bookData.editorial}
        />
        {!editoriales.includes(bookData.editorial) > 0 &&
          bookData.editorial !== '' && (
            <Alert color="info">
              <span className="font-medium">Cuidado!</span> La editorial no se
              encuentra actualmente en la base de datos, por lo tanto se creará.
            </Alert>
          )}
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="ISBNname" value="ISBN" />
        </div>
        <TextInput
          type="text"
          name="ISBNname"
          id="ISBNname"
          value={bookData.ISBNname}
          onChange={handleChange}
          color={errors.ISBNname ? 'failure' : 'gray'}
          helperText={errors.ISBNname ? errors.ISBNname : null}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="stock" value="Stock"></Label>
        </div>
        <TextInput
          id="stock"
          type="number"
          name="stock"
          value={bookData.stock}
          onChange={handleChange}
          color={errors.stock ? 'failure' : 'gray'}
          helperText={errors.stock ? errors.stock : null}
        />
      </div>

      <button
        type="submit"
        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={
          bookData.genre.length === 0 ||
          bookData.autor.length === 0 ||
          bookData.title === '' ||
          bookData.price === '' ||
          bookData.releaseDate === '' ||
          bookData.editorial === '' ||
          bookData.image === '' ||
          bookData.ISBNname === '' ||
          bookData.synopsis === '' ||
          bookData.stock === '' ||
          Object.values(errors).some((error) => error)
        }
      >
        Modificar libro{' '}
      </button>
    </form>
  );
};

export default PutBook;
