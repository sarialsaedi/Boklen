
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Platform, Alert } from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Standardized Color Palette
const COLORS = {
    primary: '#E6C217',      // Theme Yellow
    background: '#F5F5F5',   // Light Grey Screen BG
    card: '#FFFFFF',         // White Card BG
    textDark: '#1a1a1a',     // Dark text
    textGray: '#666666',     // Light text
    textYellow: '#E6C217',   // Yellow text for Headers
    border: '#E5E5E5',
    sectionBg: '#FFFBEB',    // Light Beige for Address/Table Headers
    success: '#22C55E',      // Green
    warning: '#F97316',      // Orange
    error: '#DC2626',        // Red
};

const InvoiceDetailsScreen = ({ route }) => {
    const navigation = useNavigation();
    const { invoice, mode, onPaymentSuccess, status: paramStatus } = route.params || {};

    useEffect(() => {
        if (route.params?.autoDownload) {
            // Simulate a short delay for "processing"
            setTimeout(() => {
                Alert.alert("نجاح", "تم تحميل الصورة الى ألبوم الصور");
            }, 800);
        }
    }, [route.params]);

    const status = paramStatus || invoice?.status;
    const isCanceled = status === 'Canceled' || status === 'ملغاة';
    const isPaymentMode = mode === 'payment';

    // Data - Merging props with fallbacks
    // Note: invoice.amount is a string like "2,450 ر.س", so we use it directly or parse if needed.
    const invoiceData = {
        totalAmount: invoice?.amount || '2,450 ر.س',
        invoiceDate: invoice?.date || '24 أكتوبر، 2023',
        invoiceNo: invoice?.items?.[0]?.orderNo || invoice?.orderNo || 'INV-001', // Fallback

        supplierName: 'مؤسسة البناء الحديث للمقاولات',
        vatNumber: '34483723300003',
        additionalId: '77283921',
        orderNumber: invoice?.orderNo || 'ORD-2023-8842',

        address: {
            building: '2394',
            street: 'طريق الملك فهد',
            district: 'المحمدية',
            city: 'الرياض',
        },

        items: [
            {
                name: invoice?.title || 'حفارة كاتربيلر 320',
                qty: 1,
                unit: 'يوم',
                price: invoice?.amount ? (parseFloat(invoice.amount.replace(/[^0-9.]/g, '')) * 0.87).toFixed(2) + ' ر.س' : '2,130.43 ر.س' // quick calc logic or mockup
            }
        ],
        financials: {
            taxableData: invoice?.amount ? (parseFloat(invoice.amount.replace(/[^0-9.]/g, '')) * 0.87).toFixed(2) + ' ر.س' : '2,130.43 ر.س',
            vatAmount: invoice?.amount ? (parseFloat(invoice.amount.replace(/[^0-9.]/g, '')) * 0.13).toFixed(2) + ' ر.س' : '+ 319.57 ر.س',
            total: invoice?.amount || '2,450.00 ر.س',
        }
    };

    const handlePayment = () => {
        Alert.alert(
            "Apple Pay",
            `Confirm payment of ${invoiceData.totalAmount} to Boklen?`,
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Pay with Face ID",
                    onPress: () => {
                        Alert.alert("Payment Successful", "Your payment has been processed successfully.");
                        if (onPaymentSuccess) {
                            onPaymentSuccess();
                        }
                        navigation.goBack();
                    }
                }
            ]
        );
    };

    const handleDownloadPDF = () => {
        // 4. Constraint: Ignore if canceled
        if (invoice?.status === 'canceled' || invoice?.status === 'Canceled') {
            return;
        }

        // 2. Implement Logic (Simulation)
        Alert.alert(
            "تم التحميل",
            "تم حفظ نسخة من الفاتورة بنجاح في ملفاتك (PDF).",
            [{ text: "حسنًا" }]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Top Navigation */}
            <View style={styles.navHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.screenTitle}>تفاصيل الفاتورة</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>

                {isCanceled && (
                    <View style={{ backgroundColor: '#FFEBEE', padding: 12, borderRadius: 8, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: '#D32F2F' }}>
                        <Text style={{ color: '#D32F2F', fontWeight: 'bold', textAlign: 'left' }}>
                            تم إلغاء هذا الطلب ولا توجد مبالغ مستحقة
                        </Text>
                    </View>
                )}

                {/* --- CARD 1: HEADER & TOTAL --- */}
                <View style={styles.card}>
                    {/* Top Row: User/Status Badge for context (Optional) or just Status */}
                    <View style={styles.cardHeaderRow}>
                        {isCanceled ? (
                            <View style={[styles.statusBadge, { backgroundColor: '#FFEBEE' }]}>
                                <Text style={[styles.statusText, { color: '#D32F2F' }]}>ملغاة</Text>
                            </View>
                        ) : (
                            <View style={styles.statusBadge}>
                                {invoice?.status === 'paid' ?
                                    <Text style={styles.statusText}>مدفوعة</Text> :
                                    <Text style={[styles.statusText, { color: COLORS.warning }]}>بانتظار الدفع</Text>
                                }
                            </View>
                        )}
                    </View>

                    {/* Main Amount */}
                    <View style={styles.amountContainer}>
                        <Text style={styles.totalLabelSmall}>المبلغ الكلي</Text>
                        <Text style={[styles.totalAmountLarge, isCanceled && { color: '#808080' }]}>{invoiceData.totalAmount}</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Info Rows */}
                    <View style={styles.infoRow}>
                        <Text style={styles.infoValue}>{invoiceData.invoiceNo}</Text>
                        <Text style={styles.infoLabel}>رقم الفاتورة</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoValue}>{invoiceData.invoiceDate}</Text>
                        <Text style={styles.infoLabel}>تاريخ الإصدار</Text>
                    </View>
                </View>

                {/* --- CARD 2: SUPPLIER DETAILS --- */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>تفاصيل المورد</Text>

                    <View style={styles.infoRowAlt}>
                        <Text style={styles.infoValue}>{invoiceData.supplierName}</Text>
                        <Text style={styles.infoLabel}>الاسم</Text>
                    </View>
                    <View style={styles.infoRowAlt}>
                        <Text style={styles.infoValue}>{invoiceData.vatNumber}</Text>
                        <Text style={styles.infoLabel}>الرقم الضريبي</Text>
                    </View>
                    <View style={styles.infoRowAlt}>
                        <Text style={styles.infoValue}>{invoiceData.additionalId}</Text>
                        <Text style={styles.infoLabel}>رقم المعرف</Text>
                    </View>
                    <View style={styles.infoRowAlt}>
                        <Text style={styles.infoValue}>{invoiceData.orderNumber}</Text>
                        <Text style={styles.infoLabel}>رقم الطلب</Text>
                    </View>
                </View>

                {/* --- CARD 3: ADDRESS & DOWNLOAD --- */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>عنوان المورد</Text>

                    <View style={styles.addressBox}>
                        <Text style={styles.addressText}>
                            {invoiceData.address.building} {invoiceData.address.street}
                        </Text>
                        <Text style={styles.addressText}>
                            {invoiceData.address.district}، {invoiceData.address.city}
                        </Text>
                    </View>


                </View>

                {/* --- CARD 4: SERVICES BREAKDOWN --- */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>تفاصيل الخدمة</Text>

                    {/* Table Header */}
                    <View style={styles.tableHeader}>
                        <Text style={[styles.th, { flex: 2, textAlign: 'right' }]}>الوصف</Text>
                        <Text style={[styles.th, { flex: 1, textAlign: 'center' }]}>الكمية</Text>
                        <Text style={[styles.th, { flex: 1, textAlign: 'left' }]}>الإجمالي</Text>
                    </View>

                    {/* List */}
                    {invoiceData.items.map((item, index) => (
                        <View key={index} style={styles.tableRow}>
                            <Text style={[styles.td, { flex: 2, textAlign: 'right', fontWeight: '500' }]}>{item.name}</Text>
                            <Text style={[styles.td, { flex: 1, textAlign: 'center' }]}>{item.qty} {item.unit}</Text>
                            <Text style={[styles.tdPrice, { flex: 1, textAlign: 'left' }]}>{item.price}</Text>
                        </View>
                    ))}

                    <View style={styles.divider} />

                    {/* Footer Summary */}
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryValue}>{invoiceData.financials.taxableData}</Text>
                        <Text style={styles.summaryLabel}>المبلغ الخاضع للضريبة</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={[styles.summaryValue, { color: COLORS.error }]}>{invoiceData.financials.vatAmount}</Text>
                        <Text style={styles.summaryLabel}>ضريبة القيمة المضافة (15%)</Text>
                    </View>

                    <View style={[styles.summaryRow, { marginTop: 8 }]}>
                        <Text style={styles.grandTotalValue}>{invoiceData.financials.total}</Text>
                        <Text style={styles.grandTotalLabel}>المبلغ الإجمالي</Text>
                    </View>
                </View>

                {/* --- CARD 5: DOWNLOAD BUTTON --- */}
                <View style={styles.bottomCard}>
                    {/* Action Button: Payment OR Download */}
                    {isCanceled ? (
                        <View style={[styles.primaryButton, { backgroundColor: '#E0E0E0' }]}>
                            <Text style={[styles.primaryButtonText, { color: '#757575' }]}>الفاتورة ملغاة</Text>
                        </View>
                    ) : isPaymentMode ? (
                        <TouchableOpacity style={styles.primaryButton} onPress={handlePayment}>
                            <Text style={styles.primaryButtonText}>موافق والإكمال للدفع</Text>
                            <MaterialIcons name="arrow-back" size={20} color="#000" style={{ transform: [{ rotate: '180deg' }] }} />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.primaryButton,
                                (invoice?.status === 'canceled' || invoice?.status === 'Canceled') && { backgroundColor: COLORS.border, opacity: 0.6 }
                            ]}
                            onPress={handleDownloadPDF}
                            disabled={invoice?.status === 'canceled' || invoice?.status === 'Canceled'}
                        >
                            <Text style={[
                                styles.primaryButtonText,
                                (invoice?.status === 'canceled' || invoice?.status === 'Canceled') && { color: COLORS.textGray }
                            ]}>تحميل الفاتورة PDF</Text>
                            <MaterialIcons name="download" size={20} color={(invoice?.status === 'canceled' || invoice?.status === 'Canceled') ? COLORS.textGray : "#000"} />
                        </TouchableOpacity>
                    )}
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // #F5F5F5
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    navHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLORS.background,
    },
    backButton: {
        padding: 4,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        // Soft Shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 3,
    },
    // Card 1
    cardHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start', // Badge on the left/start in RTL? or right? Design says Top Right. 
        // In RN RTL, flex-start is right. 
        marginBottom: 8,
    },
    statusBadge: {
        backgroundColor: '#FEF9C3', // Light yellow
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#CA8A04', // Darker yellow/gold
    },
    amountContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    totalLabelSmall: {
        fontSize: 14,
        color: COLORS.textGray,
        marginBottom: 4,
    },
    totalAmountLarge: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary, // #E6C217
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'left', // Ensure values align correctly in RTL
    },
    // Card 2 & 3 Headers
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 12,
        textTransform: 'uppercase', // Works for English, no effect on Arabic
        textAlign: 'left', // Align to start
    },
    infoRowAlt: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        alignItems: 'center',
    },
    addressBox: {
        backgroundColor: COLORS.sectionBg, // #FFFBEB
        padding: 12,
        borderRadius: 8,
    },
    addressText: {
        fontSize: 14,
        color: COLORS.textDark,
        lineHeight: 22,
        textAlign: 'left',
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    // Card 4
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: COLORS.sectionBg,
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 6,
        marginBottom: 8,
    },
    th: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textGray,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
        alignItems: 'center',
    },
    td: {
        fontSize: 13,
        color: COLORS.textDark,
    },
    tdPrice: {
        fontSize: 13,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    summaryLabel: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    grandTotalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    grandTotalValue: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.primary,
    },
    bottomCard: {
        backgroundColor: COLORS.card,
        borderRadius: 16,
        padding: 20,
        marginHorizontal: 16,
        marginBottom: 30,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default InvoiceDetailsScreen;
