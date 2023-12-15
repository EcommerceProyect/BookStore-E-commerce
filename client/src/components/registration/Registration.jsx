import React, { useState } from 'react';
import userValidation from './userValidation';

import { Button, Label, TextInput } from 'flowbite-react';

const Registration = () => {
  const [userData, setUserData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    verifyPassword: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors(
      userValidation({
        ...userData,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-w-md gap-4">
      <div className="mb-2 block">
        <Label htmlFor="name" value="Nombre" />
        <TextInput
          type="text"
          name="name"
          id="name"
          value={userData.name}
          onChange={handleChange}
          color={errors.name ? 'failure' : 'gray'}
          helperText={errors.name ? errors.name : null}
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="lastname" value="Apellido" />
        <TextInput
          type="text"
          name="lastname"
          id="lastname"
          onChange={handleChange}
          value={userData.lastname}
          color={errors.lastname ? 'failure' : 'gray'}
          helperText={errors.lastname ? errors.lastname : null}
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="email" value="E-mail" />
        <TextInput
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={userData.email}
          color={errors.email ? 'failure' : 'gray'}
          helperText={errors.email ? errors.email : null}
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="password" value="Contraseña" />
        <TextInput
          type="password"
          name="password"
          id="password"
          onChange={handleChange}
          value={userData.password}
          color={errors.password ? 'failure' : 'gray'}
          helperText={errors.password ? errors.password : null}
        />
      </div>

      <div className="mb-2 block">
        <Label htmlFor="verifyPassword" value="Verificar contraseña" />
        <TextInput
          type="password"
          name="verifyPassword"
          id="verifyPassword"
          onChange={handleChange}
          value={userData.verifyPassword}
          color={errors.verifyPassword ? 'failure' : 'gray'}
          helperText={errors.verifyPassword ? errors.verifyPassword : null}
        />
      </div>

      <Button
        type="submit"
        disabled={Object.values(errors).some((error) => error)}
      >
        Registrar
      </Button>
    </form>
  );
};

export default Registration;
