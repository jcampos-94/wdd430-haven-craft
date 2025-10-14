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

// Helper function to normalize image URLs
function normalizeImageUrl(url: string): string {
  if (!url) return url;
  
  // If it's an absolute Windows path, extract the relative path
  if (url.includes('\\') || url.includes('C:')) {
    // Extract everything after 'public'
    const publicIndex = url.indexOf('public');
    if (publicIndex !== -1) {
      return url.substring(publicIndex + 6).replace(/\\/g, '/');
    }
  }
  
  // Ensure it starts with /
  if (!url.startsWith('/') && !url.startsWith('http')) {
    return '/' + url;
  }
  
  return url;
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
    
    // Normalize image URLs and prices
    const products = rows.map(row => ({
      ...row,
      image_url: normalizeImageUrl(row.image_url),
      price: Number(row.price)
    }));
    
    return products as Product[];
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

    const product = rows[0];
    if (product) {
      product.image_url = normalizeImageUrl(product.image_url);
      product.price = Number(product.price);
    }
    
    return product || null;
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
    
    // Normalize image URLs and prices
    const products = rows.map(row => ({
      ...row,
      image_url: normalizeImageUrl(row.image_url),
      price: Number(row.price)
    }));
    
    return products;
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
    const seller = rows[0];
    if (seller && seller.profile_image) {
      seller.profile_image = normalizeImageUrl(seller.profile_image);
    }
    return seller || null;
  } catch (error) {
    console.error("❌ Error fetching seller by ID:", error);
    return null;
  }
}

// Get seller by email
export async function getSellerByEmail(email: string) {
  try {
    const { rows } = await sql`SELECT * FROM sellers WHERE email = ${email};`;
    const seller = rows[0];
    if (seller && seller.profile_image) {
      seller.profile_image = normalizeImageUrl(seller.profile_image);
    }
    return seller || null;
  } catch (error) {
    console.error("❌ Error fetching seller by email:", error);
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
    
    // Normalize image URLs and prices
    const products = rows.map(row => ({
      ...row,
      image_url: normalizeImageUrl(row.image_url),
      seller_image: normalizeImageUrl(row.seller_image),
      price: Number(row.price)
    }));
    
    return products;
  } catch (error) {
    console.error("❌ Error fetching products by category:", error);
    throw new Error("Failed to fetch products by category");
  }
}

// Get all categories
export async function getCategories() {
  try {
    const { rows } = await sql`SELECT * FROM categories ORDER BY name ASC;`;
    return rows;
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}

// Create a new seller
export async function createSeller(
  name: string,
  email: string,
  profileImage?: string,
  location?: string,
  craft?: string
) {
  try {
    const { rows } = await sql`
      INSERT INTO sellers (name, email, profile_image, location, craft)
      VALUES (${name}, ${email}, ${profileImage || null}, ${location || 'Unknown'}, ${craft || 'Artisan'})
      RETURNING *;
    `;
    return rows[0];
  } catch (error) {
    console.error("❌ Error creating seller:", error);
    throw new Error("Failed to create seller");
  }
}

// Create a new product
export async function createProduct(
  name: string,
  description: string,
  price: number,
  imageUrl: string,
  sellerId: number,
  categoryId: number
) {
  try {
    const { rows } = await sql`
      INSERT INTO products (name, description, price, image_url, seller_id, category_id)
      VALUES (${name}, ${description}, ${price}, ${imageUrl}, ${sellerId}, ${categoryId})
      RETURNING *;
    `;
    return rows[0];
  } catch (error) {
    console.error("❌ Error creating product:", error);
    throw new Error("Failed to create product");
  }
}

// Delete a product
export async function deleteProduct(productId: number, sellerId: number) {
  try {
    // Verify that the product belongs to the seller before deleting
    const { rows } = await sql`
      DELETE FROM products
      WHERE id = ${productId} AND seller_id = ${sellerId}
      RETURNING id;
    `;
    
    if (rows.length === 0) {
      throw new Error("Product not found or you don't have permission to delete it");
    }
    
    return rows[0];
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    throw new Error("Failed to delete product");
  }
}
