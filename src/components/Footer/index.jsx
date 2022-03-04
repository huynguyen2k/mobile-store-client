import Container from 'components/Container'
import React from 'react'
import { Link } from 'react-router-dom'
import './style.scss'

function Footer() {
	return (
		<footer className="footer">
			<Container>
				<div className="footer__container">
					<div className="footer__row">
						<div className="footer__col">
							<h3 className="footer__title">Hỗ trợ khách hàng</h3>
							<ul className="footer__link-list">
								<li>
									<Link to="/">Các cấu hỏi thường gặp</Link>
								</li>
								<li>
									<Link to="/">Gửi yêu cầu hổ trợ</Link>
								</li>
								<li>
									<Link to="/">Hướng dẫn đặt hàng</Link>
								</li>
								<li>
									<Link to="/">Phương thức vận chuyển</Link>
								</li>
								<li>
									<Link to="/">Chính sách đổi trả</Link>
								</li>
							</ul>
						</div>

						<div className="footer__col">
							<h3 className="footer__title">Về Mobile Store</h3>
							<ul className="footer__link-list">
								<li>
									<Link to="/">Giới thiệu Mobile Store</Link>
								</li>
								<li>
									<Link to="/">Điều khoản sử dụng</Link>
								</li>
								<li>
									<Link to="/">Chính sách giải quyết khiếu nại</Link>
								</li>
								<li>
									<Link to="/">Chính sách bảo mật thông tin cá nhân</Link>
								</li>
								<li>
									<Link to="/">Bán hàng doanh nghiệp</Link>
								</li>
							</ul>
						</div>

						<div className="footer__col">
							<h3 className="footer__title">Thương hiệu điện thoại</h3>
							<ul className="footer__link-list">
								<li>
									<Link to="/">Samsung</Link>
								</li>
								<li>
									<Link to="/">Apple</Link>
								</li>
								<li>
									<Link to="/">Vivo</Link>
								</li>
								<li>
									<Link to="/">OPPO</Link>
								</li>
								<li>
									<Link to="/">Xiaomi</Link>
								</li>
							</ul>
						</div>

						<div className="footer__col">
							<h3 className="footer__title">Kết nối với chúng tôi</h3>
							<ul className="footer__logo-list">
								<li>
									<Link to="/">
										<img
											src="/assets/images/logo-facebook.png"
											alt="facebook"
										/>
									</Link>
								</li>
								<li>
									<Link to="/">
										<img src="/assets/images/logo-youtube.png" alt="youtube" />
									</Link>
								</li>
								<li>
									<Link to="/">
										<img src="/assets/images/logo-twitter.png" alt="twitter" />
									</Link>
								</li>
							</ul>
						</div>
					</div>

					<div className="footer__line-break"></div>

					<h4 className="footer__copyright">
						Copyright © 2022 Mobile Store All rights reserved.
					</h4>
				</div>
			</Container>
		</footer>
	)
}

export default Footer
