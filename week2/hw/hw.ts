import { resolve } from "dns";
import fetch from "node-fetch";

// hw2 practice async
const request = require('request'); // I hate myself everytime I type this
require('dotenv').config();
let sha1 = require('sha1');

// interface for queries
interface WeatherUpdate {
	location: string; // i.e. "Vanderbilt University"
	weather: string; // the format specified in the README
	lat: number | string;
	lon: number | string;
	name: string; // your name - use this from process.env
}

// task with callback
const getWeatherCallback = (
	location: string,
	slackUsername: string,
	callback: (body: any) => void,
): void => {
	request(
		// get the location data from the following API
		`https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`,
		(error: any, _response: any, geoBody: any) => {
			if (error) {
				console.log(error);
			} else {
				geoBody = JSON.parse(geoBody);
				// create a location with its geo attributes from the return body
				let locationGeo: WeatherUpdate = {
					location: location,
					lat: parseFloat(geoBody[0].lat).toFixed(4),
					lon: parseFloat(geoBody[0].lon).toFixed(4),
					weather: '',
					name: String(process.env.NAME)
				}
				// call the call back function to furthur process the location info
				getWeatherFromDarkSky(locationGeo, slackUsername, callback);
			}
		}
	);
};

// get the weather from dark sky API using latitude and longitude
const getWeatherFromDarkSky = (
	locationGeo: WeatherUpdate,
	slackUsername: string,
	callback: (body: any) => void,
): void => {
	request(
		`https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${locationGeo.lat},${locationGeo.lon}`,
		(error: any, _response: any, darkSkyBody: any) => {
			if (error) {
				console.log(error);
			} else {
				darkSkyBody = JSON.parse(darkSkyBody);
				locationGeo.weather = `It's ${darkSkyBody.currently.summary} and it's ${Math.round(darkSkyBody.currently.temperature)} degrees.`;
				// callback(locationGeo.weather);
				decodeWeather(locationGeo, slackUsername, callback);
			}
		}
	);
}

// test if the result from darkSky match using sha1
const decodeWeather = (
	locationGeo: WeatherUpdate,
	slackUsername: string,
	callback: (body: any) => void,
): void => {
	request(
		`https://send-to-slack-nfp4cc31q.now.sh/?user=${slackUsername}&data=${JSON.stringify(locationGeo)}`,
		(error: any, _response: any, sha1Body: any) => {
			if (error) {
				console.log(error);
			} else {
				sha1Body = JSON.parse(sha1Body);
				let verification = sha1Body.sha1 === sha1(JSON.stringify(locationGeo));
				callback(verification);
			}
		}
	);
}


// change Promise<object> to Promise<TheTypeThatYouAreMaking> for both functions
const getWeatherPromises = (location: string, slackUsername: string): Promise<WeatherUpdate> => {
	return new Promise((resolve, reject) => {
		getGeoPromises(location, slackUsername)
			.then(geoData => {
				fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${geoData.lat},${geoData.lon}`)
					.then(res => res.json()).then(darskyData => {
						geoData.weather = `It's ${darskyData.currently.summary} and it's ${Math.round(darskyData.currently.temperature)} degrees.`;
						// decodeWeather(geoData, slackUsername, console.log)
						resolve(geoData);
					});
			})
			.catch(err => reject(err));
	});
}

const getGeoPromises = (location: string, slackUsername: string): Promise<WeatherUpdate> => {
	return new Promise((resolve, reject) => {
		fetch(`https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`)
			.then(res => res.json())
			.then(geoData => {
				resolve({
					location: location,
					lat: parseFloat(geoData[0].lat).toFixed(4),
					lon: parseFloat(geoData[0].lon).toFixed(4),
					weather: '',
					name: String(process.env.NAME)
				});
			}).catch(err => {
				reject(err);
			});
	});
}

export const getWeatehrAsyncAwait = async (location: string, slackUsername: string): Promise<object> => {
	let geoResponse = await fetch(`https://nominatim.openstreetmap.org/?format=json&q=${location}&format=json&limit=3&email=${process.env.EMAIL}`);
	let geoData = await geoResponse.json();
	let locationData = {
		location: location,
		lat: parseFloat(geoData[0].lat).toFixed(4),
		lon: parseFloat(geoData[0].lon).toFixed(4),
		weather: '',
		name: String(process.env.NAME)
	};
	let weatherResponse = await fetch(`https://api.darksky.net/forecast/${process.env.DARK_SKY_TOKEN}/${locationData.lat},${locationData.lon}`)
	let darskyData = await weatherResponse.json();
	locationData.weather = `It's ${darskyData.currently.summary} and it's ${Math.round(darskyData.currently.temperature)} degrees.`;
	return new Promise((resolve, reject) => {
		// decodeWeather(locationData, slackUsername, console.log);
		resolve(locationData);
	})
};


// // all the console.logs should log what the send-to-slack API returns
// getWeatherCallback('Vanderbilt University', 'UG0AGB30F', body => {
// 	console.log(body);
// });


// getWeatherPromises('Vanderbilt University', 'D44FTVCHJ').then(data => {
// 	console.log(data);
// });

// (async () => {
// 	console.log(await getWeatehrAsyncAwait('Vanderbilt University', 'D44FTVCHJ'));
// })();