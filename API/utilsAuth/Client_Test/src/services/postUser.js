
const URL = "http://localhost:5432/user";

const Init = {
    method:"POST",
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:5173', // Ajusta esto según tus necesidades
        // Otros headers si son necesarios
      }
}

export const createUser = async (userData) =>{

    try {
        
        const response = await fetch(URL,{
            ...Init,
            body:JSON.stringify(userData),
        })

        if(response.ok){
                
            alert("Usuario subido correctamente");

        }

        console.log(response);

    } catch (error) {
        throw new Error(error.message);
    }

}