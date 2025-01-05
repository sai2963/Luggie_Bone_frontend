import React from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useState } from "react";
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

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/clientApp.js";



export default function Add() {
  const [file, setFile] = useState(null);

  const formSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    title: z
      .string()
      .min(2, { message: "Title must be at least 2 characters." }),
    price: z.string().min(1, { message: "Price must be a positive number." }),
    brand: z
      .string()
      .min(2, { message: "Brand must be at least 2 characters." }),
    size: z.string().min(1, { message: "Size cannot be empty." }),
    color: z.string().min(1, { message: "Color cannot be empty." }),
    quantity: z
      .string()
      .min(1, { message: "Quantity must be at least 1 character." }),
    features: z
      .string()
      .min(5, { message: "Features must be at least 5 characters long." }),
    manufacturedBy: z
      .string()
      .min(2, { message: "Manufacturer must be at least 2 characters long." }),
    materialCare: z.string().min(5, {
      message: "Material care details must be at least 5 characters.",
    }),
    terms: z
      .string()
      .min(5, { message: "Terms must be at least 5 characters." }),
    image: z
      .instanceof(File)
      .refine((file) => file.size <= 5 * 1024 * 1024, {
        message: "File must be smaller than 5MB.",
      })
      .refine((file) => ["image/*"].includes(file.type), {
        message: "Only JPEG or PNG files are allowed.",
      })
      .nullable(),
  });
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("File selected:", selectedFile.name);
    } else {
      console.log("No file selected");
    }
  };

  const fieldConfig = [
    {
      name: "username",
      label: "Username",
      placeholder: "Enter your username",
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
      name: "price",
      label: "Price",
      placeholder: "Enter the price",
      type: "text",
      component: Input,
    },
    {
      name: "brand",
      label: "Brand",
      placeholder: "Enter the brand",
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
      placeholder: "Enter the manufacturer",
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
      label: "Terms",
      placeholder: "Enter terms and conditions",
      type: "textarea",
      component: Textarea,
    },
    {
      name: "image",
      label: "Upload Image",
      placeholder: "",
      type: "file",
      component: "file",
      onChange: handleFileChange,
    },
  ];

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

  const handleSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "image") {
        formData.append(key, data[key][0]); // File input
      } else {
        formData.append(key, data[key]);
      }
    });
    try {
      if (!file) {
        console.error("No file selected");
        return;
      }

      console.log("Starting file upload...");
      const storageRef = ref(storage, `images/${file.name}`);

      // Upload file
      console.log("Uploading file...");
      await uploadBytes(storageRef, file);

      // Get download URL
      console.log("Getting download URL...");
      const imageUrl = await getDownloadURL(storageRef);
      console.log(imageUrl);
      
      console.log("File uploaded successfully, URL:", imageUrl);
      const response = await axios.post(
        "https://luggie-bone-backend.vercel.app/api/post",
        {
          username: data.username,
          title: data.title,
          price: data.price,
          brand: data.brand,
          size: data.size,
          color: data.color,
          quantity: data.quantity,
          features: data.features,
          manufacturedBy: data.manufacturedBy,
          materialCare: data.materialCare,
          terms: data.terms,
          image: imageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Data submitted successfully:", response.data);
      form.reset();
      setFile(null);
    } catch (error) {
      console.error("Error submitting data:", error);
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
        </div>

        <motion.div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              {fieldConfig.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {field.type === "file" ? (
                    <FormField
                      control={form.control}
                      name={field.name}
                      render={({ field: inputField }) => (
                        <FormItem>
                          <FormLabel className="text-gray-200 font-medium">
                            {field.label}
                          </FormLabel>
                          <FormControl>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                inputField.onChange(
                                  e.target.files?.[0] || null
                                );
                                handleFileChange(e); // Add this line to handle file state
                              }}
                              className="w-full bg-gray-900/50 border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-200 placeholder-gray-400"
                            />
                          </FormControl>
                          {file && (
                            <FormDescription className="text-gray-400 text-sm">
                              Selected file: {file.name}
                            </FormDescription>
                          )}
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  ) : (
                    <FormField
                      control={form.control}
                      name={field.name}
                      render={({ field: inputField }) => (
                        <FormItem>
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
                  )}
                </motion.div>
              ))}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Submit Product
              </Button>
            </form>
          </Form>
        </motion.div>
      </motion.div>
    </div>
  );
}
