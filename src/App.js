import logo from './logo.svg';
import { useOnline } from './hooks/useOnline';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from './components/Table';
const data = [
  {
    id: 1,
    customer: 'Horst Schlämmer',
  },  
  {
    id: 2,
    customer: 'Peter Lustig',
  },
]
function App() {

  let online = useOnline();

  let [content, setContent] = useState(data);

  useEffect(() => {
    console.log('online', online);    
  }, [online]);


  if (online === false) {
    return <div>Loading...</div>
  }


  const handleData = () => {
    console.log('kala')
    const data_new = [
      {
        id: 1,
        customer: 'Horst Edited',
      },  
      {
        id: 2,
        customer: 'Peter Lustig',
      },
    ];
  
    setContent(data_new);
  }

 
  if(!content) {
    return <div>Loading...</div>
  }
  return (
    <div className="App">
      <header className="App-header">
     
        <p>
          Contenteditable
        </p>
        <Table data={content} handleData={handleData}/>
      </header>
      
    </div>
  );
}

export default App;
