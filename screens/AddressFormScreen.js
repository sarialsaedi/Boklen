import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
    red: '#ef4444',
};

const CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة'];

export default function AddressFormScreen({ navigation, route }) {
    const { addAddress, updateAddress } = useCart();
    const existingAddress = route.params?.address;
    const isEditing = !!existingAddress;

    const [city, setCity] = useState(existingAddress?.city || CITIES[0]);
    const [district, setDistrict] = useState(existingAddress?.district || '');
    const [type, setType] = useState(existingAddress?.type || 'home'); // 'home' or 'work'
    const [isCityOpen, setIsCityOpen] = useState(false);
    const [title, setTitle] = useState(existingAddress?.title || (existingAddress?.type === 'work' ? 'العمل' : 'المنزل'));

    const handleSave = () => {
        if (!district.trim()) {
            alert('الرجاء إدخال اسم الحي');
            return;
        }

        const addressData = {
            title: type === 'home' ? 'المنزل' : 'العمل',
            city,
            district,
            type,
            address: `${district}، ${city}` // Construct composite address string for display
        };

        if (isEditing) {
            updateAddress(existingAddress.id, addressData);
        } else {
            addAddress(addressData);
        }

        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{isEditing ? 'تعديل العنوان' : 'إضافة عنوان جديد'}</Text>
                    <View style={{ width: 40 }} />
                </View>

                <ScrollView contentContainerStyle={styles.content}>

                    {/* City Dropdown */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>المدينة</Text>
                        <TouchableOpacity
                            style={styles.dropdownButton}
                            onPress={() => setIsCityOpen(!isCityOpen)}
                        >
                            <MaterialIcons name="arrow-drop-down" size={24} color={COLORS.textGray} />
                            <Text style={styles.inputText}>{city}</Text>
                        </TouchableOpacity>

                        {isCityOpen && (
                            <View style={styles.dropdownList}>
                                {CITIES.map((c, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setCity(c);
                                            setIsCityOpen(false);
                                        }}
                                    >
                                        <Text style={[styles.dropdownItemText, city === c && styles.selectedText]}>{c}</Text>
                                        {city === c && <MaterialIcons name="check" size={20} color={COLORS.primary} />}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* District Input */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>الحي</Text>
                        <TextInput
                            style={styles.input}
                            value={district}
                            onChangeText={setDistrict}
                            placeholder="اسم الحي"
                            textAlign="right"
                        />
                    </View>

                    {/* Address Type */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>نوع العنوان</Text>
                        <View style={styles.typeContainer}>
                            <TouchableOpacity
                                style={[styles.typeButton, type === 'work' && styles.selectedType]}
                                onPress={() => setType('work')}
                            >
                                <MaterialIcons
                                    name="work"
                                    size={20}
                                    color={type === 'work' ? COLORS.textDark : COLORS.textGray}
                                />
                                <Text style={[styles.typeText, type === 'work' && styles.selectedTypeText]}>العمل</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.typeButton, type === 'home' && styles.selectedType]}
                                onPress={() => setType('home')}
                            >
                                <MaterialIcons
                                    name="home"
                                    size={20}
                                    color={type === 'home' ? COLORS.textDark : COLORS.textGray}
                                />
                                <Text style={[styles.typeText, type === 'home' && styles.selectedTypeText]}>المنزل</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>

                {/* Footer Button */}
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveButtonText}>حفظ العنوان</Text>
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
        padding: 20,
        gap: 24,
    },
    inputGroup: {
        gap: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    input: {
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        padding: 16,
    },
    inputText: {
        fontSize: 16,
        color: COLORS.textDark,
        textAlign: 'right',
        flex: 1,
    },
    dropdownList: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        marginTop: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 8,
    },
    dropdownItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundLight,
    },
    dropdownItemText: {
        fontSize: 16,
        color: COLORS.textDark,
    },
    selectedText: {
        color: COLORS.primary, // Using primary yellow for selection text might be hard to read on white, but requested to stick to theme. Checking standard text color usage.
        fontWeight: 'bold',
        color: COLORS.textDark // keeping text dark but bold for better readability, check icon is primary
    },
    typeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    typeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 12,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
    },
    selectedType: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    typeText: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    selectedTypeText: {
        color: COLORS.textDark,
        fontWeight: 'bold',
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
