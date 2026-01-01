import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Modal, Platform, Alert } from 'react-native';
import InfoModal from '../components/InfoModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
};

export default function RepInfoScreen({ navigation }) {
    const [repName, setRepName] = useState('');
    const [nationalId, setNationalId] = useState('');
    const [birthDate, setBirthDate] = useState('');

    // Validation Error States
    const [nameError, setNameError] = useState('');
    const [idError, setIdError] = useState('');
    const [dateError, setDateError] = useState('');

    const [showHelpModal, setShowHelpModal] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1)); // Default to Jan 1, 2000
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDate(currentDate);
            const formatted = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
            setBirthDate(formatted);
            // Clear error when user selects a date
            setDateError('');
            if (Platform.OS === 'android') {
                setShowDatePicker(false);
            }
        } else {
            if (Platform.OS === 'android') {
                setShowDatePicker(false);
            }
        }
    };

    const handleContinue = () => {
        let isValid = true;

        // 1. Validate Representative Name
        const trimmedName = repName.trim();
        const nameParts = trimmedName.split(/\s+/); // Split by whitespace
        if (!trimmedName || nameParts.length < 2) {
            setNameError('يرجى إدخال الاسم الرباعي كما هو في الهوية.');
            isValid = false;
        } else {
            setNameError('');
        }

        // 2. Validate National ID
        // Must be exactly 10 digits and start with '1'
        const idRegex = /^1\d{9}$/;
        if (!idRegex.test(nationalId)) {
            setIdError('رقم الهوية غير صحيح (يجب أن يتكون من 10 أرقام ويبدأ بـ 1).');
            isValid = false;
        } else {
            setIdError('');
        }

        // 3. Validate Date of Birth
        if (!birthDate) {
            setDateError('يرجى اختيار تاريخ الميلاد.');
            isValid = false;
        } else {
            // Calculate age for double validation
            const today = new Date();
            const birthDateObj = date; // 'date' state holds the selected Date object
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const m = today.getMonth() - birthDateObj.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }

            if (age < 18) {
                setDateError('عذراً، يجب أن لا يقل عمر الممثل النظامي عن 18 عاماً للمتابعة.');
                isValid = false;
            } else {
                setDateError('');
            }
        }

        // If all checks pass
        if (isValid) {
            navigation.navigate('UploadDocs');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>توثيق الحساب</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => setShowHelpModal(true)}>
                    <MaterialIcons name="help" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={styles.progressStep} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>بيانات الممثل النظامي</Text>
                    <Text style={styles.subtitle}>
                        يرجى إدخال معلومات ممثل المنشأة كما هي مسجلة في الهوية الوطنية للتحقق من الصلاحيات.
                    </Text>
                </View>

                {/* Info Box */}
                <View style={styles.infoBox}>
                    <MaterialIcons name="shield" size={24} color={COLORS.primary} />
                    <View style={styles.infoBoxContent}>
                        <Text style={styles.infoBoxTitle}>التحقق الإلزامي</Text>
                        <Text style={styles.infoBoxText}>هذه الخطوة ضرورية للتأكد من هوية الشخص المسؤول عن إدارة الحساب.</Text>
                    </View>
                </View>

                {/* Rep Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>اسم ممثل الشركة</Text>
                    <View style={[styles.inputWrapper, nameError ? { borderColor: '#D32F2F' } : null]}>
                        <TextInput
                            style={styles.input}
                            placeholder="الاسم الرباعي كما في الهوية"
                            placeholderTextColor={COLORS.subtextLight}
                            value={repName}
                            onChangeText={(text) => {
                                setRepName(text);
                                if (nameError) setNameError('');
                            }}
                            textAlign="right"
                        />
                        <MaterialIcons name="person" size={20} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </View>
                    {nameError ? (
                        <Text style={{ color: '#D32F2F', fontSize: 12, marginTop: 5, textAlign: 'right' }}>
                            {nameError}
                        </Text>
                    ) : null}
                </View>

                {/* National ID Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>رقم الهوية الوطنية</Text>
                    <View style={[styles.inputWrapper, idError ? { borderColor: '#D32F2F' } : null]}>
                        <TextInput
                            style={styles.input}
                            placeholder="1xxxxxxxxx"
                            placeholderTextColor={COLORS.subtextLight}
                            value={nationalId}
                            onChangeText={(text) => {
                                setNationalId(text);
                                if (idError) setIdError('');
                            }}
                            keyboardType="numeric"
                            maxLength={10}
                            textAlign="right"
                        />
                        <MaterialIcons name="badge" size={20} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </View>
                    {idError ? (
                        <Text style={{ color: '#D32F2F', fontSize: 12, marginTop: 5, textAlign: 'right' }}>
                            {idError}
                        </Text>
                    ) : (
                        <Text style={styles.hint}>يجب أن يتكون الرقم من 10 خانات ويبدأ بـ 1</Text>
                    )}
                </View>

                {/* Birth Date Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>تاريخ الميلاد</Text>
                    <TouchableOpacity
                        style={[styles.inputWrapper, dateError ? { borderColor: '#D32F2F' } : null]}
                        onPress={() => setShowDatePicker(true)}
                    >
                        <Text style={[styles.input, !birthDate && styles.placeholder]}>
                            {birthDate || 'DD/MM/YYYY'}
                        </Text>
                        <MaterialIcons name="calendar-today" size={20} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </TouchableOpacity>
                    {dateError ? (
                        <Text style={{ color: '#D32F2F', fontSize: 12, marginTop: 5, textAlign: 'right' }}>
                            {dateError}
                        </Text>
                    ) : null}
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={onChangeDate}
                            maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 18))} // 18 years ago
                        />
                    )}
                </View>
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleContinue}
                >
                    <Text style={styles.primaryButtonText}>متابعة</Text>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.primaryContent} />
                </TouchableOpacity>
                <View style={styles.securityNote}>
                    <MaterialIcons name="lock" size={14} color={COLORS.textLight} />
                    <Text style={styles.securityText}>جميع البيانات مشفرة ومحفوظة بأمان</Text>
                </View>
            </View>

            {/* Help Modal */}
            <InfoModal
                visible={showHelpModal}
                onClose={() => setShowHelpModal(false)}
                title="لماذا نحتاج هذه المعلومات؟"
                message="نحتاج بيانات هويتك للتحقق من هويتك وفق الأنظمة السعودية."
            />
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
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginBottom: 32,
    },
    progressStep: {
        flex: 1,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.borderLight,
    },
    progressActive: {
        backgroundColor: COLORS.primary,
    },
    titleSection: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 8,
        textAlign: 'right',
        width: '100%',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtextLight,
        lineHeight: 24,
        textAlign: 'right',
        width: '100%',
    },
    infoBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(230, 194, 23, 0.2)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        alignItems: 'flex-start',
    },
    infoBoxContent: {
        flex: 1,
        marginLeft: 12,
    },
    infoBoxTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textLight,
        textAlign: 'right',
    },
    infoBoxText: {
        fontSize: 12,
        color: COLORS.subtextLight,
        marginTop: 4,
        textAlign: 'right',
    },
    inputGroup: {
        marginBottom: 24,
        alignItems: 'flex-end',
        width: '100%',
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 8,
        textAlign: 'right',
        width: '100%',
        alignSelf: 'stretch',
    },
    inputWrapper: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
        width: '100%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.textLight,
        textAlign: 'right',
    },
    placeholder: {
        color: COLORS.subtextLight,
    },
    inputIcon: {
        marginLeft: 12,
    },
    hint: {
        fontSize: 12,
        color: COLORS.subtextLight,
        marginTop: 8,
        textAlign: 'right',
    },
    bottomContainer: {
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.borderLight,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 12,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
        marginRight: 8,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
        opacity: 0.6,
    },
    securityText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginLeft: 6,
    },
});
