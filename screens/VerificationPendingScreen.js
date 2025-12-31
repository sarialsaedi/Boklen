import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
    green: '#10b981',
};

export default function VerificationPendingScreen({ navigation }) {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);

    const handleRequestPermissions = async () => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setNotificationsEnabled(true);
            } else {
                Alert.alert('تنبيه', 'يجب تفعيل التنبيهات لتلقي الإشعارات.');
            }
        } catch (error) {
            console.error('Error requesting permissions:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء طلب الصلاحيات.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Status Illustration */}
                <View style={styles.illustrationContainer}>
                    <View style={styles.iconCircle}>
                        <MaterialIcons name="pending-actions" size={80} color={COLORS.primary} />
                    </View>
                </View>

                <Text style={styles.title}>طلبك قيد المراجعة</Text>
                <Text style={styles.description}>
                    شكرًا لرفع السجل التجاري. يقوم فريقنا حاليًا بمراجعة مستنداتك لضمان جودة الخدمة. سنقوم بتفعيل حسابك وإشعارك فور الانتهاء.
                </Text>

                {/* Request ID */}
                <Text style={styles.requestId}>رقم الطلب: <Text style={styles.requestIdBold}>CO-33629</Text></Text>

                {/* Refresh Button */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('FleetManagement')}
                >
                    <Text style={styles.primaryButtonText}>تحديث الحالة</Text>
                    <MaterialIcons name="refresh" size={20} color={COLORS.primaryContent} />
                </TouchableOpacity>

                {/* Review Application Button */}
                <TouchableOpacity
                    style={styles.outlineButton}
                    onPress={() => navigation.navigate('ApplicationDetails')}
                >
                    <Text style={styles.outlineButtonText}>مراجعة الطلب</Text>
                    <MaterialIcons name="visibility" size={20} color={COLORS.subtextLight} />
                </TouchableOpacity>

                {/* Support Button */}
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('UserSupport', { returnToCompanyRequest: true })}
                >
                    <Text style={styles.secondaryButtonText}>تواصل مع الدعم</Text>
                    <MaterialIcons name="chat" size={20} color={COLORS.textLight} />
                </TouchableOpacity>

                {/* Notification Prompt */}
                <TouchableOpacity
                    style={[styles.notificationBox, notificationsEnabled && styles.notificationBoxActive]}
                    onPress={handleRequestPermissions}
                    disabled={notificationsEnabled}
                >
                    {notificationsEnabled ? (
                        <MaterialIcons name="check-circle" size={24} color={COLORS.green} />
                    ) : (
                        <MaterialIcons name="notifications-active" size={24} color={COLORS.primary} />
                    )}
                    <View style={styles.notificationContent}>
                        <Text style={styles.notificationTitle}>
                            {notificationsEnabled ? 'تم تفعيل التنبيهات' : 'تفعيل التنبيهات'}
                        </Text>
                        <Text style={styles.notificationText}>
                            {notificationsEnabled ? 'سنقوم بإشعارك عند اكتمال الطلب.' : 'سنقوم بإشعارك فور اكتمال عملية التحقق.'}
                        </Text>
                    </View>
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
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    illustrationContainer: {
        marginBottom: 24,
    },
    iconCircle: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: COLORS.subtextLight,
        textAlign: 'center',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 16,
        maxWidth: 320,
    },
    requestId: {
        fontSize: 14,
        color: COLORS.subtextLight,
        marginBottom: 24,
        textAlign: 'center',
    },
    requestIdBold: {
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    outlineButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.surfaceLight,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    outlineButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.subtextLight,
        marginRight: 8,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 16,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
        marginRight: 8,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        height: 48,
        borderRadius: 12,
        paddingHorizontal: 20,
        width: '100%',
        marginBottom: 32,
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textLight,
        marginRight: 8,
    },
    notificationBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        borderRadius: 12,
        padding: 16,
        width: '100%',
        alignItems: 'flex-start',
    },
    notificationBoxActive: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 1,
        borderColor: COLORS.green,
    },
    notificationContent: {
        flex: 1,
        marginLeft: 12,
    },
    notificationTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textLight,
        textAlign: 'right',
    },
    notificationText: {
        fontSize: 14,
        color: COLORS.subtextLight,
        marginTop: 4,
        textAlign: 'right',
    },
});
