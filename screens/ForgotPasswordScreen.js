import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f6f7f8',
    surfaceLight: '#ffffff',
    textLight: '#1e293b',
    textDark: '#0f172a',
    subtext: '#64748b',
    border: '#e2e8f0',
};

export default function ForgotPasswordScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const isValidPhone = (number) => {
        return /^5\d{8}$/.test(number);
    };

    const handleSendCode = () => {
        if (!isValidPhone(phoneNumber)) {
            setError('الرجاء إدخال رقم جوال صحيح (يبدأ بـ 5 ويتكون من 9 أرقام)');
            return;
        }

        setError('');
        Keyboard.dismiss();
        // Here you would typically trigger the API to send the code
        // For now, we'll navigate to a verification screen or just show an alert/log
        // Assuming we might want to go to verification logic, but since that wasn't explicitly detailed 
        // beyond "Send Verification Code" button, I'll just mock it or stay here.
        // The request says: "Button: 'Send Verification Code' (إرسال رمز التحقق)".
        // I will just add a dummy alert or log for now as the next screen isn't defined.
        // Actually, re-using NafathVerificationScreen might be weird.
        // I'll just leave it as a mock action.
        alert('Code sent to ' + phoneNumber);
    };

    const handlePhoneChange = (text) => {
        const cleaned = text.replace(/[^0-9]/g, '');
        setPhoneNumber(cleaned);
        if (error) setError('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>إعادة تعيين كلمة المرور</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="lock-reset" size={32} color={COLORS.primary} />
                    </View>

                    <Text style={styles.title}>نسيت كلمة المرور؟</Text>
                    <Text style={styles.subtitle}>
                        أدخل رقم الجوال المسجل لاستعادة كلمة المرور
                    </Text>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>رقم الجوال</Text>
                        <View style={[styles.inputContainer, styles.phoneInputContainer, error ? styles.inputError : null]}>
                            <View style={styles.countryCode}>
                                <Text style={styles.countryCodeText}>🇸🇦 +966</Text>
                            </View>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="5X XXX XXXX"
                                keyboardType="number-pad"
                                value={phoneNumber}
                                onChangeText={handlePhoneChange}
                                maxLength={9}
                            />
                        </View>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                    </View>

                    <TouchableOpacity
                        style={[styles.primaryButton, !isValidPhone(phoneNumber) && styles.disabledButton]}
                        onPress={handleSendCode}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.primaryButtonText, !isValidPhone(phoneNumber) && styles.disabledButtonText]}>
                            إرسال رمز التحقق
                        </Text>
                        <MaterialIcons name="arrow-back" size={20} color={!isValidPhone(phoneNumber) ? COLORS.subtext : "white"} />
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    keyboardView: {
        flex: 1,
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
        backgroundColor: COLORS.surfaceLight,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        padding: 20,
        alignItems: 'center',
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtext,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32,
        maxWidth: 280,
    },
    formSection: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 16,
    },
    phoneInputContainer: {
        paddingHorizontal: 0,
        overflow: 'hidden',
    },
    inputError: {
        borderColor: '#ef4444',
        borderWidth: 1,
    },
    countryCode: {
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#f8fafc',
        borderRightWidth: 1,
        borderRightColor: COLORS.border,
    },
    countryCodeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    phoneInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: 16,
        fontSize: 18,
        textAlign: 'left',
        color: COLORS.textDark,
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
        textAlign: 'right',
    },
    primaryButton: {
        width: '100%',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 24,
        marginTop: 16,
    },
    disabledButton: {
        backgroundColor: '#e2e8f0',
        shadowOpacity: 0,
        elevation: 0,
    },
    disabledButtonText: {
        color: '#94a3b8',
    },
    primaryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});
