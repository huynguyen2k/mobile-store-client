import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { useController } from 'react-hook-form'

InputField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	type: PropTypes.string,
	prefix: PropTypes.node,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
}

InputField.defaultProps = {
	label: '',
	type: 'text',
	prefix: null,
	disabled: false,
	placeholder: '',
}

function InputField(props) {
	const { form, name, label, ...restProps } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	return (
		<Form.Item
			label={label}
			name={name}
			initialValue={field.value}
			validateStatus={fieldState.invalid ? 'error' : ''}
			help={fieldState.error?.message}
		>
			{restProps.type === 'password' ? (
				<Input.Password {...field} {...restProps} />
			) : (
				<Input {...field} {...restProps} />
			)}
		</Form.Item>
	)
}

export default InputField
