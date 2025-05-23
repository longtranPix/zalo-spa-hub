
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface ZaloContextType {
  isZaloApp: boolean;
  userInfo: any | null;
  showToast: (message: string) => void;
  showLoading: () => void;
  hideLoading: () => void;
  showConfirm: (message: string) => Promise<boolean>;
  showAlert: (message: string) => Promise<void>;
}

const defaultContext: ZaloContextType = {
  isZaloApp: false,
  userInfo: null,
  showToast: () => {},
  showLoading: () => {},
  hideLoading: () => {},
  showConfirm: async () => false,
  showAlert: async () => {},
};

const ZaloContext = createContext<ZaloContextType>(defaultContext);

export const useZalo = () => useContext(ZaloContext);

interface ZaloProviderProps {
  children: ReactNode;
}

export const ZaloProvider: React.FC<ZaloProviderProps> = ({ children }) => {
  const [isZaloApp, setIsZaloApp] = useState(false);
  const [userInfo, setUserInfo] = useState<any | null>(null);

  // Check if running inside Zalo App
  useEffect(() => {
    const checkZaloApp = () => {
      const isZalo = /zalo/i.test(navigator.userAgent);
      setIsZaloApp(isZalo);
      
      // Simulating Zalo SDK for development purposes
      if (process.env.NODE_ENV === 'development') {
        setIsZaloApp(true);
      }
    };

    checkZaloApp();
    
    // Simulated user info for development
    setUserInfo({
      name: 'Zalo User',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      id: '123456789',
      phone: '+84123456789'
    });
  }, []);

  // Zalo API wrappers
  const showToast = (message: string) => {
    if (isZaloApp && window.ZaloMiniApp) {
      window.ZaloMiniApp.showToast({ message });
    } else {
      console.log('Toast:', message);
    }
  };

  const showLoading = () => {
    if (isZaloApp && window.ZaloMiniApp) {
      window.ZaloMiniApp.showLoading();
    } else {
      console.log('Loading shown');
    }
  };

  const hideLoading = () => {
    if (isZaloApp && window.ZaloMiniApp) {
      window.ZaloMiniApp.hideLoading();
    } else {
      console.log('Loading hidden');
    }
  };

  const showConfirm = async (message: string): Promise<boolean> => {
    if (isZaloApp && window.ZaloMiniApp) {
      try {
        const result = await window.ZaloMiniApp.showConfirm({ message });
        return !!result;
      } catch (e) {
        return false;
      }
    } else {
      return window.confirm(message);
    }
  };

  const showAlert = async (message: string): Promise<void> => {
    if (isZaloApp && window.ZaloMiniApp) {
      await window.ZaloMiniApp.showAlert({ message });
    } else {
      window.alert(message);
    }
  };

  const value = {
    isZaloApp,
    userInfo,
    showToast,
    showLoading,
    hideLoading,
    showConfirm,
    showAlert,
  };

  return <ZaloContext.Provider value={value}>{children}</ZaloContext.Provider>;
};
