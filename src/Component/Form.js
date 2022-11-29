import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Form() {
  const { setSearchName, filters,
    setFilters, selectedFilters, setSelectedFilters,
    columnFilter, setColumnFilter } = useContext(PlanetsContext);

  const handleChangeName = ({ target }) => {
    setSearchName(target.value);
  };

  const handleChange2 = ({ target }) => {
    setFilters({
      ...filters,
      [target.name]: target.value,
    });
  };

  const handleClick = () => {
    setColumnFilter(columnFilter.filter((el) => el !== filters.column));
    setSelectedFilters([...selectedFilters, {
      column: filters.column,
      comparison: filters.comparison,
      value: filters.value,
    }]);
    setFilters({ ...filters, column: columnFilter[0] });
  };
  const handleClick2 = (e) => {
    setSelectedFilters(selectedFilters.filter((el) => el.column !== e.target.value));
  };

  // Requisito concluído com a ajuda de Ivan

  const deletefilters = () => {
    setSelectedFilters([]);
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
        name="column"
        data-testid="column-filter"
        onChange={ handleChange2 }
      >
        {columnFilter.map((column, i) => (
          <option
            key={ i }
          >
            {column}
          </option>
        ))}
      </select>
      <select
        id="comparison-filter"
        name="comparison"
        data-testid="comparison-filter"
        onChange={ handleChange2 }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
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
        onClick={ handleClick }
      >
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deletefilters }
      >
        Remover todos os filtros
      </button>
      {
        selectedFilters.map((filter, index) => (
          <div
            key={ index }
            className="selectedFilters"
            data-testid="filter"
          >
            <button
              type="button"
              value={ filter.column }
              onClick={ handleClick2 }
            >
              𝙭
            </button>
            <span>
              {filter.column}
              {filter.comparison}
              {filter.value}
            </span>
          </div>

        ))
      }
    </form>
  );
}
