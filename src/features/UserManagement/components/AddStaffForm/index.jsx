import {
	GooglePlusOutlined,
	LockOutlined,
	PhoneOutlined,
	UserOutlined,
} from '@ant-design/icons/lib/icons'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import './style.scss'
import moment from 'moment'
import UploadField from 'components/FormFields/UploadField'
import SelectField from 'components/FormFields/SelectField'

AddStaffForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddStaffForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		avatar: yup.object().nullable(),
		role_id: yup
			.number()
			.nullable()
			.required('Bạn phải chọn vai trò cho nhân viên!'),
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

function AddStaffForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			avatar: null,
			role_id: null,
			full_name: '',
			phone_number: '',
			email: '',
			password: '',
			confirmPassword: '',
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
		<div>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thêm nhân viên
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
				<UploadField name="avatar" form={form} label="Ảnh đại diện" />

				<SelectField
					name="role_id"
					form={form}
					label="Vai trò"
					placeholder="Chọn chức vụ cho nhân viên"
					optionList={[
						{
							value: 1,
							label: 'Quản trị',
						},
						{
							value: 2,
							label: 'Nhân viên',
						},
						{
							value: 3,
							label: 'Khách hàng',
						},
					]}
				/>

				<InputField
					form={form}
					name="full_name"
					label="Họ tên"
					prefix={<UserOutlined />}
					placeholder="Nhập họ tên nhân viên"
				/>

				<InputField
					form={form}
					name="phone_number"
					label="Số điện thoại"
					prefix={<PhoneOutlined />}
					placeholder="Nhập số điện thoại nhân viên"
				/>

				<InputField
					form={form}
					name="email"
					label="Email"
					prefix={<GooglePlusOutlined />}
					placeholder="Nhập email nhân viên"
				/>

				<InputField
					form={form}
					name="password"
					label="Mật khẩu"
					type="password"
					prefix={<LockOutlined />}
					placeholder="Nhập mật khẩu cho nhân viên"
				/>

				<InputField
					form={form}
					name="confirmPassword"
					label="Xác nhận"
					type="password"
					prefix={<LockOutlined />}
					placeholder="Nhập lại mật khẩu xác nhận"
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
						Thêm nhân viên
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddStaffForm
