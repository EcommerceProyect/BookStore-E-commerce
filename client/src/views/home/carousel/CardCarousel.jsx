const CardCarousel = ({id,
    image,
    title,
    Authors,
    Genres,
    price,
    })=>{
    return(
        <div class="grid grid-cols-2 gap-8 relative w-full h-full bg-white  border border-gray-200 shadow dark:border-gray-700">
       
          <div class="col-span-1 flex p-0">
            <img class="shadow-md" src={image} alt="product image" />
          </div>
  
          <div class="col-span-1 flex flex-col justify-between px-5 pb-5">
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
              {title}
            </h5>
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
              Géneros:
            </h5>
            {/* <ul>
              {Genres.map((genreItem) => (
                <li key={genreItem.id}>{genreItem.name}</li>
              ))}
            </ul> */}
            <h5 class="text-left text-xl font-semibold tracking-tight text-gray-900 dark:text-black">
              Autores:
            </h5>
            {/* <ul>
              {Authors.map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul> */}
            <div class="flex items-center justify-between">
              <span class="text-left text-2xl font-bold text-gray-900 dark:text-black">
                Precio: {price}
              </span>
            
            </div>
          </div>
      </div>
    )
}
export default CardCarousel;