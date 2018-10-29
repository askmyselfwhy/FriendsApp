import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const users = [
  {
    id: 1,
    name: "John McCline",
    friends: [2, 5, 8]
  },
  {
    id: 2,
    name: "Obi van Kenoby",
    friends: [1, 4, 8]
  },
  {
    id: 3,
    name: "Jean-Claude Van Damme",
    friends: [2]
  },
  {
    id: 4,
    name: "Alyssa Milano",
    friends: [1, 3]
  },
  {
    id: 5,
    name: "Keanu Reeves",
    friends: [1, 8, 2, 3, 4]
  },
  {
    id: 6,
    name: "Olivia Wilde",
    friends: [2, 3]
  },
  {
    id: 7,
    name: "Hugh Laurie",
    friends: [1, 3, 8]
  },
  {
    id: 8,
    name: "John McClane",
    friends: [1, 2, 3, 4, 5]
  },
  {
    id: 9,
    name: "Mel Gibson",
    friends: [1]
  }
]



class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedUserId: null,
      users: users
    }
  }
  deleteUser = (id) => {
    let { users } = this.state;
    let newUsers = [...users].filter(user => user.id !== id)
      .map(user => {
        let index = user.friends.indexOf(id);
        user.friends = index > -1 ? user.friends.splice(index, 1) : user.friends;
        return user;
      })
    this.setState({ selectedUserId: null, users: newUsers });
  }
  selectUser = (id) => {
    this.setState({
      selectedUserId: id
    })
  }
  findFriendsOfUserById = (id) => {
    let friendsIDs = users.find(user => user.id === id).friends;
    return friendsIDs;
  }
  findUserDataById(id) {
    return users.find(user => user.id === id)
  }
  render() {
    const { selectedUserId, users } = this.state;
    let friendsIDs;
    let friends;
    if (selectedUserId) {
      friendsIDs = new Set(this.findFriendsOfUserById(selectedUserId));
      friends = Array.from(friendsIDs).map(id => this.findUserDataById(id));
      friends.map(friend => friend.friends.map(friendOfFriend => friendsIDs.add(friendOfFriend)));
      friendsIDs.delete(selectedUserId);
      friends = Array.from(friendsIDs).map(id => this.findUserDataById(id));
    }
    return (
      <section className="grid">
        <aside>
          <ul>
            {users.map(user =>
              <li className="user" key={user.id} onClick={this.selectUser.bind(this, user.id)}>
                <div>
                  <p>UserID: {user.id}</p>
                  <p>Name: {user.name}</p>
                </div>
                <button onClick={this.deleteUser.bind(this, user.id)}>X</button>
              </li>
            )}
          </ul>
        </aside>
        <main>
          {selectedUserId ?
            <div>
              Friends:
              <ol>
                {friends.map(friend => <li key={friend.id}>{friend.name}</li>)}
              </ol>
            </div>
            : <div>Choose the user to see his friends</div>
          }

        </main>
      </section>
    );
  }
}

export default App;
