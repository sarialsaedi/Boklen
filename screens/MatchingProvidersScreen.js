import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
    border: '#e6e4db',
    green: '#15803d',
};

import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const PROVIDERS = [
    {
        id: 1,
        name: 'المعدات الثقيلة السعودية',
        isBestMatch: true,
        verified: false,
        rating: 4.9,
        jobs: 120,
        availableCount: 3,
        totalRequired: 3,
        price: 16200,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNYmDhCQqtiFhvbVHfQLKyJMD6MnOOQ-65rc0Ja6sz6iDwvAfnDtZJFGVATy1dM1wp9uyIiyikDEvFi58QeKWoCegttkQcHYBTVK_So2DMC1Sk2N-KI5pF_F0-DWvX2IIAnLv1mkXrjXw8Jk7yOfg3uW8uvY02L0jsQ4r6d2K84ka2_-up5Ins6QiLBunSjF2WKJtg9SJPpspnhh7Iyv7Xg_npQO0eL94gJrG5NutEhkF2t8DxdI4_tb1ywiro-tAIwcWOOPLQV50',
    },
    {
        id: 2,
        name: 'شركة الراجحي للمعدات',
        isBestMatch: false,
        verified: true,
        rating: null,
        availableCount: 3,
        totalRequired: 3,
        estimatedCost: 15000,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfL_XgKt5_L-Lsq1Oi3k5FZEwsDxyi_3Vvh0qZUGqLWdNsD04Oyj2Qg5Vn-va58FoJ75jweQJ2bbamS5ePpC-Quy_IYczLP3IEqk2_AHM7vcAGhX1NcGDDzi96gCfwne-LAA6HrFWzEmdx7bA0Bj1bTk2BE34UjyB1z6dSC4lrwY26YSfWnnaujq0F-R-R_ciWqrO5zSIUZRVAA5ptPZjM0HHHOU9umIXD_uvpYrT9d8_D3hWWqkLAkdlRJ-rdg3XsD34LTL9gP-k',
    },
    {
        id: 3,
        name: 'مؤسسة البناء الحديث',
        isBestMatch: false,
        verified: false,
        rating: 4.5,
        availableCount: 3,
        totalRequired: 3,
        estimatedCost: 18500,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAShQjJ6vaF8yUcJ5FoK34YtxGAhY3zyNJWGmLd8bYaQTF34JoHfUO-Am2b-MYcxTmstn1ciuvKGOvgkjbusTetJwz8wlrjj5PUzYDVy3nK9hN41dLGxrEY0UIeayGRoD9LWyzp1jskT_HMo-GDmXmY4NN9XDRhXMm2erJRdIhVIa8jF5CYrLXF_zgZGMW8oFS9_oYZgoBP5kiFJWNta5SGPnkbFqreBWxkJIqCdI8UujAUJ9yID0VB9J376r5JdlRpSEdiZ_2dzT8',
    },
];

