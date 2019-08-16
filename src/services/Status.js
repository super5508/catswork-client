import axios from 'axios'

class Status {

	static status() {
		return axios.get('http://34.67.48.54/api/status', {withCredentials: true})
	}

}

export default Status
