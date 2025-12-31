import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
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

export default function UserRegistrationScreen({ navigation }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const otpInputRef = useRef(null);
    const [step, setStep] = useState(1); // 1: Phone, 2: OTP
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const [isPhoneTouched, setIsPhoneTouched] = useState(false);

    const isPhoneValid = phoneNumber.startsWith('5') && phoneNumber.length === 9;

    useEffect(() => {
        let interval;
        if (step === 2 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    // Auto-submit OTP when length reaches 4
    useEffect(() => {
        if (step === 2 && otpCode.length === 4) {
            handleVerify();
        }
    }, [otpCode, step]);

    const handleResend = () => {
        setTimer(59);
        setCanResend(false);
        // Add actual resend logic here if available
    };

    const handleSendOtp = () => {
        if (isPhoneValid) {
            setStep(2);
        }
    };

    const handleVerify = () => {
        // Mock verification
        navigation.replace('NafathVerification');
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>تسجيل جديد</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="app-registration" size={32} color={COLORS.primary} />
                    </View>

                    <Text style={styles.title}>أنشئ حسابك الآن</Text>
                    <Text style={styles.subtitle}>
                        أدخل رقم الجوال لاستلام رمز التحقق والمتابعة في عملية التسجيل
                    </Text>

                    {step === 1 ? (
                        <View style={styles.formSection}>
                            <Text style={styles.label}>رقم الجوال</Text>
                            <View style={[styles.inputContainer, styles.phoneInputContainer]}>
                                <View style={styles.countryCode}>
                                    <Text style={styles.countryCodeText}>🇸🇦 +966</Text>
                                </View>
                                <TextInput
                                    style={styles.phoneInput}
                                    placeholder="5X XXX XXXX"
                                    keyboardType="phone-pad"
                                    value={phoneNumber}
                                    onChangeText={setPhoneNumber}
                                    onBlur={() => setIsPhoneTouched(true)}
                                    maxLength={9}
                                />
                                <MaterialIcons name="smartphone" size={24} color={COLORS.subtext} style={styles.inputIcon} />
                            </View>
                            {isPhoneTouched && !isPhoneValid && (
                                <Text style={styles.errorText}>
                                    الرجاء إدخال رقم جوال صحيح (يبدأ بـ 5 ومكون من 9 أرقام)
                                </Text>
                            )}
                        </View>
                    ) : (
                        <View style={styles.formSection}>
                            <View style={styles.otpHeader}>
                                <Text style={styles.label}>رمز التحقق</Text>
                                <Text style={styles.otpCount}>4 خانات</Text>
                            </View>
                            <View>
                                <TextInput
                                    ref={otpInputRef}
                                    style={styles.hiddenInput}
                                    keyboardType="number-pad"
                                    textContentType="oneTimeCode"
                                    autoComplete="sms-otp"
                                    maxLength={4}
                                    value={otpCode}
                                    onChangeText={setOtpCode}
                                    autoFocus={true}
                                />
                                <Pressable
                                    style={styles.otpContainer}
                                    onPress={() => otpInputRef.current?.focus()}
                                >
                                    {[0, 1, 2, 3].map((index) => (
                                        <View
                                            key={index}
                                            style={[
                                                styles.otpInput,
                                                otpCode.length === index && { borderColor: COLORS.primary, borderWidth: 2 }
                                            ]}
                                        >
                                            <Text style={styles.otpInputText}>
                                                {otpCode[index] || ''}
                                            </Text>
                                        </View>
                                    ))}
                                </Pressable>
                            </View>
                            <View style={styles.resendContainer}>
                                <Text style={styles.resendLabel}>لم يصلك الرمز؟</Text>
                                <TouchableOpacity onPress={handleResend} disabled={!canResend}>
                                    <Text style={[styles.resendButton, !canResend && { color: COLORS.subtext }]}>
                                        {canResend ? 'إعادة إرسال' : `إعادة إرسال (00:${timer.toString().padStart(2, '0')})`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={styles.divider}>
                        <View style={styles.line} />
                        <Text style={styles.dividerText}>التحقق</Text>
                        <View style={styles.line} />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.primaryButton,
                            step === 1 && !isPhoneValid && styles.disabledButton
                        ]}
                        onPress={step === 1 ? handleSendOtp : handleVerify}
                        disabled={step === 1 && !isPhoneValid}
                    >
                        <Text style={styles.primaryButtonText}>
                            {step === 1 ? 'تسجيل ومتابعة' : 'تحقق ودخول'}
                        </Text>
                        <MaterialIcons name="arrow-back" size={20} color="white" />
                    </TouchableOpacity>

                    <View style={styles.footer}>
                        <View style={styles.loginRow}>
                            <Text style={styles.footerText}>لديك حساب بالفعل؟</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={styles.linkText}>تسجيل الدخول</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.termsText}>
                            من خلال التسجيل، أنت توافق على{' '}
                            <Text
                                style={styles.underline}
                                onPress={() => navigation.navigate('Terms')}
                            >
                                الشروط والأحكام
                            </Text>{' '}
                            و{' '}
                            <Text
                                style={styles.underline}
                                onPress={() => navigation.navigate('PrivacyPolicy')}
                            >
                                سياسة الخصوصية
                            </Text>
                        </Text>

                        {/* Provider Switch */}
                        <TouchableOpacity
                            style={styles.providerSwitch}
                            onPress={() => navigation.navigate('CompanyInfo')}
                        >
                            <Text style={styles.providerSwitchText}>الدخول كمزود خدمة (شركات)</Text>
                            <MaterialIcons name="business" size={16} color={COLORS.subtext} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        marginBottom: 24,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    phoneInputContainer: {
        overflow: 'hidden',
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
    inputIcon: {
        marginRight: 16,
    },
    otpHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 8,
    },
    otpCount: {
        fontSize: 12,
        color: COLORS.subtext,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        direction: 'ltr',
    },
    otpInput: {
        flex: 1,
        height: 56,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    otpInputText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    hiddenInput: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0,
    },
    resendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12,
    },
    resendLabel: {
        fontSize: 12,
        color: COLORS.subtext,
    },
    resendButton: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 24,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: COLORS.border,
    },
    dividerText: {
        marginHorizontal: 12,
        fontSize: 12,
        color: COLORS.subtext,
        backgroundColor: COLORS.backgroundLight,
        paddingHorizontal: 8,
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
    termsText: {
        fontSize: 11,
        color: COLORS.subtext,
        textAlign: 'center',
        paddingHorizontal: 32,
        lineHeight: 18,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    providerSwitch: {
        marginTop: 16,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        opacity: 0.7,
    },
    providerSwitchText: {
        fontSize: 12,
        color: COLORS.subtext,
        fontWeight: '500',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 14,
        marginTop: 8,
        textAlign: 'right',
    },
    disabledButton: {
        backgroundColor: COLORS.subtext,
        shadowOpacity: 0,
        elevation: 0,
    },
});
