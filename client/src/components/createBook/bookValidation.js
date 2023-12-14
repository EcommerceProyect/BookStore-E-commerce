const bookValidation = (bookData) => {
  let errors = {
    image: '',
    // isbn: '',
  }

  if (
    !/^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)($|\?.*$)/.test(bookData.image)
  ) {
    errors.image = 'La URL de imagen debe ser válida.'
  }

  //   if (
  //     !/^(?:ISBN(?:-13)?:?\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\ ]){4})[-\ 0-9]{17}$)97[89][-\ ]?[0-9]{1,5}[-\ ]?[0-9]+[-\ ]?[0-9]+[-\ ]?[0-9]$/.test(
  //       bookData.isbn,
  //     )
  //   ) {
  //     errors.isbn = 'El ISBN debe ser válido.'
  //   }

  return errors
}

export default bookValidation
