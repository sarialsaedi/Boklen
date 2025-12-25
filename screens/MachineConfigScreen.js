import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, Modal, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#ecc813',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#5c5a4d',
    border: '#e6e4db',
    primaryContent: '#1b190d',
};

export default function MachineConfigScreen({ navigation, route }) {
    const { machine } = route.params || {};
    const { addToCart } = useCart();
    const [rentalType, setRentalType] = useState('daily'); // 'trip', 'daily', 'monthly'
    const [driverOption, setDriverOption] = useState('with_driver');
    const [quantity, setQuantity] = useState(1);
    const [notes, setNotes] = useState('');

    // Calendar State
    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const onDayPress = (day) => {
        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
        } else if (startDate && !endDate) {
            if (day.dateString < startDate) {
                setStartDate(day.dateString);
            } else {
                setEndDate(day.dateString);
            }
        }
    };

    const handleRentalTypeSelect = (type) => {
        setRentalType(type);
        if (type === 'daily' || type === 'monthly') {
            setCalendarVisible(true);
        }
    };

    const getMarkedDates = () => {
        const marked = {};
        if (startDate) {
            marked[startDate] = { startingDay: true, color: COLORS.primary, textColor: 'white' };
            if (endDate) {
                let start = new Date(startDate);
                let end = new Date(endDate);
                while (start < end) {
                    start.setDate(start.getDate() + 1);
                    const dateStr = start.toISOString().split('T')[0];
                    if (dateStr === endDate) break;
                    marked[dateStr] = { color: 'rgba(236, 200, 19, 0.4)', textColor: 'black' };
                }
                marked[endDate] = { endingDay: true, color: COLORS.primary, textColor: 'white' };
            }
        }
        return marked;
    };

    // Pricing Calculations for "Per Load" (trip)
    const BASE_PRICE_PER_LOAD = 180;
    const subtotal = quantity * BASE_PRICE_PER_LOAD;
    const vat = subtotal * 0.15;
    const total = subtotal + vat;

    const handleAddToCart = () => {
        if ((rentalType === 'daily' || rentalType === 'monthly') && (!startDate || !endDate)) {
            Alert.alert('تنبيه', 'يرجى اختيار تاريخ البدء والانتهاء');
            return;
        }

        const newItem = {
            id: machine.id,
            title: machine.title,
            subtitle: machine.subtitle,
            image: machine.image,
            rentalType,
            driver: driverOption === 'with_driver' ? 'مع سائق' : 'بدون سائق',
            quantity,
            price: rentalType === 'trip' ? total : 0, // Simplified price logic for example
            startDate,
            endDate,
            notes
        };

        addToCart(newItem);
        Alert.alert('تمت الإضافة', 'تم إضافة المعدة إلى طلبك بنجاح', [
            { text: 'متابعة التسوق', onPress: () => navigation.goBack() },
            { text: 'مراجعة الطلب', onPress: () => navigation.navigate('ReviewRequest') }
        ]);
    };

    if (!machine) return null;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Header */}
                <SafeAreaView edges={['top']} style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.goBack()}
                        >
                            <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>تخصيص المعدة</Text>
                        <View style={styles.iconButton} />
                    </View>
                </SafeAreaView>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
                >
                    <ScrollView
                        style={styles.scrollView}
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        {/* Machine Details Card */}
                        <View style={styles.machineCard}>
                            <View style={styles.machineRow}>
                                <View style={styles.imageContainer}>
                                    <Image source={{ uri: machine.image }} style={styles.image} />
                                </View>
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineTitle}>{machine.title}</Text>
                                    <Text style={styles.machineSubtitle}>{machine.subtitle}</Text>
                                    <View style={styles.verifiedTag}>
                                        <MaterialIcons name="verified" size={14} color="#a16207" />
                                        <Text style={styles.verifiedText}>معدات مضمونة</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Rental Type */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>نوع الإيجار</Text>
                            <View style={styles.rentalTypesGrid}>
                                {['trip', 'daily', 'monthly'].map((type) => (
                                    <TouchableOpacity
                                        key={type}
                                        style={[
                                            styles.rentalTypeCard,
                                            rentalType === type && styles.rentalTypeActive
                                        ]}
                                        onPress={() => handleRentalTypeSelect(type)}
                                    >
                                        <MaterialIcons
                                            name={type === 'trip' ? 'local-shipping' : type === 'daily' ? 'calendar-today' : 'calendar-view-month'}
                                            size={32}
                                            color={rentalType === type ? COLORS.primary : '#94a3b8'}
                                        />
                                        <Text style={styles.rentalTypeName}>
                                            {type === 'trip' ? 'بالرد' : type === 'daily' ? 'يومية' : 'شهرية'}
                                        </Text>
                                        {rentalType === type && (
                                            <View style={styles.checkIcon}>
                                                <MaterialIcons name="check" size={14} color="black" />
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>

                        {/* Operating Options */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>خيارات التشغيل</Text>
                            <View style={styles.optionsList}>
                                <TouchableOpacity
                                    style={styles.optionCard}
                                    onPress={() => setDriverOption('with_driver')}
                                >
                                    <View style={styles.optionRow}>
                                        <View style={styles.optionIcon}>
                                            <MaterialIcons name="person" size={24} color="#64748b" />
                                        </View>
                                        <View style={styles.optionInfo}>
                                            <Text style={styles.optionTitle}>مع سائق</Text>
                                            <Text style={styles.optionSub}>يشمل تكاليف السائق والاعاشة</Text>
                                        </View>
                                        <View style={styles.radioContainer}>
                                            {driverOption === 'with_driver' && <View style={styles.radioInner} />}
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.optionCard}
                                    onPress={() => setDriverOption('without_driver')}
                                >
                                    <View style={styles.optionRow}>
                                        <View style={styles.optionIcon}>
                                            <MaterialIcons name="no-accounts" size={24} color="#64748b" />
                                        </View>
                                        <View style={styles.optionInfo}>
                                            <Text style={styles.optionTitle}>بدون سائق</Text>
                                            <Text style={styles.optionSub}>توفير السائق على المستأجر</Text>
                                        </View>
                                        <View style={styles.radioContainer}>
                                            {driverOption === 'without_driver' && <View style={styles.radioInner} />}
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Quantity or Pricing Breakdown */}
                        {rentalType === 'trip' ? (
                            <View style={styles.pricingCard}>
                                <Text style={styles.sectionTitle}>تفاصيل السعر</Text>

                                <View style={styles.inputRow}>
                                    <Text style={styles.label}>عدد الردود:</Text>
                                    <View style={styles.quantityInputContainer}>
                                        <TouchableOpacity
                                            style={styles.qtyBtnSmall}
                                            onPress={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <MaterialIcons name="remove" size={16} color={COLORS.textDark} />
                                        </TouchableOpacity>
                                        <TextInput
                                            style={styles.quantityInput}
                                            value={String(quantity)}
                                            keyboardType="numeric"
                                            returnKeyType="done"
                                            onSubmitEditing={Keyboard.dismiss} // Added
                                            onChangeText={(text) => {
                                                const val = parseInt(text);
                                                if (!isNaN(val) && val > 0) setQuantity(val);
                                                else if (text === '') setQuantity(0);
                                            }}
                                        />
                                        <TouchableOpacity
                                            style={[styles.qtyBtnSmall, styles.qtyBtnAdd]}
                                            onPress={() => setQuantity(quantity + 1)}
                                        >
                                            <MaterialIcons name="add" size={16} color={COLORS.primaryContent} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.divider} />

                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>سعر الرد الأساسي:</Text>
                                    <Text style={styles.priceValue}>{BASE_PRICE_PER_LOAD} ر.س</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>الإجمالي الجزئي:</Text>
                                    <Text style={styles.priceValue}>{subtotal} ر.س</Text>
                                </View>
                                <View style={styles.priceRow}>
                                    <Text style={styles.priceLabel}>ضريبة القيمة المضافة (15%):</Text>
                                    <Text style={styles.priceValue}>{vat.toFixed(2)} ر.س</Text>
                                </View>
                                <View style={[styles.priceRow, styles.totalRow]}>
                                    <Text style={styles.totalLabel}>الإجمالي النهائي:</Text>
                                    <Text style={styles.totalValue}>{total.toFixed(2)} ر.س</Text>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.quantityCard}>
                                <View>
                                    <Text style={styles.quantityTitle}>المدة المطلوبة</Text>
                                    <Text style={styles.quantitySub}>
                                        {startDate && endDate
                                            ? `${startDate} إلى ${endDate}`
                                            : 'يرجى تحديد التاريخ'}
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => setCalendarVisible(true)}>
                                    <MaterialIcons name="edit-calendar" size={28} color={COLORS.primary} />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Notes */}
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>ملاحظات إضافية (اختياري)</Text>
                            <TextInput
                                style={styles.notesInput}
                                placeholder="مثال: يرجى توفير لي (هوز) إضافي بطول 10 متر..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                textAlignVertical="top"
                                value={notes}
                                onChangeText={setNotes}
                                returnKeyType="done"
                                blurOnSubmit={true} // Allow keyboard dismiss on enter
                                onSubmitEditing={Keyboard.dismiss}
                            />
                        </View>

                    </ScrollView>

                    {/* Bottom Action */}
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.addToCartBtn}
                            onPress={handleAddToCart}
                        >
                            <MaterialIcons name="add-shopping-cart" size={24} color={COLORS.primaryContent} />
                            <Text style={styles.addToCartText}>إضافة إلى الطلب</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
                {/* Calendar Modal */}
                <Modal
                    visible={isCalendarVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setCalendarVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>اختيار التاريخ</Text>
                                <TouchableOpacity onPress={() => setCalendarVisible(false)}>
                                    <MaterialIcons name="close" size={24} color={COLORS.textDark} />
                                </TouchableOpacity>
                            </View>
                            <Calendar
                                markingType={'period'}
                                markedDates={getMarkedDates()}
                                onDayPress={onDayPress}
                                theme={{
                                    selectedDayBackgroundColor: COLORS.primary,
                                    selectedDayTextColor: 'black',
                                    todayTextColor: COLORS.primary,
                                    arrowColor: COLORS.primary,
                                }}
                            />
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={() => setCalendarVisible(false)}
                            >
                                <Text style={styles.modalBtnText}>تأكيد</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
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
        zIndex: 10,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        height: 64,
    },
    iconButton: {
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
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100,
        gap: 16,
    },
    machineCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    machineRow: {
        flexDirection: 'row',
        gap: 16,
    },
    imageContainer: {
        width: 96,
        height: 96,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    machineInfo: {
        flex: 1,
        paddingTop: 4,
    },
    machineTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    machineSubtitle: {
        fontSize: 14,
        color: '#a16207', // Gold-ish color from reference
        marginBottom: 12,
        fontWeight: '500',
    },
    verifiedTag: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fefce8',
        borderColor: '#fef08a',
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        gap: 4,
    },
    verifiedText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#a16207',
    },
    section: {
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 12,
        paddingHorizontal: 4,
    },
    rentalTypesGrid: {
        flexDirection: 'row',
        gap: 12,
    },
    rentalTypeCard: {
        flex: 1,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
        height: 112,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    rentalTypeActive: {
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(236, 200, 19, 0.05)',
    },
    rentalTypeName: {
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    checkIcon: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionsList: {
        gap: 12,
    },
    optionCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        padding: 16,
        borderWidth: 2,
        borderColor: 'transparent', // Can add active state here if needed, reference uses radio
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    optionIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    optionInfo: {
        flex: 1,
    },
    optionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    optionSub: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    radioContainer: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#cbd5e1', // Default border
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.primary,
    },
    quantityCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        marginTop: 16,
    },
    quantityTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    quantitySub: {
        fontSize: 12,
        color: COLORS.textGray,
        marginTop: 4,
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 24,
        padding: 4,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        gap: 12,
    },
    qtyBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
    },
    qtyBtnAdd: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    qtyValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        minWidth: 20,
        textAlign: 'center',
        marginBottom: 4,
    },
    notesInput: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        padding: 12,
        height: 100,
        textAlign: 'right',
        fontSize: 14,
        color: COLORS.textDark,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        padding: 16,
        paddingBottom: 32, // Safe area
    },
    addToCartBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
    },
    // New Styles
    pricingCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginTop: 16,
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    quantityInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 8,
        width: 60,
        height: 40,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        backgroundColor: '#fff',
    },
    qtyBtnSmall: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f1f5f9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 12,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    priceLabel: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    priceValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    totalRow: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    totalValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        minHeight: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        marginTop: 16,
    },
    modalBtnText: {
        fontWeight: 'bold',
        color: COLORS.primaryContent,
    },
});
