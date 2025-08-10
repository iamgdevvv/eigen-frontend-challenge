import { useMemo, useState, type ComponentProps } from "react";
import { Card, Typography, Tag } from "antd";

import { cx } from "~/libs/utils";
import styles from "~/styles/layouts/sidebar.module.css";
import { Link, useSearchParams } from "react-router";

type SidebarProps = ComponentProps<"div"> & {
	blogs: BlogPost[];
	categories: Category[];
};

const Sidebar: React.FC<SidebarProps> = ({ blogs, categories, ...props }) => {
	const [searchParams] = useSearchParams();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(
		searchParams.get("category"),
	);

	const sources = useMemo(() => {
		const _sources: {
			name: string;
			authors: string[];
		}[] = [];

		blogs.forEach((blog) => {
			if (blog.source?.name) {
				const source = _sources.find(
					(source) => source.name === blog.source?.name,
				);

				if (source) {
					if (blog.author) {
						source.authors.push(blog.author);
					}
				} else {
					_sources.push({
						name: blog.source.name,
						authors: blog.author ? [blog.author] : [],
					});
				}
			}
		});

		return _sources;
	}, [blogs]);

	return (
		<div
			{...props}
			className={cx(styles.sidebarContainer, props.className)}
		>
			<Card
				title={
					<span className={styles.cardTitle}>
						Recommended categories
					</span>
				}
				className={styles.card}
			>
				<div className={styles.tagCloud}>
					{categories.map((category, index) => (
						<Link
							key={`${category.value}-${index}`}
							to={`/?category=${category.value}`}
							onClick={() => setSelectedCategory(category.value)}
						>
							<Tag
								color={
									selectedCategory &&
									selectedCategory === category.value
										? "blue"
										: "default"
								}
								className={styles.recommendedTag}
							>
								{category.label}
							</Tag>
						</Link>
					))}
				</div>
			</Card>

			<Card
				title={
					<span className={styles.cardTitle}>
						Top sources on Medium
					</span>
				}
				className={styles.card}
			>
				<div className={styles.topicList}>
					{sources.map((source, index) => (
						<div
							key={`${source}-${index}`}
							className={styles.topicItem}
						>
							<Typography.Text
								type="secondary"
								className={styles.topicNumber}
							>
								{String(index + 1).padStart(2, "0")}
							</Typography.Text>
							<div>
								<Typography.Text
									strong
									className={styles.topicName}
								>
									{source.name}
								</Typography.Text>
								<Typography.Text
									type="secondary"
									className={styles.topicCategory}
								>
									{source.authors.join(", ")}
								</Typography.Text>
							</div>
						</div>
					))}
				</div>
			</Card>
		</div>
	);
};

export default Sidebar;
