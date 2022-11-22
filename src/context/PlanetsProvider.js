import React, { useEffect, useMemo, useState } from 'react';
import PlanetsContext from './PlanetsContext';
import apiPlanets from '../services/api';

export default function PlanetsProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiPlanets().then((result) => setData(result));
  }, []);

  const value = useMemo(() => ({
    data,
  }), [data]);

  return (
    <PlanetsContext.Provider value={ value }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {}.isRequired;
