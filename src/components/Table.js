import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { NameContext } from '../context/FilterProvider';

function Table() {
  const { data, error } = useContext(DataContext);
  const { filteredName, filters, sortFilter } = useContext(NameContext);

  function searchFilter(list) {
    const filteredBySearch = list.filter((el) => (
      el.name.toLowerCase().includes(filteredName.toLowerCase())
    ));
    return filteredBySearch;
  }

  function comparisonFilter(list, filter) {
    const { column, comparison, number } = filter;
    let filterByNumbers = [];
    switch (comparison) {
    case 'menor que':
      filterByNumbers = list.filter((el) => +el[column] < +number);
      return filterByNumbers;
    case 'igual a':
      filterByNumbers = list.filter((el) => +el[column] === +number);
      return filterByNumbers;
    default:
      filterByNumbers = list.filter((el) => +el[column] > +number);
    }
    console.log('att', filterByNumbers);
    return filterByNumbers;
  }

  function handleSort(arr) {
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i][sortFilter[0].order.column] === 'unknown') {
        arr.push(arr.splice(arr.indexOf(arr[i]), 1)[0]);
      }
    }

    if (sortFilter[0].order.sort === 'ASC') {
      arr = arr.sort((a, b) => (
        a[sortFilter[0].order.column] - b[sortFilter[0].order.column]));
    } else {
      arr = arr.sort((a, b) => (
        b[sortFilter[0].order.column] - a[sortFilter[0].order.column]));
    }
    return arr;
  }

  function filteredData() {
    let list = data;

    if (sortFilter.length !== 0) list = handleSort(list);

    const searchFiltered = searchFilter(list);

    if (filters.length === 0) return searchFiltered;

    let comparisonFiltered = searchFiltered;
    filters.map((filter) => {
      const filtered = comparisonFilter(comparisonFiltered, filter);
      comparisonFiltered = filtered;
      return comparisonFiltered;
    });

    return comparisonFiltered;
  }

  if (error) return <h1>Algo deu errado!</h1>;

  return (
    <div>
      {!data.length > 0
        ? <h1>Carregando...</h1>
        : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rotation Period</th>
                <th>Orbital Period</th>
                <th>Diameter</th>
                <th>Climate</th>
                <th>Gravity</th>
                <th>Terrain</th>
                <th>Surface Water</th>
                <th>Population</th>
                <th>Films</th>
                <th>Created</th>
                <th>Edited</th>
                <th>URL</th>
              </tr>
            </thead>
            <tbody>
              {filteredData().map((planet, index) => (
                <tr key={ index }>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                  <td>
                    {planet.films.map((e) => <p key={ e }>{e}</p>)}
                  </td>
                  <td>{planet.created}</td>
                  <td>{planet.edited}</td>
                  <td>{planet.url}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      {console.log(data)}
    </div>
  );
}

export default Table;
