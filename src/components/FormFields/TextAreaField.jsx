import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Form, Input } from 'antd'

TextAreaField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	autoSize: PropTypes.object,
}

TextAreaField.defaultProps = {
	label: '',
	disabled: false,
	placeholder: '',
	autoSize: { minRows: 2, maxRows: 2 },
}

function TextAreaField(props) {
	const { form, name, label, autoSize, disabled, placeholder } = props
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
			<Input.TextArea
				{...field}
				autoSize={autoSize}
				disabled={disabled}
				placeholder={placeholder}
			/>
		</Form.Item>
	)
}

export default TextAreaField
