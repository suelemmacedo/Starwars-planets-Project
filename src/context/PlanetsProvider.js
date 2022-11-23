import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import apiPlanets from '../services/api';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    apiPlanets().then((result) => setData(result));
  }, []);

  const values = useMemo(() => ({
    data,
    filters,
    setFilters,
  }), [data, filters, setFilters]);

  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
