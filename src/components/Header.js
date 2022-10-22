import { useContext } from 'react';
import context from '../context/STARWARSContext';

function Header() {
  const { setfilterName } = useContext(context);
  return (
    <header>
      <h1>Planets</h1>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ ({ target }) => { setfilterName(target.value); } }
      />
    </header>
  );
}

export default Header;
