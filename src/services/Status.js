import axios from 'axios'

class Status {

	static status() {
		return axios.get('http://35.209.101.114/api/status', {withCredentials: true})
	}

}

export default Status
