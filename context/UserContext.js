import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        name: 'Mohammed Al Saud',
        email: 'mohammed@example.com',
        phone: '+966 54 123 4567',
        password: 'password123', // Mock password for demo
    });
    const [loading, setLoading] = useState(true);
    const [location, setLocation] = useState('الرياض، المملكة العربية السعودية');

    const LOCATIONS = [
        'الرياض، المملكة العربية السعودية',
        'جدة، المملكة العربية السعودية',
        'الدمام، المملكة العربية السعودية',
        'مكة المكرمة، المملكة العربية السعودية',
        'المدينة المنورة، المملكة العربية السعودية',
    ];

    // Load user data from storage on mount
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const storedUser = await AsyncStorage.getItem('userProfile');
                const storedLocation = await AsyncStorage.getItem('userLocation');

                if (storedUser) {
                    setUserData(JSON.parse(storedUser));
                }
                if (storedLocation) {
                    setLocation(storedLocation);
                }
            } catch (error) {
                console.error('Failed to load user data', error);
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Save user data to storage
    const saveUserData = async (newData) => {
        try {
            const updatedUser = { ...userData, ...newData };
            setUserData(updatedUser);
            await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
            return true;
        } catch (error) {
            console.error('Failed to save user data', error);
            return false;
        }
    };

    // Update location and persist
    const updateUserLocation = async (newLocation) => {
        try {
            setLocation(newLocation);
            await AsyncStorage.setItem('userLocation', newLocation);
        } catch (error) {
            console.error('Failed to save location', error);
        }
    };

    // Update password
    const updatePassword = async (oldPassword, newPassword) => {
        if (oldPassword !== userData.password) {
            return { success: false, message: 'كلمة المرور القديمة غير صحيحة' };
        }

        try {
            const updatedUser = { ...userData, password: newPassword };
            setUserData(updatedUser);
            await AsyncStorage.setItem('userProfile', JSON.stringify(updatedUser));
            return { success: true, message: 'تم تحديث كلمة المرور بنجاح' };
        } catch (error) {
            console.error('Failed to update password', error);
            return { success: false, message: 'حدث خطأ أثناء تحديث كلمة المرور' };
        }
    };

    return (
        <UserContext.Provider value={{
            userData,
            saveUserData,
            updatePassword,
            loading,
            location,
            setLocation: updateUserLocation,
            LOCATIONS
        }}>
            {children}
        </UserContext.Provider>
    );
};
