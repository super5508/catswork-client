import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import ReactTable from 'react-table'
import ReactDOM from 'react-dom';
import { VictoryPie } from "victory";
import { EnumIndustry, EnumSource } from 'models/enums'

import GraphQL, { gql } from 'services/GraphQL'

import Nav from 'components/Nav'

import Loading from 'ui/Loading'
import Button from 'ui/Button'

import 'react-table/react-table.css'
import s from './active.less'

const PEOPLE_QUERY = gql`
	query userRootQueryType {
		catWorksDashboard {
			personId
			first
			last
			company
			industry
			position
			email
			phone
			location
			education
			hometown
			extracurriculars
			website
			notes
			source
			sourceCustom
		}
	}
`

const COLUMNS = [{
	id: 'name',
	Header: 'Name',
	accessor: d => `${d.first} ${d.last}`
}, {
	Header: 'Company',
	accessor: 'company'
}, {
	id: 'industry',
	Header: 'Industry',
	accessor: d => EnumIndustry[d.industry]
}, {
	Header: 'Position',
	accessor: 'position'
}, {
	Header: 'Email',
	accessor: 'email'
}, {
	Header: 'Phone',
	accessor: 'phone'
}, {
	Header: 'Location',
	accessor: 'location'
}, {
	Header: 'Education',
	accessor: 'education'
}, {
	Header: 'Hometown',
	accessor: 'hometown'
}, {
	Header: 'Extracurriculars',
	accessor: 'extracurriculars'
}, {
	Header: 'Website',
	accessor: 'website'
}, {
	Header: 'Notes',
	accessor: 'notes'
}, {
	id: 'source',
	Header: 'source',
	accessor: d => d.source === EnumSource.OTHER ? d.sourceCustom : EnumSource[d.source]
}]

@observer
class Active extends React.Component {

	state = {
		analysis: false, 
		typeOfChart: 'PIE_CHART'
	}

	@observable.ref _$people = null

	componentWillMount() {
		GraphQL.query(PEOPLE_QUERY)
			.then(action(({ data }) => {
				console.log(data)
				this._$people = data.catWorksDashboard
			}))
	}

	toggleAnalysis = () => {
		this.setState({analysis: !this.state.analysis})
		console.log(this.state)
	}

	render() {
		console.log(`People:`, this._$people, `& State:`, this.state.analysis)
		let content
		if (this._$people === null) {
			content = <Loading />
		}
		else {
			content = (
				<section className={s.active}>
					{/* Remove Button Created by my  */}
					<button onClick={this.toggleAnalysis}> Analysis </button>
					{
						!this.state.analysis ? (
						<ReactTable className={s.table}
							data={this._$people}
							columns={COLUMNS}
							filterable={true}
							showPagination={false}
							minRows={10}
							noDataText='Nothing here' />
						) : null
					}
				</section>
			)
		}

		return (
			<>
				<Nav>
					<Button href='auth/logout'>Sign out</Button>
				</Nav>
				{content}
			</>
		)
	}

}

export default Active
