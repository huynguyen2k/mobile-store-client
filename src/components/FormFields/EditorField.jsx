import { Editor } from '@tinymce/tinymce-react'
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useController } from 'react-hook-form'
import { Form } from 'antd'

EditorField.propTypes = {
	form: PropTypes.object.isRequired,
	name: PropTypes.string.isRequired,

	label: PropTypes.string,
	disabled: PropTypes.bool,
	height: PropTypes.number,
	onUploadFile: PropTypes.func,
}

EditorField.defaultProps = {
	label: '',
	disabled: false,
	height: 500,
	onUploadFile: () => {},
}

function EditorField(props) {
	const editorRef = useRef(null)

	const { form, name, label, disabled, height, onUploadFile } = props
	const { field, fieldState } = useController({
		control: form.control,
		name,
	})

	return (
		<Form.Item
			label={label}
			help={fieldState.error?.message}
			validateStatus={fieldState.invalid ? 'error' : ''}
		>
			<Editor
				apiKey="rr4jpi2t3raw888x8270475h8c5x3oj8oss1c9z9okdhojcu"
				onInit={(evt, editor) => (editorRef.current = editor)}
				disabled={disabled}
				ref={field.ref}
				value={field.value}
				onEditorChange={field.onChange}
				onBlur={field.onBlur}
				init={{
					height: height,
					images_upload_handler: onUploadFile,
					plugins: [
						'advlist autolink lists link image charmap print preview anchor',
						'searchreplace visualblocks code fullscreen',
						'insertdatetime media table paste code help wordcount',
					],
					toolbar:
						'undo redo | formatselect | image | ' +
						'bold italic underline backcolor | alignleft aligncenter ' +
						'alignright alignjustify table | bullist numlist outdent indent | ' +
						'removeformat | help | fullscreen',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</Form.Item>
	)
}

export default EditorField
