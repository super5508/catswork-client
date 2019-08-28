import React from "react"
import PropTypes from 'prop-types';

export const GraphTableCreator = (props) => {
  return (
    <table style={{border: "1px solid black",  align:"left"}}>
     <thead>
        <tr>
          <th style={{borderBottom: "1px solid black", backgroundColor:"#FF8A65", color: "white", align:"left", padding: 15, width:200}}>Souce Info</th>
          <th style={{borderBottom: "1px solid black", backgroundColor:"#FF8A65",  color: "white", align:"left", padding: 15, width:100}}>Value</th> 
        </tr>
      </thead>
    {props.graphData.map((el, index) => (
    <tbody>
      <tr>
        <td style={{ align:"left", padding: 15, width:200, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{el.x.split('_').join(' ')}</td>
        <td style={{ align:"left", padding: 15, width:100, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{el.y}</td>
      </tr>
    </tbody>
    ))}
    </table>
  )
}

GraphTableCreator.propTypes = {
  graphData: PropTypes.array.isRequired,
}

