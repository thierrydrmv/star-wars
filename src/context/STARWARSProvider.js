import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import STARWARSContext from './STARWARSContext';

function STARWARSProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const starWarsApi = async () => {
      const promise = await fetch('https://swapi.dev/api/planets');
      const data = await promise.json();
      const dataFiltered = data.results.map((planet) => {
        delete planet.residents;

        return planet;
      });
      setPlanets(dataFiltered);
    };

    starWarsApi();
  }, [planets]);

  const contextValue = useMemo(() => ({ planets, setPlanets }), [planets]);

  return (
    <STARWARSContext.Provider value={ contextValue }>
      {children}
    </STARWARSContext.Provider>
  );
}

STARWARSProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default STARWARSProvider;
