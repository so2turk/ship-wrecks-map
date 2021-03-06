import express from 'express'
import dotenv from 'dotenv'
import shipWreckRouter from './routes/ship-wreck.js'
import userRouter from './routes/user.js'

dotenv.config()
import('./util/database-connection.js')

const app = express()
app.use(express.json())
app.use('/api/ships', shipWreckRouter)
app.use('/api/users', userRouter)

const port = process.env.PORT || 4000
app.set('PORT', port)

app.get('/api', (req, res) => res.send('Server is up and runnning'))
app.listen(port, console.log(`Listening on port ${port}.`))
