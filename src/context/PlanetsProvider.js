import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import apiPlanets from '../services/api';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filters, setFilters] = useState({
    dropdown: '',
    operador: '',
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
  }), [data, searchName, filters]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
