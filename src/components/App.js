import React, {useState, useEffect} from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters"

function App() {

  const [hosts, setHosts] = useState([])
  const [displayedHostId, setDisplayedHost] = useState()
  const [areas, setAreas] = useState([])

  const hostsAPI = "http://localhost:3001/hosts"
  
  useEffect( () => {
    fetch(hostsAPI)
      .then( response => response.json() )
      .then( setHosts )

  }, [])

  useEffect( () => {
    fetch('http://localhost:3001/areas')
    .then( response => response.json() )
    .then( setAreas )
  }, [])

  function handleDisplayHost(host){
    setDisplayedHost(host)
  }

  function handleUpdateHost(updatedHost){
    const updatedHostArray = hosts.map( host => {
      if (host.id !== updatedHost.id) return host
      return updatedHost
    })
    setHosts(updatedHostArray)
  }

  function handleToggleAll(state){
    const updatedHosts = hosts.map( host => {
      return {...host, active: state}
    })
    setHosts(updatedHosts)
  }

  return (
    <Segment id="app">
      <WestworldMap areas={areas} hosts={hosts} displayedHostId={displayedHostId} onDisplayHost={handleDisplayHost}/>
      <Headquarters 
        areas={areas} 
        hosts={hosts} 
        displayedHostId={displayedHostId} 
        onDisplayHost={handleDisplayHost} 
        onUpdateHost={handleUpdateHost}
        onToggleAll={handleToggleAll}
      />
    </Segment>
  );
}

export default App;
