import React, { useContext } from 'react';
import { NameContext } from '../context/NameProvider';
// import useFetch from '../hooks/useFetch';

function NameFilter() {
  const { setFilteredName } = useContext(NameContext);

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Buscar"
        onChange={ (e) => setFilteredName(e.target.value) }
      />
    </div>
  );
}

export default NameFilter;
