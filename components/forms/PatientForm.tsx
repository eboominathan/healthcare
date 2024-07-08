"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import UserFormValidation from "@/lib/validation";
import { useRouter } from "next/navigation";
import { CreateUser } from "@/lib/actions/patient.actions";
import { parseStringify } from "@/app/lib/utils";
 

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

 

const PatientForm = () => {

    const router = useRouter();
    const [isLoading, setisLoading] = useState(false)
 
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

 
  async function onSubmit({name,email,phone}: z.infer<typeof UserFormValidation>) {
    setisLoading(true)
    try{
      const userData = {name, email, phone};   
        const user = await CreateUser(userData)     
        if (user) router.push(`/patients/${user.$id}/register`);

    }catch(error){
      console.log(error)      
    }
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
          name="phone"
          label="Phone number"
          placeholder="(555) 123-456"      
        />
        <SubmitButton isLoading={isLoading} className="" >Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
