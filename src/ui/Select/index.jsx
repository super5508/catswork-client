import React from 'react'
import SelectComponent from 'react-select'

import s from './select.less'

class Select extends React.Component {

	state = { focused: false }

	render() {
		const { className, selectClassName, block, icon, selectRef, options, ...rest } = this.props

		const classes = [s.container]
		const selectClasses = [s.select]
		if (className) {
			classes.push(className)
		}
		if (selectClassName) {
			selectClasses.push(selectClassName)
		}
		if (block) {
			classes.push(s.block)
		}
		if (this.state.focused) {
			classes.push(s.focused)
		}

		const reactSelectOptions = Object.keys(options).map(key => ({
			value: key,
			label: options[key]
		}))

		return (
			<div className={classes.join(' ')}>
				{icon ? <i className={`${s.icon} ${icon}`} /> : null}
				<SelectComponent className={selectClasses.join(' ')}
					ref={selectRef}
					options={reactSelectOptions}
					styles={{
						control: styles => ({
							...styles,
							minHeight: '0',
							padding: '0.5em 0.75em',
							border: 'none',
							borderRadius: 0,
							ouline: 'none',
							boxShadow: 'none'
						}),
						valueContainer: styles => ({
							...styles,
							padding: '0'
						}),
						input: styles => ({
							...styles,
							margin: '0 2px',
							padding: '0'
						}),
						indicatorSeparator: styles => ({
							...styles,
							display: 'none'
						}),
						dropdownIndicator: styles => ({
							...styles,
							width: '19px',
							height: '19px',
							padding: '0'
						})
					}}
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

export default Select
