import { sql } from "@vercel/postgres";

// Get all products
export async function getProducts() {
  const { rows } = await sql`
    SELECT 
      products.id,
      products.name,
      products.description,
      products.price,
      products.category,
      products.image_url,
      sellers.name AS seller_name,
      sellers.profile_image AS seller_image,
      sellers.location AS seller_location
    FROM products
    JOIN sellers ON products.seller_id = sellers.id;
  `;
  return rows;
}

// Get single product by ID
export async function getProductById(id: number) {
  const { rows } = await sql`
    SELECT 
      products.*,
      sellers.name AS seller_name,
      sellers.profile_image AS seller_image,
      sellers.location AS seller_location
    FROM products
    JOIN sellers ON products.seller_id = sellers.id
    WHERE products.id = ${id};
  `;
  return rows[0];
}

// Get all products from one seller
export async function getSellerProducts(sellerId: number) {
  const { rows } = await sql`
    SELECT * FROM products WHERE seller_id = ${sellerId};
  `;
  return rows;
}

// Get all sellers
export async function getSellers() {
  try{
    const { rows } = await sql`SELECT * FROM sellers;`;
    return rows;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    throw new Error("Failed to fetch sellers data");
  }
}

// Get seller by ID
export async function getSellerById(id: number) {
  const { rows } = await sql`SELECT * FROM sellers WHERE id = ${id};`;
  return rows[0];
}

// ✅ Get products by category
export async function getProductsByCategory(category: string) {
  const { rows } = await sql`
    SELECT 
      products.id,
      products.name,
      products.description,
      products.price,
      products.category,
      products.image_url,
      sellers.name AS seller_name,
      sellers.profile_image AS seller_image,
      sellers.location AS seller_location
    FROM products
    JOIN sellers ON products.seller_id = sellers.id
    WHERE products.category = ${category};
  `;
  return rows;
}