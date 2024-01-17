const CardCarousel = ({ id, image, title, Authors, price, synopsis }) => {
  return (
    <div class="flex flex-col justify-center h-full">
      <div class="h-full relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
        <div class="w-full md:w-1/3 bg-white grid place-items-center content-center">
          <img src={image} alt="imagenCarrusel" />
        </div>
        <div class="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
          <h3 class="font-black text-gray-800 md:text-3xl text-xl">{title}</h3>
          <div class="flex justify-between item-center">
            <ul class="text-gray-500 font-medium hidden md:block">
              {Authors.map((author) => (
                <li key={author.id}>{author.name}</li>
              ))}
            </ul>
          </div>
          <p class="md:text-lg text-gray-500 text-base">{synopsis}</p>
          <p class="text-xl font-black text-gray-800">${price}</p>
        </div>
      </div>
    </div>
  );
};
export default CardCarousel;
