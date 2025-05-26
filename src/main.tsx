
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import "zmp-ui/zaui.css";
import './index.css';
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
