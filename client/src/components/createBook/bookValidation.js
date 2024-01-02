const bookValidation = (bookData) => {
  let errors = {
    image: '',
    ISBNname: '',
    price: '',
    title: '',
    synopsis: '',
    stock: '',
  };

  if (
    bookData.image !== '' &&
    !/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)/.test(bookData.image)
  ) {
    errors.image = 'La URL de imagen debe ser válida.';
  }

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

  if (bookData.title !== '' && !/^[a-zA-Z0-9\s.,;:'"!?¿¡()-]{1,70}$/.test(bookData.title)) {
    errors.title = 'El título debe tener entre 1 y 70 caracteres.';
  }

  if (bookData.synopsis !== '' && !/^[a-zA-Z0-9\s.,;:'"!?¿¡()-]{1,350}$/.test(bookData.synopsis)) {
    errors.synopsis = 'La sinopsis debe tener entre 1 y 300 caracteres.';
  }

  if (bookData.stock !== '' && !/^\d+$/.test(bookData.stock)) {
    errors.stock = 'El stock debe ser un número entero.';
  }

  return errors;
};

export default bookValidation;
