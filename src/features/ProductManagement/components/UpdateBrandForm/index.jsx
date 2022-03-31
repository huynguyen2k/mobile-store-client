import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Form, Typography } from 'antd'
import InputField from 'components/FormFields/InputField'
import SwitchField from 'components/FormFields/SwitchField'
import PropTypes from 'prop-types'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

UpdateBrandForm.propTypes = {
	data: PropTypes.object,
	onSubmit: PropTypes.func,
}

UpdateBrandForm.defaultProps = {
	data: null,
	onSubmit: null,
}

const schema = yup
	.object()
	.shape({
		name: yup.string().required('Bạn phải nhập tên thương hiệu!'),
	})
	.required()

function UpdateBrandForm({ data, onSubmit }) {
	const form = useForm({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		defaultValues: {
			id: data?.id,
			name: data?.name,
			published: Boolean(data?.published),
		},
		resolver: yupResolver(schema),
	})

	const handleSubmit = async values => {
		const newValues = {
			...values,
			published: Number(values.published),
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
				Cập nhật thương hiệu
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
					name="name"
					label="Thương hiệu"
					placeholder="Nhập tên thương hiệu"
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

export default UpdateBrandForm
