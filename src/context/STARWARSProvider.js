import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import STARWARSContext from './STARWARSContext';

function STARWARSProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setfilterName] = useState('');
  const [copyPlanets, setCopyPlanets] = useState([]);

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
  }, []);

  useEffect(() => {
    setCopyPlanets(planets);
    const filteredPlanets = planets.filter(({ name }) => name.includes(filterName));
    setCopyPlanets(filteredPlanets);
  }, [filterName, planets]);

  const contextValue = useMemo(() => (
    { planets, setPlanets, setfilterName, filterName, copyPlanets }
  ), [planets, filterName, copyPlanets]);

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
