import fetch from 'node-fetch';

// to call this function, you'll need to do two things
// 1st, your function must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like this: await getDataFromAPI(url)
const getDataFromAPI = url =>
	new Promise((res, rej) => {
		fetch(url)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});

// write your homework here

// put all this in your "objectively" function after you make it
const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

// put this stuff in your "awry" function after you make it
const docTester = [];
// fill docTester with 1000 random integers between 0 and 99
for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);
console.log(docTester);
