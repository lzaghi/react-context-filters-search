import React, { useContext, useState } from 'react';
import { NameContext } from '../context/FilterProvider';

function Filter() {
  const [inputs, setInputs] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const { setFilteredName, setFilters } = useContext(NameContext);

  function handleChange({ target }) {
    setInputs({
      ...inputs,
      [target.name]: target.value,
    });
  }

  function handleClick() {
    setFilters(inputs);
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
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
        onClick={ handleClick }
      >
        Filtrar
      </button>
    </div>
  );
}

export default Filter;
