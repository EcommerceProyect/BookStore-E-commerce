import { MdPersonOutline } from 'react-icons/md';
import { useDispatch,useSelector } from "react-redux";

import {React,useEffect,useState} from 'react';
import getOrdersByUserId from '../../../redux/services/getOrdersByUserId';

function ModalDetailUser({ isOpen, user, onCancel }) {

  const dispatch = useDispatch();

  const {allOrders,loading,error} = useSelector((state) => state.userOrdersAdmin)

  const [userOrders,setUserOrders] = useState([])

  useEffect(() => {

    if(allOrders && user && user.id){
      
      dispatch(getOrdersByUserId(user.id))
      
    }

    

  },[user])

  useEffect(() => {


    if(loading == false) setUserOrders(allOrders)
    console.log(allOrders, "SOY EL USER ORDERS");

  },[allOrders])

  return (
    isOpen && (
      <div id="deleteModal" className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
        <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
          <div className="p-4 text-center">
            <button type="button" className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={onCancel}>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <h5 class="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Detalles del usuario</h5>
            <div class="flex items-baseline text-gray-900 dark:text-white">
            <div class="flex items-baseline text-gray-900 dark:text-white">
              <div  className="w-24 h-24 rounded-full">{user && user.image ? user.image : <MdPersonOutline  className="w-24 h-24 rounded-full text-gray-500"/>}</div>
              <h2 className="pl-12 self-center">{user && user.name ? user.name : "Nombre no disponible"}</h2>
            </div>
            </div>
            <ul role="list" class="space-y-5 my-7">
            <li class="flex items-center">
            <span className="font-bold">Email:</span>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{user && user.email ? user.email : "Nombre no disponible"}</span>
            </li>
            <li class="flex items-center">
            <span className="font-bold">Número:</span>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{user && user.phone ? user.phone : "Nombre no disponible"}</span>
            </li>
            <li class="flex items-center">
            <span className="font-bold">Compras:</span>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{user && user.carrito ? user.carrito : "Usuario sin compras"}</span>
            </li>
            <li class="flex items-center">
            <span className="font-bold">Calificaicones</span>
            <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{user && user.reviews ? user.reviews : "Usuario sin calificaciones"}</span>
            </li>
              {userOrders.length > 0 ?
              userOrders.map((order,key) =>
              <li key={key} class="flex items-center">
                <span>Product</span>
                {
                  
                  order.productsDetails.map((product) =>
                  <div>
                    <h1>ID:{product.product.id}</h1> 
                    <h1>Name:{product.product.title}</h1> 
                    <h1>Quantity:{product.quantity}</h1> 
                  </div>)
            
                }

                <span>ShippingAddress{order.shippingAddress}</span>
                <span>TotalAmount{order.totalAmount}</span>
              </li>
              )
              : <li>
                  <p>Cargando...</p>
                </li>
                }
            </ul>
          </div>
        </div>
      </div>
    )
  );
}

export default ModalDetailUser;
