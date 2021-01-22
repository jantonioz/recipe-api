const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const jwt = require('express-jwt')

const database = require('./database')
const config = require('./config')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors())

app.use(
	config.api.base,
	jwt({
		secret: config.jwt.secret,
		requestProperty: 'auth',
		algorithms: ['HS256'],
	}).unless({
		path: ['/api/login', '/api/register', '/api/previews'],
	})
)

app.use('/api', require('./routers'))

async function start() {
	await database.getDb()
	app.listen(config.api.port, () => {
		const port = config.api.port
		console.log(new Date(), `API running on http://localhost:${port}`)
	})
}

start()
