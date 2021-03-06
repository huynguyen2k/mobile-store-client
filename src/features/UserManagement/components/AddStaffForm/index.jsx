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
import DateField from 'components/FormFields/DateField'
import RadioField from 'components/FormFields/RadioField'
import genderList from 'constants/genderList'

AddStaffForm.propTypes = {
	onSubmit: PropTypes.func,
	roleList: PropTypes.array,
}

AddStaffForm.defaultProps = {
	onSubmit: null,
	roleList: [],
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
		date_of_birth: yup.object().nullable(),
		gender: yup.number().nullable(),
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

function AddStaffForm({ onSubmit, roleList }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			avatar: null,
			role_id: null,
			full_name: '',
			phone_number: '',
			date_of_birth: null,
			gender: null,
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

		if (newValues.avatar) {
			newValues.avatar = newValues.avatar.originFileObj
		} else {
			delete newValues.avatar
		}
		if (newValues.date_of_birth) {
			newValues.date_of_birth = newValues.date_of_birth.format('YYYY-MM-DD')
		} else {
			delete newValues.date_of_birth
		}
		if (newValues.gender === null) {
			delete newValues.gender
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
					optionList={roleList}
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

				<DateField
					form={form}
					name="date_of_birth"
					label="Năm sinh"
					placeholder="Chọn năm sinh của nhân viên"
				/>

				<RadioField
					name="gender"
					form={form}
					label="Giới tính"
					optionList={genderList}
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
