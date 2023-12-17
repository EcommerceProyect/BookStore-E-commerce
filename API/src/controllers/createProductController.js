/* eslint-disable no-unused-vars */
const { Products,ReleasedDate,Author,Editorial,Genre,ISBN } = require("../db");

const createProductController = async (data) => {

    const {title, synopsis, price, image, releaseDate, autor, editorial, genre, ISBNname} = data;

    try {

        if(ISBNname){

            const [ ISBNinstance, created] = await ISBN.findOrCreate({
                where:{
                    name:ISBNname
                },
                defaults:{
                    name:ISBNname
                }
            });
            if(!created) return new Error("Ya se encuentra una ISBN igual en la db");
            await productInstance.setISBN(ISBNinstance);
            
            
        }

        const [productInstance, created] = await Products.findOrCreate({

            where:{
                title,
            },
            defaults:{
                title,
                synopsis,
                price,
                image
            }

        })

        if(created){

            if(releaseDate){
                const [releaseDateInst,created] = await ReleasedDate.findOrCreate({
                    where:{
                        date:releaseDate,
                    },
                    defaults:{
                        date:releaseDate,
                    },
                })

                await productInstance.setReleasedDate(releaseDateInst);

            }

            //si manda un arreglo lo mapea si no lo agrega de una
            if (autor) {
                if (Array.isArray(autor)) {
                    const authorInstances = await Promise.all(autor.map(async (name) => {
                        const [authorInstance, created] = await Author.findOrCreate({
                            where: {
                                name,
                            },
                            defaults: {
                                name,
                            }
                        });
                        return authorInstance;
                    }));
                    await productInstance.setAuthors(authorInstances);
                } else {
                    const [autorInstance, created] = await Author.findOrCreate({
                        where: {
                            name: autor,
                        },
                        defaults: {
                            name: autor,
                        }
                    });
                    await productInstance.setAuthors([autorInstance]);
                }
            }
            

            if(editorial){

                const [editorialInstance, created] = await Editorial.findOrCreate({
                    where:{
                        name:editorial,
                    },
                    defaults:{
                        name:editorial,
                    }
                });
                
                await productInstance.setEditorial(editorialInstance);
                
            }

            if (genre) {
                if (Array.isArray(genre)) {
                    const genreInstances = await Promise.all(genre.map(async (name) => {
                        const [genreInstance, created] = await Genre.findOrCreate({
                            where: {
                                name,
                            },
                            defaults: {
                                name,
                            }
                        });
                        return genreInstance;
                    }));
                    console.log(genreInstances);
                    await productInstance.setGenres(genreInstances);

                } else {
                    
                    const [genreInstance, created] = await Genre.findOrCreate({
                        where: {
                            name: genre,
                        },
                        defaults: {
                            name: genre,
                        }
                    });
                    await productInstance.setGenres(genreInstance);
                }
            }
            

 

            const updatedProductInstance = await productInstance.reload();
            
            return updatedProductInstance.get();
        }
        

    } catch (error) {
        throw new Error(error.message);
    }

}

module.exports = {
    createProductController,
}