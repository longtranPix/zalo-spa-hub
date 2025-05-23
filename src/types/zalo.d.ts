
interface ZaloMiniApp {
  showToast: (options: { message: string }) => void;
  showLoading: () => void;
  hideLoading: () => void;
  showConfirm: (options: { message: string }) => Promise<boolean>;
  showAlert: (options: { message: string }) => Promise<void>;
  // Add other Zalo SDK methods as needed
}

declare global {
  interface Window {
    ZaloMiniApp?: ZaloMiniApp;
  }
}

export {};
