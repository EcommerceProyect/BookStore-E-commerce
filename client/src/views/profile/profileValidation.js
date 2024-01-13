const profileValidation = (userData) => {
  let errors = {
    name: '',
    lastname: '',
    phone: '',
  };

  if (userData.name !== '' && userData.name.length <= 2) {
    errors.name = 'El nombre debe ser de dos carácteres como mínimo.';
  }

  if (userData.last_name !== '' && userData.last_name.length <= 2) {
    errors.lastname = 'El apellido debe ser de dos carácteres como mínimo.';
  }

  if (
    (userData.phone !== '' && userData.phone.length <= 7) ||
    userData.phone.length > 10
  ) {
    errors.phone = 'El número de teléfono no es válido.';
  }

  return errors;
};

export default profileValidation;
