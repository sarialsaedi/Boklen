import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, I18nManager, Modal, FlatList, TouchableWithoutFeedback, Alert } from 'react-native';
import InfoModal from '../components/InfoModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

// Enable RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
};

const ENTITY_TYPES = [
    { id: '1', label: 'مؤسسة فردية' },
    { id: '2', label: 'شركة ذات مسؤولية محدودة' },
    { id: '3', label: 'شركة مساهمة مبسطة' },
    { id: '4', label: 'شركة مساهمة عامة' },
    { id: '5', label: 'شركة تضامن' },
    { id: '6', label: 'شركة مهنية' },
    { id: '7', label: 'فرع شركة أجنبية' },
];

export default function CompanyInfoScreen({ navigation }) {
    const [companyName, setCompanyName] = useState('');
    const [companyType, setCompanyType] = useState('');
    const [crNumber, setCrNumber] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [helpModalVisible, setHelpModalVisible] = useState(false);

    const handleSelectType = (type) => {
        setCompanyType(type);
        setModalVisible(false);
    };

    const handleHelpPress = () => {
        setHelpModalVisible(true);
    };

    const validateForm = () => {
        // 1. Company Name Validation
        if (!companyName.trim()) {
            Alert.alert('خطأ', 'يرجى إدخال اسم المنشأة.');
            return false;
        }

        // 2. Entity Type Validation
        if (!companyType) {
            Alert.alert('خطأ', 'يرجى اختيار نوع الكيان.');
            return false;
        }

        // 3. Commercial Registration No (CR) Validation
        // Must be exactly 10 digits, numeric, and start with 10, 40, or 70
        const crRegex = /^(10|40|70)\d{8}$/;
        if (!crRegex.test(crNumber)) {
            Alert.alert(
                'خطأ',
                'رقم السجل التجاري غير صحيح. يجب أن يتكون من 10 أرقام ويبدأ بـ 10 أو 40 أو 70.'
            );
            return false;
        }

        return true;
    };

    const handleContinue = () => {
        if (validateForm()) {
            navigation.navigate('RepInfo');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>معلومات المنشأة</Text>
                <TouchableOpacity style={styles.headerButton} onPress={handleHelpPress}>
                    <MaterialIcons name="help" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={styles.progressStep} />
                    <View style={styles.progressStep} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>بيانات الشركة الأساسية</Text>
                    <Text style={styles.subtitle}>
                        يرجى إدخال تفاصيل المنشأة بدقة كما هي واردة في السجل التجاري لضمان سرعة التحقق.
                    </Text>
                </View>

                {/* Company Name Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>اسم المنشأة <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="أدخل اسم الشركة الرسمي"
                            placeholderTextColor={COLORS.subtextLight}
                            value={companyName}
                            onChangeText={setCompanyName}
                            textAlign="right"
                        />
                        <MaterialIcons name="business" size={20} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </View>
                </View>

                {/* Company Type Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>نوع الكيان <Text style={styles.required}>*</Text></Text>
                    <TouchableOpacity style={styles.inputWrapper} onPress={() => setModalVisible(true)}>
                        <Text style={[styles.input, !companyType && styles.placeholder]}>
                            {companyType || 'اختر نوع الشركة'}
                        </Text>
                        <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </TouchableOpacity>
                </View>

                {/* CR Number Input */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>رقم السجل التجاري <Text style={styles.required}>*</Text></Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="70xxxxxxxx"
                            placeholderTextColor={COLORS.subtextLight}
                            value={crNumber}
                            onChangeText={setCrNumber}
                            keyboardType="numeric"
                            textAlign="right"
                        />
                        <MaterialIcons name="badge" size={20} color={COLORS.subtextLight} style={styles.inputIcon} />
                    </View>
                    <Text style={styles.hint}>يجب أن يتكون من 10 أرقام ويبدأ بـ 40, 10, 70...</Text>
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
                    <Text style={styles.securityText}>جميع البيانات المدخلة مشفرة وآمنة</Text>
                </View>
            </View>

            {/* Entity Type Dropdown Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalTitle}>اختر نوع الكيان</Text>
                                <TouchableOpacity onPress={() => setModalVisible(false)}>
                                    <MaterialIcons name="close" size={24} color={COLORS.textLight} />
                                </TouchableOpacity>
                            </View>
                            <FlatList
                                data={ENTITY_TYPES}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        style={styles.modalItem}
                                        onPress={() => handleSelectType(item.label)}
                                    >
                                        <Text style={[
                                            styles.modalItemText,
                                            companyType === item.label && styles.selectedItemText
                                        ]}>
                                            {item.label}
                                        </Text>
                                        {companyType === item.label && (
                                            <MaterialIcons name="check" size={20} color={COLORS.primary} />
                                        )}
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Help Modal */}
            <InfoModal
                visible={helpModalVisible}
                onClose={() => setHelpModalVisible(false)}
                title="لماذا نحتاج هذه المعلومات؟"
                message="يرجى إدخال بيانات المنشأة بدقة كما هي مسجلة في وزارة التجارة لضمان سرعة توثيق الحساب."
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
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 8,
        textAlign: 'right',
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtextLight,
        lineHeight: 24,
        textAlign: 'right',
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textLight,
        marginBottom: 8,
        textAlign: 'right',
    },
    required: {
        color: '#ef4444',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.surfaceLight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '70%',
        paddingBottom: 20,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    modalItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight,
    },
    modalItemText: {
        fontSize: 16,
        color: COLORS.textLight,
    },
    selectedItemText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});
