import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import useFetchData from 'hooks/useFetchData'
import brandApi from 'api/brandApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import productApi from 'api/productApi'
import { Button, Col, Form, Row, Typography } from 'antd'
import SelectField from 'components/FormFields/SelectField'
import InputField from 'components/FormFields/InputField'
import EditorField from 'components/FormFields/EditorField'
import SwitchField from 'components/FormFields/SwitchField'
import MultiUploadField from 'components/FormFields/MultiUploadField'
import NumberField from 'components/FormFields/NumberField'

const schema = yup
	.object()
	.shape({
		name: yup.string().required('Bạn phải nhập tên cho sản phẩm!'),
		specifications: yup
			.string()
			.required('Bạn phải nhập thông số kỹ thuật cho sản phẩm!'),
		description: yup.string().required('Bạn phải nhập mô tả cho sản phẩm!'),
		width: yup
			.number()
			.nullable()
			.required('Bạn phải nhập chiều rộng cho sản phẩm!'),
		height: yup
			.number()
			.nullable()
			.required('Bạn phải nhập chiều cao cho sản phẩm!'),
		weight: yup
			.number()
			.nullable()
			.required('Bạn phải nhập trọng lượng cho sản phẩm!'),
		length: yup
			.number()
			.nullable()
			.required('Bạn phải nhập chiều dài cho sản phẩm!'),
		brand_id: yup
			.number()
			.nullable()
			.required('Bạn phải chọn thương hiệu cho sản phẩm!'),
		images: yup.array().min(2, 'Bạn phải chọn tối thiểu 2 ảnh cho sản phẩm!'),
	})
	.required()

UpdateProductForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
}

UpdateProductForm.defaultProps = {
	data: null,
	onSubmit: null,
}

function UpdateProductForm({ data, onSubmit }) {
	const { data: brandList } = useFetchData(() => brandApi.getAll(1))
	const brandOptionList = useMemo(() => {
		return brandList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [brandList])

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: data?.id,
			name: data?.name,
			specifications: data?.specifications,
			description: data?.description,
			width: data?.width,
			height: data?.height,
			weight: data?.weight,
			length: data?.length,
			published: Boolean(data?.published),
			brand_id: data?.brand_id,
			images: data?.images.map(image => ({
				uid: image.id,
				name: image.image,
				url: image.image,
				status: 'done',
			})),
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			published: Number(values.published),
			images: values.images.map(image => image.url),
		}
		if (onSubmit) {
			await onSubmit(newValues)
		}
	}

	const handleUploadFile = async (blobInfo, success, failure, progress) => {
		const formData = new FormData()
		formData.append('image', blobInfo.blob())

		try {
			const response = await productApi.uploadImage(formData)
			success(response.location)
		} catch (error) {
			failure('Đã có lỗi xảy trong quá trình tải ảnh lên máy chủ!')
		}
	}

	const handleRemoveUploadFile = async file => {
		await productApi.deleteImage({ image: file.url })
	}

	return (
		<div className="update-product-form">
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Cập nhật sản phẩm
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
				<SelectField
					form={form}
					name="brand_id"
					label="Thương hiệu"
					placeholder="Chọn thương hiệu sản phẩm"
					optionList={brandOptionList}
				/>

				<InputField
					form={form}
					name="name"
					label="Tên sản phẩm"
					placeholder="Nhập tên sản phẩm"
				/>

				<EditorField
					form={form}
					name="description"
					label="Mô tả sản phẩm"
					onUploadFile={handleUploadFile}
				/>

				<EditorField
					form={form}
					name="specifications"
					label="Thông số kỹ thuật"
				/>

				<SwitchField form={form} name="published" label="Hiển thị" />

				<MultiUploadField
					form={form}
					name="images"
					label="Ảnh sản phẩm"
					uploadName="image"
					onRemove={handleRemoveUploadFile}
					action="http://localhost:8000/api/product/upload-image"
				/>

				<Form.Item label="Kích thước sản phẩm" style={{ marginBottom: 0 }}>
					<Row gutter={16}>
						<Col span={12}>
							<NumberField
								form={form}
								name="length"
								placeholder="Nhập chiều dài sản phẩm (cm)"
								min={0}
								max={1000}
							/>
						</Col>

						<Col span={12}>
							<NumberField
								form={form}
								name="width"
								placeholder="Nhập chiều rộng sản phẩm (cm)"
								min={0}
								max={1000}
							/>
						</Col>

						<Col span={12}>
							<NumberField
								form={form}
								name="height"
								placeholder="Nhập chiều cao sản phẩm (cm)"
								min={0}
								max={1000}
							/>
						</Col>

						<Col span={12}>
							<NumberField
								form={form}
								name="weight"
								placeholder="Nhập trọng lượng sản phẩm (gram)"
								min={0}
								max={1000}
							/>
						</Col>
					</Row>
				</Form.Item>

				<Form.Item
					wrapperCol={{
						offset: 4,
						span: 20,
					}}
					style={{ marginBottom: 0, textAlign: 'right' }}
				>
					<Button
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

export default UpdateProductForm
