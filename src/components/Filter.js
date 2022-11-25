import React, { useContext, useEffect, useState, useMemo } from 'react';
import { HiTrash } from 'react-icons/hi';
import { NameContext } from '../context/FilterProvider';

function Filter() {
  // const [inputs, setInputs] = useState({
  //   column: 'population',
  //   comparison: 'maior que',
  //   number: 0,
  // });
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  // const [selectOptions, setSelectOptions] = useState([
  //   'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  // ]);

  const { setFilteredName, filters, setFilters } = useContext(NameContext);

  // function handleChange({ target }) {
  //   setInputs({
  //     ...inputs,
  //     [target.name]: target.value,
  //   });
  // }

  function setFilter() {
    setFilters([
      ...filters,
      {
        column,
        comparison,
        number,
      },
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

  let columnArray = useMemo(() => ([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ]), []);

  function handleSelectColumn() {
    if (filters.length > 0) {
      const filtersColumns = filters.map((filter) => filter.column);
      const newArray = columnArray.filter((col) => !filtersColumns.includes(col));
      columnArray = newArray;

      return columnArray;
    }
    return columnArray;
  }

  useEffect(() => {
    setColumn(columnArray[0]);
  }, [filters, columnArray]);

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
        id="column"
        name="column"
        value={ column }
        onChange={ (e) => setColumn(e.target.value) }
      >
        {
          handleSelectColumn().map((col, idx) => (
            <option key={ idx } value={ col }>{col}</option>
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
        value={ comparison }
        onChange={ (e) => setComparison(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="number"
        value={ number }
        onChange={ (e) => setNumber(e.target.value) }
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
      {console.log(filters.map((filter) => filter.column))}
    </div>
  );
}

export default Filter;
