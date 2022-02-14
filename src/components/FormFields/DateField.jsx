import { DatePicker, Form } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

DateField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
}

DateField.defaultProps = {
	label: '',
	disabled: false,
	placeholder: '',
}

function DateField(props) {
	const { name, form, label, ...restProps } = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	return (
		<Form.Item
			label={label}
			name={name}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<DatePicker
				format="DD-MM-YYYY"
				style={{ width: '100%' }}
				{...field}
				{...restProps}
			/>
		</Form.Item>
	)
}

export default DateField
