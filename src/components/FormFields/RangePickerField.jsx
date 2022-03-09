import React from 'react'
import PropTypes from 'prop-types'
import { DatePicker, Form } from 'antd'
import { useController } from 'react-hook-form'
const { RangePicker } = DatePicker

RangePickerField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	placeholder: PropTypes.array,
}

RangePickerField.defaultProps = {
	label: '',
	disabled: false,
	placeholder: ['ngày bắt đầu', 'ngày kết thúc'],
}

function RangePickerField(props) {
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
			<RangePicker
				showTime={{ format: 'HH:mm' }}
				format="DD-MM-YYYY HH:mm"
				style={{ width: '100%' }}
				{...field}
				{...restProps}
			/>
		</Form.Item>
	)
}

export default RangePickerField
