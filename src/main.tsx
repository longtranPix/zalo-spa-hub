
import React from 'react';
import { createRoot } from 'react-dom/client';
import "zmp-ui/zaui.css";
import './index.css';

import App from './App.tsx';
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

const root = createRoot(document.getElementById("app"));
root.render(React.createElement(App));
