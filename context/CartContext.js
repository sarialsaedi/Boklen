import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LOCATIONS = [
    'الرياض, المملكة العربية السعودية',
    'جدة, المملكة العربية السعودية',
    'الدمام, المملكة العربية السعودية'
];

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [loading, setLoading] = useState(true);


    // Load cart items, orders, and addresses from storage on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const storedCart = await AsyncStorage.getItem('cartItems');
                const storedOrders = await AsyncStorage.getItem('myOrders');
                const storedAddresses = await AsyncStorage.getItem('savedAddresses');

                if (storedCart) {
                    setCartItems(JSON.parse(storedCart));
                }
                if (storedOrders) {
                    setMyOrders(JSON.parse(storedOrders));
                }
                if (storedAddresses) {
                    setSavedAddresses(JSON.parse(storedAddresses));
                } else {
                    // Add defaults if empty
                    setSavedAddresses([
                        { id: '1', title: 'المنزل', city: 'الرياض', district: 'حي النرجس', type: 'home' },
                        { id: '2', title: 'العمل', city: 'جدة', district: 'طريق الملك فهد', type: 'work' },
                    ]);
                }

                // INJECT MOCK ORDER FOR TESTING
                setMyOrders(prev => {
                    const existingOrderIndex = prev.findIndex(o => o.id === 'ORD-42710');

                    if (existingOrderIndex >= 0) {
                        // Order exists, force update status
                        const updatedOrders = [...prev];
                        updatedOrders[existingOrderIndex] = {
                            ...updatedOrders[existingOrderIndex],
                            status: 'Approved'
                        };
                        return updatedOrders;
                    } else {
                        // Order doesn't exist, create it
                        return [
                            {
                                id: 'ORD-42710',
                                date: new Date().toISOString(),
                                status: 'Approved',
                                items: [{
                                    title: '20 Ton Excavator',
                                    subtitle: 'Equipment',
                                    image: null // or a valid URL if available
                                }],
                                totalPrice: 5000,
                                machineryCount: 1,
                                provider: 'Al-Amal Equipments'
                            },
                            ...prev
                        ];
                    }
                });
            } catch (error) {
                console.error('Failed to load data', error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
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

    // Save orders to storage whenever they change
    useEffect(() => {
        const saveOrders = async () => {
            try {
                await AsyncStorage.setItem('myOrders', JSON.stringify(myOrders));
            } catch (error) {
                console.error('Failed to save orders', error);
            }
        };

        if (!loading) {
            saveOrders();
        }
    }, [myOrders, loading]);

    // Save addresses to storage whenever they change
    useEffect(() => {
        const saveAddresses = async () => {
            try {
                await AsyncStorage.setItem('savedAddresses', JSON.stringify(savedAddresses));
            } catch (error) {
                console.error('Failed to save addresses', error);
            }
        };

        if (!loading) {
            saveAddresses();
        }
    }, [savedAddresses, loading]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            // Check if item already exists with matching id, driver, and rentalType
            const existingItemIndex = prevItems.findIndex(
                (i) => i.id === item.id && i.fuelType === item.fuelType && i.rentalType === item.rentalType
            );

            if (existingItemIndex >= 0) {
                // Item exists, increment quantity
                const updatedItems = [...prevItems];
                const existingItem = updatedItems[existingItemIndex];
                updatedItems[existingItemIndex] = {
                    ...existingItem,
                    quantity: (existingItem.quantity || 1) + (item.quantity || 1)
                };
                return updatedItems;
            } else {
                // Item is new, add it
                const newItem = {
                    ...item,
                    quantity: item.quantity || 1,
                    cartId: Date.now().toString() + Math.random().toString(36).substr(2, 9)
                };
                return [...prevItems, newItem];
            }
        });
    };

    const removeFromCart = (cartId) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.cartId !== cartId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const updateCartItem = (cartId, updates) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.cartId === cartId ? { ...item, ...updates } : item
            )
        );
    };

    const addOrder = (orderData) => {
        const newOrder = {
            id: orderData.id || `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
            date: new Date().toISOString(),
            status: 'Under Processing',
            items: cartItems,
            totalPrice: orderData.totalPrice,
            machineryCount: cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0),
            ...orderData
        };

        setMyOrders(prev => [newOrder, ...prev]);
        clearCart();
        return newOrder.id;
    };

    const addAddress = (address) => {
        const newAddress = {
            id: Date.now().toString(),
            ...address
        };
        setSavedAddresses(prev => [...prev, newAddress]);
    };

    const updateAddress = (id, updatedData) => {
        setSavedAddresses(prev => prev.map(addr =>
            addr.id === id ? { ...addr, ...updatedData } : addr
        ));
    };

    const deleteAddress = (id) => {
        setSavedAddresses(prev => prev.filter(addr => addr.id !== id));
    };

    const value = {
        cartItems,
        myOrders,
        savedAddresses,
        LOCATIONS,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartItem,
        addOrder,
        addAddress,
        updateAddress,

        loading,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
