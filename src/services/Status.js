import Http from './Http'

class Status {

	static status() {
		return Http.get('status')
	}

}

export default Status
