import {
	href,
	isRouteErrorResponse,
	Link,
	Links,
	Meta,
	Navigate,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";
import { Layout as LayoutAntd } from "antd";
import { ProgressProvider } from "@bprogress/react";

import "@fontsource-variable/inter";
import interWoff2 from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url";

import "~/styles/root.css";

import type { Route } from "./+types/root";
import Header from "~/ui/layouts/header";
import Footer from "~/ui/layouts/footer";
import RouteProgress from "~/ui/components/progress";

export const links: Route.LinksFunction = () => {
	return [
		{
			rel: "preload",
			href: interWoff2,
			as: "font",
			type: "font/woff2",
			crossOrigin: "anonymous",
		},
		{
			rel: "icon",
			href: "/favicon.svg",
			type: "image/svg+xml",
		},
		{
			rel: "apple-touch-icon",
			href: "/apple-touch-icon.png",
		},
	];
};

export async function loader({ request }: Route.LoaderArgs) {
	const { origin } = new URL(request.url);
	return { origin };
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="id">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<Meta />
				<Links />
			</head>
			<body>
				<ProgressProvider
					options={{
						showSpinner: true,
					}}
				>
					<LayoutAntd className="site">
						<Header />
						<LayoutAntd.Content className="site-main">
							{children}
						</LayoutAntd.Content>
						<Footer />
					</LayoutAntd>
					<ScrollRestoration />
					<Scripts />
					<RouteProgress />
				</ProgressProvider>
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return <Navigate to="/404" />
}

export const meta: Route.MetaFunction = ({
	data,
	error,
	location: { pathname },
}) => {
	if (!data) {
		return [];
	}
	const { origin } = data;
	const title =
		isRouteErrorResponse(error) && error.status === 404
			? "Page not found | Medium"
			: "Medium - Blog with News API";
	const description = "Blog with News API";
	const currentUrl = origin + pathname;
	const ogImageUrl = `${origin}/apple-touch-icon.png`;

	return [
		{
			title,
		},
		{
			name: "description",
			content: description,
		},
		{
			property: "og:title",
			content: title,
		},
		{ tagName: "link", rel: "canonical", href: currentUrl },
		{ property: "og:description", content: description },
		{ property: "og:image", content: ogImageUrl },
		{ property: "og:image:alt", content: title },
		{ property: "og:image:type", content: "image/png" },
		{ property: "og:image:width", content: "2400" },
		{ property: "og:image:height", content: "1260" },
		{ property: "og:url", content: currentUrl },
		{
			property: "og:type",
			content: "website",
		},
		{
			property: "og:site_name",
			content: "Medium",
		},
		{
			property: "og:locale",
			content: "en_US",
		},
	];
};
