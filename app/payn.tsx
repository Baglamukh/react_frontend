import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';

const Payn = () => {
  return (
    <WebView
    originWhitelist={['*']}
    source={require('./index.html')} // your HTML file path
  />
  );
};

export default Payn;
