
import React, { ReactNode } from 'react';
import { Page, Box, Header } from 'zmp-ui';
import HeaderZMP from './HeaderZMP';
import BottomNav from './BottomNav';
import { ChevronLeft } from 'lucide-react';

interface PageZMPProps {
  children: ReactNode;
  title: string;
  showBackButton?: boolean;
  hideBottomNav?: boolean;
  onBackClick?: () => void;
}

const PageZMP: React.FC<PageZMPProps> = ({
  children,
  title,
  showBackButton = false,
  hideBottomNav = false,
  onBackClick,
}) => {
  return (
    <Page className="pb-14 overflow-x-hidden">
      <Header
        title={title} 
        backIcon={showBackButton ? <ChevronLeft className="text-white" /> : undefined}
        onBackClick={onBackClick} 
        className='bg-violet-500'
        showBackIcon={showBackButton}
      />
      <Box className="zalo-content">
        {children}
      </Box>
      {!hideBottomNav && <BottomNav />}
    </Page>
  );
};

export default PageZMP;
