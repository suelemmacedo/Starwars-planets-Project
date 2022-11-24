import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Form() {
  const { setSearchName } = useContext(PlanetsContext);
  const { filters, setFilters } = useContext(PlanetsContext);
  const { selectedFilters, setSelectedFilters } = useContext(PlanetsContext);

  const handleChangeName = ({ target }) => {
    setSearchName(target.value);
  };

  const handleChange2 = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <form>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar por nome"
        onChange={ handleChangeName }
      />
      <br />
      <select
        id="columnFilter"
        name="dropdown"
        value={ filters.dropdown }
        data-testid="column-filter"
        onChange={ handleChange2 }
      >
        <option value="population">Population</option>
        <option value="orbital_period">Orbital Period</option>
        <option value="diameter">Diameter</option>
        <option value="rotation_period">Rotation Period</option>
        <option value="surface_water">Surface Water</option>
      </select>
      <select
        value={ filters.operator }
        id="comparison-filter"
        name="operator"
        data-testid="comparison-filter"
        onChange={ handleChange2 }
      >
        <option value="maior que">Maior que</option>
        <option value="menor que">Menor que</option>
        <option value="igual a">Igual a</option>
      </select>
      <input
        type="number"
        name="value"
        value={ filters.value }
        data-testid="value-filter"
        onChange={ handleChange2 }
      />
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          setSelectedFilters((prevFilters) => ([
            ...prevFilters,
            filters,
          ]));
          setFilters({
            dropdown: '',
            operator: '',
            value: 0,
          });
        } }
      >
        Filtrar
      </button>
      {
        selectedFilters.map((filter, index) => (
          <div
            key={ index }
            className="selectedFilters"
          >
            <span>
              {filter.dropdown}
              {filter.operator}
              {filter.value}
            </span>
          </div>

        ))
      }
    </form>
  );
}
