import React from 'react'

import state from 'state/state'

import User from 'services/User'

import Heading from 'ui/Heading'
import Button from 'ui/Button'
import Nav from 'components/Nav'

import SetUpForm from './SetUpForm'

import s from './setUp.less'

class SetUp extends React.Component {

	render() {
		return (
			<>
				<Nav>
					<Button href='/sign-out'>Sign out</Button>
				</Nav>
				<section className={s.setUp}>
					<Heading size={1} primary>Welcome</Heading>
					<Heading size={2}>Looks like it's your first time here</Heading>
					<p>We need to get a few things out of the way before you can use the app.</p>
					<p>The following information will help us to improve your experience using CatsTrack.</p>
					<p>If you're unsure for any of these options, just choose what fits best. You'll be able to change this information at any point.</p>
					<SetUpForm onSetUp={this._onSetUp} />
				</section>
			</>
		)
	}

	_onSetUp = (desiredIndustry, graduationMonth, graduationYear, degree, major) => {
		User.setUp(desiredIndustry, graduationMonth, graduationYear, degree, major)
			.then(() => {
				state.reload()
			})
	}

}

export default SetUp
