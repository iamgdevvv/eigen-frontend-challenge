import { useEffect } from "react";
import { useProgress } from "@bprogress/react";
import { useNavigation } from "react-router";

export default function RouteProgress() {
	const navigation = useNavigation();
	const nprogress = useProgress();

	useEffect(() => {
		nprogress.start();

		if (navigation.state === "idle") {
			nprogress.stop();
		}
	}, [nprogress, navigation]);

	return null;
}
