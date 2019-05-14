import React from 'react'

import Select from './Select'

class FormikSelect extends React.Component {

	_select

	componentDidMount() {
		this._select.addEventListener('change', this._onRawChange)
	}

	componentWillUnmount() {
		this._select.removeEventListener('change', this._onRawChange)
	}

	render() {
		const { field, form, options, ...rest } = this.props

		const optionValue = field.value ? {
			value: field.value,
			label: options[field.value]
		} : null
		const optionElements = Object.keys(options).map(key => (
			<option key={key} value={key} />
		))

		return (
			<>
				<Select {...field} {...rest}
					options={options}
					value={optionValue}
					onChange={this._onChange} />
				<select style={{ display: 'none' }}
					name={field.name}
					ref={select => this._select = select}>{optionElements}</select>
			</>
		)
	}

	_onChange = (option) => {
		this._select.value = option ? option.value : null
		const event = new Event('change')
		this._select.dispatchEvent(event)
	}

	_onRawChange = (event) => {
		this.props.field.onChange(event)
	}

}

export default FormikSelect
