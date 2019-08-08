import { observer } from 'mobx-react'
import React from 'react'
import state, { ActiveStep } from 'state/state'
import Loading from 'ui/Loading'
import SignedOut from './SignedOut'
import SetUp from './SetUp'
import ConnectLinkedIn from './ConnectLinkedIn'
import Active from './Active'

@observer
class App extends React.Component {

	componentWillMount() {
		state.load()
	}

	render() {
		console.log(state.$user)
		if (state.$user === undefined) {
			return <Loading />
		}
		else if (state.$user === null) {
			return <SignedOut />
		}
		else if (state.$user === ActiveStep.SET_UP) {
			return <SetUp />
		}
		else if (state.$user === ActiveStep.CONNECT_LINKED_IN) {
			console.log(`linkedin`)
			return <ConnectLinkedIn />
		}
		else if (state.$user === ActiveStep.ACTIVE) {
			return <Active />
		}
		else {
			return null
		}
	}

}

export default App
