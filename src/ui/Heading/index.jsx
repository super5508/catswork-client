import React from 'react'

import s from './heading.less'

const Heading = (props) => {
	const { size, primary, secondary, children, ...rest } = props

	const classes = [s.heading]
	switch (size) {
		case 1:
			classes.push(s.s1)
			break
		case 2:
			classes.push(s.s2)
			break
		case 3:
			classes.push(s.s3)
			break
		case 4:
			classes.push(s.s4)
			break
		case 5:
			throw 'Invalid heading size'
	}
	if (primary) {
		classes.push(s.primary)
	}
	if (secondary) {
		classes.push(s.secondary)
	}

	return React.createElement(`h${size}`, {
		className: classes.join(' '),
		...rest
	}, children)
}

export default Heading
