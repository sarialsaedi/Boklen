import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    success: '#22c55e',
    successBg: '#dcfce7',
    danger: '#ef4444',
};

export default function UserAccountScreen({ navigation }) {

    const { userData } = useUser();

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.avatarContainer}>
                <Image
                    source={{ uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || 'Mohammed Al Saud')}&background=E6C217&color=fff&size=200` }}
                    style={styles.avatarImage}
                />
            </View>
            <Text style={styles.userName}>{userData?.name || 'محمد آل سعود'}</Text>
            <Text style={styles.userPhone}>{userData?.phone || '+966 54 123 4567'}</Text>
            <View style={styles.verifiedBadge}>
                {/* Assuming isVerified is logic we might add later or just static for now as 'true' based on context default or mock */}
                <MaterialIcons name="check-circle" size={16} color={COLORS.success} />
                <Text style={styles.verifiedText}>مستخدم موثق</Text>
            </View>
        </View>
    );

    const renderMenuItem = (item, isLast) => (
        <TouchableOpacity
            key={item.title}
            style={[styles.menuItem, isLast && styles.lastMenuItem]}
            onPress={item.onPress}
        >
            <View style={styles.menuItemLeft}>
                <View style={[styles.iconContainer, { backgroundColor: item.iconBg || 'rgba(230, 194, 23, 0.1)' }]}>
                    <MaterialIcons name={item.icon} size={22} color={item.iconColor || COLORS.primary} />
                </View>
                <Text style={styles.menuItemTitle}>{item.title}</Text>
            </View>
            <MaterialIcons name="chevron-left" size={24} color={COLORS.textGray} />
        </TouchableOpacity>
    );

    const renderSection = (title, items) => (
        <View style={styles.sectionContainer}>
            <View style={{ width: '100%', alignItems: 'flex-start' }}>
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            <View style={styles.sectionContent}>
                {items.map((item, index) => renderMenuItem(item, index === items.length - 1))}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section */}
                {renderHeader()}

                {/* Section 1: General (عام) */}
                {renderSection('عام', [
                    { title: 'البيانات الشخصية', icon: 'person', onPress: () => navigation.navigate('PersonalData') },
                    { title: 'العناوين المحفوظة', icon: 'location-on', onPress: () => navigation.navigate('SavedAddresses') },
                    { title: 'الفواتير', icon: 'receipt', onPress: () => navigation.navigate('UserInvoices') },
                ])}

                {/* Section 2: Settings (الإعدادات) */}
                {renderSection('الإعدادات', [
                    { title: 'اللغة', icon: 'language', onPress: () => navigation.navigate('LanguageSettings') },
                    { title: 'الإشعارات', icon: 'notifications', onPress: () => navigation.navigate('Notifications') },
                ])}

                {/* Section 3: About App (عن التطبيق) */}
                {renderSection('عن التطبيق', [
                    { title: 'سياسة الخصوصية', icon: 'security', onPress: () => navigation.navigate('PrivacyPolicy') },
                    { title: 'الشروط والأحكام', icon: 'description', onPress: () => navigation.navigate('Terms') },
                ])}

                {/* Footer: Log Out */}
                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        style={styles.logoutButton}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <MaterialIcons name="logout" size={20} color={COLORS.danger} />
                        <Text style={styles.logoutText}>تسجيل الخروج</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* Bottom Nav */}
            <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
                <View style={styles.bottomNavContent}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                        <MaterialIcons name="home" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الرئيسية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserOrders')}
                    >
                        <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>طلباتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserSupport')}
                    >
                        <MaterialIcons name="support-agent" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الدعم</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                    // Already on Account
                    >
                        <View style={{ alignItems: 'center' }}>
                            <View style={{ position: 'relative' }}>
                                <MaterialIcons name="person" size={26} color={COLORS.primary} />
                                <View style={styles.activeDot} />
                            </View>
                            <Text style={[styles.navLabel, { color: COLORS.primary }]}>حسابي</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    scrollContent: {
        paddingBottom: 100, // Space for bottom nav
    },
    // Header Styles
    headerContainer: {
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 32,
        backgroundColor: COLORS.surfaceLight,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 24,
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#f1f5f9',
        borderWidth: 4,
        borderColor: COLORS.surfaceLight,
        shadowColor: 'rgba(0,0,0,0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 4,
        marginBottom: 16,
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 12,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: COLORS.successBg,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.success,
    },
    // Menu Styles
    sectionContainer: {
        marginBottom: 24,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 12,
        textAlign: 'right',
        marginRight: 4,
    },
    sectionContent: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 20,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 2,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    lastMenuItem: {
        borderBottomWidth: 0,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuItemTitle: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    // Footer Styles
    footerContainer: {
        paddingHorizontal: 20,
        marginBottom: 40,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 16,
        backgroundColor: '#fee2e2',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#fecaca',
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.danger,
    },
    // Bottom Nav
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 10,
    },
    bottomNavContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 64,
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        minWidth: 64,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    activeDot: {
        position: 'absolute',
        top: -2,
        right: -2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#ef4444',
        borderWidth: 1.5,
        borderColor: COLORS.surfaceLight,
    },
});
