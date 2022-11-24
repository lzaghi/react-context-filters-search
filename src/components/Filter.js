import React, { useContext, useState } from 'react';
import { HiTrash } from 'react-icons/hi';
import { NameContext } from '../context/FilterProvider';

function Filter() {
  const [inputs, setInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const { setFilteredName, filters, setFilters } = useContext(NameContext);

  function handleChange({ target }) {
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  }

  function setFilter() {
    setFilters([
      ...filters,
      inputs,
    ]);
    console.log(filters);
  }

  // function removeFilter(filter) {
  //   console.log(filter);
  //   const newFilters = filters.filter((object) => object.column !== filter.column
  //     && object.comparison !== filter.comparison && object.number !== filter.number);
  //   console.log(newFilters);
  //   setFilters(newFilters);
  // }

  function handleSelectColumn() {
    const columnArray = [
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ];
    // if (filters.length > 0) {
    //   const newArray = columnArray.filter((column) => (
    //     filters.map((obj) => obj.column !== column)
    //   ));
    //   return newArray;
    // }
    return columnArray;
  }

  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Buscar nome"
        onChange={ (e) => setFilteredName(e.target.value) }
      />
      <select
        data-testid="column-filter"
        name="column"
        value={ inputs.column }
        onChange={ handleChange }
      >
        {
          handleSelectColumn().map((column) => (
            <option key={ column } value={ column }>{column}</option>
          ))
        }
        {/* <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option> */}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ inputs.comparison }
        onChange={ handleChange }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="number"
        value={ inputs.number }
        onChange={ handleChange }
      />
      <button
        data-testid="button-filter"
        type="button"
        onClick={ setFilter }
      >
        Filtrar
      </button>
      {filters.length > 0
        && filters.map((filter, index) => (
          <div key={ index }>
            <span>{`${filter.column} ${filter.comparison} ${filter.number}`}</span>
            <HiTrash />
          </div>
        ))}
    </div>
  );
}

export default Filter;
