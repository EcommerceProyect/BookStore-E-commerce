import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/services/getAllProducts';
import Card from '../card/Card';

function Cards() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(0);

  
  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 justify-items-center">
      {list.map((product) => (
        <div key={product.id} class="p-4">
          <Card
            id={product.id}
            image={product.image || 'Imagen no disponible'}
            title={product.title || 'Título no disponible'}
            Genres={product.Genres || 'Género no disponible'}
            Authors={product.Authors || 'Autor no disponible'}
            price={product.price || 'Precio no disponible'}
          />
        </div>
      ))}
    </div>
  )
}
export default Cards
