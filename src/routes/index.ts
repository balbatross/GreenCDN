import { Router } from 'express'
import provisionRouter from './provision'
import distributeRouter from './distribute'
import telemetryRouter from './telemetry'
import { Driver } from 'neo4j-driver-core'

export default (driver: Driver) => {

	const session = driver.session()

	const router = Router()

	router.use(`/telemetry`, telemetryRouter(session))
	router.use('/provision', provisionRouter(session))
	router.use('/distribute', distributeRouter(session))

	return router
}