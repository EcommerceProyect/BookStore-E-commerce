const userValidation = (userData) => {
  let errors = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    verifyPassword: '',
  };

  if (userData.name !== '' && userData.name.length <= 2) {
    errors.name = 'El nombre debe ser de dos carácteres como mínimo.';
  }

  if (userData.lastname !== '' && userData.lastname.length <= 2) {
    errors.lastname = 'El apellido debe ser de dos carácteres como mínimo.';
  }

  if (
    userData.email !== '' &&
    !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)
  ) {
    errors.email = 'El formato del correo electrónico no es válido.';
  }

  if (
    userData.password !== '' &&
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(userData.password)
  ) {
    errors.password =
      'La contraseña debe contener al menos un dígito y 8 caracteres.';
  }

  if (
    userData.verifyPassword !== '' &&
    userData.password !== userData.verifyPassword
  ) {
    errors.verifyPassword = 'Las contraseñas deben ser iguales.';
  }

  return errors;
};

export default userValidation;
