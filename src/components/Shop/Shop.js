import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb.js';
import Cart from '../Cart/Cart.js';
import Product from '../Product/Product.js';
import './Shop.css';

const Shop = () => {
    const [products, setproducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [displayProducts, setDisplayProducts]=useState([]);

    useEffect(() => {
        // console.log('product api called');
        fetch('./products.JSON')
            .then(res => res.json())
            .then(data => {
                setproducts(data);
                setDisplayProducts(data);
                // console.log('products received');
            });
        
    }, []);

    useEffect(() => {
        // console.log(' LocalStorage cart called')
        // const savedcart = getStoredCart();
        // // console.log(savedcart);
        // for (const key in savedcart) {  
        //     // console.log(products);
        //     const addedProduct = products.find(product => product.key
        //         === key);
        //         console.log(key,addedProduct);
            
        // }

        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
        // console.log(savedcart);
        for (const key in savedCart) {  
            // console.log(products);
            // console.log(key,savedCart[key]);
            const addedProduct = products.find(product => product.key
                === key);
            if (addedProduct) {
                const quantity = savedCart[key];
                addedProduct.quantity = quantity;
                // console.log(addedProduct);
                storedCart.push(addedProduct);
            }
                // console.log(key,addedProduct);  
           
            }
            setCart(storedCart);
            
        }
    },[products])
    
    const handleAddToCart = (product) => {
        const exists = cart.find(pd => pd.key === product.key);
        let newCart = [];
        if (exists) {
            const rest = cart.filter(pd => pd.key !== product.key);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, product];
            
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // console.log(product);
        // const newCart = [...cart, product];
        setCart(newCart);
        // console.log(product);
        // save to local storage for now
        addToDb(product.key);
    }
    const handleSearch = event => {
        const searchText = (event.target.value);
        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProducts);
        // console.log(matchedProducts);

    }
    return (
        <>
                <div className="search-container">
                <input type="text"
                    onChange={handleSearch}
                    placeholder="search-product" />
        </div>
        <div className="shop-container">
            <div className="product-container">
                {/* <h3>Products: {products.length} </h3> */}
                {
                    displayProducts.map(product => <Product
                        key={product.key}
                        product={product}
                        handleAddToCart={handleAddToCart}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review Your Order</button>
                        </Link>
                    </Cart>
            </div>
        </div>
     </>
    );
};

export default Shop;