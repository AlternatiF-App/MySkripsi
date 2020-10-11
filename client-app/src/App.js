import React, {useEffect, createContext,  useReducer, useContext} from 'react';
import Navbar from './components/Navbar'
import Home from './components/screens/Home'
import Siswa from './components/screens/Siswa'
import DetailSiswa from './components/screens/DetailSiswa'
import Minat from './components/screens/Minat'
import Tentang from './components/screens/Tentang'
import Bantuan from './components/screens/Bantuan'
import 'materialize-css/dist/css/materialize.min.css';
import "./App.css"
import {BrowserRouter,  Route, Switch, useHistory} from 'react-router-dom'
import {reducer, initialState} from './reducers/userReducer'

export const UserContext = createContext()
const Routing = () => {

  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    }else{
      history.push("/")
    }
  },[])

  return(
    <Switch>
      <Route exact path="/">
        <Navbar/>
        <Home/>
      </Route>
      <Route path="/siswa">
        <Navbar/>
        <Siswa/>
      </Route>
      <Route path="/detail-siswa">
        <Navbar/>
        <DetailSiswa/>
      </Route>
      <Route path="/minat">
        <Navbar/>
        <Minat/>
      </Route>
      <Route path="/tentang">
        <Navbar/>
        <Tentang/>
      </Route>
      <Route path="/bantuan">
        <Navbar/>
        <Bantuan/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;