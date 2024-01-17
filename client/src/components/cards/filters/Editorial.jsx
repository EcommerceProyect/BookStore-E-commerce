import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedEditorial } from '../../../redux/slices/editorial';
import { fetchEditorial } from '../../../redux/services/getEditorial';

function EditorialFilter({ currentPage, setCurrentPage }) {
  const editorial = useSelector((state) => state.editorial.allEditorial || []);
  const selectedEditorial = useSelector(
    (state) => state.editorial.selectedEditorial || [],
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEditorial());
  }, [dispatch]);

  const [filterValue, setFilterValue] = useState('');

  const handleEditorialChange = (event, editorial) => {
    if (!selectedEditorial || !selectedEditorial.includes(editorial)) {
      dispatch(setSelectedEditorial([...(selectedEditorial || []), editorial]));
    } else {
      dispatch(
        setSelectedEditorial(
          selectedEditorial.filter((ed) => ed !== editorial),
        ),
      );
    }

    setCurrentPage(0);
  };

  const filteredEditorials = editorial.filter((editorial) =>
    editorial.name.toLowerCase().includes(filterValue.toLowerCase()),
  );

  return (
    <div className="flex dark:text-textLight">
      <div className="w-60 pt-5 pl-5">
        <h2>Editorial</h2>
        <input
          type="text"
          placeholder="Filtrar editoriales"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="dark:bg-gray-900/20 dark:border-none border border-gray-300 p-1 rounded mt-2 mb-2"
        />
        <div className="grid w-auto max-h-52 overflow-y-auto overflow-x-hidden">
          <span className="dark:border-gray-900/20 border-b-2 mb-3"></span>
          {filteredEditorials.map((editorial) => (
            <div key={editorial.id} className="flex items-center mb-4 pr-8">
              <input
                checked={selectedEditorial.includes(editorial.name)}
                onChange={(event) =>
                  handleEditorialChange(event, editorial.name)
                }
                type="checkbox"
                value={editorial.name}
                className="w-4 h-4 dark:border-gray-900/20 bg-gray-100 border-none rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 appearance-none checked:bg-primary checked:border-primary"
              />
              <label
                htmlFor={`editorial-${editorial.name}`}
                className="dark:text-textLight ms-2 text-sm font-medium text-black "
                style={{ wordWrap: 'break-word', width: '120px' }}
              >
                {editorial.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EditorialFilter;
