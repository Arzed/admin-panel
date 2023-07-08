'use client'

import useSWR from 'swr'
import axios from 'axios'
import { ProductList } from '@/components/ProductList'
import { useProducts } from '@/hooks/useProducts';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import { IProduct } from '@/types';
import { Button, buttonVariants } from '@/components/ui/button';
import { Icons } from '@/components/Icons';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

export default function AllProducts() {
  const { products, isLoading, isError } = useProducts("/products");
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [filteredProduct, setFilteredProducts] = useState<IProduct[]>([])

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products)
    } else {
      const filtered = products.filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredProducts(filtered)
    }
  }, [searchQuery, products]) 

  if (isLoading) {
    return (
      <div className='flex flex-col gap-3'>
        <div className='flex'>
          <Skeleton className='w-80 h-10 rounded-md m-5' />
          <Skeleton className='w-40 h-10 rounded-md m-5' />
        </div>
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
        <Skeleton className='w-full h-12 rounded-md' />
      </div>
    )
  }
    
    if (isError) {
      return alert('Something Error')
    }
    return (
      <div>
        <div className='flex'>
          <Input
            id="products"
            type="text"
            placeholder="Search Products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className='w-96 m-5'
          />
          <Link href={'/dashboard/products/allProducts/addProduct'} className={cn(buttonVariants({variant: 'outline'}), 'm-5')}>
            <Icons.add className='h-5 w-5 mr-2' />
            <span>Add product</span>
          </Link>
      </div>
      <ProductList products={filteredProduct} />
    </div>
  )
}
