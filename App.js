import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { NotoSansArabic_400Regular, NotoSansArabic_500Medium, NotoSansArabic_600SemiBold, NotoSansArabic_700Bold } from '@expo-google-fonts/noto-sans-arabic';
import { ActivityIndicator, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';

// User Flow Screens
import UserRegistrationScreen from './screens/UserRegistrationScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import TermsScreen from './screens/TermsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import NafathVerificationScreen from './screens/NafathVerificationScreen';
import UserHomeScreen from './screens/UserHomeScreen';
import UserOrdersScreen from './screens/UserOrdersScreen';
import UserAccountScreen from './screens/UserAccountScreen';
import UserInvoicesScreen from './screens/UserInvoicesScreen';
import InvoiceDetailsScreen from './screens/InvoiceDetailsScreen';
import BillDetailsScreen from './screens/BillDetailsScreen';
import UserSupportScreen from './screens/UserSupportScreen';
import PersonalDataScreen from './screens/PersonalDataScreen';
import SavedAddressesScreen from './screens/SavedAddressesScreen';
import AddressFormScreen from './screens/AddressFormScreen';
import LanguageSettingsScreen from './screens/LanguageSettingsScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import LiveChatScreen from './screens/LiveChatScreen';

// New Booking Flow
import AddMachineryScreen from './screens/AddMachineryScreen';
import ReviewRequestScreen from './screens/ReviewRequestScreen';
import MatchingProvidersScreen from './screens/MatchingProvidersScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';
import MachineConfigScreen from './screens/MachineConfigScreen';
import FindingProvidersScreen from './screens/FindingProvidersScreen';

// Legacy/Alternative Flow (Keeping for now if needed, or reachable via other paths)
import BookingRequestScreen from './screens/BookingRequestScreen';
import BookingReviewScreen from './screens/BookingReviewScreen';
import BookingConfirmationScreen from './screens/BookingConfirmationScreen';

// Provider Flow Screens
import CompanyInfoScreen from './screens/CompanyInfoScreen';
import RepInfoScreen from './screens/RepInfoScreen';
import UploadDocsScreen from './screens/UploadDocsScreen';
import VerificationPendingScreen from './screens/VerificationPendingScreen';
import FleetManagementScreen from './screens/FleetManagementScreen';
import AddMachineScreen from './screens/AddMachineScreen';
import ApplicationDetailsScreen from './screens/ApplicationDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    NotoSansArabic_400Regular,
    NotoSansArabic_500Medium,
    NotoSansArabic_600SemiBold,
    NotoSansArabic_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <UserProvider>
      <CartProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="UserRegistration">
            {/* User Flow */}
            <Stack.Screen name="UserRegistration" component={UserRegistrationScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="NafathVerification" component={NafathVerificationScreen} />
            <Stack.Screen name="UserHome" component={UserHomeScreen} />
            <Stack.Screen name="UserOrders" component={UserOrdersScreen} />
            <Stack.Screen name="UserAccount" component={UserAccountScreen} />
            <Stack.Screen name="UserInvoices" component={UserInvoicesScreen} />
            <Stack.Screen name="InvoiceDetails" component={InvoiceDetailsScreen} />
            <Stack.Screen name="BillDetails" component={BillDetailsScreen} />
            <Stack.Screen name="UserSupport" component={UserSupportScreen} />
            <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
            <Stack.Screen name="SavedAddresses" component={SavedAddressesScreen} />
            <Stack.Screen name="AddressForm" component={AddressFormScreen} />
            <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />

            {/* New Booking Flow */}
            <Stack.Screen name="LiveChat" component={LiveChatScreen} />
            <Stack.Screen name="AddMachinery" component={AddMachineryScreen} />
            <Stack.Screen name="ReviewRequest" component={ReviewRequestScreen} />
            <Stack.Screen name="MatchingProviders" component={MatchingProvidersScreen} />
            <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
            <Stack.Screen name="MachineConfig" component={MachineConfigScreen} />
            <Stack.Screen name="FindingProviders" component={FindingProvidersScreen} />

            {/* Legacy/Other Screens */}
            <Stack.Screen name="BookingRequest" component={BookingRequestScreen} />
            <Stack.Screen name="BookingReview" component={BookingReviewScreen} />
            <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />

            {/* Provider Flow */}
            <Stack.Screen name="CompanyInfo" component={CompanyInfoScreen} />
            <Stack.Screen name="RepInfo" component={RepInfoScreen} />
            <Stack.Screen name="UploadDocs" component={UploadDocsScreen} />
            <Stack.Screen name="VerificationPending" component={VerificationPendingScreen} />
            <Stack.Screen name="FleetManagement" component={FleetManagementScreen} />
            <Stack.Screen name="AddMachine" component={AddMachineScreen} />
            <Stack.Screen name="ApplicationDetails" component={ApplicationDetailsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
    </UserProvider>
  );
}
