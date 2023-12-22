const axios = require("axios").default;

const options = {
    method: 'POST',
    url: 'https://dev-sxyz47kmh4sumndv.us.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    data: {
      client_id: 'mtKOtGNzYPygdo1yNGhlKNVYoYc4WHwR',
      client_secret: 'nfMArgIzl4XBSKyAXWiNdn6tzL5PXfZv23LMgAhv3BmO62Fbrh5XsQ-4egUNY4p5',
      audience: 'https://e-booksProyect',
      grant_type: 'client_credentials'
    }
  };
const requestAuth = async () =>{
    try {
        const respose = await axios.request(options);
    
        console.log(respose.data);
        return respose.data.access_token;
    
    } catch (error) {
        console.log(error.message)
    }
}



const generateToken = async () =>{

    try {
        const token = await requestAuth();

        const options2 = { 
            method: "GET",
            url: "http://localhost:5432/protected/login",
            headers: { "authorization": `Bearer ${token}` },
          };
          
          axios(options2)
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.log(error);
            })
        
    } catch (error) {
        console.log(error.message)
    }

}

generateToken();




