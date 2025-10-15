export const dynamic = 'force-dynamic';

import { getSellers } from '../lib/data';
import ProfileInfo from './ProfileInfo';

export default async function ProfilePage() {
  const sellers = await getSellers();

  return <ProfileInfo sellers={sellers} />;
}
