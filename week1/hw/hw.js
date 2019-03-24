"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var node_fetch_1 = require("node-fetch");
// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example
var getDataFromAPI = function (url) {
    return new Promise(function (res, rej) {
        node_fetch_1["default"](url)
            .then(function (data) { return data.json(); })
            .then(function (json) {
            // the json variable here is just the stuff you see in the browser
            res(json);
        })["catch"](function (err) { return rej(err); });
    });
};
// get the nth person by unique spots
// @param: n - get the nth highest person by unique spots
// print the name of the nth highest person by unique spots
var getUniqueSpot = function (n) { return __awaiter(_this, void 0, void 0, function () {
    var sortbyScore, sortbyUnique;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDataFromAPI('https://spot.benc.me/?time=1549939921')];
            case 1:
                sortbyScore = _a.sent();
                sortbyUnique = sortbyScore.sort(function (left, right) {
                    return right.unique - left.unique;
                });
                console.log("The " + n + "th highest person sort by unique spots is " + sortbyUnique[n - 1].name + ".");
                return [2 /*return*/];
        }
    });
}); };
getUniqueSpot(3); // sample call to get the 3th highest person by unique spots
// count people who are spotted 3 times, more than 3 times or 0 times
// print the names of people who are spotted 3 times, more than 3 times or 0 times
var countSpots = function () { return __awaiter(_this, void 0, void 0, function () {
    var sortbyScore, count;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getDataFromAPI('https://spot.benc.me/?time=1549939921')];
            case 1:
                sortbyScore = _a.sent();
                count = sortbyScore.filter(function (eachPerson) { return eachPerson.score === 0 || eachPerson.score >= 3; });
                console.log('People who are spotted 3 times, more than 3 times or 0 times:');
                count.forEach(function (element) { return console.log(element.name); });
                return [2 /*return*/];
        }
    });
}); };
countSpots();
// put all this in your "objectively" function after you make it
// const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };
// function awry answers the coding questions from part 2 of the readme
var awry = function () {
    var docTester = [];
    // fill docTester with 1000 random integers between 0 and 99
    for (var i = 0; i < 1000; i++)
        docTester[i] = Math.floor(Math.random() * 100);
    // console.log(docTester); // uncomment this to see the array logged
    // docTesterIndex has property for every element `i`, the following holds: `docTesterIndex = docTester[i] + i`
    var docTesterIndex = [];
    docTester.forEach(function (element, index) {
        docTesterIndex.push(element + index);
    });
    // docTestIndex2 has the same property but created with array map
    var docTesterIndex2 = docTester.map(function (element, index) { return element + index; });
    // test if the sum of docTesterIndex and docTesterInde2 is around 549,000
    console.log('verify if around 549,000');
    console.log(docTesterIndex.reduce(function (acc, element) { return (acc += element); }, 0)); // add all number together
    console.log(docTesterIndex2.reduce(function (acc, element) { return (acc += element); }, 0)); // add all number together
};
awry();
