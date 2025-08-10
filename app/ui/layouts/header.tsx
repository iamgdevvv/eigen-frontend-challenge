import { Layout, type LayoutProps, Typography } from "antd";
import { Link } from "react-router";

import { cx } from "~/libs/utils";
import styles from "~/styles/layouts/header.module.css";

const Header: React.FC<LayoutProps> = (props) => {
	return (
		<Layout.Header
			{...props}
			className={cx(styles.header, props.className)}
		>
			<div className={styles.headerContent}>
				<Typography.Title level={2} className={styles.logo}>
					<Link to="/">Medium</Link>
				</Typography.Title>
			</div>
		</Layout.Header>
	);
};

export default Header;
