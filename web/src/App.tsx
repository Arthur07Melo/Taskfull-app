import { Tasks } from './components/tasks';
import Header from "./components/header";
import Summary from './components/summary';
import LoginPopover from './components/loginPopover';
import "./styles/global.css";
import { useState } from 'react';
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
  const [token, setToken] = useState("");
  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState("");
  const [config, setConfig] = useState({ headers: { Authorization: `Bearer ${token}` }});


  const loginSubmit: SubmitHandler<formValues> = (data) => {
    api.post("/user/login", {
      email: data.email,
      password: data.password
    }).then((response) => {
      if(response.status === 200){
        api.defaults.headers.common['Authorization'] = `bearer ${response.data}`;
        setLogged(true);
      }
      else{
        setMessage(response.data.message)
      }
    }).then(() => {
      setConfig({
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }).catch(err => setMessage(err));
  }

  return (
  <div className="w-screen h-screen bg-background text-white flex justify-center items-center">

    {!logged && <LoginPopover onSubmit={loginSubmit} message={message} />}

    {logged && 
      <div className='flex flex-col'>
        < Header />
        <div className="flex m-20">
          < Summary />
          < Tasks />
        </div>
      </div>}

  </div>
  )
}

export default App
