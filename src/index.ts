import express, { Application } from 'express'
import morgan from 'morgan'
import { auth } from 'express-openid-connect'

const PORT = process.env.PORT || 8080
const app: Application = express()

app.use(express.json())
app.use(morgan('tiny'))
app.use(auth({
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
}))

app.listen(PORT, () => console.log('express is running on port', PORT))