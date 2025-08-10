import { Button, Result, Typography } from "antd";

import styles from "~/styles/pages/notfound.module.css";

export default function NotFoundPage() {
	return (
		<Result
			status="404"
			title={
				<Typography.Title level={1} className={styles.title}>
				404
				</Typography.Title>
			}
			subTitle={<Typography.Paragraph className={styles.subtitle}>Sorry, the page you visited does not exist.</Typography.Paragraph>}
			extra={
				<Button type="primary" size="large" color="blue" href="/" className={styles.backHomeButton}>
					Back Home
				</Button>
			}
			className={styles.resultComponent}
		/>
	);
}
