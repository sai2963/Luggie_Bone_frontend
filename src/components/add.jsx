// src/pages/Add.js
import React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "./components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  price: z.string().min(2, { message: "Price must be a positive number." }),
  brand: z.string().min(2, { message: "Brand must be at least 2 characters." }),
  size: z.string().min(1, { message: "Size cannot be empty." }),
  color: z.string().min(1, { message: "Color cannot be empty." }),
  quantity: z.string().min(2, { message: "Quantity must be at least 1." }),
  features: z.string().min(5, { message: "Features must be at least 5 characters long." }),
  manufacturedBy: z.string().min(2, { message: "Manufacturer name must be at least 2 characters." }),
  materialCare: z.string().min(5, { message: "Material care details are required." }),
  terms: z.string().min(5, { message: "Terms must be at least 5 characters." }),
  image: z.instanceof(File).optional(),
});

const fieldConfig = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your username",
    description: "This is your public display name.",
    type: "text",
    component: Input,
  },
  {
    name: "title",
    label: "Title", 
    placeholder: "Enter product title",
    type: "text",
    component: Input,
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter brand name",
    type: "text",
    component: Input,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter price",
    type: "text",
    component: Input,
  },
  {
    name: "size",
    label: "Size",
    placeholder: "Enter size",
    type: "text",
    component: Input,
  },
  {
    name: "color",
    label: "Color",
    placeholder: "Enter color",
    type: "text",
    component: Input,
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "Enter quantity",
    type: "text",
    component: Input,
  },
  {
    name: "features",
    label: "Features",
    placeholder: "List product features",
    type: "textarea",
    component: Textarea,
  },
  {
    name: "manufacturedBy",
    label: "Manufactured By",
    placeholder: "Enter manufacturer name",
    type: "text",
    component: Input,
  },
  {
    name: "materialCare",
    label: "Material Care",
    placeholder: "Enter care instructions",
    type: "textarea", 
    component: Textarea,
  },
  {
    name: "terms",
    label: "Terms and Conditions",
    placeholder: "Enter terms",
    type: "textarea",
    component: Textarea,
  },
  {
    name: "image",
    label: "Product Image",
    type: "file",
    accept: "image/*",
    onChange: (e, form) => {
      form.setValue("image", e.target.files[0]); // Update file value
    },
  },
  
];

export default function Add() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      price: "",
      brand: "",
      size: "",
      color: "",
      quantity: "",
      features: "",
      manufacturedBy: "",
      materialCare: "",
      terms: "",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" && value instanceof File) {
        formData.append(key, value);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await axios.post(
        "https://luggie-bone-backend.vercel.app/api/post",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product added successfully!");
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fieldConfig.map((field, index) => (
            <FormField
              key={field.name}
              control={form.control}
              name={field.name}
              render={({ field: inputField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  <FormControl>
                    <field.component
                      {...inputField}
                      type={field.type}
                      accept={field.accept}
                      placeholder={field.placeholder}
                      onChange={(e) => {
                        inputField.onChange(e);
                        field.onChange?.(e, form);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}