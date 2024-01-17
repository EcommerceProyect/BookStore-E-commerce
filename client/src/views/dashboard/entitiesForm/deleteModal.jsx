import { useState } from 'react';

const DeleteConfirmationModal = ({
  showDeleteModal,
  handleCancelDelete,
  handleConfirmDelete,
  type,
  entity,
}) => {
  if (!showDeleteModal) return null;

  let confirmationText = '';

  switch (type) {
    case 'autor':
      confirmationText = `¿Estás seguro de que deseas eliminar el autor ${entity.name}?`;
      break;
    case 'género':
      confirmationText = `¿Estás seguro de que deseas eliminar el género ${entity.name}?`;
      break;
    case 'editorial':
      confirmationText = `¿Estás seguro de que deseas eliminar la editorial ${entity.name}?`;
      break;
    default:
      confirmationText = `¿Estás seguro de que deseas eliminar el elemento ${entity.name}?`;
  }

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 bg-black opacity-50 z-40"></div>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Eliminar {type}
              </h3>
              <button
                onClick={() => handleCancelDelete()}
                type="button"
                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5">
              <p className=" text-lg text-center text-textDark pb-4">
                {confirmationText}
              </p>
              <button
                onClick={() => handleConfirmDelete(entity.id)}
                type="submit"
                className="w-full text-white bg-accents hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirmationModal;
