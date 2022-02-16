import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { Button, Popconfirm, Space, Table, Tooltip, Typography } from 'antd'
import formatDateTime from 'utils/formatDateTime'
import moment from 'moment'
import {
	DeleteOutlined,
	EditOutlined,
	SettingOutlined,
} from '@ant-design/icons/lib/icons'

OptionTable.propTypes = {
	title: PropTypes.string,
	loading: PropTypes.bool,
	data: PropTypes.array,
	onAddOption: PropTypes.func,
	onUpdateOption: PropTypes.func,
	onDeleteOption: PropTypes.func,
}

OptionTable.defaultProps = {
	title: '',
	loading: false,
	data: [],
	onAddOption: null,
	onUpdateOption: null,
	onDeleteOption: null,
}

function OptionTable(props) {
	const { title, loading, data, onAddOption, onUpdateOption, onDeleteOption } =
		props

	const [selectedRowKeys, setSelectedRowKeys] = useState([])

	const handleSelectChange = selectedRowKeys => {
		setSelectedRowKeys(selectedRowKeys)
	}

	const handleAddOption = () => {
		if (typeof onAddOption === 'function') {
			onAddOption()
		}
	}

	const handleUpdateOption = data => {
		if (typeof onUpdateOption === 'function') {
			onUpdateOption(data)
		}
	}

	const handleDeleteOption = async idList => {
		if (typeof onDeleteOption === 'function') {
			await onDeleteOption(idList)
		}
	}

	return (
		<Table
			loading={loading}
			title={() => (
				<Typography.Title style={{ marginBottom: '0' }} level={3}>
					{title}
				</Typography.Title>
			)}
			rowSelection={{
				selectedRowKeys,
				onChange: handleSelectChange,
				selections: [
					Table.SELECTION_ALL,
					Table.SELECTION_INVERT,
					Table.SELECTION_NONE,
				],
			}}
			dataSource={data}
			columns={[
				{
					title: 'ID',
					dataIndex: 'id',
				},
				{
					title: 'Ngày tạo',
					dataIndex: 'created_date',
					sortDirections: ['descend', 'ascend'],
					render: value => formatDateTime(value),
					sorter: (date1, date2) => {
						const moment1 = moment(
							date1.created_date,
							'YYYY-MM-DD HH:mm:ss',
							true
						)
						const moment2 = moment(
							date2.created_date,
							'YYYY-MM-DD HH:mm:ss',
							true
						)

						if (moment1.isSameOrBefore(moment2)) {
							return -1
						}
						return 1
					},
				},
				{
					title: 'Cấu hình',
					dataIndex: 'name',
				},
				{
					title: () => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Thêm cấu hình mới">
								<Button
									type="primary"
									shape="circle"
									icon={<SettingOutlined />}
									style={{
										borderColor: 'var(--success)',
										backgroundColor: 'var(--success)',
									}}
									onClick={handleAddOption}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa cấu hình đã chọn">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa các cấu hình đã chọn?"
									onConfirm={async () =>
										await handleDeleteOption(selectedRowKeys)
									}
								>
									<Button
										danger
										type="primary"
										shape="circle"
										icon={<DeleteOutlined />}
									/>
								</Popconfirm>
							</Tooltip>
						</Space>
					),
					dataIndex: 'action',
					render: (value, record) => (
						<Space wrap align="center" size="small">
							<Tooltip placement="top" title="Chỉnh sửa cấu hình">
								<Button
									ghost
									type="primary"
									shape="circle"
									icon={<EditOutlined />}
									onClick={() => handleUpdateOption(record)}
								/>
							</Tooltip>

							<Tooltip placement="top" title="Xóa cấu hình">
								<Popconfirm
									okText="Có"
									cancelText="Không"
									placement="topRight"
									title="Bạn có chắc là muốn xóa cấu hình này không?"
									onConfirm={async () => await handleDeleteOption([record.id])}
								>
									<Button
										ghost
										danger
										type="primary"
										shape="circle"
										icon={<DeleteOutlined />}
									/>
								</Popconfirm>
							</Tooltip>
						</Space>
					),
				},
			]}
		/>
	)
}

export default OptionTable
