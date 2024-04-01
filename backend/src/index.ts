import { Hono } from 'hono';
import User from './routes/user';
import Blog from './routes/blog';



// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();





app.route("api/v1/user",User);
app.route("api/v1/blog",Blog);

export default app;
