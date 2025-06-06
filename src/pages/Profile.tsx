import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { useZalo } from '@/contexts/ZaloContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import MenuSection from '@/components/profile/MenuSection';
import { personalMenuItems, settingsMenuItems } from '@/components/profile/menuItems';

const Profile = () => {
  const { userInfo, showToast } = useZalo();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRedirect = (path: string) => {
    if (path.startsWith('/')) {
      navigate(path);
    } else {
      showToast(`${path} feature coming soon!`);
    }
  };

  return (
    <PageLayout title="My Profile">
      <ProfileHeader 
        avatar={userInfo?.avatar}
        name={userInfo?.name}
        phone={userInfo?.phone}
      />

      <MenuSection 
        items={personalMenuItems} 
        animationDelay="100ms" 
        onRedirect={handleRedirect}
      />

      <MenuSection 
        items={settingsMenuItems} 
        animationDelay="200ms" 
        onRedirect={handleRedirect}
      />
    </PageLayout>
  );
};

export default Profile;
