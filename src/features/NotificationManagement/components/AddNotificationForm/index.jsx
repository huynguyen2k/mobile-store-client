import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import SwitchField from 'components/FormFields/SwitchField'
import TextAreaField from 'components/FormFields/TextAreaField'

AddNotificationForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddNotificationForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		title: yup.string().required('Bạn phải nhập tiêu đề thông báo!'),
		content: yup.string().required('Bạn phải nhập nội dung thông báo!'),
	})
	.required()

function AddNotificationForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			title: '',
			content: '',
			published: false,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}

		if (onSubmit) {
			await onSubmit(newValues)
		}
	}

	return (
		<div>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thêm thông báo
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
				<InputField
					form={form}
					name="title"
					label="Tiêu đề"
					placeholder="Nhập tiêu đề thông báo"
				/>

				<TextAreaField
					form={form}
					name="content"
					label="Nội dung"
					placeholder="Nhập nội dung thông báo"
					autoSize={{ minRows: 4, maxRows: 4 }}
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
						Thêm thông báo
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddNotificationForm
