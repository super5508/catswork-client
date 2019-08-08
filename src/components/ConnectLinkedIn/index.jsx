import React from 'react'

import Nav from 'components/Nav'

import Heading from 'ui/Heading'
import Button from 'ui/Button'

import s from './connectLinkedIn.less'

const ConnectLinkedIn = () => (
	<>
		<Nav>
			<Button href='/sign-out'>Sign out</Button>
		</Nav>
		<section className={s.connectLinkedIn}>
			<Heading size={1} primary>Final step</Heading>
			<Heading size={2}>Connect your LinkedIn account</Heading>
			<p>yada yada why are we asking this...</p>
			<Button size='large' href='auth/linkedin/'>Connect account</Button>
		</section>
	</>
)

export default ConnectLinkedIn
