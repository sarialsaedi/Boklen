import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217',
    primaryContent: '#181711',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
};

const InfoModal = ({ visible, onClose, title, message }) => {
    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{title}</Text>
                            <Text style={styles.modalBody}>{message}</Text>
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={onClose}
                            >
                                <Text style={styles.modalCloseButtonText}>حسنًا</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    modalContent: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 20,
        padding: 24,
        width: '100%',
        maxWidth: 320,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textLight,
        marginBottom: 12,
        textAlign: 'center',
    },
    modalBody: {
        fontSize: 14,
        color: COLORS.subtextLight,
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    modalCloseButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        width: '100%',
        borderRadius: 12,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: COLORS.primaryContent,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default InfoModal;
