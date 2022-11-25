import PropTypes from 'prop-types';
import { useState, createContext } from 'react';

export const NameContext = createContext();

function NameProvider({ children }) {
  const [filteredName, setFilteredName] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortFilter, setSortFilter] = useState([]);

  const values = {
    filteredName,
    setFilteredName,
    filters,
    setFilters,
    sortFilter,
    setSortFilter,
  };

  return (
    <NameContext.Provider value={ values }>
      { children }
    </NameContext.Provider>
  );
}

NameProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NameProvider;
