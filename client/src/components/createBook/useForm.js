import { useState, useEffect } from 'react';
import { postProduct } from '../../redux/services/postProduct';
import { useDispatch } from 'react-redux';
import { Toaster, toast } from 'sonner'; //framework sonner, muestra mensajes.
import axios from 'axios';

export const useForm = (validationSchema) => {
  const dispatch = useDispatch();

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  // Handlers

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (selection, actionsInfo) => {
    let newValues;

    if (Array.isArray(selection)) {
      newValues = selection.map((item) => item.value);
    } else if (typeof selection === 'object') {
      newValues = selection.value;
    } else {
      newValues = '';
    }

    const { name } = actionsInfo;

    setValues({ ...values, [name]: newValues });
  };

  const handleImageChange = (event) => {
    const value = event.target.files[0];
    setValues({ ...values, image: value });
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validationSchema(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleCloudinaryUpload();
      console.log(values);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (typeof values.image === 'string' && values.image !== '') {
        try {
          const response = await dispatch(postProduct(values));

          if (
            response &&
            (response.status === 201 || response.status === 200)
          ) {
            toast('Libro creado exitosamente.');
          } else {
            toast('Error creando el libro.');
          }
        } catch (error) {
          console.error('Error creando libro:', error.message);
        }
      }
    };

    fetchData();
  }, [values.image]);

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleSelectChange,
    handleImageChange,
  };
};