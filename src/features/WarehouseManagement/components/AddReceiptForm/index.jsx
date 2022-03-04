import React, { useMemo } from 'react'
import './style.scss'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { Button, Form, Typography } from 'antd'
import useFetchData from 'hooks/useFetchData'
import supplierApi from 'api/supplierApi'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import SelectField from 'components/FormFields/SelectField'
import productApi from 'api/productApi'
import ReceiptDetailFields from 'components/FormFields/ReceiptDetailFields'
import sleep from 'utils/sleep'
import receiptApi from 'api/warehouseApi'
import Swal from 'sweetalert2'

const schema = yup
	.object()
	.shape({
		supplier_id: yup
			.number()
			.nullable()
			.required('Bạn phải chọn nhà cung cấp!'),
		receipt_detail: yup.array().of(
			yup.object().shape({
				product_id: yup.number().nullable().required('Bạn phải chọn sản phẩm!'),
				option_id_list: yup.array().min(1, 'Bạn phải chọn ít nhất 1 cấu hình!'),
				quantity: yup
					.number()
					.nullable()
					.required('Bạn phải nhập số lượng sản phẩm!'),
				price: yup
					.number()
					.nullable()
					.required('Bạn phải nhập đơn giá cho sản phẩm!'),
			})
		),
	})
	.required()

function AddReceiptForm() {
	const user = useSelector(state => state.auth.user)
	const [antdForm] = Form.useForm()

	const { data: supplierList } = useFetchData(supplierApi.getAll)
	const supplierOptionList = useMemo(() => {
		return supplierList.map(item => ({
			value: item.id,
			label: item.name,
		}))
	}, [supplierList])

	const { data: productList } = useFetchData(productApi.getAll)
	const productOptionList = useMemo(() => {
		return productList.map(item => ({
			value: item.id,
			label: item.name,
			optionList: item.product_options.map(option => ({
				value: option.id,
				label: `${option.ram_name} - ${option.rom_name} - ${option.color_name}`,
			})),
		}))
	}, [productList])

	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			supplier_id: null,
			user_id: user.id,
			receipt_detail: [],
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const data = {
			...values,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
			receipt_detail: values.receipt_detail.flatMap(item => {
				return item.option_id_list.map(option_id => ({
					product_option_id: option_id,
					quantity: item.quantity,
					price: item.price,
				}))
			}),
		}
		data.total_price = data.receipt_detail.reduce(
			(result, receipt) => result + receipt.price * receipt.quantity,
			0
		)

		try {
			await sleep(1000)
			const response = await receiptApi.add(data)
			await Swal.fire({
				title: 'Thông báo!',
				text: response.message,
				icon: 'success',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})

			form.reset({
				supplier_id: null,
				user_id: user.id,
				receipt_detail: [],
			})
			antdForm.setFieldsValue({
				supplier_id: null,
			})
		} catch (error) {
			Swal.fire({
				title: 'Thông báo!',
				text: error.message,
				icon: 'error',
				confirmButtonText: 'Xác nhận',
				confirmButtonColor: 'var(--success)',
			})
		}
	}

	return (
		<div className="add-receipt-form">
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thêm phiếu nhập hàng
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
					name="supplier_id"
					label="Nhà cung cấp"
					placeholder="Chọn nhà cung cấp"
					optionList={supplierOptionList}
				/>

				<ReceiptDetailFields
					form={form}
					name="receipt_detail"
					label="Sản phẩm nhập"
					productOptionList={productOptionList}
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
						Thêm phiếu nhập
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddReceiptForm
