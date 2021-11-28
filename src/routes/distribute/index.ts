import { Router } from 'express'
import { Driver, Session } from 'neo4j-driver-core'

export default (session: Session) => {
	const router = Router()

	router.route('/')
		.get(async (req, res) => {
			const campaigns = await session.run(`
				MATCH (campaigns:Campaign)
				RETURN campaigns{.*}
			`)
			res.send({
				campaigns: campaigns?.records?.map(record => record.get(0))
			})
		})
	
	// router.route('/')

	return router
}