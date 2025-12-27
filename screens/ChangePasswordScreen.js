import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useUser } from '../context/UserContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    danger: '#ef4444',
};

export default function ChangePasswordScreen({ navigation }) {
    const { updatePassword } = useUser();

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleUpdatePassword = async () => {
        // Basic Validation
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('خطأ', 'كلمة المرور الجديدة غير متطابقة');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('خطأ', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            return;
        }

        const result = await updatePassword(oldPassword, newPassword);

        if (result.success) {
            Alert.alert('تم بنجاح', result.message, [
                { text: 'حسناً', onPress: () => navigation.goBack() }
            ]);
        } else {
            Alert.alert('خطأ', result.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>تغيير كلمة المرور</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>

                {/* Old Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>كلمة المرور السابقة</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={20} color={COLORS.textGray} />
                        <TextInput
                            style={styles.input}
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            placeholder="********"
                            secureTextEntry
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* New Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>كلمة المرور الجديدة</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={20} color={COLORS.textGray} />
                        <TextInput
                            style={styles.input}
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="********"
                            secureTextEntry
                            textAlign="right"
                        />
                    </View>
                </View>

                {/* Confirm Password */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>إعادة كتابة كلمة المرور</Text>
                    <View style={styles.inputContainer}>
                        <MaterialIcons name="lock-outline" size={20} color={COLORS.textGray} />
                        <TextInput
                            style={styles.input}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="********"
                            secureTextEntry
                            textAlign="right"
                        />
                    </View>
                </View>

            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleUpdatePassword}>
                    <Text style={styles.saveButtonText}>تحديث كلمة المرور</Text>
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
        flex: 1, // Take up remaining space
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
    },
    inputContainer: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 12,
        height: 56,
        gap: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
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
