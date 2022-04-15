import {
	HomeOutlined,
	InboxOutlined,
	MobileOutlined,
	SettingOutlined,
} from '@ant-design/icons/lib/icons'

const WarehouseManagerMenu = [
	{
		icon: <InboxOutlined />,
		title: 'Nhà cung cấp',
		link: '/warehouse-manager/supplier',
	},
	{
		key: 'sub-menu-2',
		icon: <SettingOutlined />,
		title: 'Cấu hình sản phẩm',
		subMenu: [
			{
				title: 'RAM',
				link: '/warehouse-manager/product-configuration/ram',
			},
			{
				title: 'ROM',
				link: '/warehouse-manager/product-configuration/rom',
			},
			{
				title: 'Màu sắc',
				link: '/warehouse-manager/product-configuration/color',
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
				link: '/warehouse-manager/product/brand',
			},
			{
				title: 'Thêm sản phẩm mới',
				link: '/warehouse-manager/product/add-product',
			},
			{
				title: 'Danh sách sản phẩm',
				link: '/warehouse-manager/product/product-list',
			},
		],
	},
	{
		key: 'sub-menu-4',
		icon: <HomeOutlined />,
		title: 'Kho hàng',
		subMenu: [
			{
				title: 'Thêm phiếu nhập hàng',
				link: '/warehouse-manager/warehouse/add-receipt',
			},
			{
				title: 'Danh sách phiếu nhập hàng',
				link: '/warehouse-manager/warehouse/receipt-list',
			},
		],
	},
]

export default WarehouseManagerMenu
