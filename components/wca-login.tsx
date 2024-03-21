"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Modal } from "./modal";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1),
});

const LoginButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const resp = await res.json();

      if (!resp.data.access_token) {
        toast.error("Invalid credentials");
      }

      if (resp.data.access_token) {
        toast.success("Logged in successfully");
        localStorage.setItem("wca-access-token", resp.data.access_token);
        setIsOpen(false);
        getUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePassVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getUser = async () => {
    const access_token = localStorage.getItem("wca-access-token");

    try {
      const res = await fetch(`/api/auth?access-token=${access_token}`, {
        method: "GET",
      });

      const resp = await res.json();

      if (res.status === 200) {
        if (resp.user.error) {
          setUser(null);
        } else {
          setUser(resp.user);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("wca-access-token");
    setUser(null);
    router.refresh();
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {user === null ? (
        <Button
          variant="outline"
          className="max-[344px]:px-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          Login
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 object-cover"
              src={user?.me?.avatar?.url}
              width={100}
              height={100}
              alt="Bordered avatar"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{user?.me?.wca_id}</DropdownMenuItem>
            <DropdownMenuItem>{user?.me?.name}</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <Modal
        title="Sign In"
        description="Login using your WCA credentials."
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <div className="py-6 space-x-2 flex flex-col gap-6 items-center justify-center w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="space-y-4 md:w-5/6 w-full"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
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
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="password"
                          type={showPassword ? "text" : "password"}
                          id="pass-field"
                          {...field}
                        />
                      </FormControl>
                      {showPassword ? (
                        <EyeOff
                          size={18}
                          className="absolute top-3 right-3 cursor-pointer"
                          onClick={togglePassVisibility}
                        />
                      ) : (
                        <Eye
                          size={18}
                          className="absolute top-3 right-3 cursor-pointer"
                          onClick={togglePassVisibility}
                        />
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default LoginButton;
