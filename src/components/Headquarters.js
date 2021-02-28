import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from './ColdStorage'
import LogPanel from './LogPanel'
import { Log } from "../services/Log";


function Headquarters({ areas, hosts, displayedHostId, onDisplayHost, onUpdateHost, onToggleAll }) {

  const logGenerator = {
    warn: Log.warn,
    notify: Log.notify,
    error: Log.error
  }

  const inactiveHosts = hosts.filter(host => {
    return host.active === false
  })

  const [logs, setLogs] = useState([])

  function handleSetLogs({type, msg}){
    setLogs([...logs, logGenerator[type](msg) ])
  }


  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        <ColdStorage 
          hosts={inactiveHosts} 
          displayedHostId={displayedHostId} 
          onDisplayHost={onDisplayHost}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          hosts={hosts} 
          displayedHostId={displayedHostId} 
          areas={areas} 
          onUpdateHost={onUpdateHost}
          onSetLogs={handleSetLogs}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        <LogPanel 
          onToggleAll={onToggleAll}
          logs={logs}
          onSetLogs={handleSetLogs}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;
