
import './App.css';

import { Route,Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './component/Home';
import Login from './component/Login';
import Sign from './component/Sign';
import Contact from './component/Contact';
import About from './component/About';
import Logout from './component/Logout';
import { createContext, useReducer } from 'react';
import { initialState,reducer } from './reducer/UseReducer';

  export const UserContext = createContext();

   const Routing = () => {
     return (
       <>
         <Routes>
           <Route exact path="/" element={<Home />} />

           <Route exact path="/aboutt" element={<About />} />

           <Route exact path="/contactt" element={<Contact />} />

           <Route exact path="/loginn" element={<Login />} />

           <Route exact path="/signn" element={<Sign />} />

           <Route exact path="/logout" element={<Logout />} />
         </Routes>
       </>
     );
   };
 

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    
    <>
   <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
       <Routing/>
    </UserContext.Provider>
    </>
  );
}
  // export const UserContext = createContext();

export default App;
