import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
    green: '#10b981',
    red: '#ef4444',
    yellow: '#f59e0b',
    textDark: '#1b190d',
};

export default function ApplicationDetailsScreen({ navigation }) {

    const handleReturnToLogin = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        });
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

            <ScrollView contentContainerStyle={styles.content}>
                {/* Details Card */}
                <View style={styles.card}>
                    <View style={styles.cardRow}>
                        <Text style={styles.cardValue}>CO-33629</Text>
                        <Text style={styles.cardLabel}>رقم الطلب</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.cardRow}>
                        <Text style={styles.cardValue}>2025-12-28</Text>
                        <Text style={styles.cardLabel}>تاريخ الطلب</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.cardRow}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>قيد المراجعة</Text>
                            <MaterialIcons name="hourglass-empty" size={16} color="#92400e" />
                        </View>
                        <Text style={styles.cardLabel}>الحالة</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Notice Text */}
                    <View style={styles.noticeContainer}>
                        <Text style={styles.noticeText}>
                            سيتم مراجعة الطلب والرد بالموافقة او الرفض خلال 24 ساعة
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleReturnToLogin}
                >
                    <Text style={styles.primaryButtonText}>العودة للصفحة الرئيسية</Text>
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
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
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
    content: {
        padding: 16,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    cardLabel: {
        fontSize: 14,
        color: COLORS.subtextLight,
        fontWeight: '500',
    },
    cardValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.borderLight,
        opacity: 0.5,
    },
    statusBadge: {
        backgroundColor: '#fef3c7',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        borderWidth: 1,
        borderColor: '#fcd34d',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#92400e',
    },
    noticeContainer: {
        marginTop: 24,
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
        alignItems: 'center',
    },
    noticeText: {
        fontSize: 13,
        color: COLORS.subtextLight,
        textAlign: 'center',
        lineHeight: 20,
    },
    footer: {
        padding: 16,
        paddingBottom: 32,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
    },
});
