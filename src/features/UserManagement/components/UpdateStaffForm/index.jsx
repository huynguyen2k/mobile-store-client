import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import UploadField from 'components/FormFields/UploadField'
import SelectField from 'components/FormFields/SelectField'
import InputField from 'components/FormFields/InputField'
import { PhoneOutlined, UserOutlined } from '@ant-design/icons/lib/icons'
import DateField from 'components/FormFields/DateField'
import RadioField from 'components/FormFields/RadioField'
import genderList from 'constants/genderList'
import moment from 'moment'

UpdateStaffForm.propTypes = {
	onSubmit: PropTypes.func,
	roleList: PropTypes.array,
	updateData: PropTypes.object,
}

UpdateStaffForm.defaultProps = {
	onSubmit: null,
	roleList: [],
	updateData: null,
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
		gender: yup.number().nullable(),
		phone_number: yup
			.string()
			.required('Bạn phải nhập số điện thoại!')
			.matches(/^0\d{9}$/g, 'Số điện thoại bạn nhập không hợp lệ!'),
		date_of_birth: yup.object().nullable(),
	})
	.required()

function UpdateStaffForm({ onSubmit, roleList, updateData }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: updateData?.id,
			avatar: null,
			full_name: updateData?.full_name,
			date_of_birth: updateData?.date_of_birth
				? moment(updateData?.date_of_birth, 'YYYY-MM-DD', true)
				: null,
			gender: updateData?.gender,
			phone_number: updateData?.phone_number,
			role_id: updateData?.role_id,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
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
				Cập nhật thông tin
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
				<UploadField
					name="avatar"
					form={form}
					label="Ảnh đại diện"
					defaultUrl={updateData?.avatar}
				/>

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

				<RadioField
					name="gender"
					form={form}
					label="Giới tính"
					optionList={genderList}
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
						Cập nhật
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default UpdateStaffForm
