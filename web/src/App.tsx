import { Tasks } from './components/tasks';
import Header from "./components/header";
import Summary from './components/summary';
import LoginPage from './components/loginPage';
import "./styles/global.css";
import { useEffect, useState } from 'react';
import { api } from './lib/axios';
import { SubmitHandler } from 'react-hook-form';

type formValues = {
  email: string,
  password: string
}

type propsType = {
  token: string
}

function App(props: propsType) {
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);

  const loginSubmit: SubmitHandler<formValues> = (data) => {
    api.post("/user/login", {
      email: data.email,
      password: data.password
    }).then((response) => {
      if(response.status === 200){
        localStorage.setItem("token", `bearer ${response.data}`)
        api.defaults.headers.common['Authorization'] = `bearer ${response.data}`;
        setLogged(true);
      }
      
    }).catch(err => setMessage(err));
  }

  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.defaults.headers.common['Authorization'] = `${token}`;
    if(token){
      setLogged(true);
    }else{
      setLogged(false);
    }
  }, [])

  return (
  <div className="w-screen h-screen bg-background text-white flex flex-col justify-center items-center">

    {!logged && <LoginPage onSubmit={loginSubmit} message={message} />}

    {logged && 
      <div className='mt-3'>
      <div className='flex flex-col'>
        < Header />
        <div className="flex m-20">
          < Summary />
          < Tasks />
        </div>
      </div>
      <div className='flex justify-end'>
        <button onClick={logoutHandler} className='border border-sky-700 rounded-lg p-1 px-2 hover:border-sky-500'>logout</button>
      </div>
      </div>}

  </div>
  )
}

export default App
