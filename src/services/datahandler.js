/*

1. Variables, Cookies

*/

let loadedcookie = "loaded";

const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '')  + expires + '; path=/';
}

//wenn der Cookie loadedcookie gesetzt ist, gib die lokalen Daten zurück, ansonsten die Daten aus der API
export const getData = () => {
    const data = [
        {
          id: 1,
          customer: 'Horst Schlämmer',
          street: 'Hauptstraße 1',
        },  
        {
          id: 2,
          customer: 'Peter Lustig',
          street: 'Hauptstraße 2',
        },
    ];


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(document.cookie.indexOf(loadedcookie) === -1) {
                resolve(data);
                setCookie(loadedcookie, true, 50);
            } else {
                resolve(data);  
            }
        }, 1000);
    });
    
}

const dbName = 'fenotecDB';
const storeName = 'fenotecStore';



/*

2. Function zum Speichern und Lesen von indexedDB

*/

const handleIndexedDB = (action="get", id=0) => {
  
    // indexedDB
    if (!('indexedDB' in window)) {
        alert('IndexedDB wird von diesem Browser nicht unterstützt.');
        return;
    }
    const request = indexedDB.open(dbName, 2);
  
    request.onerror = function(event) {
        alert('Fehler beim Öffnen der Datenbank:', event.target.errorCode);
    };
  
    request.onupgradeneeded = function(event) {
      const db = event.target.result;
      const store = db.createObjectStore(storeName, { keyPath: 'id' });
    };
  
    request.onsuccess = function(event) {
        
        const db = event.target.result;
        const transaction = db.transaction(storeName, 'readwrite');
        const store = transaction.objectStore(storeName);
  
        // save items
        if(action === 'save') {
  
            data.forEach(item => {
                store.put(item); 
            });
  
          } else {

        //return requested item    
            let result = store.get(1);
  
            result.onsuccess = function(e) {
              return(e.target.result);
            }
        }
  
         
          console.info(store.get(1))
          transaction.oncomplete = function() {
            console.log('Daten erfolgreich in IndexedDB gespeichert.');
          };
  
          transaction.onerror = function(event) {
            console.error('Fehler beim Speichern der Daten in IndexedDB:', event.target.error);
          };
  
  
      }
  }
  

  