import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import * as yup from 'yup'

import { Month, Industry, DegreeType, Major } from 'models/enums'

import Loading from 'ui/Loading'
import Input from 'ui/FormikInput'
import Select from 'ui/FormikSelect'
import Button from 'ui/Button'

import s from './setUpForm.less'

const INITIAL_VALUES = {
	desiredIndustry: '',
	graduationMonth: '',
	graduationYear: '',
	degree: '',
	major: ''
}
const VALIDATION_SCHEMA = yup.object().shape({
	desiredIndustry: yup.string().required('Required'),
	graduationMonth: yup.string().required('Required'),
	graduationYear: yup.number().typeError('Invalid').required('Required').integer('Invalid').min(1900, '1900-2030').max(2030, '1900-2030'),
	degree: yup.string().required('Required'),
	major: yup.number().required('Required').integer('Invalid')
})

class SetUpForm extends React.Component {

	_initialValues

	componentWillMount() {
		this._initialValues = { ...INITIAL_VALUES }
	}

	render() {
		return (
			<div className={s.setUpForm}>
				<Formik initialValues={this._initialValues}
					validationSchema={VALIDATION_SCHEMA}
					onSubmit={this._onSubmit}
					render={({ isSubmitting }) => (
						<Form>
							<div className={s.inputs}>
								{isSubmitting ? <div className={s.overlay} /> : null}
								{isSubmitting ? <Loading /> : null}
								<div className={s.container}>
									<ErrorMessage name='desiredIndustry' render={error => <div className={s.error}>{error}</div>} />
									<Field name='desiredIndustry'
										block
										icon='fas fa-industry'
										placeholder='Desired industry'
										options={Industry}
										component={Select} />
								</div>
								<div className={s.halfContainer}>
									<div className={s.half}>
										<ErrorMessage name='graduationMonth' render={error => <div className={s.error}>{error}</div>} />
										<Field name='graduationMonth'
											block
											icon='fas fa-graduation-cap'
											placeholder='Graduation month'
											options={Month}
											component={Select} />
									</div>
									<div className={s.half}>
										<ErrorMessage name='graduationYear' render={error => <div className={s.error}>{error}</div>} />
										<Field name='graduationYear'
											block
											placeholder='Graduation year'
											component={Input} />
									</div>
								</div>
								<div className={s.container}>
									<ErrorMessage name='degree' render={error => <div className={s.error}>{error}</div>} />
									<Field name='degree'
										block
										icon='fas fa-certificate'
										placeholder='Degree'
										options={DegreeType}
										component={Select} />
								</div>
								<div className={s.container}>
									<ErrorMessage name='major' render={error => <div className={s.error}>{error}</div>} />
									<Field name='major'
										block
										icon='fas fa-university'
										placeholder='Field of study'
										options={Major}
										component={Select} />
								</div>
							</div>
							<Button className={s.submitButton}
								button
								size='large'
								type='submit'
								disabled={isSubmitting}>Next</Button>
						</Form>
					)} />
			</div>
		)
	}

	_onSubmit = (values) => {
		this.props.onSetUp(values.desiredIndustry, values.graduationMonth, parseInt(values.graduationYear), values.degree, parseInt(values.major))
	}

}

export default SetUpForm
