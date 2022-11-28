import React from 'react';
import './App.css';
import Table from './components/Table';
import Filter from './components/Filter';
import DataProvider from './context/DataProvider';
import NameProvider from './context/FilterProvider';

function App() {
  return (
    <DataProvider>
      <NameProvider>
        <Filter />
        <Table />
      </NameProvider>
    </DataProvider>
  );
}

export default App;
