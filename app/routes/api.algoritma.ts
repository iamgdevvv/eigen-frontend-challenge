export function loader() {
	// Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"
	// NEGIE1 => EIGEN1
	// TeST200 => TSeT200
	function case1(input: string) {
		let strLetters: string[] = [];
		let strNumbers: number[] = [];

		for (let i = 0; i < input.length; i++) {
			const char = input[i];

			if (isNaN(parseInt(char))) {
				strLetters.unshift(char);
			} else {
				strNumbers.push(parseInt(char));
			}
		}

		return `${strLetters.join("")}${strNumbers.join("")}`;
	}

	// Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu
	// Saya sangat senang mengerjakan soal algoritma => 11
	function case2(input: string) {
		let longestWord = "";

		const words = input.split(" ");
		const wordsIndexLength = words.length - 1;

		for (let i = 0; i < wordsIndexLength / 2; i++) {
			const leftWord = words[i];
			const rightWord = words[wordsIndexLength - i];

			const longestWordThisLoop =
				leftWord.length > rightWord.length ? leftWord : rightWord;

			if (longestWordThisLoop.length > longestWord.length) {
				longestWord = longestWordThisLoop;
			}
		}

		return {
			word: longestWord,
			length: longestWord.length,
		};
	}

	// Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT
	// INPUT (['xc', 'dz', 'bbb', 'dz']) dan QUERY (['bbb', 'ac', 'dz']) maka OUTPUT ([1, 0, 2])
	function case3(input: string[], query: string[]) {
		const inputHasQuery: string[] = input.filter((input) =>
			query.includes(input),
		);

		return query.map(
			(item) => inputHasQuery.filter((input) => input === item).length,
		);
	}

	// Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN
	// [[1, 2, 0], [4, 5, 6], [7, 8, 9]] => 2
	function case4(matrix: number[][]) {
		let primaryDiagonalSum = 0;
		let secondaryDiagonalSum = 0;
		const n = matrix.length;

		for (let i = 0; i < n; i++) {
			primaryDiagonalSum += matrix[i][i];
			secondaryDiagonalSum += matrix[i][n - 1 - i];
		}

		return Math.abs(primaryDiagonalSum - secondaryDiagonalSum);
	}

	return new Response(
		JSON.stringify({
			case1: [
				{
					input: "NEGIE1",
					output: case1("NEGIE1"),
				},
				{
					input: "TeS1T200",
					output: case1("TeS1T200"),
				},
			],
			case2: [
				{
					input: "Saya sangat senang mengerjakan soal algoritma",
					output: case2(
						"Saya sangat senang mengerjakan soal algoritma",
					),
				},

				{
					input: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
					output: case2(
						"Lorem Ipsum is simply dummy text of the printing and typesetting industry",
					),
				},
			],
			case3: [
				{
					input: ["xc", "dz", "bbb", "dz"],
					query: ["bbb", "ac", "dz"],
					output: case3(
						["xc", "dz", "bbb", "dz"],
						["bbb", "ac", "dz"],
					),
				},
				{
					input: [
						"xc",
						"dz",
						"bbb",
						"dz",
						"bbb",
						"ac",
						"dz",
						"xc",
						"dz",
					],
					query: ["bbb", "ac", "dz", "xc"],
					output: case3(
						[
							"xc",
							"dz",
							"bbb",
							"dz",
							"bbb",
							"ac",
							"dz",
							"xc",
							"dz",
						],
						["bbb", "ac", "dz", "xc"],
					),
				},
			],
			case4: [
				{
					input: [
						[1, 2, 0],
						[4, 5, 6],
						[7, 8, 9],
					],
					output: case4([
						[1, 2, 0],
						[4, 5, 6],
						[7, 8, 9],
					]),
				},
				{
					input: [
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9],
					],
					output: case4([
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9],
					]),
				},
			],
		}),
		{
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
}
