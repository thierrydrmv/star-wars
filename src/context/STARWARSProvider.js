import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import STARWARSContext from './STARWARSContext';

function STARWARSProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterName, setfilterName] = useState('');
  const [copyPlanets, setCopyPlanets] = useState([]);
  const [filterOn, setFilterOn] = useState(false);
  const [formFilter, setFormFilter] = useState([]);
  const [column, setColumn] = useState('population');
  const [sort, setSort] = useState('');
  const [sortOn, setSortOn] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    const starWarsApi = async () => {
      const promise = await fetch('https://swapi.dev/api/planets');
      const data = await promise.json();
      const dataFiltered = data.results.map((planet) => {
        delete planet.residents;

        return planet;
      });
      setPlanets(dataFiltered);
      setCopyPlanets(dataFiltered);
    };
    starWarsApi();
  }, []);

  useEffect(() => {
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
    if (filterOn) {
      filterActive(copyPlanets);
    }
  }, [filterOn, formFilter]);

  const contextValue = useMemo(() => (
    {
      planets,
      setPlanets,
      setCopyPlanets,
      filterName,
      setfilterName,
      copyPlanets,
      filterOn,
      setFilterOn,
      formFilter,
      setFormFilter,
      column,
      setColumn,
      sort,
      sortOn,
      setSort,
      setSortOn,
      id,
      setId,
    }
  ), [planets,
    filterName,
    copyPlanets,
    filterOn,
    formFilter,
    column, sort, sortOn, id]);

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
