import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput, Alert, Image, KeyboardAvoidingView, Platform, Modal, FlatList, TouchableWithoutFeedback, Animated, Dimensions } from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
};

// Data Lists
const BRANDS = ['Caterpillar (CAT)', 'Komatsu', 'Volvo', 'JCB', 'Bobcat', 'Hitachi', 'Hyundai', 'Doosan', 'Liebherr', 'Case', 'Sany', 'Toyota'];
const CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر', 'تبوك', 'أبها', 'جازان', 'حائل', 'القصيم', 'الطائف'];
const YEARS = Array.from({ length: 36 }, (_, i) => (2025 - i).toString()); // 2025 down to 1990

export default function AddMachineScreen({ navigation }) {
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState(null); // 'heavy', 'light', 'tankers'
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [city, setCity] = useState('');
    const [dailyPrice, setDailyPrice] = useState('');
    const [monthlyPrice, setMonthlyPrice] = useState('');

    // Animation
    const slideAnim = useRef(new Animated.Value(-100)).current; // Start off-screen
    const [toastVisible, setToastVisible] = useState(false);

    // Validation Errors State
    const [errors, setErrors] = useState({
        images: '',
        category: '',
        brand: '',
        model: '',
        city: '',
        dailyPrice: '',
        monthlyPrice: '',
    });

    // Modal State
    const [modalVisible, setModalVisible] = useState(false);
    const [modalType, setModalType] = useState(null); // 'brand', 'model', 'city'

    const openModal = (type) => {
        setModalType(type);
        setModalVisible(true);
    };

    const handleSelectOption = (item) => {
        if (modalType === 'brand') setBrand(item);
        if (modalType === 'model') setModel(item);
        if (modalType === 'city') setCity(item);
        setModalVisible(false);
    };

    const getModalData = () => {
        if (modalType === 'brand') return BRANDS;
        if (modalType === 'model') return YEARS;
        if (modalType === 'city') return CITIES;
        return [];
    };

    const getModalTitle = () => {
        if (modalType === 'brand') return 'اختر الماركة';
        if (modalType === 'model') return 'سنة الموديل';
        if (modalType === 'city') return 'اختر المدينة';
        if (modalType === 'imagePicker') return 'إضافة صورة';
        return '';
    };

    const handleAddToStock = () => {
        let isValid = true;
        let newErrors = {
            images: '',
            category: '',
            brand: '',
            model: '',
            city: '',
            dailyPrice: '',
            monthlyPrice: '',
        };

        if (images.length === 0) {
            newErrors.images = "الرجاء وضع صورة للمعدة لتوضيح حالتها";
            isValid = false;
        }

        if (!category) {
            newErrors.category = "الرجاء اختيار نوع المعدة";
            isValid = false;
        }

        if (!brand) {
            newErrors.brand = "الرجاء اختيار الصنف";
            isValid = false;
        }

        if (!model) {
            newErrors.model = "الرجاء اختيار العام";
            isValid = false;
        }

        if (!city) {
            newErrors.city = "يرجى اختيار المدينة";
            isValid = false;
        }

        const dPrice = parseFloat(dailyPrice);
        const mPrice = parseFloat(monthlyPrice);

        if (!dailyPrice || isNaN(dPrice) || dPrice <= 0) {
            newErrors.dailyPrice = "يرجى إدخال السعر";
            isValid = false;
        }

        if (!monthlyPrice || isNaN(mPrice) || mPrice <= 0) {
            newErrors.monthlyPrice = "يرجى إدخال السعر";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        Alert.alert("نجاح", "تمت إضافة المعدة بنجاح", [
            { text: "حسنًا", onPress: () => navigation.goBack() }
        ]);
    };

    const pickImage = async (source) => {
        try {
            let result;
            if (source === 'camera') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('عذراً', 'نحتاج إذن الكاميرا لالتقاط الصور.');
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.8,
                });
            } else if (source === 'library') {
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    quality: 0.8,
                });
            } else if (source === 'files') {
                const docResult = await DocumentPicker.getDocumentAsync({
                    type: 'image/*',
                    copyToCacheDirectory: true,
                });
                if (docResult.assets && docResult.assets.length > 0) {
                    result = { canceled: false, assets: [{ uri: docResult.assets[0].uri }] };
                } else {
                    result = { canceled: true };
                }
            }

            if (result && !result.canceled && result.assets && result.assets.length > 0) {
                setImages([...images, result.assets[0].uri]);
            }
        } catch (error) {
            console.log('Error picking image:', error);
            Alert.alert('خطأ', 'حدث خطأ أثناء اختيار الصورة.');
        }
    };

    const handleAddImage = () => {
        setModalType('imagePicker');
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>إضافة معدة جديدة</Text>
                <View style={{ width: 24 }} />
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
                keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
            >
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <Text style={styles.sectionTitle}>صور المعدة</Text>
                    <Text style={styles.sectionSubtitle}>أضف صور واضحة للمعدة من زوايا متعددة</Text>

                    <View style={styles.imageGrid}>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleAddImage}>
                            <MaterialIcons name="add-a-photo" size={30} color={COLORS.primary} />
                            <Text style={styles.uploadText}>إضافة</Text>
                        </TouchableOpacity>
                        {images.map((img, index) => (
                            <View key={index} style={styles.imagePlaceholder}>
                                <Image source={{ uri: img }} style={{ width: '100%', height: '100%', borderRadius: 12 }} />
                            </View>
                        ))}
                        {images.length < 2 && <View style={styles.imagePlaceholder} />}
                    </View>
                    {errors.images ? (
                        <Text style={styles.errorText}>{errors.images}</Text>
                    ) : null}

                    <Text style={styles.sectionTitle}>نوع المعدة</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                        <TouchableOpacity
                            style={[styles.chip, category === 'heavy' && styles.chipActive]}
                            onPress={() => setCategory('heavy')}
                        >
                            <MaterialIcons name="agriculture" size={16} color={category === 'heavy' ? COLORS.primaryContent : COLORS.subtextLight} />
                            <Text style={category === 'heavy' ? styles.chipTextActive : styles.chipText}>معدات ثقيلة</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.chip, category === 'light' && styles.chipActive]}
                            onPress={() => setCategory('light')}
                        >
                            <MaterialIcons name="handyman" size={16} color={category === 'light' ? COLORS.primaryContent : COLORS.subtextLight} />
                            <Text style={category === 'light' ? styles.chipTextActive : styles.chipText}>معدات خفيفة</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.chip, category === 'tankers' && styles.chipActive]}
                            onPress={() => setCategory('tankers')}
                        >
                            <MaterialIcons name="local-shipping" size={16} color={category === 'tankers' ? COLORS.primaryContent : COLORS.subtextLight} />
                            <Text style={category === 'tankers' ? styles.chipTextActive : styles.chipText}>صهاريج</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    {errors.category ? (
                        <Text style={[styles.errorText, { marginTop: -16, marginBottom: 16 }]}>{errors.category}</Text>
                    ) : null}

                    <View style={styles.row}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>الماركة</Text>
                            <TouchableOpacity style={styles.select} onPress={() => openModal('brand')}>
                                <Text style={styles.selectText}>{brand || 'اختر الماركة'}</Text>
                                <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                            </TouchableOpacity>
                            {errors.brand ? <Text style={styles.errorText}>{errors.brand}</Text> : null}
                        </View>
                        <View style={[styles.inputGroup, { flex: 0.4 }]}>
                            <Text style={styles.label}>الموديل</Text>
                            <TouchableOpacity style={styles.select} onPress={() => openModal('model')}>
                                <Text style={styles.selectText}>{model || 'السنة'}</Text>
                                <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                            </TouchableOpacity>
                            {errors.model ? <Text style={styles.errorText}>{errors.model}</Text> : null}
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>المدينة</Text>
                        <TouchableOpacity style={styles.select} onPress={() => openModal('city')}>
                            <MaterialIcons name="location-on" size={20} color={COLORS.primary} />
                            <Text style={[styles.selectText, { flex: 1 }]}>{city || 'اختر المدينة'}</Text>
                            <MaterialIcons name="expand-more" size={24} color={COLORS.subtextLight} />
                        </TouchableOpacity>
                        {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}
                    </View>

                    <Text style={[styles.sectionTitle, { marginTop: 24 }]}>سعر الإيجار</Text>
                    <View style={styles.row}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>يومي</Text>
                            <View style={styles.priceInput}>
                                <TextInput
                                    style={[styles.priceValue, { flex: 1, textAlign: 'right' }]}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={dailyPrice}
                                    onChangeText={setDailyPrice}
                                />
                                <Text style={styles.priceCurrency}>ر.س</Text>
                            </View>
                            {errors.dailyPrice ? <Text style={styles.errorText}>{errors.dailyPrice}</Text> : null}
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>شهري</Text>
                            <View style={styles.priceInput}>
                                <TextInput
                                    style={[styles.priceValue, { flex: 1, textAlign: 'right' }]}
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={monthlyPrice}
                                    onChangeText={setMonthlyPrice}
                                />
                                <Text style={styles.priceCurrency}>ر.س</Text>
                            </View>
                            {errors.monthlyPrice ? <Text style={styles.errorText}>{errors.monthlyPrice}</Text> : null}
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleAddToStock}>
                    <Text style={styles.primaryButtonText}>إضافة للمخزون</Text>
                    <MaterialIcons name="check" size={24} color={COLORS.primaryContent} />
                </TouchableOpacity>
            </View>

            {/* Selection Modal */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                        <TouchableWithoutFeedback>
                            <View style={styles.modalContent}>
                                <View style={styles.modalHeader}>
                                    <Text style={styles.modalTitle}>{getModalTitle()}</Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <MaterialIcons name="close" size={24} color={COLORS.subtextLight} />
                                    </TouchableOpacity>
                                </View>
                                {modalType === 'imagePicker' ? (
                                    <View>
                                        <TouchableOpacity style={styles.actionSheetItem} onPress={() => { setModalVisible(false); setTimeout(() => pickImage('library'), 500); }}>
                                            <View style={styles.actionSheetRow}>
                                                <MaterialIcons name="photo-library" size={24} color={COLORS.primary} />
                                                <Text style={styles.actionSheetText}>ألبوم الصور</Text>
                                            </View>
                                            <MaterialIcons name="chevron-left" size={24} color={COLORS.subtextLight} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionSheetItem} onPress={() => { setModalVisible(false); setTimeout(() => pickImage('camera'), 500); }}>
                                            <View style={styles.actionSheetRow}>
                                                <MaterialIcons name="camera-alt" size={24} color={COLORS.primary} />
                                                <Text style={styles.actionSheetText}>الكاميرا</Text>
                                            </View>
                                            <MaterialIcons name="chevron-left" size={24} color={COLORS.subtextLight} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionSheetItem} onPress={() => { setModalVisible(false); setTimeout(() => pickImage('files'), 500); }}>
                                            <View style={styles.actionSheetRow}>
                                                <MaterialIcons name="folder" size={24} color={COLORS.primary} />
                                                <Text style={styles.actionSheetText}>ملفاتي</Text>
                                            </View>
                                            <MaterialIcons name="chevron-left" size={24} color={COLORS.subtextLight} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.actionSheetItem, { borderBottomWidth: 0, marginTop: 8 }]} onPress={() => setModalVisible(false)}>
                                            <View style={[styles.actionSheetRow, { justifyContent: 'center', width: '100%' }]}>
                                                <Text style={[styles.actionSheetText, { color: 'red', fontWeight: 'bold' }]}>إلغاء</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <FlatList
                                        data={getModalData()}
                                        keyExtractor={(item) => item}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectOption(item)}>
                                                <Text style={styles.modalItemText}>{item}</Text>
                                                {(brand === item || model === item || city === item) && (
                                                    <MaterialIcons name="check" size={20} color={COLORS.primary} />
                                                )}
                                            </TouchableOpacity>
                                        )}
                                    />
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Success Toast */}
            {
                toastVisible && (
                    <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]}>
                        <View style={styles.toastContent}>
                            <MaterialIcons name="check-circle" size={24} color="#ffffff" />
                            <Text style={styles.toastText}>تمت إضافة المعدة بنجاح</Text>
                        </View>
                    </Animated.View>
                )
            }
        </SafeAreaView >
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
    // Modal Styles
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: COLORS.surfaceLight, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '60%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },
    modalItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    modalItemText: { fontSize: 16, color: COLORS.textLight },
    // Action Sheet Styles
    actionSheetItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.borderLight, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    actionSheetRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    actionSheetText: { fontSize: 16, fontWeight: '500', color: COLORS.textLight },
    errorText: { color: 'red', fontSize: 12, textAlign: 'right', marginTop: 5 },
});
