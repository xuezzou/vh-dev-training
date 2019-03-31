import Koa from 'koa';
import { getWeatehrAsyncAwait } from './hw';

const app = new Koa();

app.use(async ctx => {
	ctx.body = await getWeatehrAsyncAwait('Vanderbilt University', 'D44FTVCHJ');
});

app.listen(3000);
