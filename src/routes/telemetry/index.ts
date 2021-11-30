import { Router } from 'express'
import { Driver, Session } from 'neo4j-driver-core'

export default (session: Session) => {
	const router = Router()

	router.post('/', async (req, res) => {
		const { event, properties, source, timestamp } = req.body;

		console.log(event, properties, source, timestamp);
	})

	return router
}