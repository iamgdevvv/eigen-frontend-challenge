import { Col, Row } from "antd";

import type { Route } from "./+types/_index";
import { getBlogs, getCategories } from "~/loaders/blog";
import ArticleCard from "~/ui/layouts/articles";
import Sidebar from "~/ui/layouts/sidebar";

import styles from "~/styles/pages/home.module.css";

export async function loader({ request }: Route.LoaderArgs) {
	const searchParams = new URL(request.url).searchParams;

	const [blogs, categories] = await Promise.all([
		getBlogs({
			category: searchParams.get("category"),
		}),
		getCategories(),
	]);

	return {
		blogs,
		categories,
	};
}

export default function HomePage({
	loaderData,
}: {
	loaderData: Awaited<ReturnType<typeof loader>>;
}) {
	return (
		<Row gutter={[32, 0]} className={styles.row}>
			<Col xs={24} lg={16} className={styles.mainCol}>
				<div className={styles.articlesContainer}>
					{loaderData.blogs.articles.map((article, index) => (
						<ArticleCard
							key={`${article.title}-${index}`}
							data={article}
						/>
					))}
				</div>
			</Col>

			{/* Sidebar */}
			<Col xs={24} lg={8} className={styles.sidebarCol}>
				<Sidebar
					blogs={loaderData.blogs.articles}
					categories={loaderData.categories}
				/>
			</Col>
		</Row>
	);
}
