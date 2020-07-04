import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const [data, setData] = useState({hits: []});

  useEffect(() => {
    async function fetchData(){
      const result = await axios('https://hn.algolia.com/api/v1/search?query=redux');
      setData(result.data);  
    }
    fetchData();
  });


  return (
    <div className="App">
      <h1>Getting data</h1>
      <hr/>
      <ul>
        {data.hits.map(item => {
          console.log(item);
          return (
          <li key={item.objectID}>
          <a href={item.url}><p>{item.title}</p></a>
          </li>
        )})}
      </ul>
    </div>
  );
}

export default App;
