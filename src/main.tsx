import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "zmp-ui/zaui.css";
import './index.css'
import appConfig from "../app-config.json";
import React from 'react';

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

createRoot(document.getElementById("root")!).render(React.createElement(App));
