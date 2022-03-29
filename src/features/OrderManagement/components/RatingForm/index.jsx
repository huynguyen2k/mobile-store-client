import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import moment from 'moment'
import { Button, Form, Typography } from 'antd'
import TextAreaField from 'components/FormFields/TextAreaField'
import MultiUploadField from 'components/FormFields/MultiUploadField'
import ratingApi from 'api/ratingApi'
import RatingField from 'components/FormFields/RatingField'

RatingForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
}

RatingForm.defaultProps = {
	data: null,
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		rating: yup
			.number()
			.nullable()
			.required('Vui lòng chọn số sao mà bạn muốn đánh giá!')
			.min(1, 'Số sao đánh giá phải từ 1 đến 5!')
			.max(5, 'Số sao đánh giá phải từ 1 đến 5!'),
		content: yup.string().required('Bạn phải nhập nội dung đánh giá!'),
	})
	.required()

function RatingForm({ data, onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			rating: null,
			content: '',
			product_id: data?.product_id,
			images: [],
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			images: values.images.map(image => image.url),
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
		}

		if (onSubmit) {
			await onSubmit(newValues)
		}
	}

	const handleRemoveUploadFile = async file => {
		try {
			await ratingApi.deleteImage({ image: file.url })
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Đánh giá sản phẩm
			</Typography.Title>

			<Form
				colon={false}
				labelCol={{
					span: 4,
				}}
				wrapperCol={{
					span: 20,
				}}
				size="large"
				autoComplete="off"
				onSubmitCapture={form.handleSubmit(handleSubmit)}
			>
				<RatingField form={form} name="rating" label="Đánh giá" />

				<TextAreaField
					form={form}
					name="content"
					label="Nội dung"
					placeholder="Nhập nội dung đánh giá ở đây"
					autoSize={{ minRows: 4, maxRows: 4 }}
				/>

				<MultiUploadField
					form={form}
					name="images"
					label="Ảnh đính kèm"
					uploadName="image"
					action="http://localhost:8000/api/rating/upload-image"
					onRemove={handleRemoveUploadFile}
				/>

				<Form.Item
					wrapperCol={{
						offset: 4,
						span: 20,
					}}
					style={{ marginBottom: 0, textAlign: 'right' }}
				>
					<Button
						block
						type="primary"
						htmlType="submit"
						loading={form.formState.isSubmitting}
					>
						Gửi đánh giá
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default RatingForm
