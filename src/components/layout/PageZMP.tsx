
import React, { ReactNode } from 'react';
import { Page, Box } from 'zmp-ui';
import HeaderZMP from './HeaderZMP';
import BottomNav from './BottomNav';

interface PageZMPProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  hideBottomNav?: boolean;
  rightElement?: ReactNode;
  onBackClick?: () => void;
}

const PageZMP: React.FC<PageZMPProps> = ({
  children,
  title,
  showBackButton = false,
  hideBottomNav = false,
  rightElement,
  onBackClick,
}) => {
  return (
    <Page className="zalo-page">
      <HeaderZMP 
        title={title} 
        onBackClick={showBackButton ? onBackClick : undefined} 
        rightElement={rightElement} 
      />
      <Box className="zalo-content pb-16">
        {children}
      </Box>
      {!hideBottomNav && <BottomNav />}
    </Page>
  );
};

export default PageZMP;
