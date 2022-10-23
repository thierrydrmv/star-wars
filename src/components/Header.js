import { useContext, useEffect, useState } from 'react';
import context from '../context/STARWARSContext';

function Header() {
  const [arrayOptions, setArrayOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [optionFilter, setOptionFilter] = useState('population');
  const [size, setSize] = useState('maior que');
  const [number, setNumber] = useState('0');
  const { setfilterName, setFilterOn, setFormFilter, formFilter } = useContext(context);

  useEffect(() => {
    setOptionFilter(arrayOptions[0]);
  }, [arrayOptions]);

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
    const newFilter = formFilter.filter((inputFilter) => inputFilter !== form);
    setFormFilter(newFilter);
    setFilterOn(false);
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
      </form>
      { formFilter.map((form, i) => (
        <div key={ i }>
          <p>{`${form.option} ${form.size} ${form.number}`}</p>
          <button type="button" onClick={ () => handleDelete(form) }>Delete</button>
        </div>
      ))}
    </header>
  );
}

export default Header;
