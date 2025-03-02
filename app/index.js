import express from 'express';
import pkg from '../package.json' with { type: 'json' };
import {initIndex} from "./fileindex.js";
import {withAsyncErrorHandler} from "./lib/withAsyncErrorHandler.js";
import {indexController} from "./lib/controllers/index.controller.js";
const { version } = pkg;

const main = async () => {
	const app = express();

	console.log('Preparing index...');
	await initIndex();
	console.log('Index ready.');

	app.use('/assets', express.static('/app/app/assets'));
	app.use('/app/photos', express.static('/app/photos'));

	// General error handler
	app.use((err, req, res, next) => {
		console.error(err);
		res.status(500).send('Something went wrong');
	});

	app.get('/', withAsyncErrorHandler(indexController));
	app.get('/version', (req, res) => {
		res.send({
			version,
		});
	});

	app.listen(80);
}

main();
