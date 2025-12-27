import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const COLORS = {
    primary: '#E6C217',
    backgroundLight: '#f3f4f6', // Slightly darker background for contrast
    surfaceLight: '#ffffff',
    textDark: '#1b190d',
    textGray: '#6b7280',
    border: '#e5e7eb',
};

const CATEGORIES = [
    { id: 'all', label: 'الكل' },
    { id: 'excavators', label: 'حفارات' },
    { id: 'loaders', label: 'شيولات' },
    { id: 'tankers', label: 'صهاريج' },
    { id: 'others', label: 'معدات أخرى' },
    { id: 'generators', label: 'مولدات كهرباء' },
];

const MACHINERY_DATA = [
    {
        id: 1,
        title: 'حفار 20 طن',
        subtitle: 'كاتربيلر أو ما يعادله - موديل 2020+',
        tag: 'سائق مشمول',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_vJy_Tcq43Zo0CF2Ll7GB7yVBwRjfpyyhXQ2WLuK7mlM4XUL1QothU4tK9DqfIExRpaDI1FKfEPYb-bdcyOCEXKrigtFg-ymcBW1-VK7VROjsyqOJSVYp7oI0o9Pp17Rfmm-vJqeiyD_jrD6TuVDn-5DZ-UToVpxZTWAGx6-7B6yfaculRiRV7WqKrEWFfaXaE5SB4X4u91vROy1M3lENymbvw0eGX03x633lgQSaT9fPXkC73P1czhJF0WyZb5WkyxXKXVfiTZU',
        quantity: 0,
        category: 'excavators'
    },
    {
        id: 5,
        title: 'حفار صغير 5 طن',
        subtitle: 'مناسب للأماكن الضيقة - موديل حديث',
        tag: 'بدون سائق',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4D0aFVagLz3E02lodHN8GPVm8NVelqsDiQmDnpUxx7q57A4pE1XqaartSCizA-yQctWKpMf1_L1HeoNHYXPcTn2SJ7joOMyd4Uc82t1bImv-MTWqqIQPipO6qGVSRRcQ5G3ZMfqe2zja2uaNle_qbVn9vJa8D3lgy7An5RyZiaAjrapeu_rWQNNcCF5Knm_5NCAAextI0Utzz93dDxjl2zMN26A6CiX6Wr1AcLzU7fWvb0voKTXUErGdsCWYkQrz9cjcxx9jpDLg',
        quantity: 0,
        category: 'excavators'
    },
    {
        id: 2,
        title: 'شيول كبير (966)',
        subtitle: 'سعة جرافة 4 متر مكعب',
        tag: 'وقود مشمول',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVe7wgJ1OB_5-5aw1mfZZ_tqTvjrPNF9RyscQbfY_zjhQ4D0-aGFt_tz4fMstA6QCOuyIjNW0iez8sF1VsRTf5uguOIAMtFnViDKvdQOYCn6ODVSfWpTy1JS9aiS8YoORC0K9ryDEW29XWVeN8LcL9Gvs4PeTp-4j9ceIgPmH2bSvnE4-ocLMQeXYjqXR9krOta3Hx_yhzJxEx6CQU7GfeoAdbGW4k_i1WugTdaaJefdXwB8SP73Q0B1vvjnjHbIiwgJItk3fKEiY',
        quantity: 0,
        category: 'loaders'
    },
    {
        id: 6,
        title: 'شيول بوبكات (Bobcat)',
        subtitle: 'متعدد الأغراض - حجم صغير',
        tag: 'سائق مشمول',
        image: 'https://s7g10.scene7.com/is/image/caterpillar/CM20200806-65814-15967',
        quantity: 0,
        category: 'loaders'
    },
    {
        id: 3,
        title: 'وايت ماء صالح للشرب',
        subtitle: 'سعة 18000 لتر - ستانلس ستيل',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhC9_sQp__f_2ZvxWaXQbSfIyAY3kexn2tILlN7i9UjWU7yxS32SLHvRLem80fwaD6SqsUdvJRQful6JCRgacL1gVk2W3Lbq7kNPiJl3oTVmm_srBda-N2USN22zE4UO-l5QtdOxX8naFjxoU_RcmLoI7SiUwOXUOttDRmcrTJJXKoxk2sqgWTELUiZ5PvfEtW2Xox8GquTkCLsLjqr7eF_m41PzOdLhqWudIqqEb-IhTQRbWRPO3xjlGLYaS5OBK_agnG6kmRaWc',
        quantity: 0,
        category: 'tankers'
    },
    {
        id: 4,
        title: 'بلدوزر D8',
        subtitle: 'مجهز للعمل الشاق في الصحراء',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOW_BvVgRA-0NnNNxRVstrP0FfqGO6EwjpTbBHMkSJoa_6HN12BPRWRrks5XSo5jF98jPdJ_Kno6rQrmkeq91mb0qBZUSSXgW1TVEjd_2WKiQC03Gc5Ab1BJuGR-DxWcZYR5mlyLhW-oh43-uP4-vwCxyoXlTnde6kaK6A1KfgNn-e1152b34P6iJZVBdKEGXWwf5ku46j3VhG7h48ahCeAWeAA3mZKXh1YKV96X7XRCjMEZCTxGOY_J3y9l9Rmxfg23JBJ-mQOEQ',
        quantity: 0,
        category: 'others'
    },
    {
        id: 7,
        title: 'مولد كهرباء 50 KVA',
        subtitle: 'طاقة مستمرة للمواقع المتوسطة',
        tag: 'سعر اليوم: 300 ريال',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvZdIKE6bz7hinP5xu0KHyIjnAzYZLLvFL9wu_OO5aUqDjFvCKBVoWMcuKr4sNn88OLTvoFpOtGOwjK9xhch15HNqJIwgb5qOtZd75e19VOasFS-iQgrYBWviWIqDhgTsfxDso0QnyQXDnh3UFJ21piD_z16tSPN4OLcEsOkGu6Z31K53yqiSiPfyr7CHYBhkDGKgLAXbDsm4je8Ta93qByR5pmZaoeRs8JNbCxoVswVsYaFTGg_aiR12E8AIKCznWNjhHOy6T7A_1',
        quantity: 0,
        price: 300,
        category: 'generators'
    },
    {
        id: 8,
        title: 'مولد كهرباء 100 KVA',
        subtitle: 'مناسب للمشاريع الكبيرة والفعاليات',
        tag: 'سعر اليوم: 600 ريال',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvZdIKE6bz7hinP5xu0KHyIjnAzYZLLvFL9wu_OO5aUqDjFvCKBVoWMcuKr4sNn88OLTvoFpOtGOwjK9xhch15HNqJIwgb5qOtZd75e19VOasFS-iQgrYBWviWIqDhgTsfxDso0QnyQXDnh3UFJ21piD_z16tSPN4OLcEsOkGu6Z31K53yqiSiPfyr7CHYBhkDGKgLAXbDsm4je8Ta93qByR5pmZaoeRs8JNbCxoVswVsYaFTGg_aiR12E8AIKCznWNjhHOy6T7A_1',
        quantity: 0,
        price: 600,
        category: 'generators'
    },
    {
        id: 9,
        title: 'مولد كهرباء 250 KVA',
        subtitle: 'طاقة عالية للمواقع الصناعية',
        tag: 'سعر اليوم: 1200 ريال',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvZdIKE6bz7hinP5xu0KHyIjnAzYZLLvFL9wu_OO5aUqDjFvCKBVoWMcuKr4sNn88OLTvoFpOtGOwjK9xhch15HNqJIwgb5qOtZd75e19VOasFS-iQgrYBWviWIqDhgTsfxDso0QnyQXDnh3UFJ21piD_z16tSPN4OLcEsOkGu6Z31K53yqiSiPfyr7CHYBhkDGKgLAXbDsm4je8Ta93qByR5pmZaoeRs8JNbCxoVswVsYaFTGg_aiR12E8AIKCznWNjhHOy6T7A_1',
        quantity: 0,
        price: 1200,
        category: 'generators'
    },
];

