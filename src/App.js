import React, {useEffect, useState} from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Users list: https://reqres.in/api/users

function App() {
  const serverUserList = 'https://reqres.in/api/users';
  const [invites, setInvites] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
      fetch(serverUserList)
          .then((res) => res.json())
          .then((json) => {
              setUsers(json.data);
          })
          .catch((err) => {
                  console.log(err);
                  alert('Error with data server.')
              }
          )
          .finally(() => setLoading(false))
      }, []);

  const onChangeSearchValue = (event) => {
      setSearchValue(event.target.value);
  }

  const onClickInvite = (id) => {
      if (invites.includes(id)) {
          setInvites((prev)=> prev.filter(_id => _id !== id));
      } else {
          setInvites((prev) => [...prev, id]);
      }
  }

  return (
    <div className="App">
      <Users
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite = {onClickInvite}
      />
      {/* <Success />*/}
    </div>
  );
}

export default App;
