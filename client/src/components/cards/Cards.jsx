import React from 'react'
import Card from '../card/Card'
import productos from './books.json'

function Cards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 justify-items-center">
      {productos.map((producto) => (
        <div key={producto.id} class="p-4">
          <Card
            id={producto.id}
            imagen={producto.imagen}
            titulo={producto.titulo}
            genero={producto.genero}
            autor={producto.autor}
          />
        </div>
      ))}
    </div>
  )
}

export default Cards
