import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "./Icons"
import { useState } from "react"

export function AddProduct() {
  const [productTitle, setProductTitle] = useState<string>('')
  const [productPrice, setProductPrice] = useState<number>(0)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="m-5">
          <Icons.add className="h-5 w-5 mr-2" />
          <span>
            Add product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Make changes to your product here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Name
            </Label>
            <Input
             id="title"
             value={productTitle} 
             className="col-span-3" 
             onChange={(e) => setProductTitle(e.target.value)}
             />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
             id="price"
             type="text"
             value={productPrice}
             className="col-span-3"
             />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
