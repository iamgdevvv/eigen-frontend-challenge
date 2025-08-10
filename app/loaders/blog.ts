import { LRUCache } from "lru-cache";

import { slugify } from "~/libs/utils";

const lruCache = new LRUCache<
	{},
	{
		articles: BlogPost[];
	}
>({
	ttl: 1000 * 60 * 60, // 60 minutes
	ttlAutopurge: true, // purge every 60 minutes
	updateAgeOnGet: false,
	updateAgeOnHas: false,
});

const baseNewsApi = "https://newsapi.org/v2";

export async function getBlogs(options?: {
	category?: string | null;
}): Promise<{
	articles: BlogPost[];
}> {
	const searchParams = new URLSearchParams();

	searchParams.set("country", "us");
	searchParams.set("apiKey", import.meta.env.VITE_NEWS_API_KEY);

	if (options?.category) {
		searchParams.set("category", options.category);
	}

	const queryParams = searchParams.toString();

	if (lruCache.get(queryParams)) {
		const cachedBlogs = lruCache.get(queryParams);

		if (cachedBlogs) {
			return cachedBlogs;
		}
	}

	try {
		const res = await fetch(`${baseNewsApi}/top-headlines?${queryParams}`);

		const data = (await res.json()) as {
			articles: BlogPost[];
		};

		if (Array.isArray(data.articles) && data.articles.length > 0) {
			lruCache.set(queryParams, data);
		}

		return {
			articles: data.articles,
		};
	} catch (error) {
		console.error("Error fetching blogs", queryParams, error);

		return {
			articles: [],
		};
	}
}

export async function getBlog(
	slug: string
): Promise<BlogPost | null> {
	const searchParams = new URLSearchParams();

	let blog: BlogPost | null = null;

	lruCache.forEach((data) => {
		data.articles.find((article) => {
			if (slugify(article.title) === slug) {
				blog = article;
			}
		})
	});

	if(blog) {
		return blog;
	}

	searchParams.set("q", slug);
	searchParams.set("searchIn", "title");
	searchParams.set("apiKey", import.meta.env.VITE_NEWS_API_KEY);

	const queryParams = searchParams.toString();

	if (lruCache.get(queryParams)) {
		const cachedBlogs = lruCache.get(queryParams);

		if (cachedBlogs) {
			return cachedBlogs.articles[0];
		}
	}

	try {
		const res = await fetch(`${baseNewsApi}/everything?${queryParams}`);

		const data = (await res.json()) as {
			articles: BlogPost[];
		};

		if (Array.isArray(data.articles) && data.articles.length > 0) {
			lruCache.set(queryParams, data);

			return data.articles[0];
		}

		return null;
	} catch (error) {
		console.error("Error fetching blog", queryParams, error);

		return null;
	}
}

export async function getCategories(): Promise<Category[]> {
	return [
		{
			label: "Business",
			value: "business",
		},
		{
			label: "Entertainment",
			value: "entertainment",
		},
		{
			label: "General",
			value: "general",
		},
		{
			label: "Health",
			value: "health",
		},
		{
			label: "Science",
			value: "science",
		},
		{
			label: "Sports",
			value: "sports",
		},
		{
			label: "Technology",
			value: "technology",
		},
	];
}
