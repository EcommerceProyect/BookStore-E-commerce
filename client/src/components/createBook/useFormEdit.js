import { useState, useEffect } from 'react';
import { postProduct } from '../../redux/services/postProduct';
import { putProduct } from '../../redux/services/putProduct'
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner'; //framework sonner, muestra mensajes.
import axios from 'axios';

export const useFormEdit = (validationSchema, { initialValues, id }) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // Handlers

console.log("useFormEdit id: ", id);
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };
  
  const handleSelectChange = (selection, actionsInfo) => {
    const { name } = actionsInfo;
    let updatedValue = [];
  
    if (name === 'autor') {
      updatedValue = selection.map((item) => ({ value: item.value, label: item.label }));
    } else if (name === 'genre') {
      updatedValue = selection.map((item) => ({ value: item.value, label: item.label }));
    } else if (name === 'editorial') {
      updatedValue = selection ? { value: selection.value, label: selection.label } : null;
    } else {
      updatedValue = Array.isArray(selection) ? selection.map((item) => item.value) : [selection.value];
    }
  
    setValues((prevValues) => ({ ...prevValues, [name]: updatedValue }));
  };

  
  
  const handleImageChange = (event) => {
    setValues({ ...values, image: event.target.files[0] });
  };

  const handleCloudinaryUpload = async () => {
    try {
      console.log(values.image);
      const data = new FormData();
      data.append('file', values.image);
      data.append('upload_preset', 'oxcrd6yr');
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dwajgrydt/image/upload',
        data,
      );

      const imageURL = response.data.secure_url;
      if (response.status === 200 && imageURL) {
        setValues({
          ...values,
          image: imageURL,
        });
      } else {
        setErrors({ ...errors, image: 'No se pudo subir la imagen.' });
      }
    } catch (e) {
      setErrors({ ...errors, image: `Error subiendo la imagen: ${e.message}` });
    }
  };


  
  const handleEditSubmit = async (event, putProduct, id) => {
    if (event) {
      event.preventDefault();
    }
  
    const newErrors = validationSchema(values);
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0 && id) {
      const formattedData = {
          ISBNname: values.ISBNname,
          autor: values.autor && values.autor.length > 0 ? values.autor.map(author => author.value) : [], // Verificar si values.author existe antes de acceder a su propiedad length
          editorial: values.editorial ? values.editorial.label : null,
            genre: values.genre.map(genre => genre.value),
            image: values.image,
            price: values.price,
            releaseDate: values.releaseDate,
            stock: values.stock,
            synopsis: values.synopsis,
            title: values.title
          };

          try {
            await handleCloudinaryUpload();
            console.log('Después de la subida a Cloudinary');
    
            const response = await dispatch(putProduct(formattedData, id));
    
            if (response && (response.status === 201 || response.status === 200)) {
              toast('Libro editado exitosamente.');
            } else {
              toast('Error editando el libro.');
            }
          } catch (error) {
            console.error('Error editando libro:', error.message);
            toast('Error al editar el libro o subir imagen.');
            throw error;
          }
        } else {
          toast('Error al editar el libro: Datos inválidos o faltantes.');
        }
      };
  return {
    values,
    errors,
    handleChange,
    handleSelectChange,
    handleImageChange,
    handleEditSubmit,
    setValues 
  };
};