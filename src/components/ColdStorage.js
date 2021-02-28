import React from "react";
import { Segment } from "semantic-ui-react";
import HostList from './HostList'

function ColdStorage({ hosts, displayedHostId, onDisplayHost }) {

  const decommissionedHosts = hosts.filter( host => {
    return host.active === false
  })
  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        <HostList 
          hosts={decommissionedHosts} 
          displayedHostId={displayedHostId}
          onDisplayHost={onDisplayHost}
        />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
