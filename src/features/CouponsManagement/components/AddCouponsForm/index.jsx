import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import NumberField from 'components/FormFields/NumberField'
import RangePickerField from 'components/FormFields/RangePickerField'

AddCouponsForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddCouponsForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		code: yup.string().required('Bạn phải nhập mã giảm giá!'),
		date_range: yup.array().nullable().required('Bạn phải chọn ngày áp dụng!'),
		quantity: yup.number().nullable().required('Bạn phải nhập số lượng!'),
		discount_value: yup
			.number()
			.nullable()
			.required('Bạn phải nhập trị giá giảm!'),
	})
	.required()

function AddCouponsForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			code: '',
			date_range: null,
			quantity: null,
			used_quantity: 0,
			discount_value: null,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			start_date: values.date_range[0].format('YYYY-MM-DD HH:mm:ss'),
			end_date: values.date_range[1].format('YYYY-MM-DD HH:mm:ss'),
		}
		delete newValues.date_range

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
				Thêm mã giảm giá
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
					name="code"
					label="Mã giảm giá"
					placeholder="Nhập mã giảm giá"
				/>

				<RangePickerField form={form} name="date_range" label="Ngày áp dụng" />

				<NumberField
					form={form}
					name="quantity"
					min={1}
					label="Số lượng"
					placeholder="Nhập số lượng mã giảm giá"
				/>

				<NumberField
					form={form}
					name="discount_value"
					min={1}
					label="Trị giá"
					placeholder="Nhập trị giá cho mã giảm giá"
					addonAfter="đ"
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
						Thêm mã giảm giá
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddCouponsForm
