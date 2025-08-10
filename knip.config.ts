import type { KnipConfig } from "knip";

export default {
	compilers: {
		css: (text: string) => {
			// https://github.com/webpro-nl/knip/issues/1008#issuecomment-2756572278
			text = text.replace("@plugin", "@import");
			return [...text.matchAll(/(?<=@)import[^;]+/g)].join("\n");
		},
	},
	ignoreDependencies: ["isbot", "@react-router/node"],
} satisfies KnipConfig;
