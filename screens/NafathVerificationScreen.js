import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#EBC024', // Mustard Yellow
    backgroundLight: '#FAFAFA', // Light Off-White
    surfaceLight: '#FFFFFF', // Pure White
    textDark: '#212121', // Dark Charcoal
    textGray: '#757575', // Medium Gray
    border: '#e2e8f0',
};

export default function NafathVerificationScreen({ navigation }) {
    const [timeLeft, setTimeLeft] = useState(179); // 02:59 in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>التحقق من الهوية</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                {/* Fingerprint Icon Circle */}
                <View style={styles.iconWrapper}>
                    <View style={styles.iconCircle}>
                        <View style={styles.spinner} />
                        <MaterialIcons name="fingerprint" size={40} color={COLORS.primary} style={{ zIndex: 1 }} />
                    </View>
                </View>

                <Text style={styles.title}>توثيق نفاذ</Text>
                <Text style={styles.subtitle}>
                    لقد أرسلنا طلب تحقق إلى تطبيق نفاذ الخاص بك. الرجاء قبول الطلب واختيار الرقم الظاهر أدناه.
                </Text>

                {/* Verification Number Card */}
                <View style={styles.verificationCard}>
                    <Text style={styles.verificationLabel}>رقم التحقق</Text>
                    <Text style={styles.verificationNumber}>42</Text>

                    <View style={styles.statusBadge}>
                        <View style={styles.pingWrapper}>
                            <View style={styles.pingDot} />
                            <View style={styles.activeDot} />
                        </View>
                        <Text style={styles.statusText}>بانتظار التأكيد من التطبيق...</Text>
                    </View>
                </View>

                {/* Bottom Actions */}
                <View style={styles.actionsContainer}>
                    <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>

                    <TouchableOpacity
                        style={styles.openAppButton}
                        onPress={() => {
                            // Logic to open Nafath app could go here
                            // For now just navigate to home as a simulation of successful verification
                            navigation.replace('UserHome');
                        }}
                    >
                        <Text style={styles.openAppButtonText}>فتح تطبيق نفاذ</Text>
                        <MaterialIcons name="open-in-new" size={20} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resendButton}>
                        <Text style={styles.resendButtonText}>لم يصلك الطلب؟ إعادة إرسال</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Footer Help */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.helpButton}>
                    <MaterialIcons name="support-agent" size={18} color={COLORS.textGray} />
                    <Text style={styles.helpText}>هل تواجه مشكلة في التحقق؟</Text>
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
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
        alignItems: 'center',
        paddingTop: 32,
    },
    iconWrapper: {
        marginBottom: 24,
    },
    iconCircle: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: 'rgba(235, 192, 36, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    spinner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 48,
        borderWidth: 3,
        borderColor: 'rgba(235, 192, 36, 0.2)',
        borderTopColor: COLORS.primary,
        transform: [{ rotate: '45deg' }], // Static rotation for visual matching, animation would require Animated API
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textGray,
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: 280,
        marginBottom: 32,
    },
    verificationCard: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginBottom: 24,
    },
    verificationLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textGray,
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    verificationNumber: {
        fontSize: 72,
        fontWeight: '900', // Black weight if possible
        color: COLORS.primary,
        marginBottom: 24,
        lineHeight: 80,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: 10,
    },
    pingWrapper: {
        width: 8,
        height: 8,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
    },
    pingDot: {
        position: 'absolute',
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
        opacity: 0.3,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    actionsContainer: {
        width: '100%',
        gap: 12,
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 24,
    },
    timerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'center',
        fontVariant: ['tabular-nums'],
        letterSpacing: 2,
        marginBottom: 12,
    },
    openAppButton: {
        width: '100%',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'rgba(235, 192, 36, 0.4)',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
        gap: 8,
    },
    openAppButtonText: {
        color: '#212121',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendButton: {
        width: '100%',
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    resendButtonText: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
    },
    helpButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: 8,
    },
    helpText: {
        fontSize: 12,
        color: COLORS.textGray,
    },
});
