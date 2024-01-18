import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormEdit } from './useFormEdit';
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
import Dashboard from '../../views/dashboard/Dashboard';
import { fetchGenres } from '../../redux/services/getGenres';
import { fetchEditorial } from '../../redux/services/getEditorial';
import { fetchAuthors } from '../../redux/services/getAuthors';
import { getProductDetails } from '../../redux/services/getProductDetail';
import { useParams } from 'react-router-dom';
import { putProduct } from '../../redux/services/putProduct';

const EditBook = () => {
    
    const dispatch = useDispatch();
    const { id } = useParams();

    const [initialValues, setInitialValues] = useState({});
    useEffect(() => {

        dispatch(getProductDetails(id));
        console.log("el id", id);

    }, [dispatch, id]);


    const { detailProduct } = useSelector((state) => state.products);;
    console.log("detalles del producto: ", detailProduct);

    useEffect(() => {

        if (detailProduct) {
            setValues({
                ...values,
                title: detailProduct.title || '',
                price: detailProduct.price || '',
                image: detailProduct.image || '',
                ISBNname: detailProduct.ISBN.name || '',
                stock: detailProduct.ISBN.stock || '',
                synopsis: detailProduct.synopsis || '',
                autor: detailProduct.Authors
                    ? detailProduct.Authors.map(author => ({
                        value: author.name,
                        label: author.name
                    }))
                    : [],
                genre: detailProduct.Genres
                    ? detailProduct.Genres.map(genre => ({
                        value: genre.name,
                        label: genre.name
                    }))
                    : [],
                editorial: detailProduct.Editorial
                    ? {
                        value: '',
                        label: detailProduct.Editorial.name
                    }
                    : null,
                releaseDate: detailProduct.ReleasedDate.date || ''
            });
        }
    }, [detailProduct]);


    const {
        values,
        errors,
        handleChange,
        handleSelectChange,
        handleImageChange,
        handleEditSubmit,
        setValues
    } = useFormEdit(validationSchema, { initialValues, id });


    console.log('Estado actual:', values);

    useEffect(() => {

    }, [id, dispatch]);

    useEffect(() => {
        dispatch(fetchAuthors());
        dispatch(fetchGenres());
        dispatch(fetchEditorial());
    }, [dispatch]);

    const { allAuthors } = useSelector((state) => state.authors);
    useEffect(() => {
        dispatch(fetchAuthors());
    }, [dispatch])

    const { allGenres } = useSelector((state) => state.genres);
    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    const { allEditorial } = useSelector((state) => state.editorial);
    useEffect(() => {
        dispatch(fetchEditorial());
    }, [dispatch])

    if (!detailProduct) {
        return <div>Cargando...</div>;
    }

    console.log(allAuthors)

    return (
        <div className="flex ">
            <Dashboard />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
                <form className="flex max-w-md flex-col gap-4 border p-6 rounded-md w-full">
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
                            options={allAuthors.map((autor) => ({ value: autor.name, label: autor.name }))}
                            value={values.autor}
                            
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
                            options={allGenres.map((genre) => ({ value: genre.name, label: genre.name }))}
                            value={values.genre}
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
                            onChange={(newSelection) => {
                                // Establecer values.editorial en el nuevo valor seleccionado
                                setValues(prevValues => ({ ...prevValues, editorial: newSelection }));
                                // Luego, manejar el cambio normalmente
                                handleSelectChange(newSelection);
                            }}
                            options={allEditorial.map((editorial) => ({
                                value: editorial.name,
                                label: editorial.name,
                            }))}
                            value={values.editorial ? { value: values.editorial.label, label: values.editorial.label } : null}
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
                    <Button className="bg-primary dark:bg-primary" onClick={(event) => handleEditSubmit(event, putProduct, id)}>Guardar cambios</Button>
                </form>
                <Toaster closeButton={true} duration={4000} />
            </div>
        </div>
    );
};

export default EditBook;
