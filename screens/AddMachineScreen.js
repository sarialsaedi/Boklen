import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
};

export default function AddMachineScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>إضافة معدة جديدة</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.sectionTitle}>صور المعدة</Text>
                <Text style={styles.sectionSubtitle}>أضف صور واضحة للمعدة من زوايا متعددة</Text>

                <View style={styles.imageGrid}>
                    <TouchableOpacity style={styles.uploadBox}>
                        <MaterialIcons name="add-a-photo" size={30} color={COLORS.primary} />
                        <Text style={styles.uploadText}>إضافة</Text>
                    </TouchableOpacity>
                    <View style={styles.imagePlaceholder} />
                    <View style={styles.imagePlaceholder} />
                </View>

                <Text style={styles.sectionTitle}>نوع المعدة</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                    <TouchableOpacity style={[styles.chip, styles.chipActive]}>
                        <MaterialIcons name="agriculture" size={16} color={COLORS.primaryContent} />
                        <Text style={styles.chipTextActive}>معدات ثقيلة</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chip}>
                        <MaterialIcons name="handyman" size={16} color={COLORS.subtextLight} />
                        <Text style={styles.chipText}>معدات خفيفة</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.chip}>
                        <MaterialIcons name="local-shipping" size={16} color={COLORS.subtextLight} />
                        <Text style={styles.chipText}>صهاريج</Text>
                    </TouchableOpacity>
                </ScrollView>

                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>الماركة</Text>
                        <TouchableOpacity style={styles.select}>
                            <Text style={styles.selectText}>كاتربيلر (CAT)</Text>
                            <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputGroup, { flex: 0.4 }]}>
                        <Text style={styles.label}>الموديل</Text>
                        <TouchableOpacity style={styles.select}>
                            <Text style={styles.selectText}>2024</Text>
                            <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>المدينة</Text>
                    <TouchableOpacity style={styles.select}>
                        <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                        <Text style={[styles.selectText, { flex: 1 }]}>الرياض</Text>
                        <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                    </TouchableOpacity>
                </View>

                <Text style={[styles.sectionTitle, { marginTop: 24 }]}>سعر الإيجار</Text>
                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>يومي</Text>
                        <View style={styles.priceInput}>
                            <Text style={styles.priceValue}>1500</Text>
                            <Text style={styles.priceCurrency}>ر.س</Text>
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>شهري</Text>
                        <View style={styles.priceInput}>
                            <Text style={styles.priceValue}>30000</Text>
                            <Text style={styles.priceCurrency}>ر.س</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.primaryButton}>
                    <Text style={styles.primaryButtonText}>إضافة للمخزون</Text>
                    <MaterialIcons name="check" size={24} color={COLORS.primaryContent} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.backgroundLight },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },
    scrollView: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 32 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.textLight, textAlign: 'right', marginBottom: 8 },
    sectionSubtitle: { fontSize: 14, color: COLORS.subtextLight, textAlign: 'right', marginBottom: 16 },
    imageGrid: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    uploadBox: { flex: 1, aspectRatio: 1, backgroundColor: COLORS.surfaceLight, borderWidth: 2, borderStyle: 'dashed', borderColor: 'rgba(230, 194, 23, 0.5)', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    uploadText: { fontSize: 12, color: COLORS.primary, marginTop: 4 },
    imagePlaceholder: { flex: 1, aspectRatio: 1, backgroundColor: '#e5e7eb', borderRadius: 12 },
    chipsContainer: { marginBottom: 24 },
    chip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderWidth: 1, borderColor: COLORS.borderLight, borderRadius: 12, paddingHorizontal: 20, paddingVertical: 10, marginRight: 12, gap: 8 },
    chipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
    chipText: { fontSize: 14, fontWeight: '500', color: COLORS.textLight },
    chipTextActive: { fontSize: 14, fontWeight: 'bold', color: COLORS.primaryContent },
    row: { flexDirection: 'row', gap: 16 },
    inputGroup: { flex: 1, marginBottom: 16 },
    label: { fontSize: 14, fontWeight: '600', color: COLORS.textLight, marginBottom: 8, textAlign: 'right' },
    select: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.surfaceLight, borderWidth: 1, borderColor: COLORS.borderLight, borderRadius: 12, paddingHorizontal: 16, height: 48 },
    selectText: { fontSize: 16, color: COLORS.textLight, textAlign: 'right' },
    priceInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.surfaceLight, borderWidth: 1, borderColor: COLORS.borderLight, borderRadius: 12, paddingHorizontal: 16, height: 48 },
    priceValue: { fontSize: 16, fontWeight: '500', color: COLORS.textLight },
    priceCurrency: { fontSize: 12, fontWeight: 'bold', color: COLORS.subtextLight },
    bottomContainer: { padding: 16, backgroundColor: COLORS.surfaceLight, borderTopWidth: 1, borderTopColor: COLORS.borderLight },
    primaryButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, height: 56, borderRadius: 12, gap: 8 },
    primaryButtonText: { fontSize: 18, fontWeight: 'bold', color: COLORS.primaryContent },
});
