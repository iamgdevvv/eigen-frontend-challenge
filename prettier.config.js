const functions = ["cx", "clsx"];

/** @type {import("prettier").Config} */
const config = {
	tailwindFunctions: functions,
	customFunctions: functions,
	endingPosition: "absolute",
	tailwindStylesheet: "./app/app.css",
	plugins: [
		// https://www.nikolailehbr.ink/blog/tailwind-css-tips#Automatic-wrapping-of-long-class-names
		"prettier-plugin-tailwindcss",
		"prettier-plugin-classnames",
		"prettier-plugin-merge",
	],
	semi: true,
	tabWidth: 4,
	useTabs: true,
	singleQuote: false,
};

export default config;
