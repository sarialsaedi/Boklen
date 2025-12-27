import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217', // Official Brand Yellow
    backgroundLight: '#f8fafc',
    surfaceLight: '#ffffff',
    textDark: '#0f172a',
    textGray: '#64748b',
    border: '#e2e8f0',
    greenWhatsapp: '#25D366',
};

export default function UserSupportScreen({ navigation, route }) {
    const returnToCompanyRequest = route?.params?.returnToCompanyRequest;

    const FeatureCard = ({ title, subtitle, icon, color, onPress, isWhatsApp }) => (
        <TouchableOpacity
            style={[
                styles.featureCard,
                isWhatsApp && styles.whatsappCard,
                !isWhatsApp && styles.shadowCard
            ]}
            onPress={onPress}
            activeOpacity={0.9}
        >
            {isWhatsApp && <View style={styles.blurBlob} />}

            <View style={[
                styles.iconBox,
                isWhatsApp ? styles.iconBoxWhatsApp : { backgroundColor: 'rgba(230, 194, 23, 0.1)' } // primary with opacity
            ]}>
                <MaterialIcons name={icon} size={28} color={isWhatsApp ? '#fff' : COLORS.primary} />
            </View>

            <View style={styles.featureTextContent}>
                <Text style={[styles.featureTitle, isWhatsApp && { color: '#fff' }]}>{title}</Text>
                <Text style={[styles.featureSubtitle, isWhatsApp && { color: 'rgba(255,255,255,0.9)' }]}>{subtitle}</Text>
            </View>

            <MaterialIcons
                name="arrow-back"
                size={20}
                color={isWhatsApp ? 'rgba(255,255,255,0.8)' : '#cbd5e1'}
                style={isWhatsApp && { transform: [{ rotate: '180deg' }] }} // Mirror for whatsapp only if needed, but standard back arrow is usually fine. Design shows back arrow pointing left.
            />
        </TouchableOpacity>
    );



    return (
        <View style={styles.container}>
            {/* Custom Header for Company Request Return */}
            {returnToCompanyRequest && (
                <SafeAreaView edges={['top']} style={styles.customHeader}>
                    <TouchableOpacity
                        style={styles.customBackButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                        <Text style={styles.customBackText}>العودة الى صفحة الطلب</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            )}


            <ScrollView contentContainerStyle={[styles.scrollContent, returnToCompanyRequest && { paddingTop: 16 }]} showsVerticalScrollIndicator={false}>

                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <View style={styles.heroGlow} />
                    <View style={styles.heroIconCircle}>
                        <MaterialIcons name="headset-mic" size={48} color={COLORS.primary} />
                    </View>
                    <Text style={styles.heroTitle}>كيف يمكننا مساعدتك؟</Text>
                    <Text style={styles.heroSubtitle}>فريق الدعم متواجد لخدمتك على مدار الساعة للإجابة على استفساراتك وحل مشكلاتك</Text>
                </View>

                {/* Primary Actions */}
                <View style={styles.actionsGrid}>
                    <FeatureCard
                        title="واتساب"
                        subtitle="تواصل سريع ومباشر"
                        icon="chat"
                        isWhatsApp={true}
                        onPress={() => Linking.openURL('https://wa.me/966500000000')}
                    />
                    <FeatureCard
                        title="المحادثة المباشرة"
                        subtitle="تحدث مع موظف الدعم من خلال التطبيق"
                        icon="forum"
                        onPress={() => navigation.navigate('LiveChat')}
                    />
                    <FeatureCard
                        title="اتصال"
                        subtitle="تحدث مباشرة مع خدمة العملاء"
                        icon="call"
                        onPress={() => Linking.openURL('tel:920000000')}
                    />
                    <FeatureCard
                        title="البريد الإلكتروني"
                        subtitle="أرسل استفسارك وسنرد عليك قريباً"
                        icon="mail"
                        onPress={() => Linking.openURL('mailto:support@boklen.com')}
                    />
                </View>



            </ScrollView>

            {/* Bottom Nav */}
            <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
                <View style={styles.bottomNavContent}>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserHome')}>
                        <MaterialIcons name="home" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الرئيسية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate('UserOrders')}>
                        <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>طلباتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <View style={{ alignItems: 'center' }}>
                            <MaterialIcons name="support-agent" size={26} color={COLORS.primary} />
                            <Text style={[styles.navLabel, { color: COLORS.primary, fontWeight: 'bold' }]}>الدعم</Text>
                        </View>
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

    scrollContent: {
        padding: 16,
        paddingTop: 60,
        paddingBottom: 100,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
        marginBottom: 8,
    },
    heroGlow: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: '#facc15',
        borderRadius: 50,
        opacity: 0.2,
        transform: [{ scale: 1.5 }],
    },
    heroIconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: '#fefce8',
        borderWidth: 1,
        borderColor: '#fef9c3',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
    },
    heroTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    heroSubtitle: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 280,
    },
    actionsGrid: {
        gap: 16,
        marginBottom: 32,
        marginTop: 8,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderRadius: 16,
        backgroundColor: COLORS.surfaceLight,
        gap: 16,
        overflow: 'hidden',
    },
    whatsappCard: {
        backgroundColor: '#25D366',
    },
    shadowCard: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    blurBlob: {
        position: 'absolute',
        top: -64,
        right: -64,
        width: 128,
        height: 128,
        borderRadius: 64,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12, // slightly rounded
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBoxWhatsApp: {
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    featureTextContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 2,
    },
    featureSubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: '500',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primary,
    },
    faqList: {
        gap: 12,
    },
    faqItem: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    faqContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1, // ensure text takes available space
    },
    faqIconBox: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    faqText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark,
        flex: 1, // Allow wrapping
        textAlign: 'right', // Support RTL if needed, though usually handled by I18nManager. Adjust based on user context (seems Arabic UI).
    },
    faqBody: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 0,
    },
    faqAnswer: {
        fontSize: 14,
        color: COLORS.textGray,
        lineHeight: 20,
        textAlign: 'right',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 10,
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
        fontWeight: '500',
        color: COLORS.textGray,
    },
});
