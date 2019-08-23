import axios from 'axios'

class Status {

	static status() {
		return axios.get('http://dashboard.catswork.io/api/status', {withCredentials: true})
	}

}

export default Status
