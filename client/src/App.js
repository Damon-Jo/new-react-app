import { useEffect, useState } from 'react';
import ListItem from './components/ListItem';
import ListHeader from './components/ListHeader';
import Auth from './components/Auth';
import { useCookies } from 'react-cookie';

const App = () => {

  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(
    [
      {
        "id": 1,
        "user_email": "",
        "title": "Buy a ticket",
        "progress": 80,
        "date": "2022-12-01"
      }
    ]
  )

  // const authToken = false

const getData = async () =>{

  try {
    const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
    console.log(response)
    const json = await response.json()

    setTasks(json)
  } catch (err){
    console.error(err)
  }
}

useEffect(() => {
  if(authToken){
    getData()
  }
}, [])

console.log(tasks)

//Sort by date
const sortedTasks = tasks?.sort((a, b) => new Date(a.date) - new Date(b.date))


  return (
    <div className='app'>
      {!authToken && <Auth />}
      {authToken &&
      <>
      <ListHeader listName={'💛Holiday tick list'} getData={getData}/>
      {sortedTasks?.map((task)=> <ListItem key={task.id} task={task} getData={getData}/>)}
      </>}
    </div>
  );
}

export default App;
