import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Users list: https://reqres.in/api/users



function App() {
  const serverUserList = 'https://reqres.in/api/users';
  const [users, setUsers] = useState();

  useEffect(() => {
      fetch(serverUserList)
          .then((res)=> res.json())
          .then((json) => {
              setUsers(json.data);
          })
          .catch((err) => {
                  console.log(err);
                  alert('Error with data server.')
              }
          )}
      , []);

  return (
    <div className="App">
      <Users />
      {/* <Success />*/}
    </div>
  );
}

export default App;
