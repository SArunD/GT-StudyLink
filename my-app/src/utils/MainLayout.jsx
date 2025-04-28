import Header from '../components/Header'
import { Outlet } from 'react-router'
import React from 'react'

function MainLayout() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default MainLayout
