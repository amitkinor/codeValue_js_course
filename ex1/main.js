const checkFor3s = (numToCheck) => numToCheck % 3 === 0;

const checkFor5s = (numToCheck) => numToCheck % 5 === 0;

const checkForCandies = (num) => {
	if (checkFor5s(num) && checkFor3s(num)) {
		return num + " FizzBuzz";
	} else if (checkFor5s(num)) {
		return "Buzz";
	} else if (checkFor3s(num)) {
		return "Fizz";
	}
	return num;
};

for (let i = 1; i <= 100; i++) {
	console.log(checkForCandies(i));
}
