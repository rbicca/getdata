import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [query, setQuery] = useState('Visual Basic');
  const [{data, isLoading, isError}, doFetch ] = useHackerNewsApi();
  return (
    <div className="App">
      <h1>Getting data</h1>
      <hr/>
      <Fragment>
        <form
          onSubmit = {e => {
            doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
            e.preventDefault();
          }}
        >
          
          <input type="text" value={query} onChange={e => setQuery(e.target.value)}/>
          <button type="submit">Get</button>
        </form>
      </Fragment>
      
      { isError && <div> Something went wrong </div> }
      { isLoading ? (
        <div>Loading...</div>
        ) : (
          <ul>
          {data.hits.map(item => {
            console.log(item);
            return (
            <li key={item.objectID}>
              <a href={item.url}><p>{item.title}</p></a>
            </li>
          )})}
        </ul>
      )
    }
    </div>
  );
}

export default App;

const useHackerNewsApi = () => {

  const [data, setData] = useState({hits: []});
  const [url, setUrl] = useState('https://hn.algolia.com/api/v1/search?query=Visual Basic');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {

    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);
        setData(result.data);
      } catch(error) {
        setIsError(true);
      }
      
      setIsLoading(false);  
    }

    fetchData();
  }, [url]);

  return [{ data, isLoading, isError}, setUrl];
}