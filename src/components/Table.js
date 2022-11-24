import React, { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { NameContext } from '../context/FilterProvider';

function Table() {
  const { data, error } = useContext(DataContext);
  const { filteredName, filters } = useContext(NameContext);

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
    case 'maior que':
      filterByNumbers = list.filter((el) => +el[column] > +number);
      break;
    case 'menor que':
      filterByNumbers = list.filter((el) => +el[column] < +number);
      break;
    case 'igual a':
      filterByNumbers = list.filter((el) => +el[column] === +number);
      break;
    default:
      filterByNumbers = list;
      break;
    }
    console.log('att', filterByNumbers);
    return filterByNumbers;
  }

  function filteredData() {
    const searchFiltered = searchFilter(data);

    if (filters.length === 0) return searchFiltered;

    let comparisonFiltered = searchFiltered;
    filters.map((filter) => {
      const filtered = comparisonFilter(comparisonFiltered, filter);
      comparisonFiltered = filtered;
      return comparisonFiltered;
    });

    return comparisonFiltered;
  }

  if (error) { <h1>Algo deu errado!</h1>; }

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
                  <td>{planet.name}</td>
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
