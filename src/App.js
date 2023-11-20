import { useEffect, useState } from 'react';
import './App.css';
import Group from './components/Group';
import constants from './constants';

function App() {
  const [groupBy, setGroupBy] = useState('priority');
  const [sortBy, setSortBy] = useState('priority');
  const [display, setDisplay] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment", {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        const responseData = sortedArray(sortBy, data.tickets)
        const result = Object.groupBy(responseData, ticket => { return ticket[groupBy] });
        setDisplay(result);
        setUsers(data.users)
      })
      .catch((error) => console.log(error));
  }, [groupBy, sortBy]);

  const sortedArray = (sortBy, employees) => {
    let sortedArray;

    if (sortBy == 'priority') {
      sortedArray = [...employees].sort((a, b) => b.priority - a.priority);
    }

    if (sortBy == 'title') {
      sortedArray = [...employees].sort((a, b) =>
        a.title.localeCompare(b.title)
      )
    }
    return sortedArray;
  }

  const showDisplay = () => {
    const listItems = [];

    for (const detail of Object.keys(constants[groupBy]).filter(key => Object.hasOwnProperty.bind(display)(key))) {
      listItems.push(
        <div>
          <div className='kanban-board-section-header'>
            <div>
              <img src={require(`./images/${constants[groupBy][detail]}.png`)} className="group-heading-img" alt="" />
              <span className='group-heading'>{groupBy == 'userId' ? users.find((user) => { return user.id === constants[groupBy][detail] }).name : constants[groupBy][detail]}<span style={{ "margin-left": "10px" }}>{display[detail].length}</span></span>
            </div>
            <div>
              <img src={require('./images/plus.png')} className="general-icon" />
              <img src={require('./images/menu-icon.png')} className="general-icon" />
            </div>
          </div>
          <Group details={display[detail]} users={users} groupBy={groupBy} />
        </div>
      )
    }

    return listItems
  }

  return (
    <div className="App">
      <div className='dropdown-section'>
        <div>
          <p>Group By</p>
          <select onChange={(e) => setGroupBy(e.target.value)}
            defaultValue={groupBy}>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="userId">User</option>
          </select>
        </div>
        <div style = {{"margin-left": "10px"}}>
          <p>Sort By</p>
          <select onChange={(e) => setSortBy(e.target.value)}
            defaultValue={sortBy}>
            <option value="priority">Priority</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
      <div>
        <div className='main-board'>
          {showDisplay()}
        </div>
      </div>
    </div>
  );
}

export default App;
