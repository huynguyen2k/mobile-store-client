import { Form, Rate } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

RatingField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
}

RatingField.defaultProps = {
	label: '',
	disabled: false,
}

function RatingField(props) {
	const { form, name, label, disabled } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	return (
		<Form.Item
			label={label}
			name={name}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Rate {...field} disabled={disabled} />
		</Form.Item>
	)
}

export default RatingField
