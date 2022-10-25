import { useContext, useEffect, useState } from 'react';
import context from '../context/STARWARSContext';

function Header() {
  const [arrayOptions, setArrayOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [optionFilter, setOptionFilter] = useState('population');
  const [size, setSize] = useState('maior que');
  const [number, setNumber] = useState('0');
  const [orderArray, setOrderArray] = useState([]);
  const {
    setfilterName, setFilterOn,
    setFormFilter, formFilter,
    setCopyPlanets, planets,
    sort, setSort, column, setColumn,
    setSortOn, copyPlanets, id, setId } = useContext(context);

  useEffect(() => {
    setOptionFilter(arrayOptions[0]);
  }, [arrayOptions]);

  useEffect(() => {
    const orderType = (type) => {
      if (sort === 'ASC') {
        const order = copyPlanets.sort((a, b) => a[type] - b[type]);
        setOrderArray(order);
      } else if (sort === 'DESC') {
        const order = copyPlanets.sort((a, b) => b[type] - a[type]);
        setOrderArray(order);
      }
    };
    orderType(column);
  }, [id, column, copyPlanets, setCopyPlanets, sort]);

  const sendData = (option) => {
    const filter = {
      option: optionFilter,
      size,
      number,
    };
    const newFilter = arrayOptions.filter((e) => e !== option);
    setArrayOptions(newFilter);
    setFormFilter([...formFilter, filter]);
    setFilterOn(true);
  };

  const handleDelete = (form) => {
    const newFilter = formFilter && formFilter
      .filter((inputFilter) => inputFilter !== form);
    setFormFilter(newFilter);
    setArrayOptions([...arrayOptions, form.option]);
    if (formFilter.length === 1) {
      setFilterOn(false);
    }
    setCopyPlanets(planets);
  };

  const handleClear = () => {
    setFormFilter([]);
    setFilterOn(false);
    setArrayOptions(['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  };

  const handleOrder = () => {
    setSortOn(true);
    setId(id + 1);
    const unknownLast = orderArray.filter((e) => e[column] === 'unknown');
    const unknownFree = orderArray.filter((e) => e[column] !== 'unknown');
    console.log([...unknownFree, unknownLast]);
    const newArray = [...unknownFree, ...unknownLast];
    setCopyPlanets(newArray);
  };

  return (
    <header>
      <h1>Planets</h1>
      <form>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            data-testid="name-filter"
            onChange={ ({ target }) => { setfilterName(target.value); } }
          />
        </label>
        <select
          data-testid="column-filter"
          onChange={ ({ target }) => setOptionFilter(target.value) }
        >
          {
            arrayOptions.map((e, i) => (
              <option key={ i } value={ e }>{e}</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target }) => setSize(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          type="number"
          data-testid="value-filter"
          value={ number }
          onChange={ ({ target }) => setNumber(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => sendData(optionFilter) }
        >
          Filtrar
        </button>
        <select
          data-testid="column-sort"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>

        </select>
        <label htmlFor="ASC">
          <input
            data-testid="column-sort-input-asc"
            id="ASC"
            type="radio"
            value="ASC"
            checked={ sort === 'ASC' }
            onChange={ ({ target }) => setSort(target.value) }
          />
          Ascendente
        </label>
        <label htmlFor="DESC">
          <input
            data-testid="column-sort-input-desc"
            id="DESC"
            type="radio"
            value="DESC"
            checked={ sort === 'DESC' }
            onChange={ ({ target }) => setSort(target.value) }
          />
          Descendente
        </label>
        <button
          data-testid="column-sort-button"
          type="button"
          onClick={ () => handleOrder() }
        >
          Ordenar

        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => handleClear() }
        >
          Remover Filtros

        </button>
        { formFilter && formFilter.map((form, i) => (
          <div data-testid="filter" key={ i }>
            <button type="button" onClick={ () => handleDelete(form) }>Delete</button>
            <p>{`${form.option} ${form.size} ${form.number}`}</p>
          </div>
        ))}
      </form>

    </header>
  );
}

export default Header;
