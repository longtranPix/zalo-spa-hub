
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import PageZMP from './PageZMP';

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
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <PageZMP
      title={title}
      showBackButton={showBackButton}
      hideBottomNav={hideBottomNav}
      rightElement={rightElement}
      onBackClick={handleBackClick}
    >
      {children}
    </PageZMP>
  );
};

export default PageLayout;
