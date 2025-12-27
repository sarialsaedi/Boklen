import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#fcfbf8',
    surfaceLight: '#ffffff',
    textDark: '#1c190d',
    textGray: '#66645d',
    border: '#e6e4db',
};

export default function BookingConfirmationScreen({ navigation, route }) {
    const { orderId } = route.params || {};
    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.navigate('UserHome')}
                >
                    <MaterialIcons name="close" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تأكيد الحجز</Text>
                <View style={{ width: 40 }} />
            </View>

            {/* Stepper */}
            <View style={styles.stepperContainer}>
                <View style={styles.stepperDots}>
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={[styles.dot, styles.dotActive]} />
                    <View style={[styles.dot, styles.dotActive]} />
                </View>
                <Text style={styles.stepLabel}>الخطوة 3 من 3</Text>
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Success Animation Placeholder */}
                <View style={styles.successAnimation}>
                    <View style={styles.pulseCircle} />
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="check" size={48} color="black" />
                    </View>
                </View>

                <Text style={styles.title}>تم استلام طلبك بنجاح!</Text>
                <Text style={styles.subtitle}>
                    شكرًا لاختيارك لنا. طلب الحجز الخاص بك قيد المعالجة الآن.
                </Text>

                {/* Order Details Card */}
                <View style={styles.orderCard}>
                    <View style={styles.orderHeader}>
                        <Text style={styles.orderLabel}>رقم الطلب</Text>
                        <View style={styles.orderIdRow}>
                            <Text style={styles.orderId}>{orderId || 'ORD-28492'}</Text>
                            <TouchableOpacity>
                                <MaterialIcons name="content-copy" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.infoBox}>
                        <MaterialIcons name="info" size={20} color={COLORS.primary} />
                        <View style={styles.infoContent}>
                            <Text style={styles.infoTitle}>الخطوة التالية</Text>
                            <Text style={styles.infoText}>
                                سيقوم فريق العمليات بمراجعة توفر المعدات والتواصل معك خلال ساعتين لترتيب عملية الدفع اليدوي.
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.trackButton}
                    onPress={() => navigation.navigate('UserOrders')} // Ideally navigate to Orders list
                >
                    <Text style={styles.trackButtonText}>تتبع حالة الطلب</Text>
                    <MaterialIcons name="arrow-right-alt" size={24} color={COLORS.textDark} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.homeButton}
                    onPress={() => navigation.navigate('UserHome')}
                >
                    <Text style={styles.homeButtonText}>تصفح المزيد من المعدات</Text>
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
    },
    closeButton: {
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
        paddingHorizontal: 24,
        paddingBottom: 24,
        alignItems: 'center',
    },
    stepperDots: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 8,
        width: '100%',
    },
    dot: {
        flex: 1,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#e6e4db',
    },
    dotActive: {
        backgroundColor: COLORS.primary,
    },
    stepLabel: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        alignItems: 'center',
    },
    successAnimation: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        position: 'relative',
        width: 120,
        height: 120,
    },
    pulseCircle: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(230, 194, 23, 0.2)',
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textGray,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        maxWidth: 280,
    },
    orderCard: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 24,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    orderHeader: {
        alignItems: 'center',
        gap: 4,
        marginBottom: 16,
    },
    orderLabel: {
        fontSize: 14,
        color: COLORS.textGray,
        fontWeight: '500',
    },
    orderIdRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    orderId: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        fontFamily: 'monospace', // Or just stick to default bold
    },
    divider: {
        height: 1,
        backgroundColor: '#f1f5f9',
        width: '100%',
        marginBottom: 16,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: COLORS.backgroundLight,
        padding: 12,
        borderRadius: 8,
        gap: 12,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    infoTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    infoText: {
        fontSize: 12,
        color: COLORS.textGray,
        lineHeight: 18,
        textAlign: 'right',
        width: '100%',
    },
    footer: {
        padding: 16,
        backgroundColor: COLORS.backgroundLight,
        gap: 12,
    },
    trackButton: {
        width: '100%',
        height: 56,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
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
    trackButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    homeButton: {
        width: '100%',
        height: 48,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textDark,
    },
});
