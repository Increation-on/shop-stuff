import AppRoutes from "./Components/Routes/AppRoutes";
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Sidebar from './Components/Sidebar/Sidebar';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { getCategories } from './features/categories/categoriesSlice';
import { getProducts } from './features/products/productsSlice';
import UserForm from "./Components/User/UserForm";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className='container'>
        <Sidebar />
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
