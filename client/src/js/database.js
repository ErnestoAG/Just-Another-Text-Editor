import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('JATE database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('JATE database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

// TODO: Add logic for a method that gets all the content from the database

export const getDb = async () => {
  console.log('GET from the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.get(1);
  const result = await request;

  console.log('result.value', result);
  return result?.value;
};

export const putDb = async (value) => {
  console.log('UPDATE the database');

  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({id: 1, value});
  
  const result = await request;

  console.log('result.value', result);
  return result?.value;
};

// Start the database.
initdb();
