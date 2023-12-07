"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Space_Mono } from "next/font/google";
import { useForm } from "react-hook-form";
import * as z from "zod";

import MaxWidthWrapper from "./components/MaxWidthWrapper";
import { Button } from "./components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "./components/ui/form";
import { Textarea } from "./components/ui/textarea";
import { cn } from "./lib/utils";

const mono = Space_Mono({ weight: "400", subsets: ["latin"] });

const formSchema = z.object({
  input: z.string(),
});

type schema = z.infer<typeof formSchema>;

export default function Home() {
  const form = useForm<schema>({
    resolver: zodResolver(formSchema),
    defaultValues: { input: "" },
  });

  const handleSubmit = async (values: schema) => {
    const formData = new FormData();
    formData.append("inputValue", values.input);
    try {
      const response = await fetch("/api", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data); // Process the response data as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='w-full space-y-6'
        >
          <FormField
            control={form.control}
            name='input'
            render={({ field }) => (
              <FormItem>
                <Textarea
                  className={cn("w-full", mono.className)}
                  rows={5}
                  placeholder='Add your stats or the AOC access token'
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-center'>
            <Button type='submit'>Generate</Button>
          </div>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
