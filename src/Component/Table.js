import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);
  const [search, setSearch] = useState([]);

  const filterName = data.filter((element) => element.name.includes(search));

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  return (
    <div>
      <input
        type="text"
        data-testid="name-filter"
        placeholder="Filtrar"
        onChange={ handleChange }
      />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotations Period</th>
            <th>Orbital Period</th>
            <th>diameter</th>
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
          {
            filterName.map((element) => (
              <tr key={ element.name }>
                <td>{element.name}</td>
                <td>{element.rotation_period}</td>
                <td>{element.orbital_period}</td>
                <td>{element.diameter}</td>
                <td>{element.climate}</td>
                <td>{element.gravity}</td>
                <td>{element.terrain}</td>
                <td>{element.surface_water}</td>
                <td>{element.population}</td>
                <td>
                  <ul>
                    {element.films.map((el, index) => <li key={ index }>{el}</li>)}
                  </ul>

                </td>
                <td>{element.created}</td>
                <td>{element.edited}</td>
                <td>{element.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
