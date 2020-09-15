
// function definition
const pickANumber = (chosenNumber) => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const bigger = chosenNumber > 10;
			bigger ? resolve(true) : reject(new Error("Please choose a higher number than 10"));
		}, 500);
	});
};

//Using promise chainable
pickANumber(9)
	.then((res) => {
		res && console.log("[Chaining] Bigger than 10");
	})
	.catch((err) => console.log(`[Chaining] ${err}`))
	.finally(() => {
		console.log("[Chaining] Done");
	});

// using Async await
const pickANumberAndWait = async (chosenNumber) => {
	try {
		const result = await pickANumber(chosenNumber);
		console.log("[Await] Bigger than 10");
	} catch (err) {
		console.log(`[Await] ${err}`);
	} finally {
		console.log("[Await] Done");
	}
};

pickANumberAndWait(9);
