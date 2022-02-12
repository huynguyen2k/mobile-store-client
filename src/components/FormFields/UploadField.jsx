import { UploadOutlined } from '@ant-design/icons/lib/icons'
import { Button, Form, Upload } from 'antd'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { useController } from 'react-hook-form'

UploadField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	defaultUrl: PropTypes.string,
	uploadIcon: PropTypes.node,
	disabled: PropTypes.bool,
}

UploadField.defaultProps = {
	label: '',
	defaultUrl: '',
	uploadIcon: <UploadOutlined />,
	disabled: false,
}

function UploadField(props) {
	const { form, name, label, defaultUrl, uploadIcon, disabled } = props
	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	const fileList = useMemo(() => {
		if (defaultUrl && field.value === null) {
			return [
				{
					uid: '-1',
					name: 'image.png',
					status: 'done',
					url: defaultUrl,
				},
			]
		}
		return field.value ? [field.value] : []
	}, [defaultUrl, field.value])

	const handleChangeFile = ({ fileList }) => {
		if (!Array.isArray(fileList)) return

		if (fileList.length > 0) {
			field.onChange({
				target: {
					name: field.name,
					value: fileList[0],
				},
			})
			return
		}

		field.onChange({
			target: {
				name: field.name,
				value: null,
			},
		})
	}

	return (
		<Form.Item
			name={name}
			label={label}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Upload
				maxCount={1}
				listType="picture"
				disabled={disabled}
				beforeUpload={() => false}
				onChange={handleChangeFile}
				fileList={fileList}
			>
				<Button icon={uploadIcon} disabled={disabled} onBlur={field.onBlur}>
					Chọn ảnh
				</Button>
			</Upload>
		</Form.Item>
	)
}

export default UploadField
