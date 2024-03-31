import { Hono } from 'hono';
import { decode, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { z } from 'zod';

const Userbody = z.object({
	name:z.string(),
	username:z.string().email(),
	pass:z.string().min(5,{ message: "Must be 5 or more characters long" }).trim()

})

const SignSchema = z.object({
	username:z.string().email(),
	pass:z.string().min(5,{ message: "Must be 5 or more characters long" }).trim()
})
async function findHash(pass:string):Promise<string> {
	const myText = new TextEncoder().encode(pass);

const myDigest = await crypto.subtle.digest(
  {
    name: 'SHA-256',
  },
  myText // The data you want to hash as an ArrayBuffer
);

const hasp = Array.from(new Uint8Array(myDigest))
  .map((byte) => byte.toString(16).padStart(2, '0'))
  .join('');

return hasp;
}

interface User{
	name:string,
	username:string,
	pass:string
}






// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();




app.get('/api/v1/blog/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const users = await prisma.user.findMany();
		return c.json(users);
	  } catch (error) {
		console.error('Error connecting to database:', error);
		return c.json(error);
	  } finally {
		console.log("Prisma Disconnected");
		await prisma.$disconnect();
	  }
})





app.post('/api/v1/signin',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	

	const body =await c.req.json();

	const parsedBody = await SignSchema.safeParse(body);

	if(!parsedBody.success)
	{
		return c.json({
			message :"wrong input",
			Error: parsedBody.error.message
		});
	}

	const hasedPass = await findHash(parsedBody.data.pass);//Hasing password using web crypto api in cloud flare

	console.log("Parsed Body ="+ parsedBody);
	
	
	try {
		const newUser = await prisma.user.findFirst({
			where:{
				username:parsedBody.data.username
			},
		});
		console.log('Found user:', newUser);
		if(!newUser)
		{
			return c.json({
				message : "User Not Exist"
			})
		}
		if(newUser.password != hasedPass)
		{
			return c.json({
				message : "Password Wrong"
			})
		}
		const jwt = await sign({id: newUser.id},c.env.JWT_TOKEN);
		return c.json({
			msg:"Signed In",
			JWT:jwt
		});
	  } catch (error) {
		console.error('Error Finding user:', error);
		return c.json({
			message:"Error",
			Error:error
		});
	  }
})

app.post('/api/v1/signup',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const body =await c.req.json();

	const parsedBody = await Userbody.safeParse(body);

	if(!parsedBody.success)
	{
		return c.json({
			message :"wrong input",
			Error: parsedBody.error
		});
	}

	const hasedPass = await findHash(parsedBody.data.pass);//Hasing password using web crypto api in cloud flare

	console.log(parsedBody);
	
	
	try {
		const newUser = await prisma.user.create({
		  data: {
			name: parsedBody.data.name,
			username:parsedBody.data.username,
			password:hasedPass
		  },
		});
		console.log('Created user:', newUser);
		const jwt = await sign({id: newUser.id},c.env.JWT_TOKEN);
		return c.json({
			msg:"User Created",
			JWT:jwt
		});
	  } catch (error) {
		console.error('Error creating user:', error);
		return c.text("Error");
	  }


	return c.text('signin route');
})

app.get('/api/v1/blog/:id', (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const id = c.req.param('id')
	console.log(id);
	return c.text('get blog route')
})

app.post('/api/v1/blog', (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	

	return c.text('signin route')
})

app.put('/api/v1/blog', (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	

	return c.text('signin route')
})

export default app;
