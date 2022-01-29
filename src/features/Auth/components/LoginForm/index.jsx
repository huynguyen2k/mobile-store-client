import { LockOutlined, UserOutlined } from '@ant-design/icons/lib/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import './style.scss'

LoginForm.propTypes = {
	onSubmit: PropTypes.func,
}

LoginForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		email: yup
			.string()
			.email('Email của bạn không hợp lệ!')
			.required('Bạn phải nhập email!'),
		password: yup.string().required('Bạn phải nhập mật khẩu'),
	})
	.required()

function LoginForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		if (onSubmit) {
			await onSubmit(values)
		}
	}

	return (
		<div className="login-form">
			<div className="login-form__container">
				<div className="login-form__banner">
					<img src="/assets/images/login-banner.jpg" alt="Login banner" />
				</div>

				<div className="login-form__form">
					<Typography.Title className="login-form__title" level={3}>
						Đăng nhập
					</Typography.Title>

					<Form
						colon={false}
						labelCol={{
							span: 6,
						}}
						wrapperCol={{
							span: 18,
						}}
						size="large"
						autoComplete="off"
						onSubmitCapture={form.handleSubmit(handleSubmit)}
					>
						<InputField
							form={form}
							name="email"
							label="Email"
							prefix={<UserOutlined />}
							placeholder="Nhập email của bạn"
						/>

						<InputField
							form={form}
							name="password"
							label="Mật khẩu"
							type="password"
							prefix={<LockOutlined />}
							placeholder="Nhập mật khẩu của bạn"
						/>

						<Form.Item
							style={{ marginBottom: 0 }}
							wrapperCol={{
								offset: 6,
								span: 18,
							}}
						>
							<Button
								block
								type="primary"
								htmlType="submit"
								loading={form.formState.isSubmitting}
							>
								Đăng nhập
							</Button>
						</Form.Item>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default LoginForm
