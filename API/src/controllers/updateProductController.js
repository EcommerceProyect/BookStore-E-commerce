const { Products, Author, Editorial, ReleasedDate, Genre, ISBN } = require("../db");

const updateProductController = async (id, newData) => {
  try {

    const productExisting = await Products.findByPk(id, {
      include: [
        { model: Author, as: 'Authors' },
        { model: ReleasedDate},
        { model: Editorial},
        { model: Genre, as: 'Genres' },
        { model: ISBN},
      ],
    });

    if (!productExisting) {
      throw new Error("No existe el Producto");
    }

    await productExisting.update(newData);

    if (newData.autor) {
      if (Array.isArray(newData.autor)) {
          const authorInstances = await Promise.all(newData.autor.map(async (name) => {
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
          await productExisting.setAuthors(authorInstances);
        } else {
            const [autorInstance, created] = await Author.findOrCreate({
                where: {
                    name: newData.autor,
                },
                defaults: {
                    name: newData.autor,
                }
            });
            await productExisting.setAuthors([autorInstance]);
        }
    }

    if (newData.genre) {
      if (Array.isArray(newData.genre)) {
        const genreInstances = await Promise.all(newData.genre.map(async (name) => {
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
        
        await productExisting.setGenres(genreInstances);

    } else {
        
        const [genreInstance, created] = await Genre.findOrCreate({
            where: {
                name: newData.genre,
            },
            defaults: {
                name: newData.genre,
            }
        });
        await productExisting.setGenres([genreInstance]);
    }
    }

    if (newData.editorial) {
      const [editorialInstance, created] = await Editorial.findOrCreate({
        where:{
            name:newData.editorial,
        },
        defaults:{
            name:newData.editorial,
        }
    });
    
    await productExisting.setEditorial(editorialInstance);
    
    }

      const existingISBN = await ISBN.findOne({
        where: {
            name: newData.ISBNname
        },
      });

      if(existingISBN){ 
        await existingISBN.update({name:newData.ISBNname,stock:newData.stock});
        await productExisting.setISBN(existingISBN);
      }else{
        const [ISBNinstance, createdISBN] = await ISBN.findOrCreate({
          where: {
              name: newData.ISBNname
          },
          defaults: {
              name: newData.ISBNname,
              stock:newData.stock,
          }
      });
      await productExisting.setISBN(ISBNinstance);
      }



    if (newData.releaseDate) {
      const [releaseDateInst,created] = await ReleasedDate.findOrCreate({
        where:{
            date:newData.releaseDate,
        },
        defaults:{
            date:newData.releaseDate,
        },
    })

    await productExisting.setReleasedDate(releaseDateInst);

    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
    updateProductController
}