import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import SelectField from 'components/FormFields/SelectField'
import NumberField from 'components/FormFields/NumberField'

UpdateOptionForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
	ramOptionList: PropTypes.array,
	romOptionList: PropTypes.array,
	colorOptionList: PropTypes.array,
}

UpdateOptionForm.defaultProps = {
	data: null,
	onSubmit: null,
	ramOptionList: [],
	romOptionList: [],
	colorOptionList: [],
}

const schema = yup
	.object()
	.shape({
		ram_id: yup.number().nullable().required('Bạn phải chọn cấu hình ram!'),
		rom_id: yup.number().nullable().required('Bạn phải chọn cấu hình rom!'),
		color_id: yup
			.number()
			.nullable()
			.required('Bạn phải chọn màu sắc cho sản phẩm!'),
		original_price: yup
			.number()
			.nullable()
			.required('Bạn phải nhập giá gốc cho sản phẩm!'),
		sale_price: yup
			.number()
			.nullable()
			.required('Bạn phải nhập giá khuyến mãi cho sản phẩm!')
			.max(
				yup.ref('original_price'),
				'Giá khuyến mãi phải nhỏ hơn hoặc bằng giá gốc!'
			),
	})
	.required()

function UpdateOptionForm(props) {
	const { data, onSubmit, ramOptionList, romOptionList, colorOptionList } =
		props

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: data?.id,
			product_id: data?.product_id,
			ram_id: data?.ram_id,
			rom_id: data?.rom_id,
			color_id: data?.color_id,
			original_price: data?.original_price,
			sale_price: data?.sale_price,
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		if (onSubmit) {
			await onSubmit(values)
		}
	}

	return (
		<div>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Cập nhật cấu hình
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
				<SelectField
					form={form}
					name="ram_id"
					label="Cấu hình ram"
					placeholder="Chọn cấu hình ram"
					optionList={ramOptionList}
				/>

				<SelectField
					form={form}
					name="rom_id"
					label="Cấu hình rom"
					placeholder="Chọn cấu hình rom"
					optionList={romOptionList}
				/>

				<SelectField
					form={form}
					name="color_id"
					label="Màu sắc"
					placeholder="Chọn màu sắc cho sản phẩm"
					optionList={colorOptionList}
				/>

				<NumberField
					form={form}
					name="original_price"
					label="Giá gốc"
					placeholder="Nhập giá gốc cho sản phẩm"
					min={0}
					addonAfter="đ"
				/>

				<NumberField
					form={form}
					name="sale_price"
					label="Giá khuyến mãi"
					placeholder="Nhập giá khuyến mãi cho sản phẩm"
					min={0}
					addonAfter="đ"
				/>

				<Form.Item
					wrapperCol={{
						offset: 6,
						span: 18,
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

export default UpdateOptionForm
