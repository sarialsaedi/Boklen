import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#ecc813',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
};

export default function LanguageSettingsScreen({ navigation }) {
    const [selectedLanguage, setSelectedLanguage] = useState('ar');

    const languages = [
        { code: 'ar', label: 'العربية', native: 'العربية' },
        { code: 'en', label: 'English', native: 'English' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>اللغة</Text>
                <View style={{ width: 40 }} />
            </View>

            <View style={styles.content}>
                {languages.map((lang) => (
                    <TouchableOpacity
                        key={lang.code}
                        style={[
                            styles.languageItem,
                            selectedLanguage === lang.code && styles.selectedItem
                        ]}
                        onPress={() => setSelectedLanguage(lang.code)}
                    >
                        <View style={styles.radioContainer}>
                            {selectedLanguage === lang.code && (
                                <View style={styles.radioInner} />
                            )}
                        </View>
                        <Text style={[
                            styles.languageText,
                            selectedLanguage === lang.code && styles.selectedText
                        ]}>{lang.native}</Text>
                    </TouchableOpacity>
                ))}
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
        gap: 16,
    },
    languageItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surfaceLight,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    selectedItem: {
        borderColor: COLORS.primary,
        backgroundColor: '#fffdf5',
    },
    languageText: {
        fontSize: 16,
        color: COLORS.textDark,
        fontWeight: '500',
    },
    selectedText: {
        color: COLORS.textDark,
        fontWeight: 'bold',
    },
    radioContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
});
