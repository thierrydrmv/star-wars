import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import STARWARSContext from './STARWARSContext';

function STARWARSProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setfilterName] = useState('');
  const [copyPlanets, setCopyPlanets] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [formFilter, setFormFilter] = useState([]);

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
    if (filterName) {
      setCopyPlanets(planets);
      const filteredPlanetsName = planets.filter(({ name }) => name.includes(filterName));
      setCopyPlanets(filteredPlanetsName);
    }
  }, [filterName, planets]);

  useEffect(() => {
    const filterActive = (array) => {
      let filteredPlanets = [];
      const resultFilter = formFilter.map(({ size, number, option }) => {
        if (size === 'maior que') {
          filteredPlanets = array.filter((planet) => parseInt(planet[option], 10)
          > parseInt(number, 10));
        } else if (size === 'menor que') {
          filteredPlanets = array.filter((planet) => parseInt(planet[option], 10)
          < parseInt(number, 10));
        } else if (size === 'igual a') {
          filteredPlanets = array.filter((planet) => parseInt(planet[option], 10)
          === parseInt(number, 10));
        }
        return filteredPlanets;
      });
      setCopyPlanets(resultFilter[resultFilter.length - 1]);
    };
    if (filterOn) filterActive(copyPlanets);
  }, [filterOn, planets, formFilter]);

  const contextValue = useMemo(() => (
    {
      planets,
      setPlanets,
      filterName,
      setfilterName,
      copyPlanets,
      filterOn,
      setFilterOn,
      formFilter,
      setFormFilter,
    }
  ), [planets, filterName, copyPlanets, filterOn, formFilter]);

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
