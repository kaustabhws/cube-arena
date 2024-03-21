"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(2),
  event: z.string({
    required_error: "Please select an event.",
  }),
});

const events = [
  { name: "2x2", id: "2x2" },
  { name: "3x3", id: "3x3" },
  { name: "4x4", id: "4x4" },
  { name: "5x5", id: "5x5" },
  { name: "6x6", id: "6x6" },
  { name: "7x7", id: "7x7" },
  { name: "Megaminx", id: "megaminx" },
  { name: "Pyraminx", id: "pyraminx" },
  { name: "Clock", id: "clock" },
  { name: "Skewb", id: "skewb" },
  { name: "Square-1", id: "square-1" },
];

const CreatePage = () => {

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const generateRandomId = (data: z.infer<typeof FormSchema>) => {
    const namePrefix = data.name.slice(0, 3);
    const event = data.event;

    const randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomPart = "";
    for (let i = 0; i < 5; i++) {
      randomPart += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }

    return namePrefix + event + randomPart;
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const data_id = generateRandomId(data);
    await setDoc(doc(db, "rooms", data_id), {
      name: data.name,
      event: data.event,
      participants: [
        data.name
      ],
    });
    router.push(`/room/${data_id}?name=${data.name}`)
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="flex justify-center">
        <h1 className="text-5xl font-semibold text-center">Create a room</h1>
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
                name="event"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Event</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {events.map((event) => (
                          <SelectItem key={event.id} value={event.id}>
                            {event.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-max">
              Create
            </Button>
          </form>
        </Form>
        <div className="flex justify-center mt-5">
          <Link href="/join">
            <p className="text-sm text-center underline underline-offset-2">
              Already have a code?
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
