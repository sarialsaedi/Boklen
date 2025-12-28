import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217', // Yellow
    primaryContent: '#181711',
    backgroundLight: '#f8f8f6',
    surfaceLight: '#ffffff',
    textLight: '#181711',
    subtextLight: '#5f5e55',
    borderLight: '#e6e4db',
    green: '#22c55e',
    amber: '#f59e0b',
    red: '#ef4444',
    rentedBg: '#fef3c7', // amber-100
    rentedText: '#92400e', // amber-800
    rentedActiveBg: '#FFEBEE', // Very Light Pale Pink
    rentedActiveText: '#C62828', // Dark Red
    availableBg: '#dcfce7', // green-100
    availableText: '#166534', // green-800
    allActiveBg: '#FFF8E1', // Very Light Pale Yellow
    allActiveBorder: '#FBC02D', // Dark Golden-Yellow
    allActiveText: '#FBC02D', // Dark Golden-Yellow
};

// Mock Data with extended fields
const MOCK_FLEET_DATA = [
    {
        id: '1',
        nameAr: 'حفارة كاتربيلر 320',
        price: 1500,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1547900662-79339aab6250?auto=format&fit=crop&q=80&w=500', // Yellow Excavator
    },
    {
        id: '2',
        nameAr: 'رافعة تادانو 50 طن',
        price: 2200,
        status: 'rented',
        renterName: 'شركة البنيان',
        startDate: '2024-01-01',
        endDate: '2024-02-01',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=500', // Crane
    },
    {
        id: '3',
        nameAr: 'جرافة كوماتسو D155',
        price: 1800,
        status: 'rented',
        renterName: 'محمد سعود',
        startDate: '2024-01-15',
        endDate: '2024-01-25',
        image: 'https://images.unsplash.com/photo-1590216706705-4c6e6b0f4d38?q=80&w=500', // Bulldozer
    },
    {
        id: '4',
        nameAr: 'بوبكات S550',
        price: 600,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1517424647313-05b18aa72c53?auto=format&fit=crop&q=80&w=500', // Bobcat/Loader
    },
    {
        id: '5',
        nameAr: 'مرسيدس أكتروس',
        price: 1200,
        status: 'rented',
        renterName: 'مؤسسة الإعمار',
        startDate: '2023-12-20',
        endDate: '2024-03-20',
        image: 'https://images.unsplash.com/photo-1626847037657-fd3622613ce3?auto=format&fit=crop&q=80&w=500', // Truck
    },
    {
        id: '6',
        nameAr: 'شاحنة فولفو FH16',
        price: 1400,
        status: 'available',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=500', // Heavy Truck
    }
];

