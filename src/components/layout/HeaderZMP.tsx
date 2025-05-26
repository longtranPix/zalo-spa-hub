
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Header } from 'zmp-ui';

interface HeaderZMPProps {
    title: string;
    onBackClick?: () => void;
}

const HeaderZMP: React.FC<HeaderZMPProps> = ({ title, onBackClick }) => {
    return (
        <Header
            title={title}
            backIcon={onBackClick && <ChevronLeft className="text-white" />}
            onBackClick={onBackClick}
            className="bg-violet-500 text-white"
            showBackIcon={!!onBackClick}
        />
    );
};

export default HeaderZMP;
