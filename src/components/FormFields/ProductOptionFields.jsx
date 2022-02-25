import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFieldArray } from 'react-hook-form'
import NumberField from './NumberField'
import SelectField from './SelectField'
import { Button, Col, Form, Row, Divider } from 'antd'

ProductOptionFields.propTypes = {
	name: PropTypes.string.isRequired,
	form: PropTypes.object.isRequired,
	label: PropTypes.string,
	ramOptionList: PropTypes.array,
	romOptionList: PropTypes.array,
	colorOptionList: PropTypes.array,
}

ProductOptionFields.defaultProps = {
	label: '',
	ramOptionList: [],
	romOptionList: [],
	colorOptionList: [],
}

const fieldValues = {
	ram_id: null,
	rom_id: null,
	color_id_list: [],
	original_price: null,
	sale_price: null,
}

function ProductOptionFields(props) {
	const { name, form, label, ramOptionList, romOptionList, colorOptionList } =
		props

	const { fields, append, remove } = useFieldArray({
		name,
		control: form.control,
		shouldUnregister: true,
	})

	useEffect(() => {
		if (fields.length > 0) return
		append(fieldValues, { shouldFocus: false })
	}, [append, fields])

	return (
		<>
			{fields.map((item, index) => (
				<div key={item.id}>
					<Divider style={{ marginTop: 0 }} />
					<Form.Item style={{ marginBottom: 0 }} label={label} preserve={false}>
						<Row gutter={16}>
							<Col span={12}>
								<SelectField
									form={form}
									name={`${name}.${index}.ram_id`}
									placeholder="Chọn cấu hình ram"
									optionList={ramOptionList}
								/>
							</Col>

							<Col span={12}>
								<SelectField
									form={form}
									name={`${name}.${index}.rom_id`}
									placeholder="Chọn cấu hình rom"
									optionList={romOptionList}
								/>
							</Col>

							<Col span={24}>
								<SelectField
									form={form}
									name={`${name}.${index}.color_id_list`}
									placeholder="Chọn màu sắc của sản phẩm"
									mode="multiple"
									optionList={colorOptionList}
								/>
							</Col>

							<Col span={12}>
								<NumberField
									form={form}
									name={`${name}.${index}.original_price`}
									min={0}
									addonAfter="đ"
									placeholder="Nhập giá gốc của sản phẩm"
								/>
							</Col>

							<Col span={12}>
								<NumberField
									form={form}
									name={`${name}.${index}.sale_price`}
									min={0}
									addonAfter="đ"
									placeholder="Nhập giá khuyến mãi của sản phẩm"
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
							Thêm cấu hình
						</Button>
					</Col>
					<Col span={12}>
						<Button
							block
							danger
							type="dashed"
							htmlType="button"
							onClick={() => remove(fields.length - 1)}
						>
							Xóa cấu hình
						</Button>
					</Col>
				</Row>
			</Form.Item>
		</>
	)
}

export default ProductOptionFields
