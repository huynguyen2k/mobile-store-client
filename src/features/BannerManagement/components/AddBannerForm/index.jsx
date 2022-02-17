import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import { AreaChartOutlined } from '@ant-design/icons/lib/icons'
import SwitchField from 'components/FormFields/SwitchField'
import UploadField from 'components/FormFields/UploadField'

AddBannerForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddBannerForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		name: yup.string().required('Bạn phải nhập tên banner!'),
		image: yup.object().nullable().required('Bạn phải chọn ảnh làm banner!'),
	})
	.required()

function AddBannerForm({ onSubmit }) {
	const user = useSelector(state => state.auth.user)
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			image: null,
			name: '',
			published: false,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			image: values.image.originFileObj,
			name: values.name,
			published: Number(values.published),
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			user_id: user.id,
		}
		const formData = new FormData()
		for (const key in newValues) {
			formData.append(key, newValues[key])
		}

		if (onSubmit) {
			await onSubmit(formData)
		}
	}

	return (
		<div>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thêm banner
			</Typography.Title>

			<Form
				colon={false}
				labelCol={{
					span: 5,
				}}
				wrapperCol={{
					span: 19,
				}}
				size="large"
				autoComplete="off"
				onSubmitCapture={form.handleSubmit(handleSubmit)}
			>
				<UploadField form={form} name="image" label="Ảnh banner" />

				<InputField
					form={form}
					name="name"
					label="Tên banner"
					prefix={<AreaChartOutlined />}
					placeholder="Nhập tên banner"
				/>

				<SwitchField form={form} name="published" label="Hiển thị" />

				<Form.Item
					wrapperCol={{
						offset: 5,
						span: 19,
					}}
					style={{ marginBottom: 0 }}
				>
					<Button
						block
						type="primary"
						htmlType="submit"
						loading={form.formState.isSubmitting}
					>
						Thêm banner
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddBannerForm
