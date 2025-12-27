import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const COLORS = {
    primary: 'rgb(230, 194, 23)', // #E6C217
    inactive: '#6B7280', // textSub/Group
    background: '#FFFFFF',
    border: '#F3F4F6',
};

export default function BottomTabNavigator({ activeTab }) {
    const navigation = useNavigation();

    // Helper to decide color
    const getColor = (tabName) => activeTab === tabName ? COLORS.primary : COLORS.inactive;

    return (
        <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
            <View style={styles.bottomNavContent}>
                {/* Home */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UserHome')}
                >
                    <MaterialIcons name="home" size={28} color={getColor('Home')} />
                    <Text style={[styles.navLabel, { color: getColor('Home') }]}>الرئيسية</Text>
                </TouchableOpacity>

                {/* Orders - 'UserOrders' */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UserOrders')}
                >
                    <MaterialIcons name="receipt-long" size={28} color={getColor('Orders')} />
                    <Text style={[styles.navLabel, { color: getColor('Orders') }]}>طلباتي</Text>
                </TouchableOpacity>

                {/* Support - 'UserSupport' */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UserSupport')}
                >
                    <MaterialIcons name="support-agent" size={28} color={getColor('Support')} />
                    <Text style={[styles.navLabel, { color: getColor('Support') }]}>الدعم</Text>
                </TouchableOpacity>

                {/* Account - 'UserAccount' */}
                <TouchableOpacity
                    style={styles.navItem}
                    onPress={() => navigation.navigate('UserAccount')}
                >
                    <MaterialIcons name="person" size={28} color={getColor('Account')} />
                    <Text style={[styles.navLabel, { color: getColor('Account') }]}>حسابي</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    bottomNav: {
        backgroundColor: COLORS.background,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 10,
    },
    bottomNavContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingVertical: 12,
        paddingBottom: 12, // SafeAreaView handles the extra bottom padding
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        minWidth: 60, // Ensure touch target
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
});
