import React from "react"
import PropTypes from 'prop-types';
import { fixStringValues  } from "../helperFunction/commonFunctions"


export const GraphTableCreator = (props) => {
  return (
    <table style={{textAlign:"center"}}>
     <thead style={{display: "block"}}>
        <tr>
          <th style={{borderBottom: "1px solid black", borderLeft: "1px solid black", backgroundColor:"#FF8A65", color: "white", textAlign:"left", padding: 15, width:200}}>{props.tableHeadingKey}</th>
          <th style={{borderBottom: "1px solid black", borderRight: "1px solid black", backgroundColor:"#FF8A65",  color: "white", textAlign:"center", padding: 15, width:100}}>{props.tableHeadingValue}</th> 
        </tr>
      </thead>
      <tbody style={{
        display: "block",
      height: "300px",       
      overflowY: "scroll",    
      overflowX: "hidden" ,
      overflow: "scroll"
    }}>
    {props.graphData.map((el, index) => (
      <tr>
        <td style={{borderBottom: "1px solid black", borderLeft: "1px solid black", borderSpacing: "0px", marginTop:"0px", marginBottom:"0px",  textAlign:"left", padding: 15, width:200, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{fixStringValues(el.x)}</td>
        <td style={{borderBottom: "1px solid black", borderRight: "1px solid black", borderSpacing: "0px", textAlign:"center", marginTop:"0px", marginBottom:"0px", padding: 15, width:100, backgroundColor: index % 2 === 0 ? 'white' : '#FFCCBC'}}>{el.y}</td>
      </tr>
    ))}
    </tbody>
    </table>
  )
}

GraphTableCreator.propTypes = {
  graphData: PropTypes.array.isRequired,
  tableHeadingKey: PropTypes.string.isRequired,
  tableHeadingValue: PropTypes.string.isRequired
}

