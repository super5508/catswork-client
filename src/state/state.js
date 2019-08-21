import { observable, action } from 'mobx'

import Status from 'services/Status'

const ActiveStep = {
	DISABLED: 0,
	SET_UP: 1,
	CONNECT_LINKED_IN: 2,
	ACTIVE: 3,
	ADMIN: 4
}

class State {
	@observable.ref $user = undefined
	load() {
		//TODO: Not Optimal way of doing, actual way should be if there isn't token then redirect it to appropriate screen such as sign
		Status.status().then(action((status) => {
			this.$user = status.data.payload.activeStep
		})).catch((err) => {
			console.error(err)
			this.$user = null
		})
	}
	@action
	reload() {
		this.$user = undefined
		this.load()
	}
}

const state = new State()
export { ActiveStep, state as default }
