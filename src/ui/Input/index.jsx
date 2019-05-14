import React from 'react'

import s from './input.less'

class Input extends React.Component {

	state = { focused: false }

	render() {
		const { className, inputClassName, block, icon, inputRef, ...rest } = this.props

		const classes = [s.container]
		const inputClasses = [s.input]
		if (className) {
			classes.push(className)
		}
		if (inputClassName) {
			inputClasses.push(inputClassName)
		}
		if (block) {
			classes.push(s.block)
		}
		if (this.state.focused) {
			classes.push(s.focused)
		}

		return (
			<div className={classes.join(' ')}>
				{icon ? <i className={`${s.icon} ${icon} `} /> : null}
				<input className={inputClasses.join(' ')}
					size='1'
					ref={inputRef}
					{...rest}
					onFocus={this._onFocus}
					onBlur={this._onBlur} />
			</div>
		)
	}

	_onFocus = (event) => {
		this.setState({ focused: true })
		if (this.props.onFocus) {
			this.props.onFocus(event)
		}
	}

	_onBlur = (event) => {
		this.setState({ focused: false })
		if (this.props.onBlur) {
			this.props.onBlur(event)
		}
	}

}

export default Input
