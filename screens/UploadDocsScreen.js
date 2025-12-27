import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
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

export default function UploadDocsScreen({ navigation }) {
    const [showHelp, setShowHelp] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [activeUploadField, setActiveUploadField] = useState(null); // 'CR' or 'ID'

    // File state objects: { uri, name, type }
    const [crFile, setCrFile] = useState(null);
    const [idFile, setIdFile] = useState(null);

    const handleUploadDefault = (field) => {
        setActiveUploadField(field);
        setShowUploadModal(true);
    };

    const handleCamera = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('عذراً، نحتاج إلى إذن الكاميرا لالتقاط صورة.');
                return;
            }

            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled) {
                saveFile(result.assets[0]);
            }
        } catch (error) {
            console.log('Error taking photo:', error);
        }
    };

    const handleGallery = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('عذراً، نحتاج إلى إذن الوصول للصور.');
                return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.8,
            });

            if (!result.canceled) {
                saveFile(result.assets[0]);
            }
        } catch (error) {
            console.log('Error picking image:', error);
        }
    };

    const handleDocument = async () => {
        try {
            let result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'image/*'],
                copyToCacheDirectory: true,
            });

            if (!result.canceled) {
                saveFile(result.assets[0]);
            }
        } catch (error) {
            console.log('Error picking document:', error);
        }
    };

    const saveFile = (file) => {
        // file object usually has { uri, name, mimeType, size, etc. }
        // For ImagePicker it might not have 'name', so we can generate or use generic.
        const fileName = file.name || file.uri.split('/').pop() || 'مستند تم رفعه';

        const fileData = {
            uri: file.uri,
            name: fileName,
            type: file.mimeType || 'image/jpeg',
        };

        if (activeUploadField === 'CR') {
            setCrFile(fileData);
        } else if (activeUploadField === 'ID') {
            setIdFile(fileData);
        }

        setShowUploadModal(false);
    };

    const renderUploadBox = (title, fileState, fieldName) => {
        const isUploaded = !!fileState;

        return (
            <View style={styles.uploadSection}>
                <View style={styles.uploadHeader}>
                    <Text style={styles.uploadLabel}>{title}</Text>
                    <View style={styles.requiredBadge}>
                        <Text style={styles.requiredBadgeText}>مطلوب</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={[styles.uploadBox, isUploaded && styles.uploadBoxSuccess]}
                    onPress={() => handleUploadDefault(fieldName)}
                >
                    {isUploaded ? (
                        <>
                            <View style={styles.uploadIconContainerSuccess}>
                                <MaterialIcons name="check-circle" size={32} color={COLORS.primary} />
                            </View>
                            <Text style={styles.uploadText}>{fileState.name}</Text>
                            <Text style={styles.uploadHintSuccess}>تم إرفاق المستند بنجاح</Text>
                        </>
                    ) : (
                        <>
                            <View style={styles.uploadIconContainer}>
                                <MaterialIcons name={fieldName === 'CR' ? 'description' : 'badge'} size={28} color={COLORS.primary} />
                            </View>
                            <Text style={styles.uploadText}>اضغط لرفع {title}</Text>
                            <Text style={styles.uploadHint}>PDF, JPG, PNG (بحد أقصى 5 ميجابايت)</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>توثيق الحساب</Text>
                <TouchableOpacity style={styles.headerButton} onPress={() => setShowHelp(true)}>
                    <MaterialIcons name="help" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Progress Steps */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={[styles.progressStep, styles.progressActive]} />
                    <View style={[styles.progressStep, styles.progressActive]} />
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.title}>إرفاق المستندات</Text>
                    <Text style={styles.subtitle}>
                        لإكمال عملية التسجيل، يرجى إرفاق نسخة سارية المفعول من السجل التجاري والهوية الوطنية للتحقق من الأهلية.
                    </Text>
                </View>

                {/* Security Info Box */}
                <View style={styles.infoBox}>
                    <MaterialIcons name="verified-user" size={24} color={COLORS.primary} />
                    <View style={styles.infoBoxContent}>
                        <Text style={styles.infoBoxTitle}>بياناتك محمية ومشفرة</Text>
                        <Text style={styles.infoBoxText}>يتم استخدام هذه المستندات فقط للتحقق من هوية المنشأة وضمان الموثوقية في السوق.</Text>
                    </View>
                </View>

                {/* CR Upload */}
                {renderUploadBox('السجل التجاري', crFile, 'CR')}

                {/* ID Upload */}
                {renderUploadBox('الهوية الوطنية', idFile, 'ID')}
            </ScrollView>

            {/* Bottom Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => navigation.navigate('VerificationPending')}
                >
                    <Text style={styles.primaryButtonText}>إرسال للتحقق</Text>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.primaryContent} />
                </TouchableOpacity>
                <View style={styles.securityNote}>
                    <MaterialIcons name="lock" size={14} color={COLORS.textLight} />
                    <Text style={styles.securityText}>نحن نضمن سرية وخصوصية بياناتك</Text>
                </View>
            </View>

            {/* Help Modal */}
            <Modal
                visible={showHelp}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setShowHelp(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.helpModalContainer}>
                        <View style={styles.helpHeader}>
                            <MaterialIcons name="security" size={28} color={COLORS.primary} />
                            <Text style={styles.helpTitle}>الخصوصية والأمان</Text>
                        </View>
                        <Text style={styles.helpText}>
                            جميع المستندات مشفرة ومحفوظة بأمان. نطلبها فقط للتحقق من نظامية المنشأة وضمان بيئة آمنة للمستخدمين.
                        </Text>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowHelp(false)}>
                            <Text style={styles.closeButtonText}>حسناً</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Upload Options Modal (Bottom Sheet) */}
            <Modal
                visible={showUploadModal}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setShowUploadModal(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowUploadModal(false)}
                >
                    <View style={styles.bottomSheetContainer}>
                        <Text style={styles.bottomSheetTitle}>خيار الرفع</Text>

                        <TouchableOpacity style={styles.sheetOption} onPress={handleCamera}>
                            <View style={styles.sheetIconBox}>
                                <MaterialIcons name="photo-camera" size={24} color={COLORS.textLight} />
                            </View>
                            <Text style={styles.sheetOptionText}>الكاميرا</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sheetOption} onPress={handleGallery}>
                            <View style={styles.sheetIconBox}>
                                <MaterialIcons name="photo-library" size={24} color={COLORS.textLight} />
                            </View>
                            <Text style={styles.sheetOptionText}>ألبوم الصور</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.sheetOption} onPress={handleDocument}>
                            <View style={styles.sheetIconBox}>
                                <MaterialIcons name="snippet-folder" size={24} color={COLORS.textLight} />
                            </View>
                            <Text style={styles.sheetOptionText}>ملفاتي</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={() => setShowUploadModal(false)}>
                            <Text style={styles.cancelButtonText}>إلغاء</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.subtextLight,
        lineHeight: 24,
        textAlign: 'right',
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
    uploadSection: {
        marginBottom: 24,
    },
    uploadHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    uploadLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textLight,
    },
    requiredBadge: {
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    requiredBadgeText: {
        fontSize: 12,
        fontWeight: '500',
        color: COLORS.primary,
    },
    uploadBox: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: COLORS.borderLight,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
    },
    uploadBoxSuccess: {
        borderStyle: 'solid',
        borderColor: COLORS.primary,
        backgroundColor: 'rgba(230, 194, 23, 0.05)',
    },
    uploadIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: COLORS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    uploadIconContainerSuccess: {
        marginBottom: 12,
    },
    uploadText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 4,
        textAlign: 'center',
    },
    uploadHint: {
        fontSize: 12,
        color: COLORS.subtextLight,
        textAlign: 'center',
    },
    uploadHintSuccess: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
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
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    helpModalContainer: {
        width: '85%',
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    helpHeader: {
        marginBottom: 16,
        alignItems: 'center',
    },
    helpTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginTop: 8,
    },
    helpText: {
        fontSize: 16,
        color: COLORS.subtextLight,
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 24,
    },
    closeButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 24,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primaryContent,
    },
    // Bottom Sheet Styles
    bottomSheetContainer: {
        width: '100%',
        backgroundColor: COLORS.surfaceLight,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        paddingBottom: 40,
        position: 'absolute',
        bottom: 0,
    },
    bottomSheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 24,
        textAlign: 'center',
    },
    sheetOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundLight,
        justifyContent: 'flex-end',
    },
    sheetIconBox: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.backgroundLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16,
    },
    sheetOptionText: {
        fontSize: 16,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    cancelButton: {
        marginTop: 16,
        paddingVertical: 16,
        alignItems: 'center',
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#ff4444',
        fontWeight: 'bold',
    },
});
