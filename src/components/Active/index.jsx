import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import ReactTable from 'react-table'
import ReactDOM from 'react-dom';
import { VictoryPie, VictoryLine, VictoryChart, VictoryTheme, VictoryPolarAxis,  VictoryAxis } from "victory";
import { EnumIndustry, EnumSource } from 'models/enums'
import GraphQL, { gql } from 'services/GraphQL'
import Nav from 'components/Nav'
import Loading from 'ui/Loading'
import Button from 'ui/Button'
import 'react-table/react-table.css'
import s from './active.less'
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import FilterList from '@material-ui/icons/FilterList'
import InputAdornment from '@material-ui/core/InputAdornment';
import _ from 'lodash';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Check from '@material-ui/icons/Check';
import ButtonMaterial from '@material-ui/core/Button';
import { flexbox } from '@material-ui/system';

let found = []

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

const USER_QUERY = gql`
query userRootQueryType {
	catWorksPersonal {
		userActivity {
			date,
			updatedAt,
			activity
		}
	}
}
`

@observer
class Active extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			searchtext:'',
			searchpanel:'',
			modalIsOpen:false,
			anchorEl:null,list:[],
			filterText:'',
			list_sort:[],
			sorting:false,
			sorted_list:[],
			sort_field:'',
			sortingpanel:[],
			data_table:[],
			user_activity: [],
			dataVisulatization: false, 
	
		}
	}

	@observable.ref _$people = null

	componentWillMount() {
		GraphQL.query(PEOPLE_QUERY)
			.then(action(({ data }) => {
				this._$people = data.catWorksDashboard
				this.setState({data_table: this._$people})
			}))

			GraphQL.query(USER_QUERY)
			.then(({ data }) => {
				console.log(`data From users:`, data)
				this.setState({user_activity: data.catWorksPersonal.userActivity})
			})
	}


	// const getFilteredDate = (peopleActivityList, endRange) => {
	// 	const individualDataObj = {}
	// 	for (let i=0; i<peopleActivityList.length; i++) {
	// 		if (new Date() < new Date(peopleActivityList[i].date) && new Date(peopleActivityList[i].date) < new Date(endRange)) {
	// 			const convertIntoEnUsaDateFormat = new Date(peopleActivityList[i].date).toLocaleDateString("en-US")
	// 			if (individualDataObj.hasOwnProperty(convertIntoEnUsaDateFormat)) {
	// 					individualDataObj[convertIntoEnUsaDateFormat] = individualDataObj[convertIntoEnUsaDateFormat] + 1
	// 			} else {
	// 				individualDataObj[convertIntoEnUsaDateFormat] = 1
	// 			}
	// 		}
	// 	}
	// 	return individualDataObj
	// }

	createGraphObjforMonthAndWeekly = (graphPeriod, peopleActivityList) => {
		const individualDataObj = {}
		const time = graphPeriod === 4? 7 : 30
		for (let j=0; j<graphPeriod; j++) {
			individualDataObj['event' + j] = 0
			const rangeLower = new Date(Date.now() + 1000*60*60*24*time *(j-1)).toLocaleDateString("en-US")
			const rangeHigher= new Date(Date.now() + 1000*60*60*24*time *j).toLocaleDateString("en-US")
			for (let i=0; i<peopleActivityList.length; i++) {
				if (rangeLower < new Date(peopleActivityList[i].date).toLocaleDateString("en-US") && new Date(peopleActivityList[i].date).toLocaleDateString("en-US") < rangeHigher) {
					individualDataObj['event' + j] = individualDataObj['event' + j] + 1
				}
			}
		}
		return individualDataObj
	}



	sortingDataForGraph= (propertyKey) => {
	const peopleList = this.state.data_table
	console.log(`This People list,`, peopleList)
	let individualDataObj = {}
	const filteredData = []
	for (let i=0; i<peopleList.length; i++) {
		const nameInLowerCase = peopleList[i][propertyKey].toLowerCase()
		if (individualDataObj.hasOwnProperty(peopleList[i].nameInLowerCase)) {
			individualDataObj[nameInLowerCase] = individualDataObj[nameInLowerCase] + 1
		} else {
			individualDataObj[nameInLowerCase] = 1 
		}
	}
	Object.keys(individualDataObj).forEach(key => {
		filteredData.push({
			x:key,
			y:individualDataObj[key]
		})
	})
	return filteredData	
}

	activityTime = (period) => {

		const getcurrentTimeStamp = Date.now() 
		const peopleActivityList = this.state.user_activity
		let individualDataObj = {}
		const filteredData = []
		if (period === 'day') {
			for (let j=0; j<30; j++) {
			const singleDayTimeStamp = 1000*60*60*24
			const formatedGivenTime = new Date(Date.now() + 1000*60*60*24*j).toLocaleDateString("en-US")
			individualDataObj[formatedGivenTime] = 0 
			for (let i=0; i<peopleActivityList.length; i++) {
				if (formatedGivenTime === new Date(peopleActivityList[i].date).toLocaleDateString("en-US")) individualDataObj[formatedGivenTime] = individualDataObj[formatedGivenTime] + 1
			}
		}
		} else if (period === 'weekly') individualDataObj = this.createGraphObjforMonthAndWeekly(4, peopleActivityList)
		 else if (period === 'monthly') individualDataObj = this.createGraphObjforMonthAndWeekly(12, peopleActivityList)

		Object.keys(individualDataObj).forEach(key => {
			filteredData.push({
				x:key,
				y:individualDataObj[key]
			})
		})
		return filteredData
	}


	handleChangeSearchText = (text) => {
		const {data_table,sortingpanel} = this.state;
		//Change here data_table to this._$people 
		let data_display = sortingpanel.length > 0 ? sortingpanel : data_table
		this.setState({
			searchtext:text
		},()=>{
			if(this.state.searchtext.length === 0){
				this.setState({
					searchpanel:[]
				})
			}
			if(this.state.searchtext.length === 1){
				this.setState({
					searchpanel:[]
				})
			}
			if(this.state.searchtext.length > 1){
			found=[]
			let x=0
			  let i=0
			  x = this.state.searchtext.length
			  data_display.forEach((tile)=>{
				
				if(x>0 && tile.first !== ''){
				  let j = tile.first.length
				  let mnx = tile.first.replace(/[^a-zA-Z0-9 ]/g, "")
				  for(i=0;i<j;i++){
					if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
					  found.push(tile)
					}
				  }
				}

				if(x>0 && tile.last !== ''){
					let j = tile.last.length
					let mnx = tile.last.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.hometown !== ''){
					let j = tile.hometown.length
					let mnx = tile.hometown.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.industry !== ''){
					let j = tile.industry.length
					let mnx = tile.industry.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.company !== ''){
					let j = tile.company.length
					let mnx = tile.company.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.email !== ''){
					let j = tile.email.length
					let mnx = tile.email.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.position !== ''){
					let j = tile.position.length
					let mnx = tile.position.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.location !== ''){
					let j = tile.location.length
					let mnx = tile.location.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.education !== ''){
					let j = tile.education.length
					let mnx = tile.education.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x).toLowerCase() === this.state.searchtext.toLowerCase()){
						found.push(tile)
					  }
					}
				  }

				  if(x>0 && tile.phone !== ''){
					console.log("Exec me")
					let j = tile.phone.length
					let mnx = tile.phone.replace(/[^a-zA-Z0-9 ]/g, "")
					for(i=0;i<j;i++){
					  if(mnx.substr(i,x) === this.state.searchtext){
						found.push(tile)
					  }
					}
				  }
			  })
			  let unique=[]
			  //Sort uniquely the different objects based on the key name

			  if(found.length >0){
				unique = _.uniqBy(found,'first')
			  }
	
			  this.setState({
				searchpanel:unique,
			  },() => console.log(this.state.searchpanel))
			} 
		  })
	}

	handleChangePopoverText = (text) => {

		const {list} = this.state;

		this.setState({
			filterText:text
		},()=>{
			if(this.state.filterText.length === 0){
				this.setState({
					list_sort:[]
				})
			}
			if(this.state.filterText.length === 1){
				this.setState({
					list_sort:[]
				})
			}
			if(this.state.filterText.length > 1){
			found=[]
			let x=0
			  let i=0
			  x = this.state.filterText.length
			  list.forEach((tile)=>{
				if(x>0 && tile !== ''){
				  let j = tile.value.length
				  let mnx = tile.value.replace(/[^a-zA-Z ]/g, "")
				  for(i=0;i<j;i++){
					if(mnx.substr(i,x).toLowerCase() === this.state.filterText.toLowerCase()){
					  found.push(tile)
					}
				  }
				}
			  })

			  let unique = _.uniqBy(found,'value')
	
			  this.setState({
				list_sort:unique,
			  })
			} 
		  })
	}

	openModal =() => {
		this.setState({modalIsOpen: true});
	  }
	 


	handleAnchorEl = (event,field) => {
		this.setState({anchorEl:event.currentTarget})
		const list = []
		const {sortingpanel,data_table} = this.state;
		let field_value = field
		//Change here data_table to this._$people 
		_.each(data_table,(data,i)=>{
			if(sortingpanel.length > 0){
				let index = sortingpanel.findIndex(x => x[field_value] === data[field_value]);

				if(index === -1){
					list.push({value:data[field_value],selected:false})
				}
				else{
					list.push({value:data[field_value],selected:true})
				}
			}
			else{
				list.push({value:data[field_value],selected:true})
			}

			if(i === data_table.length - 1){
			  let unique = _.uniqBy(list,'value')
			  this.setState({
				  list:unique,
				  sort_field:field_value
			  })
			}
		})
	}
	 
	  closeModal =() => {
		this.setState({anchorEl:null});
	  }

	  handleFilterValue = (value) => {

		let l = this.state.list

		let index = l.findIndex(x => x.value === value.value);


		if(value.selected === true){
			l[index].selected = false
		}

		else{
			l[index].selected = true
		}

		this.setState({
			list:l
		})
	  }

	  _selectAll = () => {
		  let l = this.state.list
		  for(let i=0;i<l.length;i++){
			l[i].selected = true
		  }

		  this.setState({
			  list:l
		  })
	  }

	  _clearAll = () => {
		let l = this.state.list
		for(let i=0;i<l.length;i++){
		  l[i].selected = false
		}

		this.setState({
			list:l
		})
	}

	_applySort = () => {
		var func = this
		let l = this.state.list
		const {sort_field} = this.state;
		//Change here let list_table = this._$people 
		let list_table = [...this._$people] 
		let values_to_filter = []
		_.each(l,(item,i)=>{
			if(item.selected === false){
				values_to_filter.push(item.value)
			}
			if(i === l.length - 1){
				for(let a =0;a<values_to_filter.length;a++){
					let index_to_remove = []
					_.each(list_table,(item,i)=>{
						if(item[sort_field] === values_to_filter[a]){
							index_to_remove.push(i)
						}
						if(i === list_table.length -1){
						  for(let j=0;j<index_to_remove.length;j++){
							list_table.splice(index_to_remove[j],1)
						  }
						}
					})
				}
				func.setState({
					sortingpanel:list_table,
					anchorEl:null
				})
			}
		})
	}

	sortTickValues = (values) => {
		const formattedArray = []
		values.forEach(value => {
			formattedArray.push(value.y)
		})
		const sortedArray = formattedArray.sort((a, b) => a-b)
		console.log(`This is sorted Array:`)
		return sortedArray
	}

	render() {
		//Make change in the data part of the react table
		console.log(`Found`, found, `State:`, this.state)
		// --- Graph Formatting 
		const dayValue = this.activityTime("day")
		const weeklyValue = this.activityTime("weekly")
		const monthlyValue = this.activityTime('monthly')
		// --- Graph Source 
		const sourceInfo = this.sortingDataForGraph('source')
		const companyInfo = this.sortingDataForGraph('company')
		console.log(sourceInfo, companyInfo)
		// ---
		let content = null
		const {searchpanel,anchorEl,list,list_sort,data_table,sortingpanel} = this.state;
		const COLUMNS = [{
			id: 'name',
			Header: <div onClick={(event) => this.handleAnchorEl(event,'first')}><span>Name</span> <span className={s.columnIconAlignment}><FilterList  style={{height:15,width:15,float:'right'}} /></span></div>,
			accessor: d => `${d.first} ${d.last}`,
			style:{textAlign:'center'}

		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'company')}><span className={s.filterIconContainer}>Company</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'company')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'company',
			style:{textAlign:'center'}
		}, {
			id: 'industry',
			Header: <div onClick={(event) => this.handleAnchorEl(event,'industry')}><span className={s.filterIconContainer}>Industry</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'industry')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: d => EnumIndustry[d.industry],
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'position')}><span className={s.filterIconContainer}>Position</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'position')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'position',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'email')}><span className={s.filterIconContainer}>Email</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'email')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'email',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'phone')}><span className={s.filterIconContainer}>Phone</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'phone')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'phone',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'location')}><span className={s.filterIconContainer}>Location</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'company')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'location',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'education')}><span className={s.filterIconContainer}>Education</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'education')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'education',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'hometown')}><span className={s.filterIconContainer}>Hometown</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'hometown')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'hometown',
			style:{textAlign:'center'}
		}, {
			Header: 'Extracurriculars',
			accessor: 'extracurriculars',
			style:{textAlign:'center'}
		}, {
			Header: <div onClick={(event) => this.handleAnchorEl(event,'website')}><span className={s.filterIconContainer}>Website</span> <FilterList onClick={(event) => this.handleAnchorEl(event,'website')} style={{height:15,width:15,float:'right'}} /></div>,
			accessor: 'website',
			style:{textAlign:'center'}
		}, {
			Header: 'Notes',
			accessor: 'notes',
			style:{textAlign:'center'}
		}, {
			id: 'source',
			Header: 'Source',
			accessor: d => d.source === EnumSource.OTHER ? d.sourceCustom : EnumSource[d.source],
			style:{textAlign:'center'}
		}]
		
		const SortedList = list_sort.length > 0 ? list_sort : list

		let data_display = sortingpanel.length > 0 ? sortingpanel : data_table

		if(searchpanel.length > 0){
			data_display = searchpanel
		}

		const open = Boolean(anchorEl)
		if (this._$people === null) {
			content = <Loading />
		}

		else {
			content = (
				<section className={s.active}>
				
				{ !this.state.dataVisulatization? (
				<>
					<Popover
						open={open}
						anchorEl={anchorEl}
						onClose={() => this.closeModal()}
						anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
						}}
						transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
						}}
					>
					<div style={{padding:20}}>
					 <TextField
						id="standard-bare"
						placeholder="Search"
						margin="normal"
						inputProps={{}}
						InputProps={{
						style:{
							color:'red',
							fontSize:15
						}
						}}
						className={s.textFieldPopover}
						onChange={(event) => this.handleChangePopoverText(event.target.value)}
					/>
					<div className={s.selectButtonsContainer}>
						<ButtonMaterial size="small" onClick={() => this._selectAll()}  color="primary">
							Select All
						</ButtonMaterial>
						<ButtonMaterial size="small" onClick={() => this._clearAll()} color="secondary">
							Clear
						</ButtonMaterial>
					</div>
					<div className={s.filterListContainer}>
					<List>
						{SortedList.map((item,i) =>(
							<ListItem button onClick={() => this.handleFilterValue(item)} key={i}>
							<ListItemIcon>
								{item.selected ? <Check style={{height:20,width:20}} /> : <></>}
							</ListItemIcon>
							<ListItemText
								primary={item.value}
							/>
							</ListItem>)
						)}
					</List>
					</div>
					<div className={s.applyButtonsContainer}>
						<ButtonMaterial onClick={() => this._applySort()}>
							Apply
						</ButtonMaterial>
						<ButtonMaterial onClick={() => this.setState({anchorEl:null})}>
							Cancel
						</ButtonMaterial>
					</div>
					</div>	
					</Popover>
				      <TextField
						id="standard-bare"
						placeholder="Search Anything In Dashboard"
						margin="normal"
						inputProps={{}}
						InputProps={{
						startAdornment: (
							<InputAdornment position="start">
							<Search size={16} />
							</InputAdornment>
						),
						style:{
							color:'red',
							fontSize:17
						}
						}}
						style={{minWidth:800}}
						className={s.searchTextField}
						onChange={(event) => this.handleChangeSearchText(event.target.value)}
					/>
					{sortingpanel.length > 0 && <ButtonMaterial className={s.cancelSortButton} size="small" variant="outlined" onClick={() => this.setState({sortingpanel:[]})}>
						Clear Sort
					</ButtonMaterial>}
					<ReactTable className={s.table}
						data={data_display}
						columns={COLUMNS}
						filterable={false}
						showPagination={false}
						minRows={10}
						noDataText='Nothing here'
						style={{borderRadius:10,marginTop:15}} />
				</>)
					:
					(<div> 			
						<div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
							<p style={{marginLeft: 5, marginRight: 15}}> Change Chart Type: </p>	
							<p style={{border: "1px solid black", padding: 5, cursor: "pointer"}}><i class="material-icons">pie_chart</i></p>
							<p style={{marginLeft: 5, border: "1px solid black", padding: 5, cursor: "pointer"}}><i class="material-icons">bar_chart</i></p>
							<p style={{marginLeft: 5, border: "1px solid black", padding: 5, cursor: "pointer"}}><i class="material-icons">table_chart</i></p>
						</div> 
						<div style={{display: "flex", flexDirection: "row", justifyContent: 'space-around', width:"100vw"}}>
						<VictoryPie
							data={sourceInfo}
							height={200}
							style={{
								labels: {
									fontSize: 12
								}
							}}
							radius={55}
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 }
							}}
							labels={(d) => {
								const formatingLabel = d.x.split('_').join(" ")
								return formatingLabel
							}}
						/>
							<VictoryPie
							data={companyInfo}
							radius={55}
							height={200}
							animate={{
								duration: 2000,
								onLoad: { duration: 5000 }
							}}
							style={{
								labels: {
									fontSize: 12
								}
							}}
							labels={(d) => {
								const formatingLabel = d.x.split('_').join(" ")
								return formatingLabel
							}}
						/>
						</div>
						<div style={{display: "flex", flexDirection: "row", justifyContent: 'space-around'}}>
						<div>
						<p> Daily Activity due</p>
						<VictoryChart
							theme={VictoryTheme.material}
							minDomain={{ y: 0 }}
							>
							<VictoryAxis dependentAxis 
							tickValues={this.sortTickValues(dayValue)}
							/>

							<VictoryAxis tickFormat={() => ''} 
							label="Daily Activity due"/>	
							
						<VictoryLine
							data={dayValue}
							style={{
								data: {
									stroke: "#FF5722", strokeWidth: 1
								}
							}}
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 }
							}}						
						/>
				</VictoryChart>
				</div>
				<div>
				<p> Weekly Activity due</p>
				<VictoryChart
							theme={VictoryTheme.material}
							minDomain={{ y: 0 }}
							>
							<VictoryAxis dependentAxis 
							tickValues={this.sortTickValues(weeklyValue)}
							/>

							<VictoryAxis tickFormat={() => ''} 
							label="Weekly Activity Due"/>	
							
						<VictoryLine
							data={weeklyValue}
							style={{
								data: {
									stroke: "#FF5722", strokeWidth: 2
								}
							}}
							animate={{
								duration: 2000,
								onLoad: { duration: 1000 }
							}}	
						/>
				</VictoryChart>
				</div>
				<div>
					<p> Monthly Activity due</p>
					<VictoryChart
								theme={VictoryTheme.material}
								minDomain={{ y: 0 }}
								>
								<VictoryAxis dependentAxis 
								tickValues={this.sortTickValues(monthlyValue)}
								/>

								<VictoryAxis tickFormat={() => ''} 
								label="Monthly Activity due"/>	
								
							<VictoryLine
								data={monthlyValue}
								style={{
									data: {
										stroke: "#FF5722", strokeWidth: 2
									}
								}}
								animate={{
									duration: 2000,
									onLoad: { duration: 1000 }
								}}	
							/>
					</VictoryChart>
				</div>
				</div>
			</div>)
			}
				</section>
			)
		}

		return (
			<>
				<Nav>
					<Button onClick={() => this.setState({dataVisulatization: !this.state.dataVisulatization})}> {this.state.dataVisulatization ?  "Dashboard" : "Performance Analysis"} </Button>
					<Button href='auth/logout'>Sign out</Button>
				</Nav>
				{content}
			</>
		)
	}

}

export default Active