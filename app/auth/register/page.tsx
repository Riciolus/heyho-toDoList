"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/shadcn/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/app/components/shadcn/button";
import { Input } from "@/app/components/shadcn/input";
import { motion } from "framer-motion";
import NavigationBarHome from "@/app/components/home/navbar";
import { toast } from "sonner";
import { signUp } from "@/app/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  name: z.string().min(3).max(15),
  email: z.string().email(),
  password: z.string().min(5).max(20),
  validationPassword: z.string().min(5).max(20),
});

const RegisterPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      validationPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { password, validationPassword, name, email } = values;

    if (password !== validationPassword) {
      return toast("Password validation does not match.");
    }

    setIsLoading(true);

    signUp({ name, email, password })
      .then((response) => {
        if (response?.data.status) {
          toast(response?.data.message);
          return setTimeout(() => router.push("/auth/login"), 1000);
        }

        return toast(response?.data.message);
      })
      .finally(() => setIsLoading((prev) => !prev));
  }
  return (
    <div className="overflow-hidden h-screen max-h-screen ">
      <NavigationBarHome toAuthPage="login" />

      <div className="flex h-fit mt-16 noPhone:mt-0 noPhone:h-full  justify-center items-center bg-neutral-900 text-neutral-50 ">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="container flex justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center noPhone:border noPhone:border-line px-16 py-12 rounded-lg">
            <h2 className="text-center  text-3xl font-semibold  w-[24rem] noPhone:w-full">
              Your first task <br />
              is just a sign-up away.
            </h2>
            <div className="mt-8 noPhone:mt-12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="username"
                              className="bg-neutral-800 w-[19rem] noPhone:w-[24rem] border-line"
                              {...field}
                            />
                          </FormControl>
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
                            <Input
                              placeholder="example@gmail.com"
                              className="bg-neutral-800 w-[19rem] noPhone:w-[24rem] border-line"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Validate Password */}
                    <FormField
                      control={form.control}
                      name="validationPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="*****"
                              className="bg-neutral-800 w-[19rem] noPhone:w-[24rem] border-line"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Validate Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="*****"
                              className="bg-neutral-800 w-[19rem] noPhone:w-[24rem] border-line"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className=" flex justify-center mt-5">
                      <Button
                        className="bg-neutral-700 text-neutral-50 hover:bg-onhover w-full border border-line"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading" : "Submit"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
