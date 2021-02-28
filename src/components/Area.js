import React from "react";
import "../stylesheets/Area.css";
import HostList from './HostList'

function Area({ area, hosts, displayedHostId, onDisplayHost }) {
  const {name} = area

  function properCase(name){
    return name.split("_").map( word => {
      return word.slice(0,1).toUpperCase() + word.slice(1)
    }).join(" ")
  }  

  const areaHosts = hosts.filter(host => {
    return host.area === name && host.active
  })

  return (
    <div
      className="area"
      id={name}
    >
      <h3 className="labels">
        {properCase(name)}
      </h3>
      <HostList 
        hosts={areaHosts} 
        displayedHostId={displayedHostId}
        onDisplayHost={onDisplayHost}
      />
    </div>
  );
}

Area.propTypes = {
  hosts: function (props) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  },
};

export default Area;
