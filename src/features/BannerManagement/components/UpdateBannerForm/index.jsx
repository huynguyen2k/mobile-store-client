import React from 'react'
import PropTypes from 'prop-types'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import UploadField from 'components/FormFields/UploadField'
import InputField from 'components/FormFields/InputField'
import { AreaChartOutlined } from '@ant-design/icons/lib/icons'
import SwitchField from 'components/FormFields/SwitchField'

UpdateBannerForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
}

UpdateBannerForm.defaultProps = {
	data: null,
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		name: yup.string().required('Bạn phải nhập tên banner!'),
	})
	.required()

function UpdateBannerForm({ data, onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: data?.id,
			name: data?.name,
			image: null,
			published: Boolean(data?.published),
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			published: Number(values.published),
		}
		if (newValues.image === null) {
			delete newValues.image
		} else {
			newValues.image = newValues.image.originFileObj
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
				Cập nhật banner
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
					form={form}
					name="image"
					label="Ảnh banner"
					defaultUrl={data?.image}
				/>

				<InputField
					form={form}
					name="name"
					label="Tên banner"
					prefix={<AreaChartOutlined />}
					placeholder="Nhập tên banner"
				/>

				<SwitchField form={form} name="published" label="Hiển thị" />

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

export default UpdateBannerForm
