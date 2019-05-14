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
		Status.status().then(action((status) => {
			this.$user = status.user
		}))
	}

	@action
	reload() {
		this.$user = undefined

		this.load()
	}

}

const state = new State()
export { ActiveStep, state as default }
