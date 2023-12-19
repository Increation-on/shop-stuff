import { useParams, useNavigate } from 'react-router-dom';
// import styles from '../../styles/Product.module.css';
import { useEffect } from 'react';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from './../../utils/routes';
import Product from './Product';
import Products from './Products';
import { useDispatch } from 'react-redux';
import { getRelatedProducts } from '../../features/products/productsSlice';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const SingleProduct = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

    const { products: { related, list } } = useSelector((state) => state);

    // console.log(related)

    useEffect(() => {
        if (!isFetching && !isLoading && !isSuccess) {
            navigate(ROUTES.HOME);
        }
    }, [isLoading, isFetching, isSuccess, navigate]);

    useEffect(() => {
        if (!data || !list.length) return;
        dispatch(getRelatedProducts(data.category.id))
    }, [data, dispatch, list.length]);

    return (
        <>
            {!data ?
                <>
                    <section className='preloader'>Loading</section>
                </>
                :
                <>
                    <Product {...data} />
                    <Products products={related} amount={5} title='Related' />
                </>}
        </>
    )
}

export default SingleProduct