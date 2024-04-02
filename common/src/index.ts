import { z } from "zod"

export const Userbody = z.object({
	name:z.string(),
	username:z.string().email(),
	pass:z.string().min(5,{ message: "Must be 5 or more characters long" }).trim()

})

export const SignSchema = z.object({
	username:z.string().email(),
	pass:z.string().min(5,{ message: "Must be 5 or more characters long" }).trim()
})


export const BlogSchema = z.object({
	title:z.string(),
	content:z.string(),
	thumbnail:z.string().optional()
})

export const BlogUpdateSchema = z.object({
    id:z.number(),
	title:z.string(),
	content:z.string(),
	thumbnail:z.string().optional()
})

export type SignUpInput = z.infer<typeof Userbody>
export type SignInInput = z.infer<typeof SignSchema> 
export type BlogInput = z.infer<typeof BlogSchema>
export type BlogUpdate = z.infer<typeof BlogUpdateSchema>