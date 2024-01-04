export const validationSchema = (values) => {
  let errors = {};
  //Reglas de validación

  //Título 
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,;:'"!?¿¡()-]{1,70}$/.test(values.title)) {
    errors.title = 'El título debe tener entre 1 y 70 caracteres.';
  }
  if (!values.title) {
    errors.title = 'El título es obligatorio';
  }

  // Precio
  if (!values.price) {
    errors.price = 'El precio es obligatorio';
  }

  // Imagen
  if (!values.image) {
    errors.image = 'La imagen es obligatoria';
  }

  // Fecha de salida
  if (!values.releaseDate) {
    errors.releaseDate = 'La fecha de publicación es obligatoria';
  }

  // Autor
  if (!values.autor) {
    errors.autor = 'El autor es obligatorio';
  }

  // Género
  if (!values.genre) {
    errors.genre = 'El género es obligatorio';
  }

  // Editorial
  if (!values.editorial) {
    errors.editorial = 'La editorial es obligatoria';
  }

  // ISBNname
  if (!/^(?:ISBNname(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(
    values.ISBNname)
  ) { errors.ISBNname = 'El ISBN debe ser válido.' }

  if (!values.ISBNname) {
    errors.ISBNname = 'El ISBN es obligatorio';
  }

  // Stock
  if (!values.stock) {
    errors.stock = 'El stock es obligatorio';
  }

  if (!/^[1-9]\d*$/.test(values.stock)) {
    errors.stock = 'El stock debe ser un número entero mayor que 0.';
  }

  // Sipnosis
  if (values.synopsis !== '' && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,;:'"!?¿¡()-]{1,250}$/.test(values.synopsis)) {
    errors.synopsis = 'La sinopsis debe tener entre 1 y 250 caracteres.';
  }

  if (!values.synopsis) {
    errors.synopsis = 'La sinopsis es obligatoria';
  }

  return errors;
};
