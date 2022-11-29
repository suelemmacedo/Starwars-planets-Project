import React from 'react';
import { screen, render } from '@testing-library/react';
import App from '../App';
import mockData from '../tests/helpers/mockData';
import userEvent from '@testing-library/user-event';
import PlanetsProvider from '../context/PlanetsProvider';


describe('Verificando o App.js', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData)
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  })

  test('1. Verificando há um input de filtro por nome, um select de comparação, uma entrada para valor, um botão para filtrar e outro botão pra remover todos os filtros', async () => {

    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const inputFilterName = screen.getByTestId('name-filter');
    expect(inputFilterName).toBeInTheDocument();

    const selectComparison = screen.getByTestId('comparison-filter');
    expect(selectComparison).toBeInTheDocument();

    const inputValue = screen.getByTestId('value-filter');
    expect(inputValue).toBeInTheDocument();

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    expect(btnFilter).toBeInTheDocument();

    const removeAllFilters = screen.getByRole('button', { name: /remover todos os filtros/i });
    expect(removeAllFilters).toBeInTheDocument();

  })


  test('2. Verificando algumas colunas da tabela', () => {
    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const name = screen.getByText(/name/i);
    expect(name).toBeInTheDocument();

    const rotationPeriod = screen.getByText(/rotations period/i);
    expect(rotationPeriod).toBeInTheDocument();

    const orbitalPeriod = screen.getByText(/orbital period/i);
    expect(orbitalPeriod).toBeInTheDocument();

    const climate = screen.getByText(/climate/i);
    expect(climate).toBeInTheDocument();

  })

  test('3. Verificando a função filtrar', async () => {
    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const inputFilterName = screen.getByText(/filtrar/i);
    expect(inputFilterName).toBeInTheDocument();

    userEvent.type(inputFilterName, 'tatoo');

    const searchName = await screen.findByText(/tatooine/i);
    expect(searchName).toBeInTheDocument();

    const bespin = await screen.findByText(/bespin/i);
    expect(bespin).not.toContain();

  });


  test('4. Verificando a função filtrar por outros filtros', async () => {

    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const filterOne = screen.getByTestId('column-filter');
    const filterTwo = screen.getByTestId('comparison-filter');
    const filterValue = screen.getByTestId('value-filter');
    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    userEvent.selectOptions(filterOne, 'surface_water');
    userEvent.selectOptions(filterTwo, 'maior que');
    userEvent.type(filterValue, '8');
    userEvent.click(btnFilter);


    const hoth = await screen.findByText('Hoth');
    expect(hoth).toBeInTheDocument();

  });

  test('5. Verificando a função excluir todos', async () => {

    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const dropdown1 = screen.getByTestId('column-filter');
    expect(dropdown1).toBeInTheDocument();

    userEvent.selectOptions(dropdown1, 'orbital_period');

    const dropdown2 = screen.getByTestId('comparison-filter');
    expect(dropdown2).toBeInTheDocument();

    userEvent.selectOptions(dropdown2, 'maior que');

    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();

    userEvent.type(value, '350');

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btnFilter);

    userEvent.selectOptions(dropdown1, 'diameter',);
    userEvent.selectOptions(dropdown2, 'menor que');
    userEvent.type(value, '30000');
    userEvent.click(btnFilter);

    const yavinIV = await screen.findByText(/yavin IV/i);
    expect(yavinIV).toBeInTheDocument();

    const btnRemoveAlls = screen.getByRole('button', { name: /remover todos os filtros/i });
    userEvent.click(btnRemoveAlls);

  });

  test('6. Verificando a função excluir filtros pelo botão x', async () => {

    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const dropdown1 = screen.getByTestId('column-filter');
    expect(dropdown1).toBeInTheDocument();

    userEvent.selectOptions(dropdown1, 'orbital_period');

    const dropdown2 = screen.getByTestId('comparison-filter');
    expect(dropdown2).toBeInTheDocument();

    userEvent.selectOptions(dropdown2, 'maior que');

    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();

    userEvent.type(value, '350');

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btnFilter);

    userEvent.selectOptions(dropdown1, 'diameter',);
    userEvent.selectOptions(dropdown2, 'menor que');
    userEvent.type(value, '30000');
    userEvent.click(btnFilter);

    const yavinIV = await screen.findByText(/yavin IV/i);
    expect(yavinIV).toBeInTheDocument();

    userEvent.click(screen.getAllByText('𝙭')[0]);

  });

  test('7. Verificando o dropdown de comparação com o valor igual a', async () => {

    render(
      <PlanetsProvider>
        (<App />);
      </PlanetsProvider>
    );

    const dropdown1 = screen.getByTestId('column-filter');
    expect(dropdown1).toBeInTheDocument();

    userEvent.selectOptions(dropdown1, 'population');

    const dropdown2 = screen.getByTestId('comparison-filter');
    expect(dropdown2).toBeInTheDocument();

    userEvent.selectOptions(dropdown2, 'igual a');

    const value = screen.getByTestId('value-filter');
    expect(value).toBeInTheDocument();

    userEvent.type(value, '200000');

    const btnFilter = screen.getByRole('button', { name: /filtrar/i });
    userEvent.click(btnFilter);

    const tatooine = await screen.findByText(/Tatooine/i);
    expect(tatooine).toBeInTheDocument();

  });

});



