import React from 'react'

import s from './button.less'

const Button = (props) => {
	const { className, button, icon, block, alt, size, children, ...rest } = props

	const classes = [s.button]
	if (className) {
		classes.push(className)
	}
	if (block) {
		classes.push(s.block)
	}
	if (alt) {
		classes.push(s.alt)
	}
	if (size === 'large') {
		classes.push(s.large)
	}
	else if (size === 'small') {
		classes.push(s.small)
	}

	if (button) {
		return (
			<button className={classes.join(' ')} {...rest}>
				{icon ? <i className={`${s.icon} ${icon}`} /> : null}
				{children}
			</button>
		)
	}
	else {
		return (
			<a className={classes.join(' ')} {...rest}>
				{icon ? <i className={`${s.icon} ${icon}`} /> : null}
				{children}
			</a>
		)
	}
}

export default Button
