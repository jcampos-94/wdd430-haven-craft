import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Drop tables if they exist (optional)
    await sql`DROP TABLE IF EXISTS products, sellers, categories;`;

    // Create tables
    await sql`
      CREATE TABLE sellers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        location VARCHAR(255),
        profile_image TEXT
      );
    `;

    await sql`
      CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL
      );
    `;

    await sql`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT,
        description TEXT,
        seller_id INTEGER REFERENCES sellers(id),
        category_id INTEGER REFERENCES categories(id)
      );
    `;

    // Insert categories
    await sql`
      INSERT INTO categories (name)
      VALUES ('Jewelry'), ('Clothing'), ('Accessories'), ('Ceramics'), ('Wood'), ('Leather'), ('Miscellaneous');
    `;

    // Insert sellers
    await sql`
      INSERT INTO sellers (name, email, location, profile_image)
      VALUES 
        ('Ana Rivera', 'ana@haven.com', 'Granada, Spain', '/images/sellers/ana.jpg'),
        ('Liam Torres', 'liam@haven.com', 'Guadalajara, Mexico', '/images/sellers/liam.jpg'),
        ('Sofia Chen', 'sofia@haven.com', 'Tainan, Taiwan', '/images/sellers/sofia.jpg'),
        ('Noah Patel', 'noah@haven.com', 'Kolkotta, India', '/images/sellers/noah.jpg'),
        ('Emma Johnson', 'emma@haven.com', 'Hartford, USA', '/images/sellers/emma.jpg'),
        ('Sarah Cox', 'sarah@haven.com', 'Utah, USA', '/images/sellers/sarah.jpg'),
        ('Maria Santos', 'maria@haven.com', 'Cebu, Philippines', '/images/sellers/maria.jpg'),
        ('Aisha Aliezar', 'aisha@haven.com', 'Marrakesh, Morocco', '/images/sellers/aisha.jpg');
    `;

    // Insert products (at least 10)
    await sql`
      INSERT INTO products (name, price, image_url, description, seller_id, category_id)
      VALUES 
        ('Origami Cranes', 8.00, '/images/origami.jpg', 'Unique origami piece to decorate spaces', 6, 7),
        ('Wool Poncho', 45.00, '/images/poncho.jpg', 'Warm wool poncho with intricate designs', 7, 2),
        ('Carved Wooden Owl', 38.00, '/images/owl.jpg', 'Beautiful life size carved wooden owl', 8, 5),
        ('Handmade Silver Earrings', 45.00, '/images/earrings.jpg', 'Elegant silver earrings with delicate patterns', 1, 1),
        ('Woven Wall Hanging', 60.00, '/images/wallhanging.jpg', 'Colorful woven wall hanging for your living room', 1, 7),
        ('Clay Vase', 55.00, '/images/vase.jpg', 'Handmade clay vase perfect for flowers', 2, 4),
        ('Leather Wallet', 50.00, '/images/wallet.jpg', 'Genuine leather wallet with multiple compartments', 2, 6),
        ('Beaded Necklace', 30.00, '/images/necklace.jpg', 'Vibrant beaded necklace handcrafted with care', 3, 1),
        ('Hand Knit Scarf', 25.00, '/images/scarf.jpg', 'Warm and cozy scarf made from soft yarn', 3, 2),
        ('Wooden Cutting Board', 40.00, '/images/cuttingboard.jpg', 'Durable handcrafted cutting board made of oak', 4, 5),
        ('Silk Hair Ribbon', 15.00, '/images/ribbon.jpg', 'Elegant silk ribbon to accessorize hairstyles', 4, 3),
        ('Clay Mug', 20.00, '/images/mug.jpg', 'Handcrafted ceramic mug with unique glaze', 5, 4),
        ('Leather Belt', 35.00, '/images/belt.jpg', 'Stylish leather belt with handcrafted buckle', 5, 6),
        ('Boho Earrings', 28.00, '/images/boho_earrings.jpg', 'Trendy bohemian style earrings', 1, 1),
        ('Wool Gloves', 22.00, '/images/gloves.jpg', 'Warm wool gloves for winter', 2, 2);
    `;

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}