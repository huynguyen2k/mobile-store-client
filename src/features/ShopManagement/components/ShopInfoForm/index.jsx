import React, { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useProvince from 'hooks/useProvince'
import useDistrict from 'hooks/useDistrict'
import useWard from 'hooks/useWard'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'
import SelectField from 'components/FormFields/SelectField'

ShopInfoForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
}

ShopInfoForm.defaultProps = {
	data: null,
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		logo: yup.string().required('Bạn phải nhập logo cho cửa hàng!'),
		name: yup.string().required('Bạn phải nhập tên cửa hàng!'),
		email: yup
			.string()
			.email('Email bạn nhập không hợp lệ!')
			.required('Bạn phải nhập email cho cửa hàng!'),
		phone_number: yup.string().required('Bạn phải nhập số điện thoại!'),
		province_id: yup
			.number()
			.required('Bạn phải chọn tỉnh/thành phố!')
			.nullable(),
		district_id: yup.number().required('Bạn phải chọn quận/huyện!').nullable(),
		ward_code: yup.string().required('Bạn phải chọn phường/xã!'),
		address: yup.string().required('Bạn phải nhập địa chỉ!'),
	})
	.required()

function ShopInfoForm({ data, onSubmit }) {
	const [disabled, setDisabled] = useState(true)

	const defaultValues = useMemo(
		() => ({
			id: data?.id,
			logo: data?.logo,
			name: data?.name,
			description: data?.description,
			email: data?.email,
			phone_number: data?.phone_number,
			province_id: data?.province_id,
			district_id: data?.district_id,
			ward_code: data?.ward_code,
			address: data?.address,
		}),
		[data]
	)

	const [antdForm] = Form.useForm()
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: { ...defaultValues },
		resolver: yupResolver(schema),
	})

	useEffect(() => {
		form.reset({ ...defaultValues })
		antdForm.setFieldsValue({ ...defaultValues })
	}, [defaultValues, form, antdForm])

	const { data: provinceList } = useProvince()
	const provinceOptionList = useMemo(() => {
		return provinceList.map(province => ({
			value: province.ProvinceID,
			label: province.ProvinceName,
		}))
	}, [provinceList])

	const provinceId = form.watch('province_id')
	const { data: districtList } = useDistrict(provinceId)
	const districtOptionList = useMemo(() => {
		return districtList.map(district => ({
			value: district.DistrictID,
			label: district.DistrictName,
		}))
	}, [districtList])

	const districtId = form.watch('district_id')
	const { data: wardList } = useWard(districtId)
	const wardOptionList = useMemo(() => {
		return wardList.map(ward => ({
			value: ward.WardCode,
			label: ward.WardName,
		}))
	}, [wardList])

	const handleSubmit = async values => {
		if (onSubmit) {
			await onSubmit(values)
			setDisabled(true)
		}
	}

	return (
		<div className="shop-info">
			<Typography.Title
				level={4}
				style={{ textAlign: 'center', marginBottom: 24 }}
			>
				Thông tin cửa hàng
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
				form={antdForm}
			>
				<InputField
					form={form}
					name="logo"
					label="Logo cửa hàng"
					placeholder="Nhập logo cửa hàng"
					disabled={disabled}
				/>

				<InputField
					form={form}
					name="name"
					label="Tên cửa hàng"
					placeholder="Nhập tên cửa hàng"
					disabled={disabled}
				/>

				<TextAreaField
					form={form}
					name="description"
					autoSize={{
						minRows: 4,
						maxRows: 4,
					}}
					label="Mô tả"
					placeholder="Nhập mô tả về cửa hàng"
					disabled={disabled}
				/>

				<InputField
					form={form}
					name="email"
					label="Email"
					placeholder="Nhập email của cửa hàng"
					disabled={disabled}
				/>

				<InputField
					form={form}
					name="phone_number"
					label="Số điện thoại"
					placeholder="Nhập số điện thoại của cửa hàng"
					disabled={disabled}
				/>

				<SelectField
					form={form}
					name="province_id"
					label="Tỉnh/thành phố"
					placeholder="Chọn tỉnh/thành phố"
					optionList={provinceOptionList}
					disabled={disabled}
				/>

				<SelectField
					form={form}
					name="district_id"
					label="Quận/huyện"
					placeholder="Chọn quận/huyện"
					optionList={districtOptionList}
					disabled={disabled}
				/>

				<SelectField
					form={form}
					name="ward_code"
					label="Phường/xã"
					placeholder="Chọn phường/xã"
					optionList={wardOptionList}
					disabled={disabled}
				/>

				<TextAreaField
					form={form}
					name="address"
					label="Địa chỉ"
					placeholder="Nhập địa chỉ của cửa hàng"
					disabled={disabled}
				/>

				<Form.Item
					wrapperCol={{
						offset: 4,
						span: 20,
					}}
					style={{ marginBottom: 0, textAlign: 'right' }}
				>
					{disabled ? (
						<Button
							className="shop-info__button"
							type="primary"
							htmlType="button"
							onClick={e => {
								e.preventDefault()
								setDisabled(false)
							}}
						>
							Cập nhật
						</Button>
					) : (
						<>
							<Button
								type="primary"
								htmlType="submit"
								className="shop-info__button save-btn"
								loading={form.formState.isSubmitting}
							>
								Lưu lại
							</Button>

							<Button
								danger
								type="primary"
								className="shop-info__button"
								onClick={() => {
									form.reset({ ...defaultValues })
									antdForm.setFieldsValue({ ...defaultValues })
									setDisabled(true)
								}}
							>
								Hủy bỏ
							</Button>
						</>
					)}
				</Form.Item>
			</Form>
		</div>
	)
}

export default ShopInfoForm
