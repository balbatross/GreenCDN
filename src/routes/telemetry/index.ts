import { Router } from 'express'
import { Driver, Session } from 'neo4j-driver-core'
import { Pool, PoolClient } from 'pg'

export default async (session: Session, pgClient: Pool) => {
	const router = Router()
	const client = await pgClient.connect()

	router.post('/', async (req, res) => {
		const { event, properties, source, timestamp } = req.body || {};

		await client.query(`
			INSERT INTO green_screen_telemetry 
			(event, properties, source, timestamp, created_at, created_by)
			VALUES 
			($1, $2, $3, $4, $5, $6)
		`, 
		[event, properties, source, timestamp, Date.now(), 'api']) //TODO change api to screen id

		console.log(event, properties, source, timestamp);
		res.send({success: true})
	})

	return router
}