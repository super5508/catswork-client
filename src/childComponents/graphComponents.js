import React from "react"
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLine, VictoryChart, VictoryTheme, VictoryPolarAxis,  VictoryAxis, VictoryContainer, VictoryBar } from "victory";

export const PieGraph = (props) => {
  return (
    <VictoryPie
    data={props.graphData}
    radius={100}
    containerComponent={<VictoryContainer responsive={false}/>}
    style={{
      labels: {
        fontSize: 15
      }
    }}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 }
    }}
    labels={(d) => {
      const formatingLabel = d.x.split('_').join(" ")
      return formatingLabel
    }}
  />
  )
}

export const PieGraphCompany = (props) => {
  return (
    <VictoryPie
    data={props.graphData}
    radius={100}
    containerComponent={<VictoryContainer responsive={false}/>}
    style={{
      labels: {
        fontSize: 15
      }
    }}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 }
    }}
    labels={(d) => {
      const formatingLabel = d.x.split('_').join(" ")
      return " "
    }}
  />
  )
}

export const BarGraph = (props) => {
  return (
    <VictoryChart
    height={400}
    width={400}
    containerComponent={<VictoryContainer responsive={false}/>}
  >
  <VictoryBar
    alignment="start"
    data={props.graphData}
    style={{ data: { fill:  "#FF7043" } }}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 }
    }}
    />
  </VictoryChart>
  )
}

export const BarGraphCompany = (props) => {
  return (
    <VictoryChart
    height={400}
    width={400}
    containerComponent={<VictoryContainer responsive={false}/>}
  >
    <VictoryAxis tickFormat={() => ''} 
			label=" "/>
    
    <VictoryAxis dependentAxis 
				tickValues={props.graphData.map(axis => axis.y)}
			/>

  <VictoryBar
    alignment="start"
    data={props.graphData}
    style={{ data: { fill:  "#FF7043" } }}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 }
    }}
    />
  </VictoryChart>
  )
}

PieGraph.propTypes = {
  graphData: PropTypes.array.isRequired,
}

BarGraph.propTypes  = {
  graphData: PropTypes.array.isRequired,
}