import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
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

export default function OrderSummaryScreen({ navigation, route }) {
    const { cartItems, updateCartItem, addOrder } = useCart();
    const { provider } = route.params || {};
    const { location } = useUser();

    // Assume we are editing the date for the first item for now, or a global start date
    // logic depends on if all items must share a start date. For this task, we bind to the first item if available.
    const mainItem = cartItems.length > 0 ? cartItems[0] : null;

    const [isCalendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(mainItem ? mainItem.startDate : null);

    const handleDateChange = (day) => {
        setSelectedDate(day.dateString);
    };

    const confirmDateChange = () => {
        if (mainItem && selectedDate) {
            updateCartItem(mainItem.cartId, { startDate: selectedDate });
        }
        setCalendarVisible(false);
    };

    const openCalendar = () => {
        if (mainItem) {
            setSelectedDate(mainItem.startDate);
            setCalendarVisible(true);
        }
    };

    const handleConfirm = () => {
        const finalPrice = provider ? (provider.price || provider.estimatedCost) : 15000;

        const orderId = addOrder({
            provider: provider ? provider.name : 'Unknown Provider',
            items: cartItems,
            status: 'Under Processing',
            totalPrice: finalPrice,
            // providerDetails: provider // Optional: store full provider object if needed
        });

        navigation.navigate('BookingConfirmation', { orderId });
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
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>ملخص الطلب</Text>
                    <View style={{ width: 40 }} />
                </View>
            </SafeAreaView>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>

                {/* Machinery Card */}
                <View style={styles.section}>
                    <View style={styles.machineryCard}>
                        <View style={styles.machineryImageContainer}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEfZGxmFfum6LzEQwz3msXfLUhwuC8neO6ScK_OnuVYkV9dPyX6DPgHbQE9tDLiP9pSvoajqnTXKrJz-xeG5PSQ7yDl0n5iXmKgX594nvphxIRYScmPSIizCasfrvOwcBbFTn4UciEfA4USxXUufZ67bQhiDIBz3vGHajMZWSaj_yNwDtD4OZmBh_O1FsOSlMNdiPNLmUOtKboDHQfG6ZaZukBfjX41YdDesNHkyof-V9bY56XnF1ZoS45gbwRI5v6TE0nF2oh_qE' }}
                                style={styles.machineryImage}
                            />
                            <View style={styles.availabilityBadge}>
                                <View style={styles.pulseDot} />
                                <Text style={styles.availabilityText}>متاح حالياً</Text>
                            </View>
                        </View>
                        <View style={styles.machineryInfo}>
                            <View style={styles.machineryHeader}>
                                <View>
                                    <Text style={styles.machineryTitle}>رافعة شوكية ٣ طن</Text>
                                    <Text style={styles.machinerySubtitle}>موديل ٢٠٢٢ • ديزل • كوماتسو</Text>
                                </View>
                                <View style={styles.categoryTag}>
                                    <Text style={styles.categoryTagText}>المعدات الثقيلة</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Provider Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>مقدم الخدمة</Text>
                    <View style={styles.providerCard}>
                        {provider?.image ? (
                            <Image
                                source={{ uri: provider.image }}
                                style={styles.providerLogo}
                            />
                        ) : (
                            <View style={[styles.providerLogo, { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }]}>
                                <MaterialIcons name="business" size={24} color={COLORS.textGray} />
                            </View>
                        )}

                        <View style={styles.providerDetails}>
                            <View style={styles.providerNameRow}>
                                <Text style={styles.providerName}>{provider?.name || 'مقدم خدمة'}</Text>
                                {provider?.verified && <MaterialIcons name="verified" size={16} color="#3b82f6" />}
                            </View>
                            <View style={styles.ratingRow}>
                                <MaterialIcons name="star" size={14} color={COLORS.primary} />
                                <Text style={styles.ratingValue}>{provider?.rating || '-'}</Text>
                                <Text style={styles.ratingCount}>({provider?.jobs || 0} عملية)</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={styles.chatButton}>
                            <MaterialIcons name="chat" size={20} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Pricing & Details Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>تفاصيل الحجز والسعر</Text>
                    <View style={styles.detailsCard}>
                        {/* Price Row */}
                        <View style={styles.detailRow}>
                            <View style={styles.detailLeft}>
                                <View style={styles.detailIcon}>
                                    <MaterialIcons name="payments" size={20} color={COLORS.primary} />
                                </View>
                                <View>
                                    <Text style={styles.detailLabel}>السعر اليومي</Text>
                                    <Text style={styles.detailSub}>شامل الضريبة</Text>
                                </View>
                            </View>
                            <Text style={styles.detailValue}>
                                {provider ? (provider.price || provider.estimatedCost || 0).toLocaleString() : '---'} ر.س
                            </Text>
                        </View>

                        <View style={styles.divider} />

                        {/* Location Row */}
                        <View style={styles.detailRow}>
                            <View style={styles.detailLeft}>
                                <View style={styles.detailIcon}>
                                    <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                                </View>
                                <View>
                                    <Text style={styles.detailLabel}>موقع العمل</Text>
                                    <Text style={styles.detailSub}>{location || 'يرجى تحديد الموقع'}</Text>
                                </View>
                            </View>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByn3C340a6mFLbVQKhx8Wn7K8ib5CA2M_reetgjtgpg0WQSWdIBJjcBx1xZeTI7vN7o7WJiDg1PLjml6SH6AIXQAtLeQ7kqBiAacH-RXPwVlL7TjEoTo63w1q57Br4Y5kEXyW6o0y9mbRDDOtsSkPiJ6AQZ9LxvDsI-rrcTMQrjtxr62IkRKQsk6n-sFu52hQqjsudq-Yq1e640LJodcBpUey84440sglXO2xVONA-7ccYOVSjFyESYNFwAoGNFjNl2P9hIU93C9Q' }}
                                style={styles.mapThumbnail}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Date Row */}
                        <View style={styles.detailRow}>
                            <View style={styles.detailLeft}>
                                <View style={styles.detailIcon}>
                                    <MaterialIcons name="calendar-today" size={20} color={COLORS.primary} />
                                </View>
                                <View>
                                    <Text style={styles.detailLabel}>تاريخ البدء</Text>
                                    <Text style={styles.detailSub}>
                                        {mainItem?.startDate ? mainItem.startDate : 'يتم تأكيده لاحقاً'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={openCalendar}>
                                <MaterialIcons name="edit" size={20} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

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
                                <Text style={styles.modalTitle}>تغيير تاريخ البدء</Text>
                                <TouchableOpacity onPress={() => setCalendarVisible(false)}>
                                    <MaterialIcons name="close" size={24} color={COLORS.textDark} />
                                </TouchableOpacity>
                            </View>
                            <Calendar
                                current={selectedDate}
                                onDayPress={handleDateChange}
                                markedDates={{
                                    [selectedDate]: { selected: true, selectedColor: COLORS.primary }
                                }}
                                theme={{
                                    selectedDayBackgroundColor: COLORS.primary,
                                    selectedDayTextColor: 'black',
                                    todayTextColor: COLORS.primary,
                                    arrowColor: COLORS.primary,
                                }}
                            />
                            <TouchableOpacity
                                style={styles.modalBtn}
                                onPress={confirmDateChange}
                            >
                                <Text style={styles.modalBtnText}>تأكيد التاريخ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

            {/* Bottom Action */}
            <View style={styles.bottomContainer}>
                <View style={styles.bottomGradient} />
                <View style={styles.bottomContent}>
                    <TouchableOpacity
                        style={styles.confirmButton}
                        onPress={handleConfirm}
                    >
                        <Text style={styles.confirmButtonText}>تأكيد ومتابعة الحجز</Text>
                        <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                    </TouchableOpacity>
                </View>

                {/* Bottom Nav */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                        <MaterialIcons name="home" size={26} color={COLORS.primary} />
                        <Text style={[styles.navLabel, { color: COLORS.primary }]}>الرئيسية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserOrders')}
                    >
                        <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>طلباتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
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
            </View>

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
                            <Text style={styles.modalTitle}>تغيير تاريخ البدء</Text>
                            <TouchableOpacity onPress={() => setCalendarVisible(false)}>
                                <MaterialIcons name="close" size={24} color={COLORS.textDark} />
                            </TouchableOpacity>
                        </View>
                        <Calendar
                            current={selectedDate}
                            onDayPress={handleDateChange}
                            markedDates={{
                                [selectedDate]: { selected: true, selectedColor: COLORS.primary }
                            }}
                            theme={{
                                selectedDayBackgroundColor: COLORS.primary,
                                selectedDayTextColor: 'black',
                                todayTextColor: COLORS.primary,
                                arrowColor: COLORS.primary,
                            }}
                        />
                        <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={confirmDateChange}
                        >
                            <Text style={styles.modalBtnText}>تأكيد التاريخ</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
        zIndex: 10,
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
        padding: 16,
        paddingBottom: 200, // Space for bottom action + nav
        gap: 24,
    },
    section: {
        gap: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        paddingHorizontal: 4,
    },
    machineryCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    machineryImageContainer: {
        height: 208,
        width: '100%',
        position: 'relative',
    },
    machineryImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    availabilityBadge: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    pulseDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.green,
    },
    availabilityText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    machineryInfo: {
        padding: 16,
    },
    machineryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    machineryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    machinerySubtitle: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    categoryTag: {
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    categoryTagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    providerCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    providerLogo: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 2,
        borderColor: 'rgba(230, 194, 23, 0.2)',
    },
    providerDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    providerNameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    providerName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
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
        color: COLORS.textGray,
    },
    chatButton: {
        padding: 8,
        borderRadius: 20,
        // backgroundColor: 'rgba(236, 200, 19, 0.1)', // Optional hover effect
    },
    detailsCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        overflow: 'hidden',
    },
    detailRow: {
        flexDirection: 'row',
        items: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    detailLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    detailIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(230, 194, 23, 0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    detailSub: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    detailValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    divider: {
        height: 1,
        backgroundColor: '#f8fafc',
    },
    mapThumbnail: {
        width: 64,
        height: 40,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    bottomGradient: {
        height: 32,
        // Linear gradient placeholder - in RN usually requires expo-linear-gradient, skipping for simplicity or using transparent
    },
    bottomContent: {
        backgroundColor: COLORS.backgroundLight,
        paddingHorizontal: 16,
        paddingTop: 4,
        paddingBottom: 8,
    },
    confirmButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 6,
    },
    confirmButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    bottomNav: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: 20, // Safe area padding simulation if needed, usually handled by SafeAreaView
        paddingTop: 8,
        height: 64,
    },
    navItem: {
        alignItems: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        color: COLORS.textGray,
    },
    navIconBadge: {
        position: 'relative',
    },
    activeIndicator: {
        position: 'absolute',
        top: -6,
        left: 0,
        right: 0,
        height: 3,
        backgroundColor: COLORS.primary,
        borderBottomLeftRadius: 3,
        borderBottomRightRadius: 3,
        // Styling trick to match design indicator
        display: 'none', // Hiding for now to simulate simpler active state
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
        color: COLORS.textDark,
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
        color: COLORS.textDark,
    },
});
