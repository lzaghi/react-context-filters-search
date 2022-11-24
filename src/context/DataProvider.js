import PropTypes from 'prop-types';
import React, { createContext, useMemo } from 'react';
import useFetch from '../hooks/useFetch';

export const DataContext = createContext();

function DataProvider({ children }) {
  const { data, error } = useFetch('https://swapi.dev/api/planets');

  const values = useMemo(() => ({
    data,
    error,
  }), [data, error]);

  return (
    <DataContext.Provider value={ values }>
      { children }
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
