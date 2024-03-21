"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const FormSchema = z.object({
  name: z.string().min(2),
  room: z.string().min(2),
});

const JoinPage = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const docRef = doc(db, "rooms", data.room);

    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const existingData = docSnap.data();
      const updatedParticipants = [
        ...(existingData.participants || []),
        data.name,
      ];

      await updateDoc(docRef, {
        participants: updatedParticipants,
      });
      router.push(`/room/${data.room}?name=${data.name}`);
    } else {
      toast.error("Room does not exist");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="flex justify-center">
        <h1 className="text-5xl font-semibold text-center">Join a room</h1>
      </div>
      <div className="flex justify-center mt-6 flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 flex justify-center items-center flex-col"
          >
            <div className="md:w-[60%] w-full flex justify-between gap-5 max-[470px]:flex-col">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <Input placeholder="Name" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="room"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Room ID</FormLabel>
                    <Input placeholder="Room id" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-max">
              Join
            </Button>
          </form>
        </Form>
        <div className="flex justify-center mt-5">
          <Link href="/create">
            <p className="text-sm text-center underline underline-offset-2">
              Create a room?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;
