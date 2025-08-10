import type { ComponentProps } from "react";

import styles from "~/styles/layouts/footer.module.css";

type FooterProps = ComponentProps<"footer">;

const Footer: React.FC<FooterProps> = (props) => {
	return (
		<footer {...props} className={styles.footer}>
			<div className={styles.footerWrapper}>
				<div className={styles.footerText}>
					Medium Clone ©{new Date().getFullYear()}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
