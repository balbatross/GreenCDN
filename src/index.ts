import { config } from 'dotenv'
config();

import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import neo4j from "neo4j-driver"
import { Pool, PoolClient } from "pg";

(async () => {
	const pgClient = new Pool({
		// database: 'qdb',
		host: process.env.TIMESERIES_HOST,
		port: 5432,
		user: 'postgres',
		password: process.env.TIMESERIES_PASSWORD,
	});
	
	const driver = neo4j.driver(
		process.env.NEO4J_URI || "localhost",
		neo4j.auth.basic(process.env.NEO4J_USER || "neo4j", process.env.NEO4J_PASSWORD || "test")
	)
	
	const app = express();
	app.use(bodyParser.json())
	
	app.use('/api/', await routes(driver, pgClient))
	app.listen(process.env.NODE_ENV == 'prod' ? 80 : 4200)
})()
