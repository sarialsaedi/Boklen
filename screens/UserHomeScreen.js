import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f6f7f8',
    surfaceLight: '#ffffff',
    textDark: '#0f172a',
    textGray: '#64748b',
    red: '#ef4444',
};

const FEATURED_ITEMS = [
    {
        id: 1,
        title: 'خصم ٢٠٪ على جميع الحفارات في جدة',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFFEDfOiBJ33N3A1wY_caQOZyGE-oMrokaqD0yUQbPtMvSxgcSDCJ3sfMEFJEj3atXDZbaVz0Hb06987nTRlAE4EegI82_oKgadclWLH5gVOFwnU_Qnm0fX4F5yICVFsYByeoVV0SiYfByVoJmEw1CJTRcroSfKjKmIJ42dczC0m8h_qj25oA64uIl-sJyygm2Z_UzZXWLNVCctaseT2tt94CdPWhLs1m7bdiBv77BRFj0DBeaaNzpb2rjJ1C6LHAq55X2itpKRTDz',
        tag: 'عرض خاص'
    },
    {
        id: 2,
        title: 'توصيل مجاني للمعدات الخفيفة هذا الأسبوع',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLvCAR8BCAD2F8bRg-F71jvl07wygROTJXWU2fXZyNtmYOjdxII6G4iAEonK3qyMPfA-x1qeR0C0R80sp-XKboE1GaCFJlmV0Fb0yprJubEsS8-4OwBQlbV0McnWWerS0CmbDsmBaMO_r-KHDLgfN9dgEidnoEsyJhWTd1ZLvvvv3gTg46BaCdN7pDPNLoD9nWm23Kb2QT56X8rfrO0PRGoq6Q-5lhfNAq0hRcrwQ2GiRPyTw1PItWOo6KzpzjACQMjxiDlcFcnT9k',
        tag: null
    }
];

