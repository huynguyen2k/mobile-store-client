import { Form, Select } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

SelectField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	optionList: PropTypes.array,
	disabled: PropTypes.bool,
	placeholder: PropTypes.string,
}

SelectField.defaultProps = {
	label: '',
	optionList: [],
	disabled: false,
	placeholder: '',
}

function SelectField(props) {
	const { form, name, label, optionList, ...restProps } = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	return (
		<Form.Item
			name={name}
			label={label}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Select
				allowClear
				showSearch
				optionFilterProp="children"
				filterOption={(input, option) => {
					return option.children
						.toLowerCase()
						.normalize()
						.includes(input.toLowerCase().normalize())
				}}
				{...field}
				{...restProps}
			>
				{optionList.map(option => (
					<Select.Option key={option.value} value={option.value}>
						{option.label}
					</Select.Option>
				))}
			</Select>
		</Form.Item>
	)
}

export default SelectField
