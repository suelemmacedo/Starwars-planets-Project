import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Table() {
  const { data, searchName, selectedFilters } = useContext(PlanetsContext);

  const filtersConditions = () => {
    const filterName = data.filter((element) => element
      .name.toLowerCase().includes(searchName.toLowerCase()));

    const filterByNameAndNumeric = filterName.filter((element) => {
      const result = selectedFilters.map(({ column, comparison, value }) => {
        switch (comparison) {
        case 'menor que':
          return +element[column] < +value;
        case 'maior que':
          return +element[column] > +value;
        case 'igual a':
          return +element[column] === +value;
        default:
          return true;
        }
      });
      return result.every((el) => el);
    });
    return filterByNameAndNumeric;
  };

  return (

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotations Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
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
          filtersConditions()
            .map((element) => (
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
  );
}
export default Table;
