import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
};

const NotificationItem = ({ title, value, onValueChange }) => (
    <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{title}</Text>
        <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#cbd5e1', true: COLORS.primary }}
            thumbColor={COLORS.surfaceLight}
        />
    </View>
);

export default function NotificationsScreen({ navigation }) {
    const [isAppNotificationsEnabled, setIsAppNotificationsEnabled] = useState(true);
    const [isSmsEnabled, setIsSmsEnabled] = useState(true);
    const [isEmailOffersEnabled, setIsEmailOffersEnabled] = useState(true);

    useEffect(() => {
        loadPreferences();
    }, []);

    const loadPreferences = async () => {
        try {
            const appNotif = await AsyncStorage.getItem('isAppNotificationsEnabled');
            const smsNotif = await AsyncStorage.getItem('isSmsEnabled');
            const emailNotif = await AsyncStorage.getItem('isEmailOffersEnabled');

            if (appNotif !== null) setIsAppNotificationsEnabled(JSON.parse(appNotif));
            if (smsNotif !== null) setIsSmsEnabled(JSON.parse(smsNotif));
            if (emailNotif !== null) setIsEmailOffersEnabled(JSON.parse(emailNotif));
        } catch (error) {
            console.error('Failed to load notification preferences:', error);
        }
    };

    const toggleAppNotifications = async (value) => {
        setIsAppNotificationsEnabled(value);
        try {
            await AsyncStorage.setItem('isAppNotificationsEnabled', JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save app notification preference:', error);
        }
    };

    const toggleSmsNotifications = async (value) => {
        setIsSmsEnabled(value);
        try {
            await AsyncStorage.setItem('isSmsEnabled', JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save SMS preference:', error);
        }
    };

    const toggleEmailOffers = async (value) => {
        setIsEmailOffersEnabled(value);
        try {
            await AsyncStorage.setItem('isEmailOffersEnabled', JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save email preference:', error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>الإشعارات</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.section}>
                    <NotificationItem
                        title="اشعارات التطبيق"
                        value={isAppNotificationsEnabled}
                        onValueChange={toggleAppNotifications}
                    />
                    <View style={styles.divider} />
                    <NotificationItem
                        title="رسائل نصية (SMS)"
                        value={isSmsEnabled}
                        onValueChange={toggleSmsNotifications}
                    />
                    <View style={styles.divider} />
                    <NotificationItem
                        title="عروض البريد الإلكتروني"
                        value={isEmailOffersEnabled}
                        onValueChange={toggleEmailOffers}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        padding: 24,
    },
    section: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    itemText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: 16,
    },
});
