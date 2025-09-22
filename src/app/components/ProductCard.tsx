import Image from "next/image";

type Product = {
  id: number;
  name: string;
  image: string;
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl shadow-md p-4 max-w-xs bg-white text-center">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-lg mx-auto"
      />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
    </div>
  );
}
