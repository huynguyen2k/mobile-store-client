import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'

UpdatePasswordForm.propTypes = {
	onSubmit: PropTypes.func,
}

UpdatePasswordForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		password: yup
			.string()
			.required('Bạn phải nhập mật khẩu hiện tại!')
			.min(6, 'Mật khẩu phải từ 6-32 ký tự!')
			.max(32, 'Mật khẩu phải từ 6-32 ký tự!'),
		new_password: yup
			.string()
			.required('Bạn phải nhập mật khẩu mới!')
			.min(6, 'Mật khẩu phải từ 6-32 ký tự!')
			.max(32, 'Mật khẩu phải từ 6-32 ký tự!'),
		password_confirm: yup
			.string()
			.required('Bạn phải nhập mật khẩu xác nhận!')
			.oneOf([yup.ref('new_password')], 'Mật khẩu xác nhận không khớp!'),
	})
	.required()

function UpdatePasswordForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			password: '',
			new_password: '',
			password_confirm: '',
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = { ...values }
		delete newValues.password_confirm

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
				Cập nhật mật khẩu
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
					name="password"
					label="Mật khẩu hiện tại"
					type="password"
					placeholder="Nhập mật khẩu hiện tại"
				/>

				<InputField
					form={form}
					name="new_password"
					label="Mật khẩu mới"
					type="password"
					placeholder="Nhập mật khẩu mới"
				/>

				<InputField
					form={form}
					name="password_confirm"
					label="Xác nhận"
					type="password"
					placeholder="Nhập lại mật khẩu mới"
				/>

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
						Cập nhật mật khẩu
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default UpdatePasswordForm
