import { z } from "zod";

/*
export const loginSchema = z.object({
    //name: z.string({required_error: 'Name is required'}),
    email: z.string({required_error: 'Email is required'}).email({message:'Please enter a valid email'}),
    password: z.string({required_error: 'Password is required'}).min(8, {message:'Password must be at least 8 characters'}).trim(),
    confirmPassword: z.string({required_error: 'Password is required'}).trim(),
    //tos: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions" }) }),
    //remember: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This sets the error on the confirmPassword field
});

export type LoginSchema = typeof loginSchema;
*/






export const userSchema = z.object({
    name: z.string({required_error: 'Name is required'}),
    email: z.string({required_error: 'Email is required'}).email({message:'Please enter a valid email'}),
    password: z.string({required_error: 'Password is required'}).min(8, {message:'Password must be at least 8 characters'}).trim(),
    confirmPassword: z.string({required_error: 'Password is required'}).trim(),
    tos: z.literal(true, { errorMap: () => ({ message: "You must accept the terms and conditions" }) }),
    remember: z.boolean()
})


export const registerSchema = userSchema.pick({ email: true, password: true, confirmPassword: true }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This sets the error on the confirmPassword field
});
export type RegisterSchema = typeof registerSchema;


export const loginSchema = userSchema.pick({ email: true, password: true });
export type LoginSchema = typeof loginSchema;
