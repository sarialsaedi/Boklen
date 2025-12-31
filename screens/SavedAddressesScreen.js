import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textDark: '#181711',
    textGray: '#64748b',
    border: '#e2e8f0',
};

export default function SavedAddressesScreen({ navigation }) {
    const { savedAddresses } = useCart();

    const renderItem = ({ item }) => (
        <View style={styles.addressCard}>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name={item.type === 'home' ? 'home' : 'work'}
                    size={24}
                    color={COLORS.primary}
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.addressTitle}>{item.title}</Text>
                <Text style={styles.addressDetail}>{item.address}</Text>
            </View>
            <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('AddressForm', { address: item })}
            >
                <MaterialIcons name="edit" size={20} color={COLORS.textGray} />
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>العناوين المحفوظة</Text>
                <View style={{ width: 40 }} />
            </View>

            <FlatList
                data={savedAddresses}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <MaterialIcons name="location-off" size={48} color={COLORS.textGray} />
                        <Text style={styles.emptyText}>لا توجد عناوين محفوظة</Text>
                    </View>
                }
            />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddressForm')}
                >
                    <Text style={styles.addButtonText}>إضافة عنوان جديد</Text>
                    <MaterialIcons name="add" size={24} color={COLORS.textDark} />
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
    listContent: {
        padding: 20,
        gap: 16,
        flexGrow: 1,
    },
    addressCard: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        backgroundColor: COLORS.surfaceLight,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(230, 194, 23, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    addressTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    addressDetail: {
        fontSize: 14,
        color: COLORS.textGray,
    },
    editButton: {
        padding: 8,
    },
    footer: {
        padding: 24,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    addButton: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        gap: 16,
        opacity: 0.5,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textGray,
        fontWeight: '500',
    }
});
