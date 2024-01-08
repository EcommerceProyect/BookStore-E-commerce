import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/services/getUsers';
import { deleteUser } from '../../redux/services/deleteUser';
import Dashboard from './Dashboard';
import { MdBlock, MdPersonOutline } from 'react-icons/md';
import { FaCheck, FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import ConfirmModal from './confirmModal/confirmModal';
import ModalDetailUser from './modalDetailUser/modalDetailUser';
import { BsCalendarDate } from "react-icons/bs";


function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [selectedUser, setSelectedUser] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showUserModel, setShowUserModal] = useState(false);
 

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setShowModal(true);
  };

  const handleUserDetail = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    console.log(user);
  };

  const handleConfirmDelete = () => {
    if (deleteUserId) {
      dispatch(deleteUser(deleteUserId));
      console.log('Usuario borrado'); //simula el usuario borrado
      console.log('id del usuario a borrar: ', deleteUserId);
      setShowModal(false);
      setDeleteUserId(null);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  const handleCloseDetail = () =>{
    setShowUserModal(false)
  }

  const [sortBy, setSortBy] = useState(null);


  const handleSortByDate = () => {
    if (sortBy === 'asc') {

      setSortBy('desc');
    } else {

      setSortBy('asc');
    }
  };

  const handleSortByName = () => {
    if (sortBy === 'nameAsc') {
      setSortBy('nameDesc');
    } else {
      setSortBy('nameAsc');
    }
  };



  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'desc') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    else if (sortBy === 'nameAsc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'nameDesc') {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });

  const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };
  

  return (
    <div className="flex">
      <Dashboard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="w-usersWidthm bg-white rounded-lg border shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-8 flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
              Usuarios Registrados
            </h3>
        
          </div>
          <div className='flex justify-between pb-4'>
          <button
            onClick={handleSortByName}
            className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative left-20"
          >
            {sortBy === 'nameAsc' ? (
              <FaSortAlphaUp className="inline-block text-xl" />
            ) : (
              <FaSortAlphaDown className="inline-block text-xl" />
            )}
            <span className="pl-2">Nombre</span>
          </button>
            <button
            onClick={handleSortByDate}
            className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative -left-16"
          >
            {sortBy === 'asc' ? (
              <BsCalendarDate  className="inline-block text-xl" />
            ) : (
              <BsCalendarDate  className="inline-block text-xl" />
            )}
           <span className="pl-2">Fecha de registro</span>
          </button>

          <div
            className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative -left-5"
          >
          Estado
          </div>
          </div>
        <hr className="w-full border-gray-300 dark:border-gray-700 mb-8" />



        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {sortedUsers.map((user, index) => (
              <li
                key={index}
                className="py-3 sm:py-4 p-8 flex items-center space-x-4"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
               
                style={{
                  backgroundColor: hoverIndex === index ? 'rgba(0, 0, 0, 0.05)' : 'transparent',
                }}
              >
                <div className="flex-shrink-0">
                  {user.profilePicture ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profilePicture}
                      alt={`Profile ${user.name}`}
                    />
                  ) : (
                    <MdPersonOutline className="w-8 h-8 rounded-full text-gray-500" />
                  )}
                </div>
                <div  onClick={() => handleUserDetail(user)} className=" cursor-pointer flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
                <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(user.createdAt)}
                </div>
                <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {user.role}
                </div>
                <div
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {hoverIndex === index ? (
                    <MdBlock
                      className="text-red-600 hover:text-red-700 cursor-pointer transition-colors"
                      size={25}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  ) : (
                    <FaCheck
                      className="text-green-500 hover:text-red-700 cursor-pointer transition-colors"
                      size={25}
                      onClick={() => handleDeleteUser(user.id)}
                    />
                  )}
                </div>
              </li>
            ))}
            <ConfirmModal isOpen={showModal} onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />
          </ul>
          <ModalDetailUser isOpen={showUserModel} onCancel={handleCloseDetail}   user={selectedUser} />
        </div>
      </div>
    </div>
  </div>
);
                  }
                  
export default Users;
