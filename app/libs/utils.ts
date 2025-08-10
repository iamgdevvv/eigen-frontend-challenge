import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...args: ClassValue[]) {
	return twMerge(clsx(...args));
}

export function slugify(string: string) {
	return string
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/^\s+|\s+$/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-");
}

export function readingTimes(string: string | null) {
	return Math.ceil((string || "").split(" ").length / 200);
}
