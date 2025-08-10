import { useMemo } from "react";
import { Navigate, redirect } from "react-router";
import dayjs from "dayjs";
import { Avatar, Button, Divider, Image, Tag, Typography } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";

import type { Route } from "./+types/_blog.$slug";
import { getBlog } from "~/loaders/blog";
import { readingTimes, slugify } from "~/libs/utils";

import styles from "~/styles/pages/blog-detail.module.css";

export async function loader({ params }: Route.LoaderArgs) {
	const blog = await getBlog(params.slug);

	if(!blog) {
		throw redirect('/404');
	}

	return {
		blog,
	};
}

export default function BlogDetailPage({
	loaderData,
}: {
	loaderData: Awaited<ReturnType<typeof loader>>;
}) {
	const blog = useMemo(() => {
		return loaderData.blog;
	}, [loaderData.blog]);

	return (
		<>
			<div className={styles.articleHeader}>
				<Typography.Title level={1} className={styles.articleTitle}>
					{blog.title}
				</Typography.Title>

				{blog.description ? (
					<Typography.Paragraph className={styles.articleSubtitle}>
						{blog.description}
					</Typography.Paragraph>
				) : null}
			</div>

			<div className={styles.authorInfoSection}>
				<div className={styles.authorDetails}>
					<Avatar size={48} />
					<div>
						<Typography.Text strong className={styles.authorName}>
							{blog.author || "Anonymous"}
						</Typography.Text>
						<div className={styles.publishDetails}>
							<Typography.Text className={styles.publishDate}>
								{dayjs(blog.publishedAt).format("MMM D, YYYY")}
							</Typography.Text>
							<Typography.Text className={styles.separator}>
								·
							</Typography.Text>
							<Typography.Text className={styles.readTime}>
								{readingTimes(blog.content)} min read
							</Typography.Text>
						</div>
					</div>
				</div>

				<div className={styles.actionButtons}>
					<Button
						type="text"
						icon={<ShareAltOutlined />}
						size="middle"
						className={styles.iconButton}
						onClick={async () => {
							try {
								await navigator.share({
									title: blog.title,
									text:
										blog.description ||
										`Read more about ${blog.title} now.`,
									url: `/${slugify(blog.title)}`,
								});
							} catch {
								try {
									navigator.clipboard.writeText(
										window.location.href,
									);
									alert("Link copied to clipboard!");
								} catch {
									window.open(window.location.href, "_blank");
								}
							}
						}}
					/>
				</div>
			</div>

			<Divider className={styles.divider} />

			{/* Article Content */}
			<div className={styles.articleContent}>
				<Image
					src={blog.urlToImage || "/images/placeholder.svg"}
					alt={blog.title}
					wrapperClassName={styles.coverImage}
				/>

				{/* Tags */}
				{blog.source ? (
					<div className={styles.tagsSection}>
						<Tag className={styles.articleTag}>
							{blog.source.name}
						</Tag>
					</div>
				) : null}

				<div className={styles.bodyText}>
					<Typography.Paragraph>
						{blog.content}
					</Typography.Paragraph>
				</div>
			</div>
		</>
	);
}
