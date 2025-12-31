import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const COLORS = {
    error: {
        background: '#FFEBEE',
        text: '#D32F2F',
        icon: '#D32F2F',
        border: '#FFCDD2'
    },
    success: {
        background: '#FEF9C3', // Light yellow/gold to match app theme
        text: '#854D0E',
        icon: '#E6C217', // Primary Gold
        border: '#FEF08A'
    }
};

export default function TopNotificationBanner({
    visible,
    type = 'error', // 'error' | 'success'
    message,
    onDismiss,
    onAction
}) {
    const translateY = useRef(new Animated.Value(-150)).current;

    // Config based on type
    const config = type === 'success' ? COLORS.success : COLORS.error;
    const iconName = type === 'success' ? 'check-circle' : 'error';

    useEffect(() => {
        if (visible) {
            // Slide down
            Animated.timing(translateY, {
                toValue: 0,
                duration: 400,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            }).start();

            // Auto-hide for errors only
            if (type === 'error') {
                const timer = setTimeout(() => {
                    hide();
                }, 3000);
                return () => clearTimeout(timer);
            }
        } else {
            hide();
        }
    }, [visible, type]);

    const hide = () => {
        Animated.timing(translateY, {
            toValue: -150,
            duration: 300,
            useNativeDriver: true,
            easing: Easing.in(Easing.cubic),
        }).start(() => {
            if (visible && onDismiss) {
                onDismiss();
            }
        });
    };

    const handleAction = () => {
        if (onAction) onAction();
    };

    const handleDismiss = () => {
        hide();
    };

    if (!visible && translateY._value === -150) return null;

    return (
        <Animated.View
            style={[
                styles.container,
                { transform: [{ translateY }] },
                { backgroundColor: config.background, borderColor: config.border }
            ]}
        >
            <SafeAreaView edges={['top']}>
                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name={iconName} size={28} color={config.icon} />
                    </View>

                    <View style={styles.messageContainer}>
                        <Text style={[styles.title, { color: config.text }]}>
                            {type === 'success' ? 'تمت الإضافة' : 'تنبيه'}
                        </Text>
                        <Text style={[styles.message, { color: config.text }]}>
                            {message}
                        </Text>

                        {/* Actions for Success Type */}
                        {type === 'success' && (
                            <View style={styles.actionsRow}>
                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: 'rgba(0,0,0,0.05)' }]}
                                    onPress={handleDismiss}
                                >
                                    <Text style={[styles.actionText, { color: config.text }]}>متابعة التسوق</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionBtn, { backgroundColor: config.icon }]}
                                    onPress={handleAction}
                                >
                                    <Text style={[styles.actionText, { color: '#000' }]}>مراجعة الطلب</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    {/* Close Button for Error Type */}
                    {type === 'error' && (
                        <TouchableOpacity onPress={handleDismiss} style={styles.closeBtn}>
                            <MaterialIcons name="close" size={20} color={config.text} />
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000, // High z-index to cover header
        borderBottomWidth: 1,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 10,
    },
    content: {
        padding: 16,
        paddingBottom: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    iconContainer: {
        marginRight: 12,
        marginTop: 2,
    },
    messageContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'left',
    },
    message: {
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'left',
        opacity: 0.9,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 12,
    },
    actionBtn: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionText: {
        fontSize: 13,
        fontWeight: 'bold',
    },
    closeBtn: {
        padding: 4,
        marginLeft: 8,
    }
});
