import React, { useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { Button, Form, Typography } from 'antd'
import SelectField from 'components/FormFields/SelectField'
import InputField from 'components/FormFields/InputField'
import TextAreaField from 'components/FormFields/TextAreaField'
import useProvince from 'hooks/useProvince'
import useDistrict from 'hooks/useDistrict'
import useWard from 'hooks/useWard'

AddSupplierForm.propTypes = {
	onSubmit: PropTypes.func,
}

AddSupplierForm.defaultProps = {
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		name: yup.string().required('Bạn phải nhập tên nhà cung cấp!'),
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

function AddSupplierForm({ onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			name: '',
			phone_number: '',
			description: '',
			province_id: null,
			district_id: null,
			ward_code: null,
			address: '',
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
		form.setValue('district_id', null)
		form.setValue('ward_code', '')
	}, [provinceId, form])

	useEffect(() => {
		form.setValue('ward_code', '')
	}, [districtId, form])

	const handleSubmit = async values => {
		const newValues = {
			...values,
			created_date: moment().format('YYYY-MM-DD HH:mm:ss'),
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
				Thêm nhà cung cấp
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
				<InputField
					form={form}
					name="name"
					label="Nhà cung cấp"
					placeholder="Nhập tên của nhà cung cấp"
				/>

				<InputField
					form={form}
					name="phone_number"
					label="Số điện thoại"
					placeholder="Nhập số điện thoại của nhà cung cấp"
				/>

				<TextAreaField
					form={form}
					name="description"
					autoSize={{
						minRows: 4,
						maxRows: 4,
					}}
					label="Mô tả"
					placeholder="Nhập mô tả về nhà cung cấp"
				/>

				<SelectField
					form={form}
					name="province_id"
					label="Tỉnh/thành phố"
					placeholder="Chọn tỉnh/thành phố"
					optionList={provinceOptionList}
				/>

				<SelectField
					form={form}
					name="district_id"
					label="Quận/huyện"
					placeholder="Chọn quận/huyện"
					optionList={districtOptionList}
				/>

				<SelectField
					form={form}
					name="ward_code"
					label="Phường/xã"
					placeholder="Chọn phường/xã"
					optionList={wardOptionList}
				/>

				<TextAreaField
					form={form}
					name="address"
					label="Địa chỉ"
					placeholder="Nhập địa chỉ của nhà cung cấp"
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
						Thêm nhà cung cấp
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default AddSupplierForm
