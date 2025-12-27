import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import BottomTabNavigator from '../components/BottomTabNavigator';

const COLORS = {
    primary: 'rgb(230, 194, 23)', // App Theme Yellow
    secondary: '#10B981', // Green
    backgroundLight: '#F9FAFB',
    cardLight: '#FFFFFF',
    textMain: '#111827',
    textSub: '#6B7280',
    border: '#E5E7EB',
    amberLight: 'rgba(230, 194, 23, 0.15)', // Low opacity yellow
    amberDark: 'rgb(230, 194, 23)', // Solid yellow
    greenLight: '#D1FAE5',
    greenDark: '#047857',
};

import { useCart } from '../context/CartContext';

export default function UserOrdersScreen({ navigation }) {
    const { myOrders } = useCart();

    const getStatusStyle = (status) => {
        if (status === 'Under Processing' || status === 'تحت المعالجة') {
            return {
                bg: COLORS.amberLight,
                text: COLORS.amberDark,
                icon: 'hourglass-empty',
                label: 'تحت المعالجة'
            };
        }
        if (status === 'Approved' || status === 'تم الموافقة على الطلب') {
            return {
                bg: '#e6f4ea', // Light Green
                text: '#1e8e3e', // Dark Green
                icon: 'check-circle',
                label: 'تم الموافقة على الطلب'
            };
        }
        return {
            bg: COLORS.greenLight,
            text: COLORS.greenDark,
            icon: 'check-circle',
            label: status // Default fallback
        };
    };

    const renderOrderItem = ({ item }) => {
        const firstItem = item.items && item.items.length > 0 ? item.items[0] : null;
        const statusStyle = getStatusStyle(item.status);
        const itemDate = new Date(item.date).toISOString().split('T')[0]; // Format consistent with design

        return (
            <TouchableOpacity
                style={styles.orderCard}
                onPress={() => { }}
                activeOpacity={0.9}
            >
                {/* Header: Status and ID/Date */}
                <View style={styles.cardHeader}>
                    <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                        <MaterialIcons name={statusStyle.icon} size={14} color={statusStyle.text} />
                        <Text style={[styles.statusText, { color: statusStyle.text }]}>
                            {statusStyle.label}
                        </Text>
                    </View>
                    <View style={styles.idDateContainer}>
                        <Text style={styles.orderId}>{item.id}</Text>
                        <Text style={styles.orderDate}>{itemDate}</Text>
                    </View>
                </View>

                {/* Main Content: Item Info & Image */}
                <View style={styles.cardMain}>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemTitle} numberOfLines={1}>
                            {firstItem ? firstItem.title : 'معدات'}
                        </Text>
                        <Text style={styles.itemSubtitle}>
                            {item.items && item.items.length > 1
                                ? `+${item.items.length - 1} معدات أخرى`
                                : (firstItem?.subtitle || 'المعدات الثقيلة')}
                        </Text>
                    </View>
                    <View style={styles.imageWrapper}>
                        {firstItem && firstItem.image ? (
                            <Image source={{ uri: firstItem.image }} style={styles.itemImage} resizeMode="cover" />
                        ) : (
                            <View style={[styles.itemImage, { backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }]}>
                                <MaterialIcons name="image-not-supported" size={24} color={COLORS.textSub} />
                            </View>
                        )}
                    </View>
                </View>

                {/* Info Note - Hide if Approved */}
                {(item.status !== 'Approved' && item.status !== 'تم الموافقة على الطلب') ? (
                    <View style={styles.infoBox}>
                        <MaterialIcons name="info-outline" size={14} color={COLORS.textSub} style={{ marginTop: 2 }} />
                        <Text style={styles.infoBoxText}>
                            يستغرق وقت الموافقة على الطلب من 24 ساعة حتى 72 ساعة
                        </Text>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.paymentButton}
                        onPress={() => navigation.navigate('UserInvoices', { highlightOrderId: item.id, filterStatus: 'Pending' })}
                    >
                        <Text style={styles.paymentButtonText}>الانتقال الى الدفع</Text>
                        <MaterialIcons name="arrow-back" size={16} color="#000" style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                )}

                <View style={styles.divider} />

                {/* Footer: Price and Provider */}
                <View style={styles.cardFooter}>
                    <View style={styles.priceContainer}>
                        <Text style={styles.priceValue}>
                            {typeof item.totalPrice === 'number' ? item.totalPrice.toLocaleString() : item.totalPrice}
                            <Text style={styles.currency}> ر.س</Text>
                        </Text>
                    </View>
                    <View style={styles.providerContainer}>
                        <MaterialIcons name="domain" size={16} color={COLORS.textSub} />
                        <Text style={styles.providerName}>{item.provider || 'مقدم خدمة'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="rgba(249, 250, 251, 0.9)" />
            {/* Custom Header matching design */}
            <View style={styles.header}>
                <SafeAreaView edges={['top']} style={{ width: '100%' }}>
                    <View style={styles.headerRow}>
                        <TouchableOpacity style={styles.themeToggle}>
                            <MaterialIcons name="brightness-4" size={20} color={COLORS.textSub} />
                        </TouchableOpacity>
                        <Text style={styles.screenTitle}>طلباتي</Text>
                    </View>
                </SafeAreaView>
            </View>

            {myOrders.length === 0 ? (
                <View style={styles.emptyState}>
                    <MaterialIcons name="receipt-long" size={64} color="#e5e7eb" />
                    <Text style={styles.emptyText}>لا توجد طلبات حالياً</Text>
                </View>
            ) : (
                <FlatList
                    data={myOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Bottom Nav - Shared Component */}
            <BottomTabNavigator activeTab="Orders" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: 'rgba(249, 250, 251, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        paddingHorizontal: 20,
        paddingBottom: 16,
        zIndex: 10,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
    },
    screenTitle: {
        fontSize: 28,
        fontWeight: '800', // heavy weight like extrabold
        color: COLORS.textMain,
    },
    themeToggle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#E5E7EB', // gray-200
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContent: {
        padding: 20,
        paddingBottom: 100, // Space for bottom nav
    },
    orderCard: {
        backgroundColor: COLORS.cardLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        // tailored soft shadow
        shadowColor: 'rgba(0, 0, 0, 0.05)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 20,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    idDateContainer: {
        alignItems: 'flex-end',
    },
    orderId: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textMain,
        letterSpacing: 0.5,
    },
    orderDate: {
        fontSize: 12,
        color: COLORS.textSub,
        marginTop: 2,
        fontWeight: '500',
    },
    cardMain: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginBottom: 16,
    },
    itemInfo: {
        flex: 1,
        alignItems: 'flex-start', // Align text to right (RTL default? or left per code? Assuming RTL logic layout)
        // Since React Native is LTR by default unless configured, we might need manual alignment if RTL isn't forced.
        // The design screenshot seems to imply RTL base. Flex-start in RTL is right.
        // Assuming the app is RTL enabled or we layout manually. 
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textMain,
        marginBottom: 4,
        textAlign: 'right',
    },
    itemSubtitle: {
        fontSize: 14,
        color: COLORS.textSub,
        textAlign: 'right',
    },
    imageWrapper: {
        width: 64,
        height: 64,
        borderRadius: 12,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    infoBox: {
        backgroundColor: '#F9FAFB', // gray-50
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB', // gray-200
        borderStyle: 'dashed',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 6,
    },
    infoBoxText: {
        fontSize: 12,
        color: COLORS.textSub,
        lineHeight: 18,
        flex: 1,
        textAlign: 'right', // Align for Arabic
    },
    divider: {
        height: 1,
        backgroundColor: '#F3F4F6', // gray-100
        marginBottom: 16,
        width: '100%',
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceContainer: {
        // Left side
    },
    priceValue: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.textMain,
    },
    currency: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textSub,
    },
    providerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    providerName: {
        fontSize: 12, // sm/xs in tailwind
        fontWeight: '500',
        color: COLORS.textSub,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        marginTop: 100,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textSub,
    },
    paymentButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    paymentButtonText: {
        color: '#000000',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
