import React from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({areas, hosts, onUpdateHost, displayedHostId, onSetLogs}) {

  const host = hosts.filter( host => {
    return host.id === displayedHostId
  })[0]

  function properCase(name){
    return name.split("_").map( word => {
      return word.slice(0,1).toUpperCase() + word.slice(1)
    }).join(" ")
  }  

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.
  const options = areas.map( area=> {
    return { key: area.name, text: properCase(area.name), value: area.name}
  })

  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    const area = areas.filter(area => area.name === value)[0]
    const currentHostCount = hosts.filter(host => host.area === value).length
    if ( (currentHostCount + 1) <= area.limit){
      const updatedHost = {...host, area:value}
      onUpdateHost(updatedHost)
      const logData = {
        type: "notify",
        msg: `${host.firstName} set in area ${ properCase(area.name) }`
      }
      onSetLogs(logData)
    } else {
      const logData = {
        type: "error",
        msg: `Too many hosts. Cannot add ${host.firstName} to ${ properCase(area.name) }`
      }
      onSetLogs(logData)
    }
  }

  function handleRadioChange() {
    const updatedHost = {...host, active:!host.active}
    const logData = {
      type: host.active ? "notify" : "warn",
      msg: host.active ? `Decommissioned ${host.firstName}` : `Activated ${host.firstName}`
    }
    onSetLogs(logData)
    onUpdateHost(updatedHost)
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={host?.imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {host?.firstName} | {host?.gender === "Male" ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={host?.active ? "Active" : "Decomissioned"}
                checked={host?.active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={host.area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
