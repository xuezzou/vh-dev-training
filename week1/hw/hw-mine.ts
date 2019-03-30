import fetch from 'node-fetch';

// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
const getDataFromAPI = (url: string) =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});

// get the nth person by unique spots
// @param: n - get the nth highest person by unique spots
// print the name of the nth highest person by unique spots
const getUniqueSpot = async (n: number) => {
	const sortbyScore : any = await getDataFromAPI('https://spot.benc.me/?time=1549939921'); // sample call - delete before you submit
	const sortbyUnique = sortbyScore.sort(function(left: any, right: any) {
		return right.unique - left.unique;
	});
	console.log(`The ${n}th highest person sort by unique spots is ${sortbyUnique[n - 1].name}.`);
};
getUniqueSpot(3); // sample call to get the 3th highest person by unique spots

// count people who are spotted 3 times, more than 3 times or 0 times
// print the names of people who are spotted 3 times, more than 3 times or 0 times
const countSpots = async () => {
	const sortbyScore: any = await getDataFromAPI('https://spot.benc.me/?time=1549939921'); // sample call - delete before you submit
	const count = sortbyScore.filter(
		(eachPerson: any) => eachPerson.score === 0 || eachPerson.score >= 3
	);
	console.log('People who are spotted 3 times, more than 3 times or 0 times:');
	count.forEach((element: any) => console.log(element.name));
};
countSpots();

// put all this in your "objectively" function after you make it
// const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

// function awry answers the coding questions from part 2 of the readme
const awry = () => {
	const docTester = [];
	// fill docTester with 1000 random integers between 0 and 99
	for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);
	// console.log(docTester); // uncomment this to see the array logged
	// docTesterIndex has property for every element `i`, the following holds: `docTesterIndex = docTester[i] + i`
	const docTesterIndex: number[] = [];
	docTester.forEach((element, index) => {
		docTesterIndex.push(element + index);
	});
	// docTestIndex2 has the same property but created with array map
	const docTesterIndex2 = docTester.map((element, index) => element + index);
	// test if the sum of docTesterIndex and docTesterInde2 is around 549,000
	console.log('verify if around 549,000');
	console.log(docTesterIndex.reduce((acc, element) => (acc += element), 0)); // add all number together
	console.log(docTesterIndex2.reduce((acc, element) => (acc += element), 0)); // add all number together
};
awry();
