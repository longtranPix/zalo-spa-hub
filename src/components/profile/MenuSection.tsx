import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MenuItem from './MenuItem';

interface MenuItemData {
  icon: React.ReactNode;
  label: string;
  path: string;
}

interface MenuSectionProps {
  items: MenuItemData[];
  animationDelay?: string;
  onRedirect: (path: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  items, 
  animationDelay = '0ms', 
  onRedirect 
}) => {
  return (
    <Card className="mb-6 animate-fade-in" style={{ animationDelay }}>
      <CardContent className="p-0">
        {items.map((item, index) => (
          <MenuItem
            key={index}
            icon={item.icon}
            label={item.label}
            path={item.path}
            index={index}
            isLast={index === items.length - 1}
            onRedirect={onRedirect}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MenuSection;