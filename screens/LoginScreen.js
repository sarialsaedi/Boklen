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

export default function LoginScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isValidPhone = (number) => {
        return /^5\d{8}$/.test(number);
    };

    const isFormValid = isValidPhone(phoneNumber) && password.length > 0;

    const handleLogin = () => {
        if (!isFormValid) {
            if (!isValidPhone(phoneNumber)) {
                setError('الرجاء إدخال رقم جوال صحيح (يبدأ بـ 5 ويتكون من 9 أرقام)');
            } else if (password.length === 0) {
                setError('الرجاء إدخال كلمة المرور');
            }
            return;
        }

        // Clear error and proceed
        setError('');
        Keyboard.dismiss();
        navigation.navigate('UserHome');
    };

    const handlePhoneChange = (text) => {
        // Sanitize: allow only numbers
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
                    <Text style={styles.headerTitle}>تسجيل الدخول</Text>
                    <View style={{ width: 40 }} />
                </View>

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="login" size={32} color={COLORS.primary} />
                    </View>

                    <Text style={styles.title}>أهلاً بك مجدداً</Text>
                    <Text style={styles.subtitle}>
                        الرجاء إدخال بيانات الدخول للمتابعة
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
                        {error && !isValidPhone(phoneNumber) ? (
                            <Text style={styles.errorText}>{error}</Text>
                        ) : null}
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>كلمة المرور</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="******"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (error) setError('');
                                }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.forgotPasswordContainer}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        >
                            <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={[styles.primaryButton, !isFormValid && styles.disabledButton]}
                        onPress={handleLogin}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.primaryButtonText, !isFormValid && styles.disabledButtonText]}>تسجيل الدخول</Text>
                        <MaterialIcons name="arrow-back" size={20} color={!isFormValid ? COLORS.subtext : "white"} />
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <View style={styles.loginRow}>
                            <Text style={styles.footerText}>ليس لديك حساب؟</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('UserRegistration')}>
                                <Text style={styles.linkText}>تسجيل جديد</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    input: {
        flex: 1,
        height: '100%',
        fontSize: 16,
        textAlign: 'right',
        color: COLORS.textDark,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-start',
        marginTop: 8,
        paddingVertical: 4,
    },
    forgotPasswordText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primary, // Or use a dark grey if preferred, but primary matches request "dark grey or primary yellow"
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
        backgroundColor: '#e2e8f0', // Gray out
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
    footer: {
        alignItems: 'center',
        gap: 16,
    },
    loginRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    footerText: {
        fontSize: 14,
        color: COLORS.subtext,
    },
    linkText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
});
