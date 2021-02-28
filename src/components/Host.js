import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({host, displayedHostId, onDisplayHost}) {

  const {id, imageUrl} = host
  
  function handleDisplayHost(){
    onDisplayHost(id)
  }
  
  return (
    <Card
      className= {displayedHostId === id ? "host selected" : "host" }
      onClick={handleDisplayHost}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
