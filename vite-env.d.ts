/// <reference types="vite/client" />

interface ViteTypeOptions {
	strictImportMetaEnv: true;
}

interface ImportMetaEnv {
	readonly VITE_NEWS_API_KEY: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface BlogPost {
	source: {
		id: string | null;
		name: string;
	} | null;
	author: string | null;
	title: string;
	description: string | null;
	url: string;
	urlToImage: string | null;
	publishedAt: string;
	content: string | null;
}

interface Category {
	label: string;
	value:
		| "business"
		| "entertainment"
		| "general"
		| "health"
		| "science"
		| "sports"
		| "technology";
}
