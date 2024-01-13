import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/services/getUsers';
import { deleteUser } from '../../redux/services/deleteUser';
import Dashboard from './Dashboard';
import ConfirmModal from './confirmModal/confirmModal';
import ModalDetailUser from './modalDetailUser/modalDetailUser';
import ConfirmModalActive from './confirmModal/ConfirmModalActive';
import RoleModal from './confirmModal/RoleModal';
import { userAdmin } from '../../redux/services/userAdmin';
import { activeUser } from '../../redux/services/activeUser';
import {
  userActiveStart,
  userActiveSuccess,
  userActiveFailure,
} from '../../redux/slices/userData';
import { HiOutlineSortAscending } from "react-icons/hi";
import { HiOutlineSortDescending } from "react-icons/hi";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCheck } from 'react-icons/fa';
import { MdBlock, MdPersonOutline } from 'react-icons/md';


function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalAdmin, setShowModalAdmin] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);
  const [adminUserId, setAdminUserId] = useState(null);
  const [showUserModel, setShowUserModal] = useState(false);
  const isUserActiveStart = useSelector((state) => state.user.userActiveStart);
  const isSuccess = useSelector((state) => state.user.userActiveSuccess);
  const hasUserActiveFailure = useSelector((state) => state.user.userActiveFailure);



  

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [hoverIndex, setHoverIndex] = useState(null);
  const handleDeleteUser = (userId) => {
    setDeleteUserId(userId);
    setShowModal(true);
  };
  const handleActiveUserClick = (userId) => {
    setShowModalB(true);
    setActiveUserId(userId);
  };

const handleModalAdmin = (userId) => {
    setShowModalAdmin(true);
    setAdminUserId(userId);
}


  const handleAdminUser = async (userId) => {
    if (adminUserId){
    await dispatch(userAdmin(userId));
    await dispatch(getUsers());
    setShowModalAdmin(false);
    setAdminUserId(null);
    }
  };

  const handleUserDetail = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    console.log(user);
  };

  const handleConfirmDelete = async () => {
    if (deleteUserId) {
      await dispatch(deleteUser(deleteUserId));
      await dispatch(getUsers());
      setShowModal(false);
      setDeleteUserId(null);
    }
  };
  
  const handleConfirmActiveUser = async () => {
    if (activeUserId) {
      await dispatch(activeUser(activeUserId));
      await dispatch(getUsers());
      setShowModalB(false);
      setActiveUserId(null);
    }
  };
  

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeleteUserId(null);
  };

  const handleCancelAdmin = () => {
    setShowModalAdmin(false);
    setAdminUserId(null);
  };

  const handleCancelActive = () => {
    setShowModalB(false);
    setActiveUserId(null);
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

  
    const sortByRole = () => {
      if (sortBy === "roleAsc") {
        setSortBy('roleDesc');
      } else {
        setSortBy('roleAsc')
      }
    }


    const sortByDeletedAt = () => {
      if (sortBy === "deletedAsc") {
        setSortBy('deletedDesc');
      } else {
        setSortBy('deletedAsc')
      }
    }


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
    } else if (sortBy === 'deletedAsc') {
      return a.deletedAt ? -1 : 1;
    } else if (sortBy === 'deletedDesc'){
      return a.deletedAt ? 1 : -1;
    } else if (sortBy === 'roleAsc') {
      return a.role.localeCompare(b.role);
    } else if (sortBy === 'roleDesc'){
      return b.role.localeCompare(a.role);
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
            className=" -ml-1 text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative left-20"
          >
            {sortBy === 'nameAsc' ? (
              <HiOutlineSortAscending className="inline-block text-xl" />
            ) : (
              <HiOutlineSortDescending className="inline-block text-xl" />
            )}
            <span className="pl-2">Nombre</span>
          </button>
            <button
            onClick={handleSortByDate}
            className="ml-48 text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative -left-16"
          >
            {sortBy === 'asc' ? (
              <HiOutlineSortAscending  className="inline-block text-xl" />
            ) : (
              <HiOutlineSortDescending  className="inline-block text-xl" />
            )}
           <span className="pl-2">Fecha de registro</span>
          </button>
          <button
            onClick={sortByRole}
            className="mr-32 text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative -left-16"
          >
            {sortBy === 'roleAsc' ? (
              <HiOutlineSortAscending title="Hacer Administrador" className="inline-block text-xl" />
            ) : (
              <HiOutlineSortDescending  className="inline-block text-xl" />
            )}
           <span className="pl-2">Rol</span>
          </button>
          <button
      onClick={sortByDeletedAt}
      className="text-sm font-medium text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 relative -left-5"
    >
      {sortBy === 'deletedAsc' ? (
        <HiOutlineSortAscending className="inline-block text-xl" />
      ) : (
        <HiOutlineSortDescending className="inline-block text-xl" />
      )}
      <span className="pl-2">Estado</span>
    </button>
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
                <div  onClick={() => handleUserDetail(user)} className="cursor-pointer flex-1 min-w-0">
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
                <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white flex items-center">
                  {user.role === 'user' ? (
                    <>
                      <span className="pl-2">{user.role}</span>
                      <MdPersonOutline className='w-6 h-auto cursor-pointer ml-auto' onClick={() => handleModalAdmin(user.id)} />
                    </>
                  ) : (
                    <>
                      <span className="pl-2">{user.role}</span>
                      <MdAdminPanelSettings className='w-6 h-auto cursor-pointer ml-auto' onClick={() => handleModalAdmin(user.id)} />
                    </>
                  )}
                </div>
                <div className="flex-1 text-sm font-semibold text-gray-900 dark:text-white">
                  {user.deletedAt ? (
                    <MdBlock className='w-6 h-auto cursor-pointer ml-auto' onClick={() => handleActiveUserClick(user.id)}/>
                  ) : (
                    <>
                      <FaCheck className='w-6 h-auto cursor-pointer ml-auto' onClick={() => handleDeleteUser(user.id)}/>
                    </>
                  )}
                </div>
              </li>
            ))}
            <RoleModal isOpen={showModalAdmin} onCancel={handleCancelAdmin} onConfirm={handleAdminUser}/>
            <ConfirmModalActive isOpen={showModalB} onCancel={handleCancelActive} onConfirm={handleConfirmActiveUser}/>
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
