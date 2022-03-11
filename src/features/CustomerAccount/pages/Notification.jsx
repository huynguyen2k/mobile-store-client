import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NotificationList from '../components/NotificationList'
import { markRead } from '../customerSlice'

function NotificationPage() {
	const dispatch = useDispatch()
	const user = useSelector(state => state.auth.user)
	const notification = useSelector(state => state.customer.notification)

	const handleMark = async id => {
		const data = {
			user_id: user.id,
			notification_id: id,
		}

		try {
			await dispatch(markRead(data)).unwrap()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div style={{ padding: '48px 0' }}>
			<NotificationList data={notification} onMark={handleMark} />
		</div>
	)
}

export default NotificationPage
