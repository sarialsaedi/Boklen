import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
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

    const renderCarouselItem = ({ item }) => (
        <View style={styles.carouselItemContainer}>
            <View style={styles.carouselCard}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
                <View style={styles.imageOverlay}>
                    <Text style={styles.carouselTitle}>{item.title}</Text>
                    <Text style={styles.carouselSubtitle}>
                        {item.quantity} x {item.subtitle}
                    </Text>
                </View>
                {item.tag && (
                    <View style={styles.carouselBadge}>
                        <View style={styles.statusDot} />
                        <Text style={styles.badgeText}>{item.tag}</Text>
                    </View>
                )}
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
                        <View>
                            <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                        </View>
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
                        <View>
                            <Text style={styles.findProvidersText}>تصفح المعدات</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    {/* Main List */}
                    <FlatList
                        data={cartItems}
                        renderItem={renderCarouselItem}
                        keyExtractor={(item) => item.cartId.toString()}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                        ListHeaderComponent={
                            <Text style={styles.sectionTitle}>ملخص الطلب ({totalItems})</Text>
                        }
                        ListFooterComponent={
                            <View>
                                <TouchableOpacity
                                    style={styles.addMoreBtn}
                                    onPress={() => navigation.navigate('AddMachinery')}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                        <MaterialIcons name="add-circle" size={24} color={COLORS.textGray} />
                                        <Text style={styles.addMoreText}>أضف المزيد من المعدات</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ height: 100 }} />
                            </View>
                        }
                    />

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
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                <Text style={styles.findProvidersText}>العثور على مقدمي الخدمة</Text>
                                <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                            </View>
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
                        <View style={{ alignItems: 'center', gap: 4 }}>
                            <MaterialIcons name="home" size={26} color={COLORS.textGray} />
                            <Text style={styles.navLabel}>الرئيسية</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserOrders')}
                    >
                        <View style={{ alignItems: 'center', gap: 4 }}>
                            <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                            <Text style={styles.navLabel}>طلباتي</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserSupport')}
                    >
                        <View style={{ alignItems: 'center', gap: 4 }}>
                            <MaterialIcons name="support-agent" size={26} color={COLORS.textGray} />
                            <Text style={styles.navLabel}>الدعم</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserAccount')}
                    >
                        <View style={{ alignItems: 'center', gap: 4 }}>
                            <MaterialIcons name="person" size={26} color={COLORS.textGray} />
                            <Text style={styles.navLabel}>حسابي</Text>
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
        paddingTop: 8,
        paddingBottom: 200,
        gap: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginHorizontal: 20,
        marginBottom: 8,
        textAlign: 'right',
    },
    carouselItemContainer: {
        width: '100%',
        marginBottom: 16,
        paddingHorizontal: 20,
    },
    carouselCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 20,
        height: 240,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden',
        position: 'relative',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 16,
    },
    carouselTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'right',
        marginBottom: 4,
    },
    carouselSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'right',
    },
    carouselBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#065f46',
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#10b981',
    },

    addMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
        borderRadius: 16,
        padding: 20,
        backgroundColor: 'transparent',
        marginHorizontal: 20,
    },
    addMoreText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textGray,
    },
    bottomSheet: {
        position: 'absolute',
        bottom: 80,
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
});
