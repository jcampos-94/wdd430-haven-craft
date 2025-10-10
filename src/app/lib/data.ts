import { sql } from "@vercel/postgres";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  seller_name: string;
  category_name: string;
}

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const { rows } = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        s.name AS seller_name,
        c.name AS category_name
      FROM products p
      LEFT JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id ASC;
    `;
    return rows as Product[];
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
}

// Get single product by ID
export async function getProductById(id: string) {
  try {
    const { rows } = await sql`
      SELECT
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        s.name AS seller_name,
        c.name AS category_name
      FROM products p
      LEFT JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
      LIMIT 1;
    `;

    return rows[0] || null;
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error);
    return null;
  }
}

// Get all products from one seller
export async function getSellerProducts(sellerId: number) {
  try {
    const { rows } = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        c.name AS category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.seller_id = ${sellerId};
    `;
    return rows;
  } catch (error) {
    console.error("❌ Error fetching seller products:", error);
    throw new Error("Failed to fetch seller products");
  }
}

// Get all sellers
export async function getSellers() {
  try {
    const { rows } = await sql`SELECT * FROM sellers;`;
    return rows;
  } catch (error) {
    console.error("❌ Error fetching sellers:", error);
    throw new Error("Failed to fetch sellers data");
  }
}

// Get seller by ID
export async function getSellerById(id: number) {
  try {
    const { rows } = await sql`SELECT * FROM sellers WHERE id = ${id};`;
    return rows[0] || null;
  } catch (error) {
    console.error("❌ Error fetching seller by ID:", error);
    return null;
  }
}

// ✅ Get products by category
export async function getProductsByCategory(category: string) {
  try {
    const { rows } = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        s.name AS seller_name,
        s.profile_image AS seller_image,
        s.location AS seller_location,
        c.name AS category_name
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      JOIN categories c ON p.category_id = c.id
      WHERE c.name = ${category};
    `;
    return rows;
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    throw new Error("Failed to fetch products by category");
  }
}
