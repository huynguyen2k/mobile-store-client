import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { Button, Form } from 'antd'
import UploadField from 'components/FormFields/UploadField'
import InputField from 'components/FormFields/InputField'
import RadioField from 'components/FormFields/RadioField'
import genderList from 'constants/genderList'
import DateField from 'components/FormFields/DateField'

AccountForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
	onChangePassword: PropTypes.func,
}

AccountForm.defaultProps = {
	data: null,
	onSubmit: null,
	onChangePassword: null,
}

const schema = yup
	.object()
	.shape({
		avatar: yup.object().nullable(),
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
		date_of_birth: yup.object().nullable(),
		gender: yup.number().nullable(),
		phone_number: yup
			.string()
			.required('Bạn phải nhập số điện thoại!')
			.matches(/^0\d{9}$/g, 'Số điện thoại bạn nhập không hợp lệ!'),
	})
	.required()

function AccountForm({ data, onSubmit, onChangePassword }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: data?.id,
			role_id: data?.role_id,
			avatar: null,
			full_name: data?.full_name,
			date_of_birth: data?.date_of_birth
				? moment(data?.date_of_birth, 'YYYY-MM-DD', true)
				: null,
			gender: data?.gender,
			email: data?.email,
			phone_number: data?.phone_number,
		},
		resolver: yupResolver(schema),
	})

	const handleChangePassword = () => {
		if (onChangePassword) {
			onChangePassword()
		}
	}

	const handleSubmit = async values => {
		const newValues = {
			...values,
		}

		delete newValues.email
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

		if (onSubmit) {
			await onSubmit(newValues)
		}
	}

	return (
		<div className="account-form">
			<h3 className="account-form__title">Thông tin tài khoản</h3>

			<Form
				className="account-form__content"
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
				<UploadField
					form={form}
					name="avatar"
					label="Ảnh đại diện"
					defaultUrl={data?.avatar}
				/>

				<InputField
					form={form}
					name="full_name"
					label="Họ tên"
					placeholder="Nhập họ tên của bạn"
				/>

				<DateField
					form={form}
					name="date_of_birth"
					label="Năm sinh"
					placeholder="Chọn năm sinh của bạn"
				/>

				<RadioField
					form={form}
					name="gender"
					label="Giới tính"
					optionList={genderList}
				/>

				<InputField
					form={form}
					name="email"
					label="Email"
					placeholder="Nhập email của bạn"
					disabled
				/>

				<InputField
					form={form}
					name="phone_number"
					label="Số điện thoại"
					placeholder="Nhập số điện thoại của bạn"
				/>

				<Form.Item
					wrapperCol={{
						offset: 5,
						span: 19,
					}}
					style={{ marginBottom: 0 }}
				>
					<Button
						type="primary"
						htmlType="submit"
						loading={form.formState.isSubmitting}
					>
						Lưu thông tin
					</Button>

					<Button
						danger
						type="primary"
						htmlType="button"
						style={{ marginLeft: '16px' }}
						onClick={handleChangePassword}
					>
						Đổi mật khẩu
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AccountForm
