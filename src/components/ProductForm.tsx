'use client'

import axios from "axios";
import { Upload, XIcon } from "lucide-react";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import { IProduct } from "@/types";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

interface ProductFormProp {
    _id: string
    title: string
    description: string
    price: string
    images: string[]
}

export default function ProductForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images:existingImages,
} : ProductFormProp) {
    const [title, setTitle] = useState<string>(existingTitle || '')
    const [price, setPrice] = useState<string>(existingPrice || '')
    const [description, setDescription] = useState<string>(existingDescription || '')
    const [images, setImages] = useState<any[]>(existingImages || [])
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [isSave, setIsSave] = useState<boolean>(false)
    const router = useRouter()

    const saveProduct = async () => {
      setIsSave(true)
      const data = {title, price, description, images}
      if (_id) {
        await axios.put('/api/products/add-delete-edit', {...data,_id})
      } else {
        await axios.post('/api/products/add-delete-edit', data)
      }
      router.back()
    }

    async function uploadImages(ev: ChangeEvent<HTMLInputElement>) {
      const files = ev.target.files as any;
      if (files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        for (const file of files as any) {
          data.append('file', file);
        }
        const res = await axios.post('/api/products/uploadImages', data);
        setImages(oldImages => {
          return [...oldImages, ...res.data.links];
        });
        setIsUploading(false);
      }
    }
    return (
      <>
      <Link
        href="/dashboard/products/allProducts"
        className={cn(
          buttonVariants({ variant: "ghost" })
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>
      <div className="relative flex h-full w-full rounded-md gap-5 m-5">
        <form onSubmit={saveProduct} className="flex flex-col gap-5 w-2/5">
          <div>
            <Label htmlFor="title">Product title</Label>
            <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Write title here..."
            />
          </div>
          <div>
            <Label htmlFor="price">Product price</Label>
            <Input
            id="price"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Input the price here..."
            />
          </div>
          <div>
            <Label htmlFor="description">Product description</Label>
            <Textarea
            id="description"
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="images">Display images</Label>
            <Input
            id="images"
            type="file"
            onChange={uploadImages}
            />
          </div>
          <Button disabled={isSave} className="flex">
            {isSave ? <Icons.spinner className="h-5 w-5 animate-spin" /> : <span>Save</span>}
          </Button>
        </form>
        <div className="w-3/5 flex gap-5">
          {!!images?.length && images.map((link) => (
            <div key={link}>
              <img src={link} alt="" className="h-24 rounded-md" />
            </div>
          ))}
        </div>
        {isUploading && (
          <Skeleton className="h-24 w-24 rounded-md" />
        )}
      </div>
      </>
    )
}