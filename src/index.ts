import { config } from 'dotenv'
config();

import express from 'express';
import routes from './routes';

import neo4j from "neo4j-driver"

const driver = neo4j.driver(
	process.env.NEO4J_URI || "localhost",
	neo4j.auth.basic(process.env.NEO4J_USER || "neo4j", process.env.NEO4J_PASSWORD || "test")
)

const app = express();

app.use(routes(driver))

app.listen(4200)