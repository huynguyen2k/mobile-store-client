import React, { useMemo } from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { Button, Col, Form, Row, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import SwitchField from 'components/FormFields/SwitchField'
import { useSelector } from 'react-redux'
import useFetchData from 'hooks/useFetchData'
import brandApi from 'api/brandApi'
import SelectField from 'components/FormFields/SelectField'
import EditorField from 'components/FormFields/EditorField'
import NumberField from 'components/FormFields/NumberField'
import productApi from 'api/productApi'
import MultiUploadField from 'components/FormFields/MultiUploadField'
import ProductOptionFields from 'components/FormFields/ProductOptionFields'
import ramOptionApi from 'api/ramOptionApi'
import romOptionApi from 'api/romOptionApi'
import colorOptionApi from 'api/colorOptionApi'

AddProductForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddProductForm.defaultProps = {
	onSubmit: null,
}

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
		images: yup.array().min(1, 'Bạn phải chọn tối thiểu 1 ảnh cho sản phẩm!'),
		product_options: yup.array().of(
			yup.object().shape({
				ram_id: yup.number().nullable().required('Bạn phải chọn cấu hình ram!'),
				rom_id: yup.number().nullable().required('Bạn phải chọn cấu hình rom!'),
				color_id_list: yup
					.array()
					.min(1, 'Bạn phải chọn ít nhất 1 màu sắc cho sản phẩm!'),
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
		),
	})
	.required()

function AddProductForm({ onSubmit }) {
	const user = useSelector(state => state.auth.user)
	const [antdForm] = Form.useForm()

	const { data: brandList } = useFetchData(() => brandApi.getAll(1))
	const brandOptionList = useMemo(() => {
		return brandList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [brandList])

	const { data: ramList } = useFetchData(ramOptionApi.getAll)
	const ramOptionList = useMemo(() => {
		return ramList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [ramList])

	const { data: romList } = useFetchData(romOptionApi.getAll)
	const romOptionList = useMemo(() => {
		return romList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [romList])

	const { data: colorList } = useFetchData(colorOptionApi.getAll)
	const colorOptionList = useMemo(() => {
		return colorList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [colorList])

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			name: '',
			specifications: '',
			description: '',
			width: null,
			height: null,
			weight: null,
			length: null,
			published: false,
			brand_id: null,
			user_id: user.id,
			images: [],
			product_options: [],
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			published: Number(values.published),
			images: values.images.map(image => image.url),
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			product_options: values.product_options.flatMap(option => {
				const { color_id_list, ...data } = option
				return color_id_list.map(color_id => ({ ...data, color_id }))
			}),
		}

		if (onSubmit) {
			await onSubmit(newValues)
			form.reset({
				name: '',
				specifications: '',
				description: '',
				width: null,
				height: null,
				weight: null,
				length: null,
				published: false,
				brand_id: null,
				user_id: user.id,
				images: [],
				product_options: [],
			})
			antdForm.setFieldsValue({
				name: '',
				width: null,
				height: null,
				weight: null,
				length: null,
				published: false,
				brand_id: null,
			})
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
		<div className="add-product-page">
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thêm sản phẩm mới
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
				form={antdForm}
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

				<ProductOptionFields
					name="product_options"
					form={form}
					label="Cấu hình sản phẩm"
					ramOptionList={ramOptionList}
					romOptionList={romOptionList}
					colorOptionList={colorOptionList}
				/>

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
						Thêm sản phẩm
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddProductForm
