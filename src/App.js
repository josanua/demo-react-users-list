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
  const [success, setSuccess] = useState(false);
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

  const onClickSendInvites = () => {
      setSuccess(true);
  }

  return (
    <div className="App">
        {
            success ? <Success count={invites.length} /> : (
                <Users
                    onChangeSearchValue={onChangeSearchValue}
                    searchValue={searchValue}
                    items={users}
                    isLoading={isLoading}
                    invites={invites}
                    onClickInvite = {onClickInvite}
                    onClickSendInvites = {onClickSendInvites}
                />
            )
        }
    </div>
  );
}

export default App;
