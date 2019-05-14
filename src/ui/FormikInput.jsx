import React from 'react'

import Input from './Input'

const FormikInput = ({ field, form, ...rest }) => (
	<Input {...field} {...rest} />
)

export default FormikInput
