import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import findHash from '../Others/findHash';
import { SignSchema, Userbody } from '@imdeveshshukla/common-app';
import { sign } from 'hono/jwt';


const User =new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();

User.post('/signin',async (c) => {
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
			c.status(403);
			return c.json({
				message : "User Not Exist"
			})
		}
		if(newUser.password != hasedPass)
		{
			c.status(403);
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

User.post('/signup',async (c) => {
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



export default User;
