import React from 'react';
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import { Button } from './components/ui/button';
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
import { use } from 'react';

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  price: z.string().min(2, { message: "Price must be a positive number." }),
  brand: z.string().min(2, { message: "Brand Must Be 2 Characters" }),
  size: z.string().min(1, { message: "Size cannot be empty." }),
  color: z.string().min(1, { message: "Color cannot be empty." }),
  quantity: z.string().min(2, { message: "Quantity must be at least 1." }),
  features: z.string().min(5, { message: "Features must be at least 5 characters long." }),
  manufacturedBy: z.string().min(2, { message: "Manufacturer name must be at least 2 characters long." }),
  materialCare: z.string().min(5, { message: "Material care details are required." }),
  terms: z.string().min(5, { message: "Terms must be at least 5 characters." })
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
    placeholder: "Enter the product title",
    type: "text",
    component: Input,
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Enter the brand name",
    type: "text",
    component: Input,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter the price",
    type: "text",
    component: Input,
  },
  {
    name: "size",
    label: "Size",
    placeholder: "Enter the size",
    type: "text",
    component: Input,
  },
  {
    name: "color",
    label: "Color",
    placeholder: "Enter the color",
    type: "text",
    component: Input,
  },
  {
    name: "quantity",
    label: "Quantity",
    placeholder: "Enter the quantity",
    type: "text",
    component: Input,
  },
  {
    name: "features",
    label: "Features",
    placeholder: "List the features",
    type: "textarea",
    component: Textarea,
  },
  {
    name: "manufacturedBy",
    label: "Manufactured By",
    placeholder: "Enter the manufacturer name",
    type: "text",
    component: Input,
  },
  {
    name: "materialCare",
    label: "Material Care",
    placeholder: "Enter material care instructions",
    type: "textarea",
    component: Textarea,
  },
  // {
  //   name: "image",
  //   label: "Image",
  //   description: "Upload an image (JPG, JPEG, PNG).",
  //   type: "file",
  //   component: Input,
  // },
  {
    name: "terms",
    label: "Terms and Conditions",
    placeholder: "Enter Terms and Conditions",
    type: "textarea",
    component: Textarea,
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
      terms: ""
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Get form data using form names
    const formData = new FormData(e.target);

    try {
      const response = await axios.post('https://luggie-bone-backend.vercel.app/api/post', {
        username: formData.get('username'),
        title: formData.get('title'),
        price: formData.get('price'),
        size: formData.get('size'),
        brand: formData.get('brand'),
        color: formData.get('color'),
        quantity: formData.get('quantity'),
        features: formData.get('features'),
        manufacturedBy: formData.get('manufacturedBy'),
        materialCare: formData.get('materialCare'),
        terms: formData.get('terms')

      });
      console.log("Data added Successfully", response.data);
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Add New Product
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mt-4 mx-auto max-w-[100px]"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700"
        >
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {fieldConfig.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <FormField
                    control={form.control}
                    name={field.name}
                    render={({ field: inputField }) => (
                      <FormItem className="group">
                        <FormLabel className="text-gray-200 font-medium">
                          {field.label}
                        </FormLabel>
                        <FormControl>
                          <field.component
                            {...inputField}
                            placeholder={field.placeholder}
                            className="w-full bg-gray-900/50 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-200 placeholder-gray-400"
                          />
                        </FormControl>
                        {field.description && (
                          <FormDescription className="text-gray-400 text-sm">
                            {field.description}
                          </FormDescription>
                        )}
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="pt-6"
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Submit Product
                </Button>
              </motion.div>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
}
