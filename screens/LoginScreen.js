import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ca8a04',
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

    const handleLogin = () => {
        // Mock login
        navigation.navigate('UserHome');
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
                                maxLength={9}
                            />
                        </View>
                    </View>

                    <View style={styles.formSection}>
                        <Text style={styles.label}>كلمة المرور</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="******"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.primaryButton}
                        onPress={handleLogin}
                    >
                        <Text style={styles.primaryButtonText}>تسجيل الدخول</Text>
                        <MaterialIcons name="arrow-back" size={20} color="white" />
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
        backgroundColor: 'rgba(202, 138, 4, 0.1)',
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
