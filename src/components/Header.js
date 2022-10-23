import { useContext, useState } from 'react';
import context from '../context/STARWARSContext';

function Header() {
  const [optionFilter, setOptionFilter] = useState('population');
  const [size, setSize] = useState('maior que');
  const [number, setNumber] = useState('0');

  const { setfilterName, setFilterOn, setFormFilter, formFilter } = useContext(context);

  const sendData = () => {
    const filter = {
      option: optionFilter,
      size,
      number,
    };
    setFormFilter([...formFilter, filter]);
    setFilterOn(true);
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
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ () => sendData() }
        >
          Filtrar

        </button>
      </form>
    </header>
  );
}

export default Header;
