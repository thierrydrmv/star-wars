import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';
import RenderWithProvider from './RenderWithProvider'


describe('testes aplicação starWars', () => {

  beforeEach(async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(testData),
    }))

    await act(async() => {
    RenderWithProvider(<App />)
    })

  });
  test('testando filtro maior que e igual a', () => {
    const tatooine = screen.getByRole('cell', {  name: /tatooine/i});
    const hoth = screen.getByRole('cell', {  name: /hoth/i});
    const endor = screen.getByRole('cell', {  name: /endor/i});

    const bntFilter = screen.getByRole('button', {  name: /filtrar/i});
    const bntCleanFilter = screen.getByRole('button', {  name: /remover filtros/i})
    const inputValue = screen.getByRole('spinbutton');
    const selectComparison = screen.getByTestId('comparison-filter');

    expect(selectComparison).toHaveLength(3);

    expect(tatooine).toBeInTheDocument();
    userEvent.click(bntFilter)

    expect(hoth).not.toBeInTheDocument();

    userEvent.type(inputValue, '350')
    userEvent.click(bntFilter)

    expect(tatooine).not.toBeInTheDocument();

    const btnDelete = screen.getAllByRole('button', {  name: /delete/i})

    expect(btnDelete).toHaveLength(2);

    userEvent.selectOptions(selectComparison, ['igual a'])
    userEvent.click(bntFilter)


    expect(endor).not.toBeInTheDocument();

    userEvent.click(bntCleanFilter)

  });
  it('testando filtro menor que e o filtro que seleciona a coluna', () => {
    const selectComparison = screen.getByTestId('comparison-filter');
    const selectType = screen.getByTestId('column-filter');
    const inputValue = screen.getByRole('spinbutton');
    const inputName = screen.getByRole('textbox', {  name: /name:/i});
    const alderaan = screen.getByRole('cell', {  name: /alderaan/i});
    const bntFilter = screen.getByRole('button', {  name: /filtrar/i});
    const bespin = screen.getByRole('cell', {  name: /bespin/i});

    userEvent.selectOptions(selectComparison, ['menor que'])
    userEvent.type(inputValue, '2000000000')
    userEvent.click(bntFilter)

    expect(alderaan).not.toBeInTheDocument();

    userEvent.type(inputName, 'T')

    expect(bespin).not.toBeInTheDocument();

    userEvent.selectOptions(selectComparison, ['maior que'])
    userEvent.selectOptions(selectType, ['diameter'])
    userEvent.click(bntFilter)
  })

  it('testando botão ordenar', () => {
    const ordemAsc = screen.getByTestId('column-sort-input-asc')
    const ordemDesc = screen.getByTestId('column-sort-input-desc')
    const ordenar = screen.getByRole('button', {  name: /ordenar/i})
    const columnFilter = screen.getByTestId('column-sort')

    const allPlanets = screen.getAllByTestId('planet-name')

    expect(allPlanets[0].innerHTML).toBe('Tatooine');

    expect(ordenar).toBeInTheDocument();

    userEvent.click(ordemAsc);
    expect(ordemAsc).toBeChecked();
    userEvent.click(ordenar);
    userEvent.click(ordemDesc);
    userEvent.selectOptions(columnFilter, ['diameter'])

    userEvent.click(ordenar);

  })
  it('testa botão delete', () => {
    const bntFilter = screen.getByRole('button', {  name: /filtrar/i});

    userEvent.click(bntFilter);
    const deleteFilter = screen.getByTestId('filter');


    expect(deleteFilter).toBeInTheDocument();

    userEvent.click(deleteFilter.firstChild)

    expect(deleteFilter).not.toBeInTheDocument();

  })
})


