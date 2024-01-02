const bookValidation = (bookData) => {
  let errors = {
    ISBNname: '',
    price: '',
    title: '',
    synopsis: '',
    stock: '',
  };

  if (
    bookData.ISBNname !== '' &&
    !/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(
      bookData.ISBNname,
    )
  ) {
    errors.ISBNname = 'El ISBN debe ser válido.';
  }

  if (bookData.price !== '' && isNaN(bookData.price)) {
    errors.price = 'El precio debe ser un número.';
  }

  if (bookData.title !== '' && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,;:'"!?¿¡()-]{1,70}$/.test(bookData.title)) {
    errors.title = 'El título debe tener entre 1 y 70 caracteres.';
  }

  if (bookData.synopsis !== '' && !/^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ0-9\s.,;:'"!?¿¡()-]{1,250}$/.test(bookData.synopsis)) {
    errors.synopsis = 'La sinopsis debe tener entre 1 y 250 caracteres.';
  }

  if (bookData.stock !== '' && !/^\d+$/.test(bookData.stock)) {
    errors.stock = 'El stock debe ser un número entero.';
  }

  return errors;
};

export default bookValidation;
