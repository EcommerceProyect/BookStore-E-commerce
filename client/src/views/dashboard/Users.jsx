import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../redux/services/getUsers';
import { deleteUser } from '../../redux/services/deleteUser';
import Dashboard from './Dashboard';
import { MdBlock } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [hoverIndex, setHoverIndex] = useState(null);

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId)); 
  };

  return (
    <div className='flex'>
      <Dashboard />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="w-usersWidthm p-4 bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Usuarios Registrados</h3>
          </div>
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user, index) => (
                <li key={index} className="py-3 sm:py-4"   onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src={user.profilePicture} alt={`Profile ${user.name}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {user.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {user.role}
                    </div>
                    <div key={index}  onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}>
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users;
