import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    iconBg: 'rgba(230, 194, 23, 0.1)', // Light yellow background for icons
};

export default function PersonalDataScreen({ navigation }) {
    const { userData, saveUserData } = useUser();

    // Internal state for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    // Sync state with userData on load
    useEffect(() => {
        if (userData) {
            setName(userData.name || '');
            setEmail(userData.email || '');
            setMobile(userData.phone || '');
        }
    }, [userData]);

    const handleSaveChanges = async () => {
        const success = await saveUserData({
            name,
            email,
            phone: mobile
        });

        if (success) {
            Alert.alert('نجاح', 'تم حفظ التغييرات بنجاح');
        } else {
            Alert.alert('خطأ', 'حدث خطأ أثناء حفظ التغييرات');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>البيانات الشخصية</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>

                {/* Full Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>الاسم الكامل</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconWrapper}>
                            <MaterialIcons name="person" size={20} color={COLORS.primary} />
                        </View>
                        <TextInput
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                            placeholder="الاسم الكامل"
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* Email */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>البريد الإلكتروني</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconWrapper}>
                            <MaterialIcons name="email" size={20} color={COLORS.primary} />
                        </View>
                        <TextInput
                            style={styles.input}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="البريد الإلكتروني"
                            keyboardType="email-address"
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* Mobile Number */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>رقم الجوال</Text>
                    <View style={styles.inputContainer}>
                        <View style={styles.iconWrapper}>
                            <MaterialIcons name="phone" size={20} color={COLORS.primary} />
                        </View>
                        <TextInput
                            style={styles.input}
                            value={mobile}
                            onChangeText={setMobile}
                            placeholder="رقم الجوال"
                            keyboardType="phone-pad"
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* Password Management */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>كلمة المرور</Text>
                    <View style={styles.readOnlyContainer}>
                        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 12, flex: 1 }}>
                            <View style={styles.iconWrapper}>
                                <MaterialIcons name="lock" size={20} color={COLORS.primary} />
                            </View>
                            <Text style={styles.maskedPassword}>********</Text>
                        </View>
                        <TouchableOpacity style={styles.changeButton} onPress={() => navigation.navigate('ChangePassword')}>
                            <Text style={styles.changeButtonText}>تغيير</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>حفظ التغييرات</Text>
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
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 20,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    content: {
        padding: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textDark,
        marginBottom: 8,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'stretch',
        marginRight: 4,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 8,
        height: 56,
        gap: 12,
    },
    readOnlyContainer: {
        width: '100%',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 8,
        height: 56,
    },
    iconWrapper: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: COLORS.iconBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
        height: '100%',
    },
    maskedPassword: {
        fontSize: 18,
        color: COLORS.textDark,
        letterSpacing: 2,
        marginTop: 4,
    },
    changeButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    changeButtonText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.textDark,
    },
    footer: {
        padding: 24,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
});
