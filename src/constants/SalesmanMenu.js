import {
	BellOutlined,
	GiftOutlined,
	ShoppingOutlined,
	StarOutlined,
	TeamOutlined,
} from '@ant-design/icons/lib/icons'

const SalesmanMenu = [
	{
		icon: <ShoppingOutlined />,
		title: 'Đơn hàng',
		link: '/salesman/order',
	},
	{
		icon: <TeamOutlined />,
		title: 'Khách hàng',
		link: '/salesman/customer',
	},
	{
		icon: <GiftOutlined />,
		title: 'Mã giảm giá',
		link: '/salesman/coupons',
	},
	{
		icon: <BellOutlined />,
		title: 'Thông báo khách hàng',
		link: '/salesman/notification',
	},
	{
		icon: <StarOutlined />,
		title: 'Đánh giá',
		link: '/salesman/rating',
	},
]

export default SalesmanMenu
