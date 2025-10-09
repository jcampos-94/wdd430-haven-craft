import { ProtectedRoute } from '@/app/components/ProtectedRoute';

function ProfileSettingsContent() {
  return (
    <div>
      <h1>Profile & Settings</h1>
      <p>
        Manage your account details, change your password, and update your
        preferences here.
      </p>
    </div>
  );
}

export default function ProfileSettings() {
  return (
    <ProtectedRoute>
      <ProfileSettingsContent />
    </ProtectedRoute>
  );
}
