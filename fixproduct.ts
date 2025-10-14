// fixProduct.ts
import { sql } from "@vercel/postgres";

async function main() {
  const productId = 20;
  const newImageUrl = "/images/painting.jpg";

  try {
    const { rows } = await sql`
      UPDATE products
      SET image_url = ${newImageUrl}
      WHERE id = ${productId}
      RETURNING *;
    `;

    if (rows.length > 0) {
      console.log("✅ Product updated:", rows[0]);
    } else {
      console.log("⚠️ Product not found");
    }
  } catch (error) {
    console.error("❌ Error updating product:", error);
  } finally {
    process.exit();
  }
}

main();