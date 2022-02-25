import React, { useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import { UploadOutlined } from '@ant-design/icons/lib/icons'
import { useController } from 'react-hook-form'
import { Button, Form, Upload } from 'antd'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'

MultiUploadField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	uploadIcon: PropTypes.node,
	disabled: PropTypes.bool,
	action: PropTypes.string,
	uploadName: PropTypes.string,
	onRemove: PropTypes.func,
}

MultiUploadField.defaultProps = {
	label: '',
	uploadIcon: <UploadOutlined />,
	disabled: false,
	action: '',
	uploadName: '',
	onRemove: () => {},
}

const type = 'DragableUploadList'

const DragableUploadListItem = ({ originNode, moveRow, file, fileList }) => {
	const ref = useRef()
	const index = fileList.indexOf(file)
	const [{ isOver, dropClassName }, drop] = useDrop({
		accept: type,
		collect: monitor => {
			const { index: dragIndex } = monitor.getItem() || {}
			if (dragIndex === index) {
				return {}
			}
			return {
				isOver: monitor.isOver(),
				dropClassName:
					dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
			}
		},
		drop: item => {
			moveRow(item.index, index)
		},
	})
	const [, drag] = useDrag({
		type,
		item: { index },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
	})
	drop(drag(ref))

	return (
		<div
			ref={ref}
			className={`ant-upload-draggable-list-item ${
				isOver ? dropClassName : ''
			}`}
			style={{ cursor: 'move' }}
		>
			{originNode}
		</div>
	)
}

function MultiUploadField(props) {
	const {
		form,
		name,
		label,
		uploadIcon,
		disabled,
		action,
		uploadName,
		onRemove,
	} = props

	const { field, fieldState } = useController({
		name,
		control: form.control,
	})

	const moveRow = useCallback(
		(dragIndex, hoverIndex) => {
			const dragRow = field.value[dragIndex]
			field.onChange(
				update(field.value, {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRow],
					],
				})
			)
		},
		[field]
	)

	const handleChangeFile = ({ fileList }) => {
		if (!Array.isArray(fileList)) return

		const newFileList = fileList.map(file => {
			if (file.response) {
				file.url = file.response.location
			}
			return file
		})
		field.onChange(newFileList)
	}

	return (
		<Form.Item
			name={name}
			label={label}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<DndProvider backend={HTML5Backend}>
				<Upload
					multiple
					listType="picture"
					action={action}
					name={uploadName}
					disabled={disabled}
					fileList={field.value}
					onRemove={onRemove}
					onChange={handleChangeFile}
					itemRender={(originNode, file, currFileList) => (
						<DragableUploadListItem
							originNode={originNode}
							file={file}
							fileList={currFileList}
							moveRow={moveRow}
						/>
					)}
				>
					<Button icon={uploadIcon} disabled={disabled} onBlur={field.onBlur}>
						Chọn ảnh
					</Button>
				</Upload>
			</DndProvider>
		</Form.Item>
	)
}

export default MultiUploadField
