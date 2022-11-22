import PropTypes from 'prop-types';
import { useState, createContext } from 'react';

export const NameContext = createContext();

function NameProvider({ children }) {
  const [filteredName, setFilteredName] = useState('');

  function filterSearch(data) {
    const filteredData = data.filter((el) => (
      el.name.includes(filteredName)
    ));
    return filteredData;
  }

  const values = {
    filteredName,
    setFilteredName,
    filterSearch,
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
