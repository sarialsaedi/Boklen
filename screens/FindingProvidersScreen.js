import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
    red: '#ef4444',
};

export default function FindingProvidersScreen({ navigation }) {
    const { cartItems } = useCart();

    // Animation values
    const pulseAnim = new Animated.Value(1);
    const progressWidth = new Animated.Value(20); // Starts at 20%

    useEffect(() => {
        // Start pulsing animation
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1.2,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Simulate progress bar
        Animated.timing(progressWidth, {
            toValue: 100, // 100%
            duration: 3000,
            useNativeDriver: false, // width doesn't support native driver
        }).start();

        // Navigate after delay
        const timer = setTimeout(() => {
            navigation.replace('MatchingProviders');
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <View style={styles.iconButton}>
                        {/* Placeholder for alignment */}
                    </View>
                    <Text style={styles.headerTitle}>البحث عن مقدمي الخدمة</Text>
                    <View style={styles.iconButton} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
                {/* Stepper Dots */}
                <View style={styles.stepperContainer}>
                    <View style={styles.dotFilled} />
                    <View style={styles.dotFilled} />
                    <View style={styles.dotProgress}>
                        <View style={styles.dotProgressInner} />
                    </View>
                </View>
                <Text style={styles.statusText}>جاري المعالجة...</Text>

                {/* Main Animation */}
                <View style={styles.animContainer}>
                    <View style={styles.pulseDisk}>
                        <Animated.View style={[styles.pulseCircle, { transform: [{ scale: pulseAnim }], opacity: 0.2 }]} />
                        <Animated.View style={[styles.pulseCircleInner, { transform: [{ scale: pulseAnim }], opacity: 0.1 }]} />
                        <View style={styles.iconCircle}>
                            <MaterialIcons name="person-search" size={48} color={COLORS.primary} />
                        </View>
                    </View>
                    <Text style={styles.searchingTitle}>جاري البحث عن مقدمي الخدمة...</Text>
                    <Text style={styles.searchingDesc}>
                        يرجى الانتظار، نقوم الآن بإبلاغ الشركاء القريبين بطلبك للحصول على أفضل العروض.
                    </Text>
                </View>

                {/* Request Summary Card */}
                {cartItems.length > 0 && (
                    <View style={styles.summaryCard}>
                        <View style={styles.loadingBar} />

                        <View style={styles.cardHeader}>
                            <Text style={styles.cardHeaderTitle}>ملخص الطلب ({totalItems} معدات)</Text>
                            <View style={styles.activeTag}>
                                <View style={styles.activeDot} />
                                <Text style={styles.activeText}>نشط</Text>
                            </View>
                        </View>

                        <View style={styles.cardItems}>
                            {cartItems.map((item) => (
                                <View key={item.cartId} style={styles.cardItem}>
                                    <View style={styles.itemImageContainer}>
                                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                                    </View>
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemTitle} numberOfLines={1}>
                                            <Text style={{ color: COLORS.primary }}>{item.quantity || 1} x </Text>
                                            {item.title}
                                        </Text>
                                        <Text style={styles.itemSub} numberOfLines={1}>
                                            {item.fuelType}، {item.rentalType === 'trip' ? 'بالرد' : item.rentalType === 'daily' ? 'يومية' : 'شهرية'}
                                        </Text>
                                    </View>
                                    <View style={styles.searchIconContainer}>
                                        <MaterialIcons name="search" size={14} color={COLORS.primary} />
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            </ScrollView>

            {/* Bottom Nav */}
            <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
                <View style={styles.bottomNavContent}>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserHome')}
                    >
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
                        onPress={() => navigation.navigate('UserAccount')}
                    >
                        <MaterialIcons name="person" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>حسابي</Text>
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
    header: {
        backgroundColor: 'rgba(248, 248, 246, 0.95)',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4db',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 56,
    },
    iconButton: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        alignItems: 'center',
        paddingTop: 24,
        paddingHorizontal: 24,
        paddingBottom: 100, // Space for bottom nav
    },
    stepperContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    dotFilled: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    dotProgress: {
        width: 32,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e6e4db',
        overflow: 'hidden',
    },
    dotProgressInner: {
        width: '50%', // Animated in real scenario
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
        marginTop: 8,
    },
    animContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
        width: '100%',
    },
    pulseDisk: {
        width: 192,
        height: 192,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    pulseCircle: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 96,
        backgroundColor: COLORS.primary,
    },
    pulseCircleInner: {
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: 80,
        backgroundColor: COLORS.primary,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 4,
        borderColor: 'rgba(230, 194, 23, 0.1)',
    },
    searchingTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: 12,
    },
    searchingDesc: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: '80%',
    },
    summaryCard: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e6e4db',
        overflow: 'hidden',
        padding: 16,
    },
    loadingBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4,
        backgroundColor: COLORS.primary,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        paddingBottom: 8,
    },
    cardHeaderTitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textGray,
    },
    activeTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#22c55e',
    },
    activeText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#16a34a',
    },
    cardItems: {
        gap: 12,
    },
    cardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    itemImageContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity: 0.9,
    },
    itemInfo: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    itemSub: {
        fontSize: 10,
        color: COLORS.textGray,
    },
    searchIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
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
});
