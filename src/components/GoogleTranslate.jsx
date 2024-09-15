'use client'
import { useEffect } from 'react';

const GoogleTranslate = () => {
  
  return (
    <div>
      <button onClick={() => handleTranslate('en')}>Translate to English</button>
      <button onClick={() => handleTranslate('id')}>Translate to Indonesian</button>
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
