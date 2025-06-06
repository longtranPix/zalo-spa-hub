import React from 'react';
import { Separator } from '@/components/ui/separator';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  index: number;
  isLast: boolean;
  onRedirect: (path: string) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  path, 
  index, 
  isLast, 
  onRedirect 
}) => {
  return (
    <React.Fragment>
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50"
        onClick={() => onRedirect(path)}
      >
        <div className="flex items-center">
          {icon}
          <span>{label}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </div>
      {!isLast && <Separator />}
    </React.Fragment>
  );
};

export default MenuItem;