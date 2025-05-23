
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Header } from 'zmp-ui';

interface HeaderZMPProps {
    title: string;
    onBackClick?: () => void;
    rightElement?: React.ReactNode;
}

const HeaderZMP: React.FC<HeaderZMPProps> = ({ title, onBackClick, rightElement }) => {
    return (
        <Header
            title={title}
            backIcon={onBackClick && <ChevronLeft className="text-white" />}
            onBackClick={onBackClick}
            className="bg-zalo-purple text-white"
            showBackIcon={!!onBackClick}
            rightElement={rightElement}
        />
    );
};

export default HeaderZMP;
