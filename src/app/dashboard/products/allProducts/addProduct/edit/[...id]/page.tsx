'use client'

import ProductForm from "@/components/ProductForm";
import { Skeleton } from "@/components/ui/skeleton";
import { useProducts } from "@/hooks/useProducts";

export default function EditProductPage({ params }: { params: {id: string}}) {
    const { products, isLoading, isError } = useProducts("/products/"+params.id);
  
    if (isLoading) {
      return (
        <>
        <Skeleton className='h-12 w-28 rounded-md' />
        <div className="relative flex h-full w-full rounded-md gap-5 m-5">
          <div className="flex flex-col gap-5 w-2/5">
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="flex flex-col gap-4">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <Skeleton className="h-12 w-28 rounded-md" />
          </div>
          <div className="w-3/5 flex gap-5">
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
        </div>
        </>
      )
    }
  
    if (isError) {
      return alert('Something Error')
    }

  return (
      <div>
        {products && (
            <ProductForm {...products} />
        )}
      </div>
  );
}