// Separated Component for handling Image logic cleanly
const FleetItemCard = ({ item }) => {
    const [imageError, setImageError] = useState(false);
    const isRented = item.status === 'rented';

    return (
        <View style={styles.machineCard}>
            {item.image && !imageError ? (
                <Image
                    source={{ uri: item.image }}
                    style={styles.machineImage}
                    resizeMode="cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <View style={[styles.machineImage, styles.imagePlaceholder]}>
                    <MaterialIcons name="construction" size={40} color={COLORS.subtextLight} />
                </View>
            )}

            <View style={styles.machineInfo}>
                <View style={styles.cardHeader}>
                    <Text style={styles.machineName}>{item.nameAr}</Text>
                    <Text style={styles.priceValue}>{item.price} <Text style={styles.priceCurrency}>ر.س</Text></Text>
                </View>

                {isRented ? (
                    <View style={styles.rentalDetailsContainer}>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="person" size={16} color={COLORS.subtextLight} />
                            <Text style={styles.detailText}>{item.renterName}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <MaterialIcons name="date-range" size={16} color={COLORS.subtextLight} />
                            <Text style={styles.detailText}>من: {item.startDate} إلى: {item.endDate}</Text>
                        </View>
                    </View>
                ) : (
                    <View style={styles.availableBadge}>
                        <Text style={styles.availableText}>متاح للإيجار</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default function FleetManagementScreen({ navigation, route }) {
    const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'rented', 'available'
    const [fleetData, setFleetData] = useState(MOCK_FLEET_DATA);

    useEffect(() => {
        if (route.params) {
            if (route.params.activeTab) {
                setSelectedTab(route.params.activeTab);
            }
            if (route.params.refresh && route.params.newItem) {
                // Add the new item to the top of the list
                setFleetData(prevData => [route.params.newItem, ...prevData]);

                // Clear params to prevent re-adding on subsequent renders if needed, 
                // though in React Navigation params persist until changed. 
                // Ideally we'd clear them but for this flow it's okay as long as we handle duplicates or just display.
                // For a robust app, we might check if ID exists.
                navigation.setParams({ newItem: null, refresh: false });
            }
        }
    }, [route.params]);

    // Filtering Logic
    const filteredData = fleetData.filter(item => {
        if (selectedTab === 'all') return true;
        return item.status === selectedTab;
    });

    // Count Logic
    const counts = {
        all: fleetData.length,
        rented: fleetData.filter(i => i.status === 'rented').length,
        available: fleetData.filter(i => i.status === 'available').length,
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header - No Menu Icon */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>إدارة الأسطول</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.statsContainer}>
                {/* Available Tab */}
                <TouchableOpacity
                    style={[
                        styles.statCard,
                        selectedTab === 'available' && styles.statCardAvailableActive,
                        selectedTab !== 'available' && styles.statCardInactive
                    ]}
                    onPress={() => setSelectedTab('available')}
                >
                    <Text style={[
                        styles.statLabel,
                        selectedTab === 'available' ? styles.textGreen : styles.textGray
                    ]}>متاح</Text>
                    <Text style={[
                        styles.statValue,
                        selectedTab === 'available' ? styles.textGreen : styles.textGray
                    ]}>{counts.available}</Text>
                </TouchableOpacity>

                {/* Rented Tab */}
                <TouchableOpacity
                    style={[
                        styles.statCard,
                        selectedTab === 'rented' && styles.statCardRentedActive,
                        selectedTab !== 'rented' && styles.statCardInactive
                    ]}
                    onPress={() => setSelectedTab('rented')}
                >
                    <Text style={[
                        styles.statLabel,
                        selectedTab === 'rented' ? styles.textRentedActive : styles.textGray
                    ]}>مؤجر</Text>
                    <Text style={[
                        styles.statValue,
                        selectedTab === 'rented' ? styles.textRentedActive : styles.textGray
                    ]}>{counts.rented}</Text>
                </TouchableOpacity>

                {/* All Tab */}
                <TouchableOpacity
                    style={[
                        styles.statCard,
                        selectedTab === 'all' && styles.statCardAllActive,
                        selectedTab !== 'all' && styles.statCardInactive
                    ]}
                    onPress={() => setSelectedTab('all')}
                >
                    <Text style={[
                        styles.statLabel,
                        selectedTab === 'all' ? styles.textAllActive : styles.textGray
                    ]}>الكل</Text>
                    <Text style={[
                        styles.statValue,
                        selectedTab === 'all' ? styles.textAllActive : styles.textGray
                    ]}>{counts.all}</Text>
                </TouchableOpacity>
            </View>

            {/* Content List */}
            <FlatList
                data={filteredData}
                renderItem={({ item }) => <FleetItemCard item={item} />}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>لا توجد بيانات</Text>
                    </View>
                }
            />

            {/* FAB */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('AddMachine')}>
                <MaterialIcons name="add" size={24} color={COLORS.primaryContent} />
                <Text style={styles.fabText}>إضافة معدة</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.backgroundLight },
    header: {
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        alignItems: 'center', // Center title
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.borderLight
    },
    headerTitle: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },

    statsContainer: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
    },
    statCard: {
        flex: 1,
        borderRadius: 12,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    statCardInactive: {
        backgroundColor: COLORS.surfaceLight,
        borderColor: COLORS.borderLight,
    },
    statCardAllActive: {
        backgroundColor: COLORS.allActiveBg,
        borderColor: COLORS.allActiveBorder,
        borderWidth: 1,
    },
    statCardRentedActive: {
        backgroundColor: COLORS.rentedActiveBg,
        borderColor: COLORS.rentedActiveText,
        borderWidth: 1,
    },
    statCardAvailableActive: {
        backgroundColor: COLORS.availableBg,
        borderColor: COLORS.availableText,
    },

    statLabel: { fontSize: 14, marginBottom: 4, fontWeight: '500' },
    statValue: { fontSize: 20, fontWeight: 'bold' },

    textGray: { color: COLORS.subtextLight },
    textPrimary: { color: COLORS.textLight },
    textBlack: { color: '#000000' }, // For Active All Tab
    textAmber: { color: COLORS.rentedText },
    textGreen: { color: COLORS.availableText },
    textWhite: { color: '#ffffff' },
    textRentedActive: { color: COLORS.rentedActiveText },
    textAllActive: { color: COLORS.allActiveText },

    listContent: { paddingHorizontal: 16, paddingBottom: 100 },

    machineCard: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },
    machineImage: { width: '100%', height: 140, backgroundColor: '#e5e7eb', borderRadius: 12 },
    imagePlaceholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    machineInfo: { padding: 12 },
    cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }, // RTL layout mainly
    machineName: { fontSize: 16, fontWeight: 'bold', color: COLORS.textLight, textAlign: 'right' },
    priceValue: { fontSize: 18, fontWeight: 'bold', color: COLORS.textLight },
    priceCurrency: { fontSize: 12, fontWeight: 'normal', color: COLORS.subtextLight },

    rentalDetailsContainer: {
        backgroundColor: COLORS.backgroundLight,
        padding: 8,
        borderRadius: 8,
        marginTop: 4,
    },
    detailRow: {
        flexDirection: 'row', // RTL usually handled by I18nManager but assuming simple layout
        alignItems: 'center',
        justifyContent: 'flex-end', // Align right for Arabic text
        marginBottom: 4,
        gap: 8,
    },
    detailText: {
        fontSize: 13,
        color: COLORS.subtextLight,
        textAlign: 'right',
    },

    availableBadge: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.availableBg,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    availableText: {
        color: COLORS.availableText,
        fontSize: 12,
        fontWeight: 'bold',
    },

    emptyContainer: { alignItems: 'center', marginTop: 50 },
    emptyText: { color: COLORS.subtextLight, fontSize: 16 },

    fab: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    fabText: { fontSize: 16, fontWeight: 'bold', color: COLORS.primaryContent, marginLeft: 8 },
});
