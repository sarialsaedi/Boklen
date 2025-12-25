import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load cart items from storage on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cartItems');
                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
            } catch (error) {
                console.error('Failed to load cart items', error);
            } finally {
                setLoading(false);
            }
        };

        loadCart();
    }, []);

    // Save cart items to storage whenever they change
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
            } catch (error) {
                console.error('Failed to save cart items', error);
            }
        };

        if (!loading) {
            saveCart();
        }
    }, [cartItems, loading]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Generate a unique ID for the new item if it doesn't have one
            const newItem = {
                ...item,
                cartId: Date.now().toString() + Math.random().toString(36).substr(2, 9)
            };
            return [...prevItems, newItem];
        });
    };

    const removeFromCart = (cartId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        loading
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
