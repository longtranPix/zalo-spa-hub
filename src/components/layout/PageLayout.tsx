
import React, { ReactNode } from 'react';
import Header from './Header';
import BottomNav from './BottomNav';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  hideBottomNav?: boolean;
  rightElement?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  showBackButton = false,
  hideBottomNav = false,
  rightElement,
}) => {
  return (
    <div className="zalo-container">
      <Header 
        title={title} 
        showBackButton={showBackButton} 
        rightElement={rightElement} 
      />
      <main className="zalo-content pb-16">
        {children}
      </main>
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};

export default PageLayout;