export default function UserHomeScreen({ navigation }) {
    const { location, setLocation, LOCATIONS } = useUser();
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const handleLocationSelect = (loc) => {
        if (setLocation) {
            setLocation(loc); // Update global state
        } else {
            console.warn("setLocation function is missing");
        }
        setIsLocationOpen(false);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>


            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Welcome Section */}
                <View style={styles.welcomeSection}>
                    <View style={{ zIndex: 1000 }}>
                        <TouchableOpacity
                            style={styles.locationCard}
                            onPress={() => setIsLocationOpen(!isLocationOpen)}
                        >
                            <View style={styles.locationRow}>
                                <View style={styles.locationIconBg}>
                                    <MaterialIcons name="location-on" size={24} color={COLORS.primary} />
                                </View>
                                <View style={styles.locationInfo}>
                                    <Text style={styles.locationLabel}>الموقع الحالي</Text>
                                    <Text style={styles.locationValue}>{location}</Text>
                                </View>
                            </View>
                            <MaterialIcons
                                name={isLocationOpen ? "expand-less" : "expand-more"}
                                size={24}
                                color={COLORS.textGray}
                            />
                        </TouchableOpacity>

                        {isLocationOpen && (
                            <View style={styles.dropdownList}>
                                {LOCATIONS.map((loc, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.dropdownItem,
                                            index === LOCATIONS.length - 1 && styles.lastDropdownItem
                                        ]}
                                        onPress={() => handleLocationSelect(loc)}
                                    >
                                        <Text style={[
                                            styles.dropdownText,
                                            loc === location && styles.selectedDropdownText
                                        ]}>
                                            {loc}
                                        </Text>
                                        {location === loc && (
                                            <MaterialIcons name="check" size={20} color={COLORS.primary} />
                                        )}
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>

                {/* Featured Carousel */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
                    {FEATURED_ITEMS.map((item) => (
                        <View key={item.id} style={styles.carouselItem}>
                            <Image source={{ uri: item.image }} style={styles.carouselImage} />
                            <View style={styles.carouselOverlay} />
                            <View style={styles.carouselContent}>
                                {item.tag && (
                                    <View style={styles.tag}>
                                        <Text style={styles.tagText}>{item.tag}</Text>
                                    </View>
                                )}
                                <Text style={styles.carouselTitle}>{item.title}</Text>
                            </View>
                        </View>
                    ))}
                    <View style={{ width: 16 }} />
                </ScrollView>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>ماذا تريد أن تستأجر اليوم؟</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('AddMachinery')}>
                            <Text style={styles.seeAll}>عرض الكل</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.grid}>
                        {/* Heavy Equipment - Large Card */}
                        <TouchableOpacity
                            style={styles.largeCard}
                            onPress={() => navigation.navigate('AddMachinery', { initialFilter: 'heavy' })}
                        >
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAVS-1kIrdH6nfh7fmoUV1NZiDSMTLNvfZ198-VXbQgedRw-xMpHnPGiwhN-g-PEtEiL0n-NbT5_nR3iKMIt1klK23J7IzCjvxkqDkYdRj1QAmT4vSdoGIRzEZrntvVAO_vpxpUKYoSGcKhLrkvdauoGKH8Mmrm63ymMc7zoeogKMmsqZNBatpAml8gzrEPGaxLFHLlSOrFxDdlvAxom00fXVYnnSiB0XAOL5xUU8wDwbaT5qoFHGyaZC2hVBcQbHKgG6JIn-5NVAR' }}
                                style={styles.cardBg}
                            />
                            <View style={styles.largeCardContent}>
                                <View style={styles.categoryIcon}>
                                    <MaterialIcons name="construction" size={24} color={COLORS.primary} />
                                </View>
                                <Text style={styles.categoryTitle}>معدات ثقيلة</Text>
                                <Text style={styles.categorySubtitle}>حفارات، بلدوزرات، رافعات</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.row}>
                            {/* Light Equipment */}
                            <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('AddMachinery', { initialFilter: 'light' })}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMUO-EyW3TasZhVjcQLvTEtrgKpW9Od9J6041odRR7swGoR9V9A6L1KqzdKL465T6xNLPAuO9jbNoZOnxKSOL8F3AyqwdO9ua9tmkw6VFqMFwkB2qTJAXKHjaQpej05AoRns-W_bj3FFBGv2jaIoeMR5kk9AOCnHxvppkxV6koFW6MVI9v9yJR4RNI264pFjqoawmO6Y1AX08G4mggHKifThWUAGgvyVEKn63YHabaqz1Yygpdkyv1JbiLfzhhqMTWYzhhhTUtZPFb' }}
                                    style={styles.smallCardImage}
                                />
                                <View style={styles.smallCardContent}>
                                    <Text style={styles.smallCardTitle}>معدات خفيفة</Text>
                                    <Text style={styles.smallCardSubtitle}>رافعات شوكية، بوبكات</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Tankers */}
                            <TouchableOpacity style={styles.smallCard} onPress={() => navigation.navigate('AddMachinery', { initialFilter: 'tankers' })}>
                                <Image
                                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwab6vIaywieENQR7DHymgZl-puf8Lk9BbsBtwxttwlAnHY_hl-697aE1hPulXlisFmSg7--lXFA8spUVHVugnp5WS5S-DILqcTemaL6leN1JhJB-6jgfbJboQ3T2ke63wnOOfrEIRnl48bFv9khlDIBbjHzfurQFgc9JSSFOnT52meZKJk4GUDNsVk2QC_4R_ev_P2QLwzmC_jtBa8OL3-pfcI4UVEdsBk3Ogdq_5qAiAa_6MLhZ7fGp_zUmwp_ghOEvl7F2iFSH_' }}
                                    style={styles.smallCardImage}
                                />
                                <View style={styles.smallCardContent}>
                                    <Text style={styles.smallCardTitle}>صهاريج مياه</Text>
                                    <Text style={styles.smallCardSubtitle}>مياه صالحة للشرب، ري</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Generators - Wide Card */}
                        <TouchableOpacity style={styles.wideCard} onPress={() => navigation.navigate('AddMachinery')}>
                            <Image
                                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvZdIKE6bz7hinP5xu0KHyIjnAzYZLLvFL9wu_OO5aUqDjFvCKBVoWMcuKr4sNn88OLTvoFpOtGOwjK9xhch15HNqJIwgb5qOtZd75e19VOasFS-iQgrYBWviWIqDhgTsfxDso0QnyQXDnh3UFJ21piD_z16tSPN4OLcEsOkGu6Z31K53yqiSiPfyr7CHYBhkDGKgLAXbDsm4je8Ta93qByR5pmZaoeRs8JNbCxoVswVsYaFTGg_aiR12E8AIKCznWNjhHOy6T7A_1' }}
                                style={styles.wideCardImage}
                            />
                            <View style={styles.wideCardContent}>
                                <Text style={styles.wideCardTitle}>مولدات كهرباء</Text>
                                <Text style={styles.wideCardSubtitle}>جميع الأحجام للطاقة المستمرة</Text>
                            </View>
                            <View style={styles.arrowIconBtn}>
                                <MaterialIcons name="arrow-back" size={20} color={COLORS.textGray} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>



            {/* Bottom Nav */}
            <SafeAreaView edges={['bottom']} style={styles.bottomNav}>
                <View style={styles.bottomNavContent}>
                    <TouchableOpacity style={styles.navItem}>
                        <MaterialIcons name="home" size={26} color={COLORS.primary} />
                        <Text style={[styles.navLabel, { color: COLORS.primary }]}>الرئيسية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserOrders')}
                    >
                        <MaterialIcons name="receipt-long" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>طلباتي</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserSupport')}
                    >
                        <MaterialIcons name="support-agent" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>الدعم</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => navigation.navigate('UserAccount')}
                    >
                        <MaterialIcons name="person" size={26} color={COLORS.textGray} />
                        <Text style={styles.navLabel}>حسابي</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: 'rgba(246, 247, 248, 0.9)',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    logoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    notificationBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.red,
        borderWidth: 2,
        borderColor: COLORS.backgroundLight,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingTop: 16,
        paddingBottom: 100,
    },
    welcomeSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
        width: '100%',
    },
    greeting: {
        fontSize: 14,
        color: COLORS.textGray,
        fontWeight: '500',
        marginBottom: 4,
        textAlign: 'right',
        alignSelf: 'stretch',
    },
    username: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 16,
        textAlign: 'right',
        alignSelf: 'stretch',
    },
    locationCard: {
        flexDirection: 'row-reverse', // RTL Layout
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
    },
    locationRow: {
        flexDirection: 'row-reverse', // RTL Layout
        alignItems: 'center',
        gap: 12,
    },
    locationIconBg: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(230, 194, 23, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    locationInfo: {
        alignItems: 'flex-end', // Align text to right
    },
    locationLabel: {
        fontSize: 12,
        color: COLORS.textGray,
        fontWeight: '500',
        textAlign: 'right',
    },
    locationValue: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
    },
    carousel: {
        paddingLeft: 16,
        marginBottom: 24,
    },
    carouselItem: {
        width: 320,
        height: 192,
        marginRight: 16,
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    carouselImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    carouselOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    carouselContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        padding: 20,
        alignItems: 'flex-start',
    },
    tag: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginBottom: 8,
    },
    tagText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    carouselTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'right',
        lineHeight: 24,
    },
    categoriesSection: {
        paddingHorizontal: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    seeAll: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.primary,
    },
    grid: {
        gap: 16,
    },
    largeCard: {
        height: 160,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLORS.surfaceLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 3,
        position: 'relative',
    },
    cardBg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: '75%',
        resizeMode: 'cover',
    },
    largeCardContent: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        width: '50%',
        padding: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    categoryIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: 'rgba(230, 194, 23, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
    },
    categorySubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
        textAlign: 'right',
    },
    row: {
        flexDirection: 'row',
        gap: 16,
    },
    smallCard: {
        flex: 1,
        height: 192,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: COLORS.surfaceLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 3,
    },
    smallCardImage: {
        height: 112,
        width: '100%',
        resizeMode: 'cover',
    },
    smallCardContent: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    smallCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
        textAlign: 'right',
    },
    smallCardSubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
        lineHeight: 16,
        textAlign: 'right',
    },
    wideCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 3,
        gap: 16,
    },
    wideCardImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        backgroundColor: '#f1f5f9',
    },
    wideCardContent: {
        flex: 1,
        alignItems: 'flex-start',
    },
    wideCardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    wideCardSubtitle: {
        fontSize: 12,
        color: COLORS.textGray,
    },
    arrowIconBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
    },

    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    bottomNavContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 64,
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: COLORS.textGray,
    },
    dropdownList: {
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 12,
        marginTop: 8,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        zIndex: 1000,
    },
    dropdownItem: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f1f5f9',
    },
    lastDropdownItem: {
        borderBottomWidth: 0,
    },
    dropdownText: {
        fontSize: 14,
        color: COLORS.textDark,
        textAlign: 'right',
        flex: 1,
    },
    selectedDropdownText: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});
