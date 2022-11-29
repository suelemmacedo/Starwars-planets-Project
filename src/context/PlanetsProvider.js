import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import apiPlanets from '../services/api';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [columnFilter, setColumnFilter] = useState(['population',
    'orbital_period', 'rotation_period', 'surface_water', 'diameter']);
  const [filters, setFilters] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    apiPlanets().then((result) => setData(result));
  }, []);

  const values = useMemo(() => ({
    data,
    searchName,
    setSearchName,
    filters,
    setFilters,
    selectedFilters,
    setSelectedFilters,
    columnFilter,
    setColumnFilter,
  }), [data, searchName, setSearchName, filters, setFilters, selectedFilters,
    setSelectedFilters, columnFilter, setColumnFilter]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}
PlanetsProvider.propTypes = {}.isRequired;
