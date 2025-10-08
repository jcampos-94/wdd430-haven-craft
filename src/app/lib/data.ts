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
        products.id,
        products.name,
        products.description,
        products.price,
        products.image_url,
        sellers.name AS seller_name,
        categories.name AS category_name
      FROM products
      LEFT JOIN categories ON products.category_id = categories.id
      LEFT JOIN sellers ON products.seller_id = sellers.id
      ORDER BY products.id ASC;
    `;
    return rows as Product[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

// Get single product by ID
export async function getProductById(id: string) {
  try {
    const { rows } = await sql`
      SELECT
        products.id,
        products.name,
        products.description,
        products.price,
        products.image_url,
        sellers.name AS seller_name,
        categories.name AS category_name
      FROM products
      LEFT JOIN sellers ON products.seller_id = sellers.id
      LEFT JOIN categories ON products.category_id = categories.id
      WHERE products.id = ${id}
      LIMIT 1;
    `;

    if (rows.length === 0) return null;

    return rows[0];
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
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