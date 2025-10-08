export type Products = {
  id: number;
  name: string;
  image: string;
  price: string;
  rating: number;
  review: string;
  reviewer: string;
  date: string;
  description: string;
};

export const products: Products[] = [
  {
    id: 1,
    name: "Leather Wallet",
    image: "/products/wallet.webp",
    price: "$30.00",
    rating: 4.5,
    review: "Elegant and durable wallet. Excellent stitching and a practical design.",
    reviewer: "Ana P.",
    date: "Sept 2025",
    description: "A handcrafted leather wallet designed for durability and everyday style."
  },
  {
    id: 2,
    name: "Origami",
    image: "/products/origami.jpg",
    price: "$18.00",
    rating: 4.0,
    review: "A unique origami piece that shows great patience and artistry. Perfect for decoration.",
    reviewer: "Carlos R.",
    date: "Sept 2025",
    description: "Beautifully folded paper art that adds a touch of creativity to any space.",
  },
  {
    id: 3,
    name: "Poncho",
    image: "/products/poncho.webp",
    price: "$45.00",
    rating: 5,
    review: "This poncho is very warm and carefully woven. Perfect for cold weather.",
    reviewer: "Sofia L.",
    date: "Aug 2025",
    description: "Traditional woven poncho made with soft fabric for comfort and warmth.",
  },
];
export default products;
