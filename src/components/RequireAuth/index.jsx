import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

function RequireAuth({ children }) {
	const location = useLocation()
	const loggedIn = useSelector(state => state.auth.loggedIn)

	if (!loggedIn)
		return <Navigate to="/login" state={{ from: location }} replace />
	return children
}

export default RequireAuth
