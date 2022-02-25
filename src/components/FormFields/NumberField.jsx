import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Form, InputNumber } from 'antd'

NumberField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	prefix: PropTypes.node,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	addonAfter: PropTypes.node,
}

NumberField.defaultProps = {
	label: '',
	prefix: null,
	disabled: false,
	placeholder: '',
	min: Number.MIN_SAFE_INTEGER,
	max: Number.MAX_SAFE_INTEGER,
	addonAfter: null,
}

function NumberField(props) {
	const { form, name, label, ...restProps } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	const handleFormatter = value => {
		if (value === '') return ''
		return new Intl.NumberFormat('vi-VN').format(value)
	}

	const handleParser = value => {
		const thousandSeparator = Intl.NumberFormat('vi-VN')
			.format(11111)
			.replace(/\p{Number}/gu, '')
		const decimalSeparator = Intl.NumberFormat('vi-VN')
			.format(1.1)
			.replace(/\p{Number}/gu, '')

		return parseFloat(
			value
				.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
				.replace(new RegExp('\\' + decimalSeparator), '.')
		)
	}

	return (
		<Form.Item
			preserve={false}
			label={label}
			name={name}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<InputNumber
				{...field}
				{...restProps}
				style={{ width: '100%' }}
				formatter={handleFormatter}
				parser={handleParser}
			/>
		</Form.Item>
	)
}

export default NumberField
