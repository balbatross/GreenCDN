import { Router } from 'express'
import provisionRouter from './provision'
import distributeRouter from './distribute'
import telemetryRouter from './telemetry'
import { Driver } from 'neo4j-driver-core'
import { Pool, PoolClient } from 'pg'

export default async (driver: Driver, pgClient: Pool) => {

	const session = driver.session()

	const router = Router()

	router.use(`/telemetry`, await telemetryRouter(session, pgClient))
	router.use('/provision', provisionRouter(session))
	router.use('/distribute', distributeRouter(session))

	return router
}