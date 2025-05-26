
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
    <Page className="pb-14 overflow-x-hidden">
      <Header
        title={title} 
        backIcon = {<ChevronLeft className="text-white" />}
        onBackClick={onBackClick} 
        className='bg-violet-500'
      />
      <Box className="zalo-content ">
        {children}
      </Box>
      {!hideBottomNav && <BottomNav />}
    </Page>
  );
};

export default PageZMP;
