import { Hono } from 'hono';
import { cors } from 'hono/cors';
import User from './routes/user';
import Blog from './routes/blog';



// Create the main Hono app

const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();



app.use('api/*', cors());
app.use(
	'api2/*',
	cors({
	  origin: 'http://localhost:5173/',
	  allowHeaders: ['X-Custom-Header', 'Upgrade-Insecure-Requests'],
	  allowMethods: ['POST', 'GET', 'OPTIONS'],
	  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
	  maxAge: 600,
	  credentials: true,
	})
  )


app.route("api/v1/user",User);
app.route("api/v1/blog",Blog);

export default app;
