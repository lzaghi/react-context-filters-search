import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import mockAPI from './mock';
import App from '../App';
import userEvent from '@testing-library/user-event';

const mock = () => {
  jest.spyOn(global, 'fetch');
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockAPI),
  }));
};

describe('testa tabela', () => {
  test('testa renderização inicial dos planetas', async () => {
    mock();

    render(<App />);
    const loading = screen.getByText('Carregando...');
    expect(loading).toBeInTheDocument();
  
    await waitFor (() => {
      const noLoading = screen.queryByText('Carregando...');
      expect(noLoading).not.toBeInTheDocument();
    })

    const tabela = screen.getByRole('table');
    expect(tabela).toBeInTheDocument();
  });
});

describe('testa filtros', () => {
  test('testa filtro de comparação', async () => {
    mock();

    render(<App />);

    await waitFor (() => {
      const noLoading = screen.queryByText('Carregando...');
      expect(noLoading).not.toBeInTheDocument();
    })

    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'o')

    const numberInput = screen.getByTestId('value-filter')
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '1000000')

    const filterButton = screen.getByTestId('button-filter');
    expect(filterButton).toBeInTheDocument();
    userEvent.click(filterButton);

    const filterText = screen.getByText(/population maior que 1000000/i)
    expect(filterText).toBeInTheDocument();

    const comparisonInput = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.click(filterButton);

    const filterText2 = screen.getByText(/orbital_period menor que 1000000/i)
    expect(filterText2).toBeInTheDocument();

    userEvent.selectOptions(comparisonInput, 'igual a');

    const columnInput = screen.getByTestId('column-filter');
    userEvent.selectOptions(columnInput, 'surface_water')
    userEvent.clear(numberInput);
    userEvent.type(numberInput, '100')

    userEvent.click(filterButton);

    const filterText3 = screen.getByText(/surface_water igual a 100/i)
    expect(filterText3).toBeInTheDocument();

    const removeFilter = screen.getAllByTestId('button-remove-filter');
    userEvent.click(removeFilter[0]);

    expect(screen.queryByText(/population maior que 1000000/i)).not.toBeInTheDocument();

    const removeAllFilters = screen.getByRole('button', {  name: /remover filtros/i})
    userEvent.click(removeAllFilters);

    expect(filterText2).not.toBeInTheDocument();
    expect(filterText3).not.toBeInTheDocument();
  })

  test('testa filtro de ordenação', async () => {
    mock();

    render(<App />);

    await waitFor (() => {
      const noLoading = screen.queryByText('Carregando...');
      expect(noLoading).not.toBeInTheDocument();
    })

    const columnSelect = screen.getByTestId('column-sort');
    userEvent.selectOptions(columnSelect, 'surface_water')

    const descRadio = screen.getByTestId('column-sort-input-desc');
    userEvent.click(descRadio)
    
    const sortButton = screen.getByTestId('column-sort-button');
    userEvent.click(sortButton);
    
    const ascRadio = screen.getByTestId('column-sort-input-asc');
    userEvent.click(ascRadio);
    userEvent.click(sortButton);
  })
});

describe('testa erro do fetch', () => {
  test('checa mensagem de erro na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch = jest.fn(() => Promise.reject({
      json: () => Promise.reject(mockAPI),
    }));

    render(<App />);

    const loading = screen.queryByText('Carregando...');
    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(screen.getByText('Algo deu errado!')).toBeInTheDocument();
  })
})
