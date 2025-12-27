import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styled } from 'nativewind';

const BillDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { invoice } = route.params || {};

    return (
        <SafeAreaView className="flex-1 bg-[#f9f9f9]" style={{ paddingTop: StatusBar.currentHeight }}>
            <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />

            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-3 bg-[#f9f9f9] z-50">
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="p-2"
                >
                    <MaterialIcons name="arrow-back" size={24} color="#E6C217" />
                </TouchableOpacity>
                <Text className="text-xl font-bold text-center flex-1 text-[#E6C217]">Bill Details</Text>
                <TouchableOpacity className="p-2">
                    <MaterialIcons name="share" size={24} color="#E6C217" />
                </TouchableOpacity>
            </View>

            <ScrollView className="flex-1 bg-[#f9f9f9]" contentContainerStyle={{ paddingBottom: 120 }}>
                <View className="max-w-md mx-auto px-4 pt-4 space-y-6">

                    {/* Main Card (Total Amount) */}
                    <View className="bg-white rounded-2xl p-5 border-t-4 border-[#E6C217]" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <Text className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-medium">TOTAL AMOUNT</Text>
                                <Text className="text-4xl font-bold text-[#E6C217]">{invoice?.amount || 'SAR 0.00'}</Text>
                            </View>
                            <View className={`px-3 py-1 rounded-full ${invoice?.status === 'paid' ? 'bg-[rgba(230,194,23,0.1)]' : 'bg-gray-200'}`}>
                                <Text className={`text-xs font-bold ${invoice?.status === 'paid' ? 'text-[#a16207]' : 'text-gray-600'}`}>
                                    {invoice?.status === 'paid' ? 'Paid' : invoice?.status === 'pending' ? 'Pending' : 'Cancelled'}
                                </Text>
                            </View>
                        </View>

                        <View className="space-y-3 pt-2">
                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm text-gray-400">Invoice Number</Text>
                                <Text className="text-sm font-bold text-gray-800">SA-INV-{invoice?.id || '0000'}</Text>
                            </View>

                            <View className="h-[1px] w-full bg-gray-100 my-1" />

                            <View className="flex-row justify-between items-center">
                                <Text className="text-sm text-gray-400">Issue Date</Text>
                                <Text className="text-sm font-bold text-gray-800">{invoice?.date || '2025/01/01'}</Text>
                            </View>
                        </View>
                    </View>

                    {/* Supplier Details */}
                    <View className="space-y-2">
                        <Text className="text-sm font-bold uppercase tracking-wide text-[#E6C217] px-1">SUPPLIER DETAILS</Text>
                        <View className="bg-white rounded-2xl p-5 space-y-5" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>

                            <View className="flex-row justify-between items-start">
                                <View className="flex-1">
                                    <Text className="text-xs mb-1 text-[#E6C217]">Supplier Name</Text>
                                    <Text className="text-sm font-bold text-gray-800 leading-5">MRSOOL App for Telecommunications and Technology Company</Text>
                                </View>
                                <View className="flex-1 items-end pl-2">
                                    <Text className="text-xs mb-1 font-arabic text-right text-[#E6C217]">اسم المورد</Text>
                                    <Text className="text-sm font-bold text-right font-arabic text-gray-800 leading-5">شركة تطبيق مرسول للاتصالات و تقنية المعلومات</Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-start">
                                <View className="flex-1">
                                    <Text className="text-xs mb-1 text-[#E6C217]">VAT Number</Text>
                                    <Text className="text-sm font-bold text-gray-800">310228833400003</Text>
                                </View>
                                <View className="flex-1 items-end pl-2">
                                    <Text className="text-xs mb-1 font-arabic text-right text-[#E6C217]">رقم التسجيل الضريبي</Text>
                                    <Text className="text-sm font-bold text-right font-arabic text-gray-800">310228833400003</Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-start">
                                <View className="flex-1">
                                    <Text className="text-xs mb-1 text-[#E6C217]">Additional Seller ID</Text>
                                    <Text className="text-sm font-bold text-gray-800">1010571565</Text>
                                </View>
                                <View className="flex-1 items-end pl-2">
                                    <Text className="text-xs mb-1 font-arabic text-right text-[#E6C217]">رقم المعرفات الإضافية</Text>
                                    <Text className="text-sm font-bold text-right font-arabic text-gray-800">1010571565</Text>
                                </View>
                            </View>

                            <View className="flex-row justify-between items-start">
                                <View className="flex-1">
                                    <Text className="text-xs mb-1 text-[#E6C217]">Order No.</Text>
                                    <Text className="text-sm font-bold text-gray-800">{invoice?.orderNo || '347692780'}</Text>
                                </View>
                                <View className="flex-1 items-end pl-2">
                                    <Text className="text-xs mb-1 font-arabic text-right text-[#E6C217]">رقم الطلب</Text>
                                    <Text className="text-sm font-bold text-right font-arabic text-gray-800">{invoice?.orderNo || '347692780'}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* Supplier Address */}
                    <View className="space-y-2">
                        <View className="flex-row justify-between items-center px-1">
                            <Text className="text-sm font-bold uppercase tracking-wide text-[#E6C217]">SUPPLIER ADDRESS</Text>
                            <Text className="font-arabic text-xs font-bold text-[#E6C217]">عنوان المورد</Text>
                        </View>

                        <View className="bg-white rounded-2xl overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>
                            <View className="px-5 py-3 flex-row items-center gap-2 bg-[rgba(230,194,23,0.1)]">
                                <MaterialIcons name="location-on" size={16} color="#E6C217" />
                                <Text className="text-xs font-bold uppercase text-[#E6C217]">LOCATION INFO</Text>
                            </View>

                            <View className="p-5 space-y-4">
                                <View className="flex-row gap-4">
                                    <View className="flex-1">
                                        <Text className="text-xs mb-1 text-[#E6C217]">Building Number</Text>
                                        <Text className="text-sm font-bold text-gray-800">6767</Text>
                                    </View>
                                    <View className="flex-1 items-end">
                                        <Text className="text-xs mb-1 font-arabic text-[#E6C217]">رقم المبنى</Text>
                                        <Text className="text-sm font-bold font-arabic text-gray-800">٦٧٦٧</Text>
                                    </View>
                                </View>

                                <View className="flex-row gap-4 border-t border-gray-100 pt-3">
                                    <View className="flex-1">
                                        <Text className="text-xs mb-1 text-[#E6C217]">Street Name</Text>
                                        <Text className="text-sm font-bold text-gray-800">Abu Bakr Al-Siddiq Road</Text>
                                    </View>
                                    <View className="flex-1 items-end">
                                        <Text className="text-xs mb-1 font-arabic text-[#E6C217]">اسم الشارع</Text>
                                        <Text className="text-sm font-bold font-arabic text-gray-800">طريق أبي بكر الصديق</Text>
                                    </View>
                                </View>

                                <View className="flex-row gap-4 border-t border-gray-100 pt-3">
                                    <View className="flex-1">
                                        <Text className="text-xs mb-1 text-[#E6C217]">District / City</Text>
                                        <Text className="text-sm font-bold text-gray-800">Al-Narjis, Riyadh</Text>
                                    </View>
                                    <View className="flex-1 items-end">
                                        <Text className="text-xs mb-1 font-arabic text-[#E6C217]">الحي / المدينة</Text>
                                        <Text className="text-sm font-bold font-arabic text-gray-800">حي النرجس، الرياض</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Services Breakdown */}
                    <View className="space-y-2">
                        <Text className="text-sm font-bold uppercase tracking-wide text-[#E6C217] px-1">SERVICES BREAKDOWN</Text>
                        <View className="bg-white rounded-2xl overflow-hidden" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>
                            {/* Table Header */}
                            <View className="flex-row py-3 px-4 items-center bg-[rgba(230,194,23,0.1)]">
                                <View className="flex-[4]"><Text className="text-xs font-bold text-[#E6C217]">Details</Text></View>
                                <View className="flex-[2] items-center"><Text className="text-xs font-bold text-[#E6C217]">Qty</Text></View>
                                <View className="flex-[2] items-center"><Text className="text-xs font-bold text-[#E6C217]">Unit</Text></View>
                                <View className="flex-[3] items-end"><Text className="text-xs font-bold text-[#E6C217]">Total</Text></View>
                            </View>

                            {/* Table Row */}
                            <View className="flex-row py-5 px-4 items-start border-b border-gray-100">
                                <View className="flex-[4]">
                                    <Text className="font-bold text-sm text-gray-900 mb-1">{invoice?.title || 'Delivery Services'}</Text>
                                    <Text className="text-xs text-gray-400 font-arabic">خدمات التوصيل</Text>
                                </View>
                                <View className="flex-[2] items-center pt-1"><Text className="text-sm text-gray-600 font-medium">1</Text></View>
                                <View className="flex-[2] items-center pt-1"><Text className="text-sm text-gray-600 font-medium">{invoice?.amount || '21.92'}</Text></View>
                                <View className="flex-[3] items-end pt-1"><Text className="text-sm font-bold text-gray-900">{invoice?.amount || '21.92'}</Text></View>
                            </View>

                            {/* Subtotals in lighter bg */}
                            <View className="px-5 py-4 space-y-2 bg-gray-50/50">
                                <View className="flex-row justify-between">
                                    <Text className="text-xs font-medium text-gray-500">Taxable Amount (Excl. VAT)</Text>
                                    <Text className="text-xs font-medium text-gray-500">{/* Calculation would go here, mock for now */ '19.06 SAR'}</Text>
                                </View>
                                <View className="flex-row justify-between">
                                    <Text className="text-xs font-medium text-gray-500">VAT Rate (15%)</Text>
                                    <Text className="text-xs font-medium text-gray-500">{/* Calculation would go here */ '2.86 SAR'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Final Summary Card */}
                    <View className="bg-white rounded-2xl p-6 space-y-3 mb-6" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 }}>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-medium text-gray-500">Taxable Amount (Excl. VAT)</Text>
                            <Text className="text-sm font-bold text-gray-900">SAR 19.06</Text>
                        </View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm font-medium text-gray-500">VAT Amount (15%)</Text>
                            <Text className="text-sm font-bold text-red-500">+ SAR 2.86</Text>
                        </View>

                        <View className="border-t border-gray-100 pt-4 mt-2">
                            <View className="flex-row justify-between items-center">
                                <View>
                                    <Text className="text-lg font-bold text-black">Total Amount</Text>
                                    <Text className="text-xs text-gray-400 font-arabic">الإجمالي شامل الضريبة</Text>
                                </View>
                                <Text className="text-2xl font-bold text-[#E6C217]">{invoice?.amount || 'SAR 21.92'}</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>

            {/* Floating Button */}
            <View className="absolute bottom-8 left-0 right-0 items-center justify-center pointer-events-none">
                <TouchableOpacity
                    className="flex-row items-center justify-center gap-2 px-8 py-3.5 rounded-full pointer-events-auto active:scale-95 transition-transform bg-[#E6C217]"
                    style={{
                        shadowColor: '#E6C217',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.4,
                        shadowRadius: 8,
                        elevation: 6,
                        minWidth: 280
                    }}
                >
                    <MaterialIcons name="download" size={22} color="black" />
                    <Text className="text-black font-bold text-base">Download Invoice PDF</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
};

export default BillDetailsScreen;
