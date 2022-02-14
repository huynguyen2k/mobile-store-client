import { Form, Radio } from 'antd'
import React from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'

RadioField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	optionList: PropTypes.array,
}

RadioField.defaultProps = {
	label: '',
	disabled: false,
	optionList: [],
}

function RadioField(props) {
	const { name, form, label, disabled, optionList } = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	const handleChangeRadio = e => {
		field.onChange(e)
		field.onBlur()
	}

	return (
		<Form.Item
			name={name}
			label={label}
			initialValue={field.value}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Radio.Group
				name={field.name}
				value={field.value}
				onChange={handleChangeRadio}
				disabled={disabled}
			>
				{optionList.map(optionItem => (
					<Radio key={optionItem.value} value={optionItem.value}>
						{optionItem.label}
					</Radio>
				))}
			</Radio.Group>
		</Form.Item>
	)
}

export default RadioField
