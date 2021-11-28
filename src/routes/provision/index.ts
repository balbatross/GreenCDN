import { Router } from 'express'
import { Driver, Session } from 'neo4j-driver-core'
import { v4 } from 'uuid'
const Moniker = require('moniker')
import jwt from 'jsonwebtoken';

export default (session: Session) => {
	const router = Router()

	router.route('/code')
		.get(async (req, res) => {
			let moniker = Moniker.choose()
			let id = v4()
		
			await session.run(`
				CREATE (n:ProvisionCode {id: $id, slug: $slug, createdAt: $createdAt})
			`, {
				id,
				slug: moniker,
				createdAt: new Date().toISOString()
			})
			res.send({code: moniker})

		})
		.post(async (req, res) => {
			let {code} = req.body;

			let result = await session.run(`
				MATCH (code:ProvisionCode {slug: $slug})-[:PROVISIONED]->(display:Display)
				RETURN display
			`, {
				slug: code
			})

			const display = result.records?.[0]?.get(0)?.properties

			if(display){
				let token = jwt.sign({
					displayId: display.id,
				}, 'test')
				res.send({token})
			}else{
				res.send({error: "Not provisioned yet"})
			}
		})
	return router
}