import { Tasks } from './components/tasks';
import { TaskAdder } from './components/taskAdder';
import Header from "./components/header";
import Summary from './components/summary';
import "./styles/global.css";

function App() {
  return (
    <div className="w-screen h-screen bg-background text-white flex justify-center items-center">
      <div className='flex flex-col'>

        < Header />
        <div className="flex m-20">
          < Summary />
          < Tasks />
        </div>

      </div>
    </div>
  )
}

export default App
