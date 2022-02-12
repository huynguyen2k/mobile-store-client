import React from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Typography, Form } from 'antd'
import InputField from 'components/FormFields/InputField'
import {
	GooglePlusOutlined,
	LockOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons/lib/icons'
import UserRoles from 'constants/UserRoles'
import moment from 'moment'
import { Link } from 'react-router-dom'

RegisterForm.propTypes = {
	onSubmit: PropTypes.func,
}

RegisterForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		full_name: yup
			.string()
			.required('Bạn phải nhập họ tên!')
			.test('at-least-two-words', 'Bạn phải nhập ít nhất 2 từ!', value => {
				const words = value.split(' ')
				const MIN_WORDS = 2

				return (
					words.length >= MIN_WORDS &&
					words.reduce((count, word) => count + (word.length > 0), 0) >=
						MIN_WORDS
				)
			}),
		phone_number: yup
			.string()
			.required('Bạn phải nhập số điện thoại!')
			.matches(/^0\d{9}$/g, 'Số điện thoại bạn nhập không hợp lệ!'),
		email: yup
			.string()
			.required('Bạn phải nhập email!')
			.email('Email bạn nhập không hợp lệ!'),
		password: yup
			.string()
			.required('Bạn phải nhập mật khẩu!')
			.min(6, 'Mật khẩu phải từ 6-32 ký tự!')
			.max(32, 'Mật khẩu phải từ 6-32 ký tự!'),
		confirmPassword: yup
			.string()
			.required('Bạn phải nhập mật khẩu xác nhận!')
			.oneOf([yup.ref('password')], 'Mật khẩu xác nhận không khớp!'),
	})
	.required()

function RegisterForm({ onSubmit }) {
	const form = useForm({
		mode: 'onChange',
		reValidateMode: 'onChange',
		defaultValues: {
			full_name: '',
			phone_number: '',
			email: '',
			password: '',
			confirmPassword: '',
			role_id: UserRoles.CUSTOMER.id,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}
		delete newValues.confirmPassword

		if (onSubmit) {
			await onSubmit(newValues)
		}
	}

	return (
		<div className="register-form">
			<div className="register-form__container">
				<div className="register-form__banner">
					<img src="/assets/images/login-banner.jpg" alt="register banner" />
				</div>

				<div className="register-form__form">
					<Typography.Title className="register-form__title" level={3}>
						Đăng ký
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
							name="full_name"
							label="Họ tên"
							prefix={<UserOutlined />}
							placeholder="Nhập họ tên của bạn"
						/>

						<InputField
							form={form}
							name="phone_number"
							label="Số điện thoại"
							prefix={<PhoneOutlined />}
							placeholder="Nhập số điện thoại của bạn"
						/>

						<InputField
							form={form}
							name="email"
							label="Email"
							prefix={<GooglePlusOutlined />}
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

						<InputField
							form={form}
							name="confirmPassword"
							label="Xác nhận"
							type="password"
							prefix={<LockOutlined />}
							placeholder="Nhập lại mật khẩu của bạn"
						/>

						<Form.Item
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
								Đăng ký
							</Button>
						</Form.Item>

						<div className="register-form__link-container">
							<Typography.Text className="text">
								Bạn đã có tài khoản?
							</Typography.Text>

							<Link to="/login" replace className="link">
								Đăng nhập
							</Link>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default RegisterForm
