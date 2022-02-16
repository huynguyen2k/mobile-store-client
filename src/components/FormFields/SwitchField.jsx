import React from 'react'
import PropTypes from 'prop-types'
import { Form, Switch } from 'antd'
import { useController } from 'react-hook-form'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons/lib/icons'

SwitchField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
}

SwitchField.defaultProps = {
	label: '',
	disabled: false,
}

function SwitchField(props) {
	const { form, name, label, disabled } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	return (
		<Form.Item
			name={name}
			label={label}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Switch
				ref={field.ref}
				checked={field.value}
				onChange={field.onChange}
				checkedChildren={<CheckOutlined />}
				unCheckedChildren={<CloseOutlined />}
				disabled={disabled}
			/>
		</Form.Item>
	)
}

export default SwitchField
