import React from 'react'

import s from './dropdown.less'

class Dropdown extends React.Component {

	state = { active: false }

	render() {
		const { className, buttonClassName, block, alt, small, width, children, options, onSelect, ...rest } = this.props

		const classes = [s.container]
		const buttonClasses = [s.button]
		if (className) {
			classes.push(className)
		}
		if (buttonClassName) {
			buttonClasses.push(buttonClassName)
		}
		if (block) {
			classes.push(s.block)
			buttonClasses.push(s.buttonBlock)
		}
		if (alt) {
			classes.push(s.alt)
			buttonClasses.push(s.buttonAlt)
		}
		if (small) {
			classes.push(s.small)
			buttonClasses.push(s.buttonSmall)
		}
		if (this.state.active) {
			classes.push(s.active)
		}

		const optionElements = Object.keys(options).map(key => (
			<div key={key}
				className={s.option}
				onClick={this._onSelect.bind(null, key)}>{options[key]}</div>
		))

		return (
			<div className={classes.join(' ')} {...rest}>
				<a className={buttonClasses.join(' ')}
					onClick={this._onToggle}>
					<span className={s.content} style={{ width: width ? `${width - (small ? 33 : 47)}px` : 'auto' }}>{children}</span>
					<i className={[s.caret, 'fas fa-caret-down'].join(' ')} />
				</a>
				<div className={s.dropdown}>{optionElements}</div>
			</div>
		)
	}

	_onToggle = (event) => {
		this.setState({ active: !this.state.active })
	}

	_onSelect = (key) => {
		if (this.props.onSelect) {
			this.props.onSelect(key)
		}

		this.setState({ active: false })
	}

}

export default Dropdown
