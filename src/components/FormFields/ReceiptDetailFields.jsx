import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray, useWatch } from 'react-hook-form'
import { Button, Col, Divider, Form, Row } from 'antd'
import SelectField from './SelectField'
import NumberField from './NumberField'

ReceiptDetailFields.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	productOptionList: PropTypes.array,
}

ReceiptDetailFields.defaultProps = {
	label: '',
	productOptionList: [],
}

const fieldValues = {
	product_id: null,
	option_id_list: [],
	quantity: null,
	price: null,
}

function ReceiptDetailFields(props) {
	const { name, form, label, productOptionList } = props

	const { fields, append, remove } = useFieldArray({
		name,
		control: form.control,
		shouldUnregister: true,
	})

	const watchFieldArray = useWatch({
		control: form.control,
		name: name,
	})

	const controlledFields = fields.map((field, index) => {
		return {
			...field,
			...watchFieldArray[index],
		}
	})

	const getProductOptionList = (item, fieldIndex) => {
		if (item.product_id === null) return []

		const selectedProduct = productOptionList.find(
			product => product.value === item.product_id
		)
		const selectedOptionList = controlledFields
			.filter(
				(field, index) =>
					index !== fieldIndex && field.product_id === item.product_id
			)
			.flatMap(field => field.option_id_list)

		if (selectedProduct) {
			return selectedProduct.optionList.filter(
				option => !selectedOptionList.includes(option.value)
			)
		}
		return []
	}

	useEffect(() => {
		if (fields.length > 0) return
		append(fieldValues, { shouldFocus: false })
	}, [append, fields])

	return (
		<>
			{controlledFields.map((item, index) => (
				<div key={item.id}>
					<Divider style={{ marginTop: 0 }} />
					<Form.Item style={{ marginBottom: 0 }} label={label} preserve={false}>
						<Row gutter={16}>
							<Col span={24}>
								<SelectField
									form={form}
									name={`${name}.${index}.product_id`}
									placeholder="Chọn sản phẩm mà bạn muốn nhập"
									optionList={productOptionList}
								/>
							</Col>

							<Col span={24}>
								<SelectField
									form={form}
									name={`${name}.${index}.option_id_list`}
									mode="multiple"
									placeholder="Chọn cấu hình sản phẩm"
									optionList={getProductOptionList(item, index)}
								/>
							</Col>

							<Col span={12}>
								<NumberField
									form={form}
									name={`${name}.${index}.quantity`}
									min={1}
									max={1000}
									placeholder="Nhập số lượng"
								/>
							</Col>

							<Col span={12}>
								<NumberField
									form={form}
									name={`${name}.${index}.price`}
									min={0}
									addonAfter="đ"
									placeholder="Nhập đơn giá"
								/>
							</Col>
						</Row>
					</Form.Item>
				</div>
			))}

			<Form.Item label=" ">
				<Row gutter={16}>
					<Col span={12}>
						<Button
							block
							type="dashed"
							htmlType="button"
							style={{
								borderColor: 'var(--success)',
								color: 'var(--success)',
							}}
							onClick={() => append(fieldValues, { shouldFocus: false })}
						>
							Thêm sản phẩm
						</Button>
					</Col>
					<Col span={12}>
						<Button
							block
							danger
							type="dashed"
							htmlType="button"
							onClick={() => remove(controlledFields.length - 1)}
						>
							Xóa sản phẩm
						</Button>
					</Col>
				</Row>
			</Form.Item>
		</>
	)
}

export default ReceiptDetailFields
