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
import { signIn } from "@/app/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5).max(20),
});

const LoginPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    signIn(values).then((response) => {
      if (response?.data.status) {
        toast(response.data.message);
        return router.push("/");
      }

      return toast(response?.data.message);
    });
  }
  return (
    <div className="overflow-hidden h-screen max-h-screen">
      <NavigationBarHome toAuthPage="register" />

      <div className="flex h-full justify-center bg-neutral-900 text-neutral-50 ">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="container flex justify-center items-center"
        >
          <div className="flex flex-col justify-center items-center noPhone:border noPhone:border-line px-16 py-12 rounded-lg">
            <h2 className="text-center  text-3xl w-[24rem] noPhone:w-full font-semibold ">
              Welcome back! <br /> Your tasks await you.
            </h2>
            <div className="mt-8 noPhone:mt-12">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="flex flex-col gap-4">
                    {/* Username Input */}
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

                    {/* Password Input */}
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="*****"
                              type="password"
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
                      >
                        Submit
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

export default LoginPage;
