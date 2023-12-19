import { useGetProductsQuery } from '../../features/api/apiSlice';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import styles from '../../styles/Category.module.css';
import { useState } from 'react';
import Products from './../Products/Products';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const Category = () => {

    const { id } = useParams();
    const { list } = useSelector(({ categories }) => categories);

    const defaultValues = {
        title: '',
        price_min: 0,
        price_max: 0
    }

    const defaultParams = {
        categoryId: id,
        limit: 5,
        offset: 0,
        ...defaultValues
    }
    const [values, setValues] = useState(defaultValues);
    const [params, setParams] = useState(defaultParams);
    const [cat, setCat] = useState(null);
    const [items, setItems] = useState([]);
    const [isEnd, setIsEnd] = useState(false);

    const { data, isLoading, isSuccess } = useGetProductsQuery(params);





    useEffect(() => {
        if (!id) return;
        setItems([]);
        setIsEnd(false);
        setValues(defaultValues);
        setParams({ ...defaultParams, categoryId: id });
    }, [id]);

    useEffect(() => {
        if (isLoading) return;
        if (!data || !data.length) return setIsEnd(true);
        const products = Object.values(data);
        setItems((_items) => [..._items, ...products]); //создание нового состояния на основе предыдущего (_items)
    }, [isLoading, data])

    useEffect(() => {
        if (!id || !list.length) return;
        const category = list.find((item) => item.id === id * 1); //id*1 - преобразование в число
        setCat(category);
    }, [list, id])



    const handleChange = ({ target: { name, value } }) => {
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setItems([]);
        setIsEnd(false);
        setParams({ ...defaultParams, ...values })
    }

    const handleReset = () => {
        setValues(defaultValues);
        setParams(defaultParams);
        setIsEnd(false);
    }




    return (
        <section className={styles.wrapper} id="section1">
            <h2 className={styles.title}>{cat?.name}</h2>
            <form className={styles.filters} onSubmit={handleSubmit}>
                <div className={styles.filter}>
                    <input
                        type="text"
                        name='title'
                        placeholder='Product name'
                        onChange={handleChange}
                        value={values.title}
                    />
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name='price_min'
                        placeholder='Min price'
                        onChange={handleChange}
                        value={values.price_min}
                    />
                    <span>Price from</span>
                </div>
                <div className={styles.filter}>
                    <input
                        type="number"
                        name='price_max'
                        placeholder='Max price'
                        onChange={handleChange}
                        value={values.price_max}
                    />
                    <span>Price to</span>
                </div>
                <button type='submit' hidden />
            </form>

            {isLoading ?
                <div className='preloader'>Loading...</div>
                : !isSuccess || !items.length ? (
                    <div className={styles.back}>
                        <span>No results</span>
                        <button onClick={handleReset}>Reset</button>
                    </div>
                ) : (
                    <Products
                        products={items}
                        style={{ padding: 0 }}
                        amount={items.length} />

                )}
            {!isEnd && (
                <div className={styles.more}>
                    <button
                        onClick={() => { setParams({ ...params, offset: params.offset + params.limit }) }}>
                        See more
                    </button>
                </div>
            )}

        </section>
    )
}

export default Category;