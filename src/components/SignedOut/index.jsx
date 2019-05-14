import React from 'react'

import Nav from 'components/Nav'

import Heading from 'ui/Heading'
import Button from 'ui/Button'

import s from './signedOut.less'

const SignedOut = () => (
	<>
		<Nav />
		<section className={s.signedOut}>
			<Heading size={1} primary>Hi there</Heading>
			<Heading size={2}>Welcome to <span className={s.catsTrack}>CatsTrack</span></Heading>
			<p>Sign in using your Google account to start using the app.</p>
			<Button size='large' href='/sign-in'>Sign in</Button>
		</section>
	</>
)

export default SignedOut
