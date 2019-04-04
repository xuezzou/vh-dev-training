/**
 * Simple Koa server with some examples of routing and middleware extension
 * Written by @IrfaanKhalid
 */

import Koa from 'koa';
import KoaRouter from 'koa-router';

const PORT = 3000;

const app = new Koa();
const router = new KoaRouter(); // Middleware library!

// Here's an empty path
router.get('/', ctx => {
	ctx.body = 'The Bushes sponsor VandyHacks';
});

// Let's get a bit more interesting...
router.get('/log', ctx => {
	ctx.body = 'Check your console ;)';
	console.log(`Logged at ${new Date()}`);
});

// Set up our app to use our defined routes
app.use(router.routes()).use(router.allowedMethods());

// Let's launch!
app.listen(PORT, () => {
	console.log(`>>> Server started at http://localhost:${PORT}`);
});
