import Image from "next/image";
import { Products } from "../data/products";

export default function ProductCard({ product }: { product: Products }) {
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
      <p className="text-gray-600">{product.price}</p>
      <p className="text-yellow-500">⭐ {product.rating}</p>
      <p className="italic text-sm mt-2"> {product.review} </p>
      <p className="text-xs text-gray-500 mt-1">
        – {product.reviewer}, {product.date}
      </p>
    </div>
  );
}
