

const ModalOrdersDetailUser = ({ order, onClose }) => {

    return (
        <div className="fixed inset-0 overflow-y-auto flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
            <div className="p-4 text-center">
              <button
                type="button"
                className="absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">Detalles del pedido</h5>
                {order && order.productsDetails ?
                order.productsDetails.map((product) =>
                  <fieldset className="border-2 rounded p-6">
                    <legend>ISBN : {product.product.ISBN.name}</legend>
                    <ul>
                        <li>ID : {product.product.id}</li>
                        <li>Name : {product.product.title}</li>
                        <li>Quantity : {product.quantity}</li>
                    </ul>
                  </fieldset>
                  ) : <span>Este usuario no tiene ordenes</span>
                }
            </div>
          </div>
        </div>
      );
}


export default ModalOrdersDetailUser;