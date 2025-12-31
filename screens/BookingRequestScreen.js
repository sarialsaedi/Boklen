import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8fafc',
    surfaceLight: '#ffffff',
    textDark: '#0f172a',
    textGray: '#64748b',
    red: '#ef4444',
    border: '#e2e8f0',
};

export default function BookingRequestScreen({ navigation }) {
    const [duration, setDuration] = useState(3);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name="arrow-forward-ios" size={20} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تأكيد حجز معدة</Text>
                <TouchableOpacity>
                    <Text style={styles.cancelButton}>إلغاء</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Machine Summary Card */}
                <View style={styles.machineCard}>
                    <Image
                        source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBE6n2ek-VYjYVILTvp7gByi26LDlLKzYXEyMgkP4XcNMD_Xz2upd9lPKJYbTeeBRlg2deBy5vglMX-5dm94VW4hz02tBZ_f6U9cQXtPAX9GdgWBLUOB0glPFj2rXCa-dWH_MyercmOI0fzvQz2xQ18_JmB7NzeI0NDW4RW6MmAzRdUS0tAjARj7Z-onMf2JfvIXyg6a-oMEI1D7-yaknXB5Xa2soPekinPrlHdvTMkefEY5ocG3Xq8J8GU7F-fEEAMgkKKYAlxoY1e' }}
                        style={styles.machineImage}
                    />
                    <View style={styles.machineInfo}>
                        <Text style={styles.machineName}>حفار هيدروليكي - CAT 320</Text>
                        <View style={styles.supplierRow}>
                            <MaterialIcons name="business" size={14} color={COLORS.textGray} />
                            <Text style={styles.supplierName}>المورد: شركة المعدات الثقيلة المحدودة</Text>
                        </View>
                        <View style={styles.priceRow}>
                            <View style={styles.tag}>
                                <Text style={styles.tagText}>إيجار يومي</Text>
                            </View>
                            <Text style={styles.price}>
                                1,200 ر.س <Text style={styles.priceUnit}>/ يوم</Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Booking Details Section */}
                <View style={styles.sectionHeader}>
                    <MaterialIcons name="edit-calendar" size={24} color={COLORS.primary} />
                    <Text style={styles.sectionTitle}>تفاصيل الحجز</Text>
                </View>

                <View style={styles.formCard}>
                    {/* Start Date */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>تاريخ بدء العمل</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                value="25 أكتوبر 2023"
                                editable={false}
                            />
                            <MaterialIcons name="calendar-today" size={24} color={COLORS.primary} style={styles.inputIcon} />
                        </View>
                    </View>

                    {/* Duration */}
                    <View style={styles.inputGroup}>
                        <View style={styles.labelRow}>
                            <Text style={styles.label}>مدة الإيجار</Text>
                            <View style={styles.durationBadge}>
                                <Text style={styles.durationBadgeText}>بالأيام</Text>
                            </View>
                        </View>
                        <View style={styles.durationWrapper}>
                            <TouchableOpacity
                                style={styles.counterButton}
                                onPress={() => setDuration(Math.max(1, duration - 1))}
                            >
                                <MaterialIcons name="remove" size={24} color={COLORS.textGray} />
                            </TouchableOpacity>
                            <Text style={styles.durationValue}>{duration}</Text>
                            <TouchableOpacity
                                style={[styles.counterButton, { backgroundColor: 'rgba(230, 194, 23, 0.1)' }]}
                                onPress={() => setDuration(duration + 1)}
                            >
                                <MaterialIcons name="add" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Location */}
                    <View style={styles.inputGroup}>
                        <Text style={[styles.label, { marginTop: 8 }]}>عنوان موقع العمل</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="المدينة، الحي، اسم الشارع..."
                                value="الرياض، حي الملقا، طريق الأمير محمد بن سعد"
                            />
                            <MaterialIcons name="location-on" size={24} color={COLORS.textGray} style={styles.inputIcon} />
                        </View>
                        <Text style={styles.helperText}>يرجى التأكد من أن الموقع مناسب لدخول المعدات الثقيلة.</Text>
                    </View>
                </View>

                {/* Cost Summary */}
                <View style={styles.costSummary}>
                    <View style={styles.summaryHeader}>
                        <MaterialIcons name="receipt-long" size={24} color="#E6C217" />
                        <Text style={styles.summaryTitle}>ملخص التكلفة</Text>
                    </View>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>سعر اليوم</Text>
                        <Text style={styles.costValue}>1,200 ر.س</Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>المدة</Text>
                        <Text style={styles.costValue}>{duration} أيام</Text>
                    </View>
                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>ضريبة القيمة المضافة (15%)</Text>
                        <Text style={styles.costValue}>540 ر.س</Text>
                    </View>

                    <View style={styles.costDivider} />

                    <View style={styles.totalRow}>
                        <View>
                            <Text style={styles.totalLabel}>الإجمالي التقديري</Text>
                            <Text style={styles.paymentNote}>الدفع عند الوصول أو التحويل البنكي</Text>
                        </View>
                        <Text style={styles.totalValue}>4,140 ر.س</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <View style={styles.infoBox}>
                    <MaterialIcons name="info" size={20} color={COLORS.primary} />
                    <Text style={styles.infoText}>سيقوم مزود الخدمة بالتواصل معك لتأكيد توفر المعدة قبل اعتماد الطلب.</Text>
                </View>
                <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => navigation.navigate('BookingReview')}
                >
                    <Text style={styles.confirmButtonText}>إرسال طلب الحجز</Text>
                    <MaterialIcons name="arrow-back" size={24} color="white" />
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
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        flex: 1,
        textAlign: 'center',
    },
    cancelButton: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 24,
    },
    machineCard: {
        flexDirection: 'row',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    machineImage: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
    },
    machineInfo: {
        flex: 1,
        marginLeft: 12,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    machineName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
        textAlign: 'right',
    },
    supplierRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    supplierName: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tag: {
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 12,
        color: '#947d03',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    priceUnit: {
        fontSize: 12,
        fontWeight: 'normal',
        color: COLORS.textGray,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    formCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'right',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        height: 54,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
    },
    inputIcon: {
        marginLeft: 12,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    durationBadge: {
        backgroundColor: '#f1f5f9',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 12,
    },
    durationBadgeText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    durationWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        height: 54,
        paddingHorizontal: 8,
    },
    counterButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: '#e2e8f0',
    },
    durationValue: {
        flex: 1,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: COLORS.border,
        marginVertical: 4,
    },
    helperText: {
        fontSize: 12,
        color: COLORS.textGray,
        marginTop: 6,
        textAlign: 'right',
    },
    costSummary: {
        backgroundColor: 'rgba(230, 194, 23, 0.05)',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(230, 194, 23, 0.2)',
    },
    summaryHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },
    summaryTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    costDivider: {
        height: 1,
        backgroundColor: 'rgba(230, 194, 23, 0.3)',
        marginVertical: 12,
        borderStyle: 'dashed',
        borderWidth: 0.5,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
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
        textAlign: 'right',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 4,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#f8fafc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
        gap: 8,
    },
    infoText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.textGray,
        lineHeight: 18,
        textAlign: 'right',
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});
