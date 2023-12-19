import Poster from './Poster';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Products from '../Products/Products';
import Categories from '../Categories/Categories';
import Banner from './Banner';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { filterByPrice } from '../../features/products/productsSlice';


const Home = () => {

    const dispatch = useDispatch();

    const { products: { list, filtered }, categories } = useSelector((state) => state);

    useEffect(() => {
        if (!list.length) return;

        dispatch(filterByPrice(100))
    }, [dispatch, list.length])

    return (
        <>
            <Poster />
            <Products products={list} amount={5} title={'Trending'} />
            <Categories products={categories.list} amount={5} title={'Worth seeing'} />
            <Products products={filtered} amount={5} title={'Less then 100$'} />
            <Banner />
        </>
    )
}

export default Home;