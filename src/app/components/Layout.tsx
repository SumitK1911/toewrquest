'use client'
// app/_app.tsx

import { Provider } from 'react-redux';
import store from '@/app/reducer/store';


const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default Layout;
