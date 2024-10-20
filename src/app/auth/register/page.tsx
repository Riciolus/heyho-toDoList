"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { motion } from "framer-motion";
import NavigationBarHome from "@/src/components/home/navbar";
import { toast } from "sonner";
import { signUp } from "@/src/lib/api";
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
          localStorage.setItem(
            "active-page",
            JSON.stringify({
              current: response.data.generateStarterGroupId,
              previous: "today",
            })
          );

          return router.push("/auth/login");
        }

        return toast(response?.data.message);
      })
      .finally(() => setIsLoading((prev) => !prev));
  }
  return (
    <div className="flex justify-center items-center overflow-hidden h-svh ">
      <NavigationBarHome toAuthPage="login" />

      <div className="flex justify-center items-center rounded-lg h-full noPhone:h-fit  bg-neutral-900 text-neutral-50 overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="relative flex justify-center items-center"
        >
          {/* Upper Right Gradient Effect */}
          <div className="absolute bg-gradient-to-l from-purple-800 to-green-500 w-[33%] h-[25%] rounded-full blur-[82px] -z-10 top-0 right-0 " />

          {/* Lower Left Gradient Effect */}
          <div className="absolute bg-gradient-to-l from-purple-400 to-blue-500 w-[70%] h-[20%] opacity-55 animate-out rounded-full blur-3xl -z-10 bottom-0 -left-16 " />

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
