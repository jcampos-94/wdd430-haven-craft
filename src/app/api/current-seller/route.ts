import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getSellerByEmail, createSeller } from '@/app/lib/data';

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let seller = await getSellerByEmail(session.user.email);
    
    // If seller not found by email, create a new seller account automatically
    if (!seller) {
      console.log(`Creating new seller for email ${session.user.email}`);
      
      const userName = session.user.name || session.user.email.split('@')[0];
      const profileImage = session.user.image || '/images/artisan-profile.png';
      
      seller = await createSeller(
        userName,
        session.user.email,
        profileImage,
        'Unknown', // Location - can be updated later
        'Artisan'  // Default craft - can be updated later
      );
      
      console.log(`New seller created with ID: ${seller.id}`);
    }
    
    if (!seller) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }

    return NextResponse.json(seller);
  } catch (error) {
    console.error('Error fetching current seller:', error);
    return NextResponse.json(
      { error: 'Failed to fetch seller' },
      { status: 500 }
    );
  }
}
