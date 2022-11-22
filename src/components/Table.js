import React from 'react';
import useFetch from '../hooks/useFetch';

function Table() {
  const { data, error } = useFetch('https://swapi.dev/api/planets');

  if (error) { <h1>Algo deu errado!</h1>; }

  return (
    <div>
      {!data.length > 0
        ? <h1>Carregando...</h1>
        : (
          <table>
            <thead>
              <tr>
                {Object.keys(data[0]).map((column, index) => (
                  <th key={ index }>{column.replace('_', ' ')}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((planet, index) => (
                <tr key={ index }>
                  {Object.keys(data[0]).map((column, idx) => (
                    <td key={ idx }>{planet[column]}</td>
                  ))}
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
