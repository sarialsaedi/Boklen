import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
    border: '#e6e4db',
    red: '#ef4444',
};

import { useCart } from '../context/CartContext';

export default function ReviewRequestScreen({ navigation }) {
    const { cartItems, removeFromCart } = useCart();
    const totalItems = (cartItems || []).length;

    const handleDelete = (id) => {
        removeFromCart(id);
    };

    const renderItem = (item) => (
        <View key={item.cartId} style={styles.itemContainer}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: item.image }} style={styles.image} />
                    {item.tag && (
                        <View style={styles.statusBadge}>
                            <View style={styles.statusDot} />
                            <Text style={styles.statusText}>{item.tag}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.cardMain}>
                    <View style={styles.cardInfo}>
                        <View style={styles.titleRow}>
                            <Text style={styles.cardTitle}>
                                <Text style={{ color: COLORS.primary }}>{item.quantity} x </Text>
                                {item.title}
                            </Text>
                        </View>
                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                        <Text style={styles.cardDetails}>
                            ({item.driver}، {item.rentalType === 'trip' ? 'بالرد' : item.rentalType === 'daily' ? 'يومية' : 'شهرية'})
                        </Text>
                    </View>
                    <View style={styles.actionsColumn}>
                        <TouchableOpacity
                            onPress={() => handleDelete(item.cartId)}
                            style={styles.deleteBtn}
                        >
                            <MaterialIcons name="delete" size={24} color={COLORS.red} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.editBtn} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="edit" size={16} color={COLORS.primary} />
                        <Text style={styles.editBtnText}>تعديل الخيارات والكمية</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>مراجعة الطلب</Text>
                    <View style={styles.backButton} />
                </View>
            </SafeAreaView>

            {/* Steps Indicator */}
            <View style={styles.stepperContainer}>
                <View style={styles.steps}>
                    <View style={styles.stepDotInactive} />
                    <View style={styles.stepDotActive} />
                    <View style={styles.stepDotInactive} />
                </View>
                <Text style={styles.stepText}>الخطوة 2 من 3</Text>
            </View>

            {(cartItems || []).length === 0 ? (
                <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <MaterialIcons name="shopping-cart" size={64} color={COLORS.textGray} />
                    <Text style={{ marginTop: 16, fontSize: 18, color: COLORS.textGray }}>سلة الطلبات فارغة</Text>
                    <TouchableOpacity
                        style={[styles.findProvidersBtn, { marginTop: 24, width: 200 }]}
                        onPress={() => navigation.navigate('AddMachinery')}
                    >
                        <Text style={styles.findProvidersText}>تصفح المعدات</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                        <View style={styles.listContainer}>
                            {cartItems.map(item => renderItem(item))}
                        </View>

                        <TouchableOpacity
                            style={styles.addMoreBtn}
                            onPress={() => navigation.navigate('AddMachinery')}
                        >
                            <MaterialIcons name="add-circle" size={24} color={COLORS.textGray} />
                            <Text style={styles.addMoreText}>أضف المزيد من المعدات</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    {/* Bottom Sheet */}
                    <View style={styles.bottomSheet}>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>إجمالي المعدات</Text>
                            <Text style={styles.summaryValue}>{totalItems} معدات</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.findProvidersBtn}
                            onPress={() => navigation.navigate('FindingProviders')}
                        >
                            <Text style={styles.findProvidersText}>العثور على مقدمي الخدمة</Text>
                            <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                    </View>
                </>
            )}

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
        borderBottomColor: COLORS.border,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 56,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    stepperContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    steps: {
        flexDirection: 'row',
        gap: 6,
        marginBottom: 8,
    },
    stepDotInactive: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(230, 194, 23, 0.3)',
    },
    stepDotActive: {
        width: 32,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    stepText: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 200,
        gap: 16,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        padding: 0, // Removed padding to let image flush
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
        overflow: 'hidden', // Clip image corners
    },
    cardMain: {
        flexDirection: 'row',
        padding: 12,
        alignItems: 'flex-start',
    },
    imageContainer: {
        width: '100%',
        height: 180, // Larger height
        backgroundColor: '#f1f5f9',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    statusBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#10b981', // Green dot
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#065f46',
    },
    cardInfo: {
        flex: 1,
        paddingRight: 8,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    actionsColumn: {
        justifyContent: 'flex-start',
    },
    deleteBtn: {
        padding: 4,
    },
    cardDetails: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primary,
        marginTop: 4,
        textAlign: 'right',
    },
    cardSubtitle: {
        fontSize: 14,
        color: COLORS.textGray,
        marginTop: 2,
        textAlign: 'right',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end', // Align Edit button to left (RTL end)
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        padding: 12,
        backgroundColor: '#fafaf9',
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    editBtnText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.primary,
    },
    addMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
        borderRadius: 12,
        padding: 16,
        backgroundColor: 'transparent',
    },
    addMoreText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textGray,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 80, // Height of bottom nav + padding
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 8,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    summaryLabel: {
        fontSize: 14,
        color: COLORS.textGray,
        fontWeight: '500',
    },
    summaryValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    findProvidersBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    findProvidersText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
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
        color: COLORS.textGray,
        fontWeight: '500',
    },
    itemContainer: {
        marginBottom: 16,
    },
});
