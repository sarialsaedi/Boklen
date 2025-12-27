import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    success: '#22c55e',
    successBg: '#dcfce7',
    warning: '#f97316',
    warningBg: '#ffedd5',
    error: '#ef4444',
    errorBg: '#fee2e2',
};

// Mock Data
const INITIAL_INVOICES = [
    {
        id: '1',
        month: 'أكتوبر 2023',
        items: [
            {
                id: 'inv-1',
                title: 'حفارة كاتربيلر 320',
                orderNo: '#ORD-2023-8842',
                status: 'paid', // paid, pending, cancelled
                date: '24 أكتوبر، 2023',
                amount: '2,450 ر.س',
            },
            {
                id: 'inv-2',
                title: 'رافعة شوكية تويوتا',
                orderNo: '#ORD-2023-8801',
                status: 'paid',
                date: '18 أكتوبر، 2023',
                amount: '1,200 ر.س',
            }
        ]
    },
    {
        id: '2',
        month: 'سبتمبر 2023',
        items: [
            {
                id: 'inv-3',
                title: 'بلدوزر كوماتسو D155',
                orderNo: '#ORD-2023-7922',
                status: 'cancelled',
                date: '28 سبتمبر، 2023',
                amount: '5,600 ر.س',
            },
            {
                id: 'inv-4',
                title: 'تأجير معدات متعددة',
                orderNo: '#ORD-2023-7550',
                status: 'pending',
                date: '15 سبتمبر، 2023',
                amount: '12,800 ر.س',
            }
        ]
    }
];

export default function UserInvoicesScreen({ navigation }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [invoices, setInvoices] = useState(INITIAL_INVOICES);

    const handlePaymentSuccess = (invoiceId) => {
        setInvoices(currentInvoices =>
            currentInvoices.map(group => ({
                ...group,
                items: group.items.map(item =>
                    item.id === invoiceId
                        ? { ...item, status: 'paid' }
                        : item
                )
            }))
        );
    };

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'paid':
                return (
                    <View style={[styles.badge, { backgroundColor: COLORS.successBg }]}>
                        <Text style={[styles.badgeText, { color: COLORS.success }]}>مدفوعة</Text>
                    </View>
                );
            case 'pending':
                return (
                    <View style={[styles.badge, { backgroundColor: COLORS.warningBg }]}>
                        <Text style={[styles.badgeText, { color: COLORS.warning }]}>بانتظار الدفع</Text>
                    </View>
                );
            case 'cancelled':
                return (
                    <View style={[styles.badge, { backgroundColor: '#f1f5f9' }]}>
                        <Text style={[styles.badgeText, { color: '#475569' }]}>ملغاة</Text>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView edges={['top']} style={styles.headerSafeArea}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textGray} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>الفواتير</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={styles.searchContainer}>
                    <View style={styles.searchWrapper}>
                        <MaterialIcons name="search" size={20} color={COLORS.textGray} style={styles.searchIcon} />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="بحث برقم الطلب أو التاريخ..."
                            placeholderTextColor={COLORS.textGray}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            textAlign="right"
                        />
                    </View>
                </View>
            </SafeAreaView>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {invoices.map((group) => {
                    const filteredItems = group.items.filter(item =>
                        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        String(item.amount).toLowerCase().includes(searchQuery.toLowerCase())
                    );

                    if (filteredItems.length === 0) return null;

                    return (
                        <View key={group.id} style={styles.groupContainer}>
                            <View style={styles.monthHeader}>
                                <Text style={styles.monthText}>{group.month}</Text>
                                <View style={styles.monthDivider} />
                            </View>

                            {filteredItems.map((item) => (
                                <View key={item.id} style={styles.card}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.cardHeaderLeft}>
                                            <View style={styles.iconContainer}>
                                                <MaterialIcons name="receipt" size={24} color={COLORS.primary} />
                                            </View>
                                            <View>
                                                <Text style={styles.itemTitle}>{item.title}</Text>
                                                <Text style={styles.orderNo}>طلب رقم {item.orderNo}</Text>
                                            </View>
                                        </View>
                                        {renderStatusBadge(item.status)}
                                    </View>

                                    <View style={styles.cardDetails}>
                                        <View>
                                            <Text style={styles.detailLabel}>تاريخ الفاتورة</Text>
                                            <Text style={styles.detailValue}>{item.date}</Text>
                                        </View>
                                        <View style={{ alignItems: 'flex-start' }}>
                                            <Text style={styles.detailLabel}>المبلغ الإجمالي</Text>
                                            <Text style={[
                                                styles.detailValue,
                                                { fontWeight: 'bold' },
                                                item.status === 'cancelled' && { textDecorationLine: 'line-through', color: COLORS.textGray },
                                                item.status === 'pending' && { color: COLORS.warning }
                                            ]}>
                                                {item.amount}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={styles.cardActions}>
                                        {item.status === 'pending' ? (
                                            <TouchableOpacity
                                                style={[styles.actionButton, styles.payButton]}
                                                onPress={() => navigation.navigate('InvoiceDetails', {
                                                    invoice: item,
                                                    mode: 'payment',
                                                    onPaymentSuccess: () => handlePaymentSuccess(item.id)
                                                })}
                                            >
                                                <MaterialIcons name="payments" size={18} color="#000" />
                                                <Text style={styles.payButtonText}>ادفع الآن</Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('InvoiceDetails', { invoice: item })}>
                                                <MaterialIcons name="visibility" size={18} color={COLORS.textDark} />
                                                <Text style={styles.actionButtonText}>عرض</Text>
                                            </TouchableOpacity>
                                        )}

                                        <TouchableOpacity style={[styles.actionButton, { flex: 0, width: 40, borderLeftWidth: 1, borderColor: '#f1f5f9' }]}>
                                            <MaterialIcons name="download" size={18} color={COLORS.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    headerSafeArea: {
        backgroundColor: 'rgba(248, 248, 246, 0.95)',
        zIndex: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    searchContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    searchWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        height: 50, // Slightly increased height
    },
    searchIcon: {
        marginLeft: 8,
    },
    searchInput: {
        flex: 1,
        height: '100%',
        fontSize: 14,
        color: COLORS.textDark,
        paddingRight: 8,
        textAlign: 'right',
        textAlignVertical: 'center', // Android fix
        paddingVertical: 0, // Remove default padding
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 40,
    },
    groupContainer: {
        marginBottom: 24,
    },
    monthHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    monthText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textGray,
    },
    monthDivider: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        gap: 12,
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(230, 194, 23, 0.1)', // primary/10 roughly
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 14, // slightly smaller than 16 to fit better if long
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 2,
        maxWidth: 200,
    },
    orderNo: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 12,
        marginTop: 4,
    },
    detailLabel: {
        fontSize: 10,
        color: COLORS.textGray,
        marginBottom: 2,
        textAlign: 'left',
    },
    detailValue: {
        fontSize: 12, // Reduced from 14/16 so it's not too huge
        fontWeight: '500',
        color: COLORS.textDark,
        textAlign: 'left',
    },
    cardActions: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        backgroundColor: '#f8fafc',
        paddingVertical: 10,
        borderRadius: 8,
    },
    actionButtonText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    payButton: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    payButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
    },
});
