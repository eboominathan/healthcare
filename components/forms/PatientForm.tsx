"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";

export enum FormFieldType {
    INPUT = 'input',
    TEXTAREA = 'textarea',
    SELECT ='select',
    RADIO = 'radio',
    CHECKBOX = 'checkbox',
    DATEPICKER = 'datepicker',
    SKELETEON = 'skeleteon',
    PHONE_INPUT = 'phone_input',
}

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});


const PatientForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1>Hi there 👋</h1>
        </section>
        <CustomFormField 
        control={form.control}
          fieldType={FormFieldType.INPUT} 
          name="name"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField 
        control={form.control}
          fieldType={FormFieldType.INPUT} 
          name="email"
          label="Email"
          placeholder="johndoe@example.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
         <CustomFormField 
        control={form.control}
          fieldType={FormFieldType.PHONE_INPUT} 
          name="phone_number"
          label="Phone number"
          placeholder="(555) 123-456"      
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default PatientForm;
