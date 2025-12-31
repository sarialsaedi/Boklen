import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f5',
    surfaceLight: '#ffffff',
    textDark: '#1c190d',
    textGray: '#66645d',
    border: '#e6e4db',
};

export default function BookingReviewScreen({ navigation }) {
    const { addOrder } = useCart();

    const handleConfirm = async () => {
        // In a real app, calculate total from cartItems
        const orderId = addOrder({
            totalPrice: 14375, // Static for now matching UI
        });

        navigation.navigate('BookingConfirmation', { orderId });
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>مراجعة الطلب</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Stepper */}
            <View style={styles.stepperContainer}>
                <View style={styles.stepperDots}>
                    <View style={[styles.dot, styles.dotInactive]} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={[styles.dot, styles.dotInactive]} />
                </View>
                <View style={styles.stepperLabels}>
                    <Text style={styles.stepLabel}>الآلة</Text>
                    <Text style={[styles.stepLabel, styles.stepLabelActive]}>المراجعة</Text>
                    <Text style={styles.stepLabel}>الدفع</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Machine Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>تفاصيل الآلة</Text>
                    <View style={styles.machineCard}>
                        <View style={styles.machineInfo}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>حفارة زحافة</Text>
                            </View>
                            <Text style={styles.machineName}>Komatsu PC200-8</Text>
                            <Text style={styles.machineQuantity}>الكمية: 2</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpsCGC6QJUgNXarMozx0SSMXIZq0avq_err-D6UIGqiItjuptDpf44tprOdeD8AI-rDVH8ZRUMQVwVJ81KTj0EAMCxJ3lZTEmInDgjELAlKfhCLJVOFrFrh2HQxAs5844U2Y5fSPGMuae3YICP_dxZT4HuhBZMjHGwipSr95W7uWuK97v8rTXztDTLz8GBBXSxmVLWkUslIpgMnTeRB6dtXD3oRg9csXnkZs6IQUAIoeLkVSeWsjdChbHDaI0fcf7pq51re0Yp8MLF' }}
                            style={styles.machineImage}
                        />
                    </View>
                </View>

                {/* Booking Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>معلومات الحجز</Text>
                    <View style={styles.infoCard}>
                        {/* Date */}
                        <View style={styles.infoRow}>
                            <View style={styles.iconBox}>
                                <MaterialIcons name="calendar-today" size={20} color="#E6C217" />
                            </View>
                            <View style={styles.infoContent}>
                                <Text style={styles.infoLabel}>فترة الإيجار (3 أيام)</Text>
                                <View style={styles.dateRange}>
                                    <Text style={styles.dateText}>12 أكتوبر 2023</Text>
                                    <MaterialIcons name="arrow-back" size={12} color={COLORS.textGray} />
                                    <Text style={styles.dateText}>15 أكتوبر 2023</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Location */}
                        <View style={styles.infoRow}>
                            <View style={styles.iconBox}>
                                <MaterialIcons name="location-on" size={20} color="#E6C217" />
                            </View>
                            <View style={[styles.infoContent, { flex: 1 }]}>
                                <Text style={styles.infoLabel}>موقع التسليم</Text>
                                <Text style={styles.locationText}>الرياض، حي الملك عبد الله، شارع العروبة، موقع البناء رقم 4</Text>
                            </View>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDNbh_zWPi6q4cMekPvE8HihIRTx6uS2k-K-AwgJCn6yyJxJF3eqnUDjZHWdLpcnPIQ-F5zWHf8T8r7roVGKobUmBK5l465VKz2j3v5X90f_4RjJ_2BMGc_nwO9-HNG4PNtHSlhLLvAFIfHX3B0XLQUMOxGrs96Wiiks65s6CZpIWVCVs4M3a7p8pL-j9ta0JzWA2j2lieg6ndw0FDjottgrf0PV1zuXFLd3pDWNjHWLLo2T5UEOGwmbIpZtiWrVVJU0GQJ3tEDxj6L' }}
                                style={styles.mapThumb}
                            />
                        </View>
                    </View>
                </View>

                {/* Cost Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ملخص التكلفة</Text>
                    <View style={styles.costCard}>
                        <View style={styles.costItem}>
                            <Text style={styles.costLabel}>سعر الإيجار (يومي)</Text>
                            <Text style={styles.costValue}>2,000 ر.س</Text>
                        </View>
                        <View style={styles.costItem}>
                            <Text style={styles.costLabel}>المدة (3 أيام × 2 آلة)</Text>
                            <Text style={styles.costValue}>12,000 ر.س</Text>
                        </View>
                        <View style={styles.costItem}>
                            <Text style={styles.costLabel}>رسوم التوصيل والتحميل</Text>
                            <Text style={styles.costValue}>500 ر.س</Text>
                        </View>
                        <View style={[styles.costItem, { marginBottom: 16 }]}>
                            <Text style={styles.costLabel}>ضريبة القيمة المضافة (15%)</Text>
                            <Text style={[styles.costValue, { color: '#E6C217' }]}>1,875 ر.س</Text>
                        </View>

                        <View style={styles.totalDivider} />

                        <View style={styles.totalRow}>
                            <View>
                                <Text style={styles.totalLabel}>إجمالي السعر التقديري</Text>
                                <Text style={styles.paymentNote}>الدفع عند الاستلام أو تحويل بنكي</Text>
                            </View>
                            <Text style={styles.totalAmount}>
                                14,375 <Text style={styles.currency}>ر.س</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.trustBadge}>
                        <MaterialIcons name="verified-user" size={16} color={COLORS.textGray} />
                        <Text style={styles.trustText}>لن يتم خصم أي مبلغ الآن. الدفع يتم بعد تأكيد توفر الآلة.</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>تعديل</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={handleConfirm}
                >
                    <Text style={styles.confirmButtonText}>تأكيد الحجز</Text>
                    <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: COLORS.backgroundLight,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.05)',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    stepperContainer: {
        alignItems: 'center',
        paddingBottom: 16,
        backgroundColor: COLORS.backgroundLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        zIndex: 1,
    },
    stepperDots: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
    },
    dot: {
        height: 8,
        width: 64,
        borderRadius: 4,
    },
    dotActive: {
        backgroundColor: COLORS.primary,
    },
    dotInactive: {
        backgroundColor: '#e8e4ce',
    },
    stepperLabels: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
        paddingHorizontal: 24,
    },
    stepLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    stepLabelActive: {
        color: '#947d03', // Darker primary for text
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 12,
        paddingHorizontal: 4,
        textAlign: 'right',
    },
    machineCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    machineInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    tag: {
        backgroundColor: 'rgba(230, 194, 23, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 10,
        fontWeight: '500',
        color: '#947d03',
    },
    machineName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
        textAlign: 'right',
    },
    machineQuantity: {
        fontSize: 12,
        color: COLORS.textGray,
        textAlign: 'right',
    },
    machineImage: {
        width: 112,
        height: 96,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
    },
    infoCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
        overflow: 'hidden',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 16,
        gap: 12,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContent: {
        alignItems: 'flex-start',
    },
    infoLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
        marginBottom: 4,
    },
    dateRange: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    dateText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        marginHorizontal: 16,
    },
    locationText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
        lineHeight: 20,
        textAlign: 'right',
    },
    mapThumb: {
        width: 48,
        height: 48,
        borderRadius: 8,
        backgroundColor: '#e2e8f0',
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    costCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    costItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    costLabel: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    costValue: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    totalDivider: {
        height: 1,
        backgroundColor: '#e2e8f0',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 16,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    paymentNote: {
        fontSize: 11,
        color: COLORS.textGray,
        marginTop: 4,
        textAlign: 'right',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    currency: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    trustBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 8,
        marginTop: 12,
    },
    trustText: {
        fontSize: 11,
        color: COLORS.textGray,
    },
    footer: {
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        flexDirection: 'row',
        gap: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
    },
    editButton: {
        flex: 1,
        height: 54,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    editButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    confirmButton: {
        flex: 2.5,
        height: 54,
        borderRadius: 8,
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    confirmButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
});
