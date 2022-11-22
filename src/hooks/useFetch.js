import { useEffect, useState } from 'react';

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function filterResponseKeys(response) {
    const filteredResponse = response.map((planet) => {
      delete planet.residents;
      return planet;
    });

    setData(filteredResponse);
  }

  useEffect(() => {
    const fetchPlanets = () => {
      fetch(url)
        .then((request) => request.json())
        .then((response) => filterResponseKeys(response.results))
        .catch((e) => setError(e))
        .finally(setLoading(false));
    };
    fetchPlanets();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
