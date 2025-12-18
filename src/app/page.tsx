import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-[70vh] flex flex-col justify-center items-center text-center">
        <h1 className="font-bold text-[50px] text-main md:text-7xl">Welcome to Amazone</h1>
        <p className="py-6 w-3/4 text-2xl text-muted-foreground">
          Discover the latest technology, fashion, and lifestyle products. Quality guaranteed with fast shipping and excellent customer service.
        </p>
        <div className="flex items-center gap-4">
          <Link href={'/products'}>
            <Button className="py-6 px-8 bg-main cursor-pointer">Shop Now</Button>
          </Link>
          <Link href={'/categories'}>
            <Button className="py-6 px-8 cursor-pointer bg-accent text-black border border-black hover:text-white hover:bg-main">Browse Categories</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
