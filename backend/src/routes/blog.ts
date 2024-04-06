import { Hono } from 'hono';
import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';
import { BlogSchema, BlogUpdateSchema } from '@imdeveshshukla/common-app';
import { jwt, verify } from 'hono/jwt';
const Blog = new Hono<{
	Bindings: {
		DATABASE_URL: string
		JWT_TOKEN : string
	}
}>();
function getMonth(){
	const mon = ["Jan","Feb","Mar","Apr","June","July","Aug","Sept","Oct","Nov","Dec"];
	return mon[new Date().getMonth()-1];
}
Blog.use("/*",async (c,next)=>{
	const header = c.req.header("authorization") || "";
	const token = header.split(" ")[1];
	if(token)
	{
		const ver = await verify(token,c.env.JWT_TOKEN);
		if(ver.id)
		{
			console.log(ver.id);
			c.set("jwtPayload",ver.id);
			await next();
		}
		else{
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

Blog.get('/bulk',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	// console.log(prisma)
	try {
		const users = await prisma.post.findMany();
		users.forEach((val)=>{
			val.authorId
		})
		return c.json(users);
	  } catch (error) {
		console.error('Error connecting to database:', error);
		return c.json(error);
	  }
})





Blog.get('/:id',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const id = Number(c.req.param('id'))
	

	try{
		const blog = await prisma.post.findFirst({
			where:{
				id
			},
		});
		return c.json(blog);
	}
	catch(err)
	{
		c.status(404);
		return c.json({
			msg:"Blog Not Found"
		})
	}

})

Blog.post('/',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	
	const dat  =await c.req.json();
	const body = await BlogSchema.safeParse(dat);
	const author = c.get("jwtPayload");
	
	console.log(body);
	if(!body.success)
	{
		c.json({
			message : "Blog Input Invalid"
		})
	}

	try{
		const blog = await prisma.post.create({
			data:{
				authorId:Number(author),
				title:dat.title,
				content:dat.content,
				date:`${getMonth()} ${new Date().getDate()} ${new Date().getFullYear()}`
			},
		})
		return c.json({
			msg:"Created Successfully",
			blog
		})
	}catch(err){
		return c.json({
			msg:"Error",
			err
		})
	}
})

Blog.put('/',async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const dat  =await c.req.json();
	const body = await BlogUpdateSchema.safeParse(dat);
	const author = c.get("jwtPayload");
	
	if(!body.success)
	{
		c.json({
			message : "Blog Input Invalid"
		})
	}

	try{
		const blog = await prisma.post.update({
			where:{
				id:dat.id
			},
			data:{
				authorId:Number(author),
				title:dat.title,
				content:dat.content
			},
		})
		c.json({
			msg:"Updated Successfully",
			blog
		})
	}catch(err){
		c.json({
			msg:"Error",
			err
		})
	}
})
Blog.post("/:id",async(c)=>{
	const prisma = new PrismaClient({
		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());
	const author_id = c.get("jwtPayload");
	const id = await c.req.param("id");
	if(!id)
	{
		return c.json({
			message : "Id is Null"
		})
	}
	try{
		const update =await prisma.post.update({
			where:{
				id:Number(id),
				authorId:author_id
			},
			data:{
				published:true,
			},
		})
		return c.json({
			message:"Published",
			Blog:update
		})
	}
	catch(err){
		return c.json({
			message: "Some Error Occured",
			Error:err
		})
	}
	

})
export default Blog;