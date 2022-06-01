import React from 'react';
import BaseRoutes from './routes/BaseRoutes';
import "./App.css";
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <BaseRoutes />
    </ChakraProvider>
  );
}

export default App;
