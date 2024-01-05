import axios from 'axios';

import { DOMAIN, CLIENT_ID } from '../../vars';

async function signUpUser(userData) {
  try {
    const response = await axios.post(
      `https://${DOMAIN}/dbconnections/signup`,
      {
        client_id: CLIENT_ID,
        email: `${userData.email}`,
        password: `${userData.password}`,
        connection: 'Username-Password-Authentication',
        given_name: `${userData.name}`,
        family_name: `${userData.lastname}`,
        name: `${userData.name} ${userData.lastname}`,
        picture:
          'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg',
      },
    );

    console.log('User registration successful:', response.data);
    return response;
  } catch (error) {
    console.error('Error during user registration:', error.response.data);
  }
}

export default signUpUser;
