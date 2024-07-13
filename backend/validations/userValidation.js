import {z} from "zod"

const userSchema = z.object({
    username: z.string().email(),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    password: z.string().min(6),
})

const signInSchema = z.object({
    username: z.string().email(),
    password: z.string().min(6)
});

export  {userSchema, signInSchema };