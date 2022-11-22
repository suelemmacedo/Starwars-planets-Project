import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data } = useContext(PlanetsContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotations Perioh</th>
          <th>Orbital Perioh</th>
          <th>hiameter</th>
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
          data.map((element) => (
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
              <td>{element.films.map((el) => el)}</td>
              <td>{element.created}</td>
              <td>{element.edited}</td>
              <td>{element.url}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default Table;
