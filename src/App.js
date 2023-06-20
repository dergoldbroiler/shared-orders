import { useOnline } from './hooks/useOnline';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from './components/Table';
import { getData } from './services/datahandler';
import { DatarowContainer } from './components/DatarowContainer';
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./synced_store/store";

function App() {

  let online = useOnline();
  let [loaded, setLoaded] = useState(false);
  let [data, setData] = useState(null);
  const global_state = useSyncedStore(store);

  useEffect(() => {
    console.log('online', online);    
  }, [online]);


  useEffect(() => {
    getData().then(data => {
      if(!loaded){
        setData(data);
      }
      
      setLoaded(true);
    });   
  }, [data]);


  if (online === false) {
    return <div>Loading...</div>
  }


  /*
  * intead of using local State, the snynced store comes to play
  */
  const handleData = (key,id,new_value) => {
      console.log('handleData',key,id,new_value);

      const newData = data.map((datarow) => {
        if(datarow.id === id) {
          datarow[key] = new_value;
        }
        return datarow;
      });

      setData(newData);
  }

  /* blur event on table cell writes back to indexeddb*/
  const dataOnBlur = (key,id,new_value) => {
  }


  if(!loaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <header className="App-header">
     
        <p>
          Contenteditable
        </p>
        <DatarowContainer handleData={handleData} datarow={data[0]} dataOnBlur={dataOnBlur} />
        <button className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#datarowcontainer">Datensatz bearbeiten</button>

      </header>
      
    </div>
  );
}

export default App;
