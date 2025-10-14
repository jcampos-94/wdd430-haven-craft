import { NextResponse } from 'next/server';
import { createProduct } from '@/app/lib/data';
import { auth } from '@/auth';

export async function POST(request: Request) {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, price, imageUrl, sellerId, categoryId } = await request.json();

    // Validate required fields
    if (!name || !description || !price || !imageUrl || !sellerId || !categoryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the product
    const product = await createProduct(
      name,
      description,
      price,
      imageUrl,
      sellerId,
      categoryId
    );

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
