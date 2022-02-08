import {
	AppstoreOutlined,
	BellOutlined,
	GiftOutlined,
	HomeOutlined,
	InboxOutlined,
	MobileOutlined,
	PictureOutlined,
	SettingOutlined,
	ShopOutlined,
	ShoppingOutlined,
	StarOutlined,
	TeamOutlined,
} from '@ant-design/icons/lib/icons'

const AdminMenu = [
	{
		icon: <AppstoreOutlined />,
		title: 'Trang chủ',
		link: '/admin',
	},
	{
		key: 'sub-menu-1',
		icon: <TeamOutlined />,
		title: 'Người dùng',
		subMenu: [
			{
				title: 'Nhân viên',
				link: '/admin/user/staff',
			},
			{
				title: 'Khách hàng',
				link: '/admin/user/customer',
			},
		],
	},
	{
		key: 'sub-menu-2',
		icon: <SettingOutlined />,
		title: 'Cấu hình sản phẩm',
		subMenu: [
			{
				title: 'RAM',
				link: '/admin/product-configuration/ram',
			},
			{
				title: 'ROM',
				link: '/admin/product-configuration/rom',
			},
			{
				title: 'Màu sắc',
				link: '/admin/product-configuration/color',
			},
		],
	},
	{
		key: 'sub-menu-3',
		icon: <MobileOutlined />,
		title: 'Sản phẩm',
		subMenu: [
			{
				title: 'Thương hiệu sản phẩm',
				link: '/admin/product/brand',
			},
			{
				title: 'Danh sách sản phẩm',
				link: '/admin/product/product-list',
			},
		],
	},
	{
		icon: <ShoppingOutlined />,
		title: 'Đơn hàng',
		link: '/admin/order',
	},
	{
		icon: <PictureOutlined />,
		title: 'Banner trang chủ',
		link: '/admin/banner',
	},
	{
		icon: <GiftOutlined />,
		title: 'Mã giảm giá',
		link: '/admin/coupons',
	},
	{
		icon: <BellOutlined />,
		title: 'Thông báo khách hàng',
		link: '/admin/notification',
	},
	{
		icon: <StarOutlined />,
		title: 'Đánh giá',
		link: '/admin/rating',
	},
	{
		icon: <InboxOutlined />,
		title: 'Nhà cung cấp',
		link: '/admin/supplier',
	},
	{
		icon: <HomeOutlined />,
		title: 'Kho hàng',
		link: '/admin/warehouse',
	},
	{
		icon: <ShopOutlined />,
		title: 'Thông tin cửa hàng',
		link: '/admin/shop-info',
	},
]

export default AdminMenu
