'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Button, buttonVariants } from '@/components/ui/button'
import { IProduct } from "@/types"
import { Icons } from "./Icons";
import { format } from "@/utils/currency";
import { ScrollArea } from "./ui/scroll-area";
import axios from "axios";
import { useState } from "react";
import Link from 'next/link';
import { 
  Dialog,
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger } from "./ui/dialog";
import { cn } from "@/lib/utils";

  interface Props {
    products: IProduct[];
  }
  
  export function ProductList({products}: Props) {
    const [selectedProduct, setSelectedProduct] = useState<string>('')
    const [isDelete, setIsDelete] = useState<boolean>(false)

    async function ProductDelete() {
      setIsDelete(true)
      await axios.delete('/api/products/add-delete-edit?id='+selectedProduct)
    }
    return (
      <ScrollArea>
        <Table>
            <TableCaption>List of product.</TableCaption>
            <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right"></TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {products.map((product) => (
                <TableRow key={product._id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{format(product.price)}</TableCell>
                <TableCell className="text-right">
                    <Link href={'/dashboard/products/allProducts/edit/'+product._id} className={cn(buttonVariants({variant: 'ghost'}),"mx-2")}>
                        <Icons.edit className="h-5 w-5 mr-2" />
                        <span>Edit</span>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="mx-2" 
                          onClick={() => {
                            setIsDelete(false)
                            setSelectedProduct(product._id)
                          }}
                        >
                          <Icons.delete className="h-5 w-5 mr-2" />
                          <span>Delete</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the
                            product and remove product data from server.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant={'destructive'} onClick={ProductDelete} className="flex" disabled={isDelete}>
                            {isDelete && <Icons.spinner className="h-5 w-5 animate-spin" />}
                            <span>Continue</span>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </TableCell>
                </TableRow>
            ))}
            {products.map((product) => (
                <TableRow key={product._id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>{format(product.price)}</TableCell>
                <TableCell className="text-right">
                    <Link href={'/dashboard/products/allProducts/edit/'+product._id} className={cn(buttonVariants({variant: 'ghost'}),"mx-2")}>
                        <Icons.edit className="h-5 w-5 mr-2" />
                        <span>Edit</span>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" className="mx-2" 
                          onClick={() => {
                            setIsDelete(false)
                            setSelectedProduct(product._id)
                          }}
                        >
                          <Icons.delete className="h-5 w-5 mr-2" />
                          <span>Delete</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete the
                            product and remove product data from server.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant={'destructive'} onClick={ProductDelete} className="flex" disabled={isDelete}>
                            {isDelete && <Icons.spinner className="h-5 w-5 animate-spin" />}
                            <span>Continue</span>
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
      </ScrollArea>
    )
  }
  