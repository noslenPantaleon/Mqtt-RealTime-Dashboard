import {ReactElement, children } from 'react';
import style from './layout.module.scss';



const Layout = ({ children }) => {
  return <div className={style.layout}>{children}</div>;
};

export default Layout;
