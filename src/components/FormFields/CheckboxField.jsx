import { Checkbox, Form } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

CheckboxField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
}

CheckboxField.defaultProps = {
	label: '',
	disabled: false,
}

function CheckboxField(props) {
	const { form, name, label, disabled } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	return (
		<Form.Item
			label={' '}
			name={name}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Checkbox
				name={field.name}
				checked={field.value}
				onChange={field.onChange}
				onBlur={field.onBlur}
				disabled={disabled}
				ref={field.ref}
			>
				{label}
			</Checkbox>
		</Form.Item>
	)
}

export default CheckboxField
