import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import ReactTable from 'react-table'

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

@observer
class Active extends React.Component {

	constructor(props){
		super(props);

		this.state = {searchtext:'',searchpanel:'',modalIsOpen:false,anchorEl:null,list:[],filterText:'',list_sort:[],sorting:false,sorted_list:[],sort_field:'',sortingpanel:[],
		data_table:[
			{
			first:'Harsha',last:'Kumar',company:'LD',industry:'TECH',position:'Developer',email:'harzkr142@gmail.com',phone:'+917060334717',location:'Gurugram',education:'Masters',
			hometown:'Asansol',extracurriculars:'Sports, Reading, Debating',website:'',notes:'',source:'OTHER'
			},
			{
				first:'Vincent',last:'Park',company:'Dresden Park',industry:'TECH',position:'Investment Bank',email:'vincentpark@gmail.com',phone:'',location:'US',education:'Masters',
				hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
			},
			{
				first:'Alex',last:'Grimes',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
				hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
			},
			{
				first:'Fredrick',last:'Jones',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
				hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
			},
			{
				first:'Jonas',last:'Brothers',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
				hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
			}
		]}
	}

	@observable.ref _$people = null

	componentWillMount() {
		GraphQL.query(PEOPLE_QUERY)
			.then(action(({ data }) => {
				console.log(data)
				this._$people = data.catWorksDashboard
			}))
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
		var func = this
		this.setState({anchorEl:event.currentTarget})
		let list = []
		const {sortingpanel,data_table} = this.state;
		let field_value = field
		var func = this
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
			  func.setState({
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
		let list_table = [
		{
		  first:'Harsha',last:'Kumar',company:'LD',industry:'TECH',position:'Developer',email:'harzkr142@gmail.com',phone:'+917060334717',location:'Gurugram',education:'Masters',
		  hometown:'Asansol',extracurriculars:'Sports, Reading, Debating',website:'',notes:'',source:'OTHER'
		},
		{
			first:'Vincent',last:'Park',company:'Dresden Park',industry:'TECH',position:'Investment Bank',email:'vincentpark@gmail.com',phone:'',location:'US',education:'Masters',
			hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
		  },
		{
			first:'Alex',last:'Grimes',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
			hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
		},
		{
			first:'Fredrick',last:'Jones',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
			hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
		},
		{
			first:'Jonas',last:'Brothers',company:'North Western',industry:'TECH',position:'Student-Athlete',email:'alexgrimes@gmail.com',phone:'',location:'US',education:'Bachelors',
			hometown:'New York',extracurriculars:'',website:'',notes:'',source:'LINKED_IN'
		}
	] 
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

	render() {
		//Make change in the data part of the react table
		let content
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
			Header: 'source',
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
				</section>
			)
		}

		return (
			<>
				<Nav>
					<Button href='/sign-out'>Sign out</Button>
				</Nav>
				{content}
			</>
		)
	}

}

export default Active