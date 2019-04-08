import fetch from "node-fetch";
let sha1 = require('sha1');

interface cityInfo {
    name: string;
    lat: number | string;
    lon: number | string;
}

import { city_names } from './city_names';
import { async } from "q";
const size = 5; // size of the array of city names
const slackUsername = 'D44FTVCHJ';

const getCity = async (): Promise<cityInfo[]> => {
    let cities = randomCity(size);
    let cityGeo = cities.map(async name => await getEachCity(name));
    // use Promise.all to get the correct return type
    return Promise.all(cityGeo);
}

// grab a random array from city_names of size n as input param, return a random string array
const randomCity = (size: number): string[] => {
    // Shuffle array
    const shuffled = city_names.sort(() => 0.5 - Math.random());
    // Get sub-array of first n elements after shuffled
    return shuffled.slice(0, size);
}

const getEachCity = async (name: string): Promise<cityInfo> => {
    let geoResponse = await fetch(`https://nominatim.openstreetmap.org/?format=json&q=${name}&format=json&limit=3&email=${process.env.EMAIL}`);
    let geoInfo = await geoResponse.json();
    let city: cityInfo = {
        name: name,
        lat: parseFloat(geoInfo[0].lat).toFixed(4),
        lon: parseFloat(geoInfo[0].lon).toFixed(4)
    }
    return Promise.resolve(city);
}

// test from slackAPI
const slackAPI = async (data: cityInfo[]): Promise<boolean> => {
    let sendToSlack = await fetch(`https://send-to-slack-nfp4cc31q.now.sh/?user=${slackUsername}&data=${JSON.stringify(data)}`);
    let sha1Slack = await sendToSlack.json();
    return Promise.resolve(sha1Slack.sha1 === sha1(JSON.stringify(data)));
}

// tesyt the function
(async () => {
    let cityData = await getCity();
    console.log(cityData);
    console.log(await slackAPI(cityData));
})();