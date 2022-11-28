import React, { useContext, useEffect, useState, useMemo } from 'react';
import { HiTrash } from 'react-icons/hi';
import { NameContext } from '../context/FilterProvider';

function Filter() {
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [number, setNumber] = useState(0);
  const [columnSort, setColumnSort] = useState('population');
  const [typeSort, setTypeSort] = useState('ASC');

  const {
    setFilteredName,
    filters, setFilters, setSortFilter } = useContext(NameContext);

  function setFilter() {
    setFilters([
      ...filters,
      {
        column,
        comparison,
        number,
      },
    ]);
  }

  function setSort() {
    setSortFilter([
      {
        order: {
          column: columnSort,
          sort: typeSort,
        },
      },
    ]);
  }

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

  function removeAllFilters() {
    setFilters([]);
  }

  function removeFilter(filter) {
    const newFilters = filters.filter((object) => object.column !== filter.column);
    setFilters(newFilters);
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

      <select
        data-testid="column-sort"
        name="sort"
        value={ columnSort }
        onChange={ (e) => setColumnSort(e.target.value) }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="asc">
        <input
          data-testid="column-sort-input-asc"
          type="radio"
          name="sort"
          value="ASC"
          id="asc"
          onChange={ (e) => setTypeSort(e.target.value) }
          checked={ typeSort === 'ASC' }
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          data-testid="column-sort-input-desc"
          type="radio"
          name="sort"
          value="DESC"
          id="desc"
          onChange={ (e) => setTypeSort(e.target.value) }
          checked={ typeSort === 'DESC' }
        />
        Descendente
      </label>
      <button
        data-testid="column-sort-button"
        type="button"
        onClick={ setSort }
      >
        Ordenar
      </button>

      {filters.length > 0
        && filters.map((filter, index) => (
          <div key={ index } data-testid="filter">
            <span>
              {`${filter.column} ${filter.comparison} ${filter.number}`}
            </span>
            <button
              type="button"
              onClick={ () => removeFilter(filter) }
              data-testid="button-remove-filter"
            >
              <HiTrash />
            </button>
          </div>
        ))}
      {filters.length > 0
        && (
          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ removeAllFilters }
          >
            Remover filtros
          </button>)}
    </div>
  );
}

export default Filter;
