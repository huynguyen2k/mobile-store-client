import React, { useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { Button, Form, Typography } from 'antd'
import SelectField from 'components/FormFields/SelectField'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'
import CheckboxField from 'components/FormFields/CheckboxField'
import useProvince from 'hooks/useProvince'
import useDistrict from 'hooks/useDistrict'
import useWard from 'hooks/useWard'

AddressForm.propTypes = {
	data: PropTypes.object,
	title: PropTypes.string,
	submitText: PropTypes.string,
	onSubmit: PropTypes.func,
}

AddressForm.defaultProps = {
	data: null,
	title: '',
	submitText: '',
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		full_name: yup.string().required('Bạn phải nhập họ tên!'),
		phone_number: yup.string().required('Bạn phải nhập số điện thoại!'),
		province_id: yup
			.number()
			.nullable()
			.required('Bạn phải chọn tỉnh/thành phố!'),
		district_id: yup.number().nullable().required('Bạn phải chọn quận huyện!'),
		ward_code: yup.string().nullable().required('Bạn phải chọn phường xã!'),
		address: yup.string().required('Bạn phải nhập địa chỉ!'),
		is_default: yup.bool(),
	})
	.required()

function AddressForm(props) {
	const { data, title, submitText, onSubmit } = props
	const didMount = useRef(false)

	const [antdForm] = Form.useForm()
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: data
			? {
					id: data.id,
					user_id: data.user_id,
					full_name: data.full_name,
					phone_number: data.phone_number,
					province_id: data.province_id,
					district_id: data.district_id,
					ward_code: data.ward_code,
					address: data.address,
					is_default: data.is_default,
			  }
			: {
					full_name: '',
					phone_number: '',
					province_id: null,
					district_id: null,
					ward_code: null,
					address: '',
					is_default: false,
			  },
		resolver: yupResolver(schema),
	})

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

	useEffect(() => {
		if (!didMount.current) {
			return
		}

		form.setValue('district_id', null)
		form.setValue('ward_code', null)
		antdForm.setFieldsValue(form.getValues())
	}, [provinceId, form, antdForm, didMount])

	useEffect(() => {
		if (!didMount.current) {
			return
		}

		form.setValue('ward_code', null)
		antdForm.setFieldsValue(form.getValues())
	}, [districtId, form, antdForm, didMount])

	useEffect(() => {
		didMount.current = true
	}, [didMount])

	const handleSubmit = async values => {
		const province = provinceOptionList.find(
			e => e.value === values.province_id
		)
		const district = districtOptionList.find(
			e => e.value === values.district_id
		)
		const ward = wardOptionList.find(e => e.value === values.ward_code)

		let fullAddress = ''
		if (province && district && ward) {
			fullAddress = `${values.address}, ${ward.label}, ${district.label}, ${province.label}`
		}

		const newValues = {
			...values,
			full_address: fullAddress,
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
				{title}
			</Typography.Title>

			<Form
				colon={false}
				form={antdForm}
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
					name="full_name"
					label="Họ tên"
					placeholder="Nhập họ và tên"
				/>

				<InputField
					form={form}
					name="phone_number"
					label="Số điện thoại"
					placeholder="Nhập số điện thoại"
				/>

				<SelectField
					form={form}
					name="province_id"
					label="Tỉnh/Thành phố"
					placeholder="Chọn tỉnh/thành phố"
					optionList={provinceOptionList}
				/>

				<SelectField
					form={form}
					name="district_id"
					label="Quận huyện"
					placeholder="Chọn quận huyện"
					optionList={districtOptionList}
				/>

				<SelectField
					form={form}
					name="ward_code"
					label="Phường xã"
					placeholder="Chọn phường xã"
					optionList={wardOptionList}
				/>

				<TextAreaField
					form={form}
					name="address"
					label="Địa chỉ"
					placeholder="Nhập địa chỉ"
					autoSize={{ minRows: 4, maxRows: 4 }}
				/>

				{(data === null || data?.is_default === 0) && (
					<CheckboxField
						form={form}
						name="is_default"
						label="Đặt làm địa chỉ mặc định"
					/>
				)}

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
						{submitText}
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddressForm
