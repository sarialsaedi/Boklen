import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ecc813',
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

    const handleDelete = (cartId) => {
        removeFromCart(cartId);
    };

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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

            {cartItems.length === 0 ? (
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
                        {cartItems.map((item) => (
                            <View key={item.cartId} style={styles.card}>
                                <View style={styles.cardMain}>
                                    <View style={styles.imageContainer}>
                                        <Image source={{ uri: item.image }} style={styles.image} />
                                    </View>
                                    <View style={styles.cardInfo}>
                                        <View style={styles.titleRow}>
                                            <Text style={styles.cardTitle}>
                                                <Text style={{ color: COLORS.primary }}>{item.quantity} x </Text>
                                                {item.title}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => handleDelete(item.cartId)}
                                                style={styles.deleteBtn}
                                            >
                                                <MaterialIcons name="delete" size={20} color={COLORS.red} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.cardDetails}>
                                            ({item.driver}، {item.rentalType === 'trip' ? 'بالرد' : item.rentalType === 'daily' ? 'يومية' : 'شهرية'})
                                        </Text>
                                        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardFooter}>
                                    <TouchableOpacity style={styles.editBtn} onPress={() => navigation.goBack()}>
                                        <MaterialIcons name="edit" size={16} color={COLORS.primary} />
                                        <Text style={styles.editBtnText}>تعديل الخيارات والكمية</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}

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
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                    <MaterialIcons name="home" size={24} color={COLORS.textGray} />
                    <Text style={styles.navLabel}>الرئيسية</Text>
                </TouchableOpacity>
                <View style={styles.navItem}>
                    <View style={styles.navIconBadge}>
                        <MaterialIcons name="assignment" size={24} color={COLORS.primary} />
                        {totalItems > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{totalItems}</Text>
                            </View>
                        )}
                    </View>
                    <Text style={[styles.navLabel, { fontWeight: 'bold', color: COLORS.primary }]}>الطلبات</Text>
                </View>
                <View style={styles.navItem}>
                    <MaterialIcons name="person" size={24} color={COLORS.textGray} />
                    <Text style={styles.navLabel}>حسابي</Text>
                </View>
            </View>
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
        backgroundColor: 'rgba(236, 200, 19, 0.3)',
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
        padding: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    cardMain: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 8,
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardInfo: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        flex: 1,
    },
    deleteBtn: {
        padding: 4,
        marginTop: -4,
        marginRight: -4,
    },
    cardDetails: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
        marginTop: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
        marginTop: 2,
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
        paddingTop: 8,
        marginTop: 4,
    },
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: 'rgba(236, 200, 19, 0.1)',
        paddingHorizontal: 12,
        paddingVertical: 6,
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
        height: 64, // Reduced slightly
        backgroundColor: COLORS.surfaceLight,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 4,
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        color: COLORS.textGray,
        fontWeight: '500',
    },
    navIconBadge: {
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: COLORS.red,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
