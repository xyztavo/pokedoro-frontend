import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const registerSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }).max(100, {
        message: "max characters reached"
    }),
    email: z.string().min(2).email({
        message: "Invalid email received."
    }).max(100, {
        message: "max characters reached"
    }),
    password: z.string().min(6, {
        message: "Password must contain at least 6 characters."
    }).max(100, {
        message: "max characters reached"
    }),
})

export default function Register() {
    const navigate = useNavigate();

    // 1. Define your form.
    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
        },
    })
    const { mutate: mutateRegister, isPending, error, isSuccess } = useMutation({
        mutationFn: (values: z.infer<typeof registerSchema>) => {
            return axios.post('https://pokedoro-backend.onrender.com/user', values)
        }, 
    })


    function onSubmit(values: z.infer<typeof registerSchema>) {
        mutateRegister(values)
       
    }
    
    useEffect(() => {
        if (isSuccess) {
            toast.success("user created!")
            navigate('/login')
        }

        if (error) {
            toast.error("Something went wrong.")
            //todo ID: add validation to error and return specific error messages.
        }
    }, [isSuccess, error])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border p-4 rounded-md ">
                <h1 className="text-xl text-center">Register now!</h1>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="ustav" {...field} />
                            </FormControl>
                            <FormDescription className="text-[10px]">
                                This is your public display name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn@gmail.com" {...field} />
                            </FormControl>
                            <FormDescription className="text-[10px]">
                                This is your email
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input placeholder="password123" {...field} />
                            </FormControl>
                            <FormDescription className="text-[10px]">
                                Choose a password to protect your account.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {isPending ? <Button type="submit" disabled>Register</Button> : <Button type="submit">Register</Button>}
            </form>
        </Form>
    )
}