import React from "react"
import PropTypes from 'prop-types';

export const GraphTableCreator = (props) => {
  return (
    <table style={{border: "1px solid black",  align:"left"}}>
    <tr>
      <th style={{border: "1px solid black", backgroundColor:"#FF8A65", color: "white", align:"left", padding: 15, width:200}}>Souce Info</th>
      <th style={{border: "1px solid black", backgroundColor:"#FF8A65",  color: "white", align:"left", padding: 15, width:100}}>Value</th> 
    </tr>
    {props.graphData.map((el, index) => (
      <tr>
        <td style={{ align:"left", padding: 15, width:200, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{el.x.split('_').join(' ')}</td>
        <td style={{ align:"left", padding: 15, width:100, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{el.y}</td>
      </tr>
    ))}
    </table>
  )
}

GraphTableCreator.propTypes = {
  graphData: PropTypes.object.isRequired,
}

