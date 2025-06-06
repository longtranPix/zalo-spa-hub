import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface ProfileHeaderProps {
  avatar?: string;
  name?: string;
  phone?: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  avatar, 
  name, 
  phone 
}) => {
  return (
    <div className="flex flex-col items-center mb-6 animate-fade-in">
      <Avatar className="w-24 h-24 mb-4">
        <AvatarImage src={avatar || ''} alt={name} />
        <AvatarFallback>{name?.charAt(0) || 'U'}</AvatarFallback>
      </Avatar>
      <h2 className="text-xl font-semibold">{name || 'Guest User'}</h2>
      <p className="text-muted-foreground">{phone || ''}</p>
    </div>
  );
};

export default ProfileHeader;