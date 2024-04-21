import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono';
import findHash from '../Others/findHash';
import { SignSchema, Userbody } from '@imdeveshshukla/common-app';
import { sign, verify } from 'hono/jwt';


const User =new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();

User.get("/",(c)=>{
	return c.json({
		Server:"Healthy"
	})
})

User.get('/refresh',async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	

	const header = c.req.header("authorization") || "";
	const token = header.split(" ")[1];
	if(token)
	{
		try{
			const ver = await verify(token,c.env.JWT_TOKEN);
			console.log(ver);
			if(ver.id)
			{
				const name = await prisma.user.findFirst({
					where:{
						id:ver.id
					},
					select:{
						name:true
					}
				});
				return c.json({
					id:ver.id,
					"name":name
				})
			}
			else{
				c.status(403);
				return c.json({
					msg:"User Not logged In"
				})
			}
		}
		catch(err){
			c.status(403);
			return c.json({
				msg:"User Not logged In"
			})
		}
	}
	c.status(403);
	return c.json({
		msg:"User Not logged In"
	})
})

User.post('/signin',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	

	const body =await c.req.json();

	const parsedBody = await SignSchema.safeParse(body);

	if(!parsedBody.success)
	{
		return c.json({
			msg :"wrong input",
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
			c.status(200);
			return c.json({
				msg : "User Not Exist"
			})
		}
		if(newUser.password != hasedPass)
		{
			c.status(200);
			return c.json({
				msg : "Password Wrong"
			})
		}
		const jwt = await sign({id: newUser.id},c.env.JWT_TOKEN);
		return c.json({
			msg:"Signed In",
			name:newUser.name,
			JWT:jwt
		});
	  } catch (error) {
		console.error('Error Finding user:', error);
		return c.json({
			msg:"Unknown Error",
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
			msg :"wrong input",
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
			msg:"Created",
			name:newUser.name,
			JWT:jwt
		});
	  } catch (error) {
		console.error('Error creating user:', error);
		return c.json({
			msg : "Might Username Already Exist or Some other issue"
		});
	  }

})



export default User;
