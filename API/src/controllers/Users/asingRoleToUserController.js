require("dotenv").config();
const { Users } = require("../../db");
const {API_DOMAIN,ADMIN_ROL} = process.env;


const asingRoleToUserController = async (id, token) => {
    try {
        const userUpdated = await Users.findByPk(id);
        console.log(userUpdated.dataValues.role);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        //change between admin and user rol


        // Use 'node-fetch' to perform the fetch in a Node.js environment
        if(userUpdated.dataValues.role == "user" ){
            
            let raw = JSON.stringify({
                "roles": [
                    `${ADMIN_ROL}`
                ]
            });
    
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`https://${API_DOMAIN}/api/v2/users/${id}/roles`, requestOptions);

            if (!response.ok) {
                throw new Error("Update rol Error");
            }

            userUpdated.update({role:"admin"})

            return userUpdated;

        }else{

            let raw = JSON.stringify({
                "roles": [
                    `${ADMIN_ROL}`
                ]
            });
    
            let requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            const response = await fetch(`https://${API_DOMAIN}/api/v2/users/${id}/roles`, requestOptions);

            if (!response.ok) {
                throw new Error("Update rol Error");
            }

            userUpdated.update({role:"user"})

            return userUpdated;
            
        }
    
    } catch (error) {
      return error;
    }
}

module.exports= {
    asingRoleToUserController
}