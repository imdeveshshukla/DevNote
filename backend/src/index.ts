import { Hono } from 'hono';
import { User,Post } from '@prisma/client';

import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/extension';



// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
	}
}>();




app.use((c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	next();
})

app.post('/api/v1/signup', (c) => {
	
	return c.text('signup route')
})

app.post('/api/v1/signin', (c) => {
	return c.text('signin route')
})

app.get('/api/v1/blog/:id', (c) => {
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	return c.text('signin route')
})

export default app;
