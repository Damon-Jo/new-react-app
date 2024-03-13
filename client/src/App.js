import { useEffect } from 'react';
import ListHeader from './components/ListHeader';

const App = () => {

const getData = async () =>{
  const userEmail = 'ania@test.com'
  try {
    const response = await fetch(`http://localhost:8000/todos/${userEmail}`)
    console.log(response)
    const json = await response.json()
    console.log(json)
  } catch (err){
    console.error(err)
  }
}

useEffect(() => getData, [])

  return (
    <div className='app'>
      <ListHeader listName={'💛Holiday tick list'}/>
    </div>
  );
}

export default App;