export default function MatchingProvidersScreen({ navigation }) {
    const { cartItems } = useCart();
    const { location } = useUser();
    const [sortBy, setSortBy] = useState('bestMatch');

    // Initialize with the ID of the 'Best Match' provider
    const [selectedProviderId, setSelectedProviderId] = useState(
        PROVIDERS.find(p => p.isBestMatch)?.id || PROVIDERS[0].id
    );

    // Generate a consistent random order ID for this session
    const orderId = React.useMemo(() => Math.floor(1000 + Math.random() * 9000), []);

    const sortedProviders = React.useMemo(() => {
        let sorted = [...PROVIDERS];
        if (sortBy === 'lowestPrice') {
            sorted.sort((a, b) => {
                const priceA = a.price || a.estimatedCost;
                const priceB = b.price || b.estimatedCost;
                return priceA - priceB;
            });
        } else if (sortBy === 'highestRated') {
            sorted.sort((a, b) => {
                // If rating is null, put it at the end
                if (a.rating === null) return 1;
                if (b.rating === null) return -1;
                return b.rating - a.rating;
            });
        }
        return sorted;
    }, [sortBy]);

    const renderProviderCard = (provider) => {
        const isSelected = provider.id === selectedProviderId;
        const displayPrice = provider.price || provider.estimatedCost;

        return (
            <Pressable
                key={provider.id}
                onPress={() => setSelectedProviderId(provider.id)}
                style={[
                    styles.cardContainer,
                    isSelected ? styles.cardSelected : styles.cardStandard,
                ]}
            >
                {/* Recommended Badge - Display ONLY if this specific provider is the Best Match */}
                {provider.isBestMatch && (
                    <View style={styles.bestMatchLabel}>
                        <Text style={styles.bestMatchLabelText}>خيارنا المفضل لك</Text>
                    </View>
                )}

                <View style={styles.cardBody}>
                    <View style={styles.providerHeader}>
                        <View style={isSelected ? styles.avatarContainer : styles.avatarContainerSmall}>
                            <Image source={{ uri: provider.image }} style={styles.avatar} />
                        </View>
                        <View style={styles.providerInfo}>
                            <View style={styles.providerTopRow}>
                                <View>
                                    <Text style={isSelected ? styles.providerNameLarge : styles.providerName}>
                                        {provider.name}
                                    </Text>

                                    <View style={styles.ratingRowContainer}>
                                        {provider.rating && (
                                            <View style={styles.ratingRow}>
                                                <MaterialIcons name="star" size={14} color={COLORS.primary} />
                                                <Text style={styles.ratingValue}>{provider.rating}</Text>
                                                {isSelected && (
                                                    <Text style={styles.ratingCount}>• {provider.jobs} عملية تأجير</Text>
                                                )}
                                            </View>
                                        )}
                                        {provider.verified && !isSelected && (
                                            <View style={styles.verifiedRow}>
                                                <MaterialIcons name="verified" size={14} color={COLORS.primary} />
                                                <Text style={styles.verifiedText}>موثوق</Text>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                {provider.isBestMatch && (
                                    <View style={isSelected ? styles.fullMatchBadge : styles.checkTag}>
                                        {isSelected ? (
                                            <>
                                                <MaterialIcons name="task-alt" size={20} color={COLORS.green} />
                                                <Text style={styles.fullMatchText}>يلبي طلبك{'\n'}بالكامل</Text>
                                            </>
                                        ) : (
                                            <>
                                                <MaterialIcons name="check" size={16} color={COLORS.green} />
                                                <Text style={styles.checkTagText}>كامل الطلب</Text>
                                            </>
                                        )}
                                    </View>
                                )}
                                {!provider.isBestMatch && (
                                    <View style={styles.checkTag}>
                                        <MaterialIcons name="check" size={16} color={COLORS.green} />
                                        <Text style={styles.checkTagText}>كامل الطلب</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>

                    {isSelected && (
                        <View style={styles.bestMatchDetails}>
                            <View style={styles.availabilityRow}>
                                <MaterialIcons name="check-circle" size={18} color={COLORS.green} />
                                <Text style={styles.availabilityText}>جميع المعدات الـ {provider.totalRequired} متوفرة للتواريخ المحددة</Text>
                            </View>
                            <View style={styles.costRow}>
                                <Text style={styles.costLabel}>السعر الإجمالي (شاملاً التوصيل)</Text>
                                <Text style={styles.costValue}>{displayPrice.toLocaleString()} <Text style={styles.currency}>ر.س</Text></Text>
                            </View>
                        </View>
                    )}

                    {!isSelected && (
                        <>
                            <View style={styles.dashedDivider} />
                            <View style={styles.cardFooter}>
                                <View>
                                    <Text style={styles.costLabelSmall}>إجمالي التكلفة المتوقعة</Text>
                                    <Text style={styles.costValueSmall}>{displayPrice.toLocaleString()} <Text style={styles.currencySmall}>ر.س</Text></Text>
                                </View>
                                <View style={styles.detailsBtn}>
                                    <Text style={styles.detailsBtnText}>عرض التفاصيل</Text>
                                </View>
                            </View>
                        </>
                    )}

                    {isSelected && (
                        <TouchableOpacity
                            style={styles.selectBtnPrimary}
                            onPress={() => navigation.navigate('OrderSummary', { provider })}
                        >
                            <Text style={styles.selectBtnPrimaryText}>اختر هذا المزود</Text>
                            <MaterialIcons name="arrow-right-alt" size={20} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                    )}
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>مقدمو الخدمة المطابقون</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} stickyHeaderIndices={[1]}>

                {/* Summary Banner */}
                <View style={styles.summaryBanner}>
                    <View style={styles.summaryCard}>
                        <View style={styles.summaryHeader}>
                            <View style={styles.summaryOrderTag}>
                                <Text style={styles.summaryOrderText}>طلب مجمع #{orderId}</Text>
                            </View>
                            <Text style={styles.summaryLocation}>{location}</Text>
                        </View>
                        <View>
                            <Text style={styles.summaryReqLabel}>ملخص احتياجاتك</Text>
                            <View style={styles.summaryTags}>
                                {cartItems.map((item, index) => (
                                    <View key={index} style={styles.reqTag}>
                                        <Text style={styles.reqTagText}>{item.title} ({item.quantity})</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <View style={styles.filtersContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersContent}>
                        <TouchableOpacity
                            style={[styles.filterChip, sortBy === 'bestMatch' && styles.filterChipActive]}
                            onPress={() => setSortBy('bestMatch')}
                        >
                            <Text style={sortBy === 'bestMatch' ? styles.filterChipTextActive : styles.filterChipText}>الأفضل تطابقاً</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterChip, sortBy === 'lowestPrice' && styles.filterChipActive]}
                            onPress={() => setSortBy('lowestPrice')}
                        >
                            <Text style={sortBy === 'lowestPrice' ? styles.filterChipTextActive : styles.filterChipText}>أقل سعر</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={16} color={sortBy === 'lowestPrice' ? 'white' : COLORS.textDark} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterChip, sortBy === 'highestRated' && styles.filterChipActive]}
                            onPress={() => setSortBy('highestRated')}
                        >
                            <Text style={sortBy === 'highestRated' ? styles.filterChipTextActive : styles.filterChipText}>الأعلى تقييماً</Text>
                            <MaterialIcons name="keyboard-arrow-down" size={16} color={sortBy === 'highestRated' ? 'white' : COLORS.textDark} />
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.listContent}>
                    {sortedProviders.map((provider) => renderProviderCard(provider))}
                </View>
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
        borderBottomColor: 'rgba(231, 227, 207, 0.5)',
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
        backgroundColor: 'rgba(0,0,0,0.03)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        // paddingBottom: 100,
    },
    summaryBanner: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    summaryCard: {
        backgroundColor: '#221f10',
        borderRadius: 12,
        padding: 16,
        gap: 12,
        overflow: 'hidden',
    },
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    summaryOrderTag: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    summaryOrderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'black',
    },
    summaryLocation: {
        fontSize: 12,
        color: '#9ca3af',
    },
    summaryReqLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#d1d5db',
        marginBottom: 4,
    },
    summaryTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    reqTag: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    reqTagText: {
        fontSize: 12,
        color: 'white',
    },
    filtersContainer: {
        backgroundColor: COLORS.backgroundLight,
        paddingVertical: 8,
    },
    filtersContent: {
        paddingHorizontal: 16,
        gap: 12,
    },
    filterChip: {
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    filterChipActive: {
        backgroundColor: '#1b190d',
        borderColor: '#1b190d',
    },
    filterChipText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    filterChipTextActive: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
    },
    listContent: {
        padding: 16,
        paddingBottom: 100,
        gap: 20,
    },
    // New Card Styles
    cardContainer: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        overflow: 'hidden',
        // Common Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    cardSelected: {
        borderWidth: 2,
        borderColor: 'rgba(230, 194, 23, 0.8)', // Primary color, slightly transparent or solid
    },
    cardStandard: {
        borderWidth: 1,
        borderColor: '#f3f4f6',
    },
    cardBody: {
        padding: 16,
        gap: 16,
    },
    bestMatchLabel: {
        backgroundColor: COLORS.primary,
        paddingVertical: 4,
        alignItems: 'center',
    },
    bestMatchLabelText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    providerHeader: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'flex-start',
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarContainerSmall: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f9fafb',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 99,
        resizeMode: 'cover',
    },
    providerInfo: {
        flex: 1,
    },
    providerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    providerNameLarge: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    providerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    ratingRowContainer: {
        gap: 2,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    ratingCount: {
        fontSize: 12,
        color: '#6b7280',
    },
    verifiedRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.primary,
    },
    fullMatchBadge: {
        backgroundColor: '#f0fdf4', // green-50
        borderWidth: 1,
        borderColor: '#dcfce7',
        borderRadius: 8,
        padding: 6,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 70,
    },
    fullMatchText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#15803d',
        textAlign: 'center',
        marginTop: 2,
    },
    checkTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#f0fdf4',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    checkTagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#15803d',
    },
    bestMatchDetails: {
        backgroundColor: '#fafaf9',
        borderRadius: 8,
        padding: 12,
        borderWidth: 1,
        borderColor: '#f3f4f6',
        gap: 12,
    },
    availabilityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    availabilityText: {
        fontSize: 12,
        color: '#4b5563',
        flex: 1,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        paddingTop: 12,
    },
    costLabel: {
        fontSize: 14,
        color: '#6b7280',
    },
    costValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    currency: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#6b7280',
    },
    selectBtnPrimary: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        marginTop: 4,
    },
    selectBtnPrimaryText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    dashedDivider: {
        height: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    costLabelSmall: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 2,
    },
    costValueSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    currencySmall: {
        fontSize: 12,
        fontWeight: 'normal',
        color: '#6b7280',
    },
    detailsBtn: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 8,
    },
    detailsBtnText: {
        fontSize: 14,
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
