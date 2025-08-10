import { Link } from "react-router";
import dayjs from "dayjs";
import {
	Card,
	Avatar,
	Tag,
	Typography,
	Button,
	type CardProps,
	Image,
} from "antd";
import { ShareAltOutlined } from "@ant-design/icons";

import { cx, readingTimes, slugify } from "~/libs/utils";
import stylesCard from "~/styles/layouts/articles-card.module.css";

type ArticleCardProps = CardProps & {
	data: BlogPost;
};

export default function ArticleCard({ data, ...props }: ArticleCardProps) {
	return (
		<Card {...props} className={cx(stylesCard.card, props.className)}>
			<div className={stylesCard.cardContent}>
				<div className={stylesCard.textSection}>
					<div className={stylesCard.authorInfo}>
						{data.author ? (
							<>
								<Avatar size="small" />
								<Typography.Text
									strong
									className={stylesCard.authorName}
								>
									{data.author}
								</Typography.Text>
								<Typography.Text
									type="secondary"
									className={stylesCard.separator}
								>
									·
								</Typography.Text>
							</>
						) : null}
						<Typography.Text
							type="secondary"
							className={stylesCard.publishDate}
						>
							{dayjs(data.publishedAt).format("MMM D, YYYY")}
						</Typography.Text>
					</div>

					<Typography.Title level={3} className={stylesCard.title}>
						<Link to={`/${slugify(data.title)}`}>{data.title}</Link>
					</Typography.Title>

					{data.description ? (
						<Typography.Paragraph className={stylesCard.excerpt}>
							{data.description}
						</Typography.Paragraph>
					) : null}

					<div className={stylesCard.footer}>
						<div className={stylesCard.tagsAndReadTime}>
							{data.source ? (
								<Tag className={stylesCard.tag}>
									{data.source.name}
								</Tag>
							) : null}
							<Typography.Text
								type="secondary"
								className={stylesCard.readTime}
							>
								{readingTimes(data.content)} min read
							</Typography.Text>
						</div>

						<div className={stylesCard.actions}>
							<Button
								type="text"
								icon={<ShareAltOutlined />}
								size="middle"
								className={stylesCard.actionButton}
								onClick={async () => {
									try {
										await navigator.share({
											title: data.title,
											text:
												data.description ||
												`Read more about ${data.title} now.`,
											url: `/${slugify(data.title)}`,
										});
									} catch {
										try {
											navigator.clipboard.writeText(
												window.location.href,
											);
											alert("Link copied to clipboard!");
										} catch {
											window.open(
												window.location.href,
												"_blank",
											);
										}
									}
								}}
							/>
						</div>
					</div>
				</div>

				<Image
					src={data.urlToImage || "/images/placeholder.svg"}
					alt={data.title}
					wrapperClassName={stylesCard.image}
					loading="lazy"
				/>
			</div>
		</Card>
	);
}
