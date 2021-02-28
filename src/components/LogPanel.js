import React, {useState} from "react";
import { Segment, Button } from "semantic-ui-react";

function LogPanel({ onToggleAll, onSetLogs, logs }) {

  const [state, setState] = useState(true)

  function handleStateToggle(){
    onToggleAll(state)
    setState(!state)
    const logData = {
      type: state ? "warn" : "notify",
      msg: `${state ? "Activating" : "Decommissioning"} all hosts`
    }
    onSetLogs(logData)
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        )).reverse()}
      </pre>
      
      <Button fluid color={state ? "red" : "green"} content={state ? "ACTIVATE ALL" : "Decommission All"} onClick={handleStateToggle}/>
    </Segment>
  );
}

export default LogPanel;
