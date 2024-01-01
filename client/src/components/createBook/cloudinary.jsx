import { useState } from "react";
import axios from "axios";

const Cloudinary = ({fileImage, updateFileImage})=>{
    const deleteImage = ()=>{
      setUrl_imagen("");  
    };

    return(
        <div>
            <h1>Seleccionar imagen para subir a la nube</h1>
            <div>
                <input type="file" accept="image/*" onChange={(event)=>{updateFileImage(event.target.files[0])}}/>
 
                {fileImage && (
                    <div>
                        <img src={fileImage}/>
                        <button onClick={()=> deleteImage()}>Eliminar imagen</button>
                    </div>
                )}
            </div>
       </div> 
    )
}
export default Cloudinary;