export default function AddMachineryScreen({ navigation }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const { cartItems } = useCart();
    const cartCount = cartItems.length;

    const getCategoriesToDisplay = () => {
        if (selectedCategory === 'all') {
            return CATEGORIES.filter(c => c.id !== 'all');
        }
        return CATEGORIES.filter(c => c.id === selectedCategory);
    };

    const displayCategories = getCategoriesToDisplay();

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.goBack()}
                    >
                        <MaterialIcons name="arrow-forward" size={24} color={COLORS.textDark} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>إضافة معدات للطلب</Text>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate('ReviewRequest')}
                    >
                        <MaterialIcons name="shopping-cart" size={24} color={COLORS.textDark} />
                        {cartCount > 0 && (
                            <View style={styles.cartBadge}>
                                <Text style={styles.cartBadgeText}>{cartCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabsContent}
                >
                    {CATEGORIES.map(cat => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[
                                styles.tab,
                                selectedCategory === cat.id && styles.activeTab
                            ]}
                            onPress={() => setSelectedCategory(cat.id)}
                        >
                            <Text style={[
                                styles.tabText,
                                selectedCategory === cat.id && styles.activeTabText
                            ]}>{cat.label}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {displayCategories.map((cat, index) => {
                    const categoryItems = MACHINERY_DATA.filter(item => item.category === cat.id);
                    if (categoryItems.length === 0) return null;

                    return (
                        <View key={cat.id} style={styles.categorySection}>
                            {/* Section Header with "Filteration bar" */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{cat.label}</Text>
                                <View style={styles.sectionLine} />
                            </View>

                            {/* Items List */}
                            <View style={styles.itemsList}>
                                {categoryItems.map((item) => (
                                    <View key={item.id} style={styles.card}>
                                        <View style={styles.cardContent}>
                                            <View style={styles.cardInfo}>
                                                <Text style={styles.cardTitle}>{item.title}</Text>
                                                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                                                {item.tag && (
                                                    <View style={styles.tagWrapper}>
                                                        <Text style={styles.tagText}>{item.tag}</Text>
                                                    </View>
                                                )}
                                            </View>
                                            <View style={styles.cardImageWrapper}>
                                                <Image source={{ uri: item.image }} style={styles.cardImage} />
                                            </View>
                                        </View>

                                        {/* Footer: Customize & Add */}
                                        <TouchableOpacity
                                            style={styles.cardAction}
                                            onPress={() => navigation.navigate('MachineConfig', { machine: item })}
                                        >
                                            <MaterialIcons name="keyboard-arrow-left" size={20} color="#9ca3af" />
                                            <View style={styles.customizeBtn}>
                                                <Text style={styles.customizeText}>تخصيص وإضافة</Text>
                                                <MaterialIcons name="tune" size={16} color={COLORS.primary} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                    );
                })}
            </ScrollView>

            {/* Floating Review Button */}
            {cartCount > 0 && (
                <View style={styles.floatingContainer}>
                    <TouchableOpacity
                        style={styles.reviewButton}
                        onPress={() => navigation.navigate('ReviewRequest')}
                    >
                        <View style={styles.reviewBtnLeft}>
                            <MaterialIcons name="arrow-back" size={20} color={COLORS.textDark} />
                            <Text style={styles.reviewText}>التالي</Text>
                        </View>
                        <View style={styles.reviewBtnRight}>
                            <Text style={styles.reviewTitle}>مراجعة الطلب</Text>
                            <View style={styles.countBadge}>
                                <Text style={styles.countText}>{cartCount}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundLight,
    },
    header: {
        backgroundColor: COLORS.surfaceLight,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f3f4f6',
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 12,
        height: 48,
    },
    iconButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    cartBadge: {
        position: 'absolute',
        top: 2,
        right: 2,
        backgroundColor: COLORS.primary,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    cartBadgeText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: 'black',
    },
    tabsContainer: {
        backgroundColor: COLORS.surfaceLight,
        paddingVertical: 12,
    },
    tabsContent: {
        paddingHorizontal: 16,
        flexDirection: 'row-reverse', // To align RTL naturally if needed, or stick to flex
        gap: 8,
    },
    tab: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.surfaceLight,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    activeTab: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    tabText: {
        fontSize: 14,
        color: COLORS.textDark,
        fontWeight: '500',
    },
    activeTabText: {
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 100, // Space for footer
    },
    categorySection: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center', // Align items vertically center
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
        textAlign: 'right',
        marginLeft: 16, // Space between text and line
    },
    sectionLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#e5e7eb',
    },
    itemsList: {
        gap: 12,
    },
    card: {
        backgroundColor: COLORS.surfaceLight,
        borderRadius: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: 'white', // Using shadow instead of border mostly
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
        elevation: 2,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardImageWrapper: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        marginLeft: 12,
    },
    cardImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardInfo: {
        flex: 1,
        alignItems: 'flex-end', // Align text to right for RTL
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
        marginBottom: 4,
        textAlign: 'right',
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#6b7280',
        marginBottom: 8,
        textAlign: 'right',
    },
    tagWrapper: {
        backgroundColor: '#f3f4f6',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    tagText: {
        fontSize: 10,
        color: '#4b5563',
        fontWeight: '500',
    },
    cardAction: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f3f4f6',
    },
    customizeBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    customizeText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    floatingContainer: {
        position: 'absolute',
        bottom: 24,
        left: 16,
        right: 16,
    },
    reviewButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        shadowColor: '#E6C217',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    reviewBtnLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reviewText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    reviewBtnRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    reviewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    countBadge: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    countText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
});
