import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';

const COLORS = {
    primary: '#E6C217', // Yellow
    primaryLight: 'rgba(230, 194, 23, 0.1)',
    backgroundLight: '#f8fafc',
    surfaceLight: '#ffffff',
    textDark: '#0f172a',
    textGray: '#64748b',
    border: '#e2e8f0',
    botBubble: '#f1f5f9', // Light Grey for bot
};

export default function LiveChatScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [isInputVisible, setIsInputVisible] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [quickChoices, setQuickChoices] = useState([]);

    const flatListRef = useRef(null);

    useEffect(() => {
        // Initial Greeting
        const initialGreeting = {
            id: '1',
            text: 'مرحباً بك ، لخدمتك بشكل أسرع، الرجاء اختيار الموضوع:',
            sender: 'bot',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([initialGreeting]);

        // Show Quick Choices
        setQuickChoices([
            { id: 'opt1', text: 'الإبلاغ عن عطل / صيانة' },
            { id: 'opt2', text: 'تتبع الطلب / أين السائق؟' },
            { id: 'opt3', text: 'طلب تمديد الإيجار' },
            { id: 'opt4', text: 'الفواتير والدفع' },
            { id: 'opt5', text: 'تحدث مع موظف' },
        ]);
    }, []);

    const handleChoiceSelect = (choice) => {
        // 1. Add User Message
        const userMsg = {
            id: Date.now().toString(),
            text: choice.text,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages(prev => [...prev, userMsg]);
        setQuickChoices([]); // Hide choices directly after selection

        // 2. Automated Response Logic (Generic)
        setIsTyping(true);

        setTimeout(() => {
            // Generic response for all simplified menu options
            const botReplyText = 'شكراً لك، سيقوم أحد موظفينا بالرد عليك قريباً.';

            const botMsg = {
                id: (Date.now() + 1).toString(),
                text: botReplyText,
                sender: 'bot',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            };

            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
            setIsInputVisible(true); // Enable input

        }, 1000); // Simulate short typing delay
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        Keyboard.dismiss();

        const userMsg = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages(prev => [...prev, userMsg]);
        setInputText('');
    };

    const renderMessage = ({ item }) => {
        const isUser = item.sender === 'user';
        return (
            <View style={[
                styles.messageContainer,
                isUser ? styles.userMessageContainer : styles.botMessageContainer
            ]}>
                {!isUser && (
                    <View style={styles.botAvatar}>
                        <MaterialIcons name="support-agent" size={20} color={COLORS.primary} />
                    </View>
                )}
                <View style={[
                    styles.bubble,
                    isUser ? styles.userBubble : styles.botBubble
                ]}>
                    <Text style={[
                        styles.messageText,
                        isUser ? styles.userMessageText : styles.botMessageText
                    ]}>{item.text}</Text>
                    <Text style={[
                        styles.timestamp,
                        isUser ? styles.userTimestamp : styles.botTimestamp
                    ]}>{item.timestamp}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color={COLORS.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>المحادثة المباشرة</Text>
                <View style={{ width: 24 }} />
            </View>

            {/* Chat Body */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.chatContent}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        ListFooterComponent={() => (
                            <View style={styles.footerContainer}>
                                {isTyping && (
                                    <View style={styles.typingIndicator}>
                                        <ActivityIndicator size="small" color={COLORS.textGray} />
                                        <Text style={styles.typingText}>جاري الكتابة...</Text>
                                    </View>
                                )}
                                {/* Choice Chips */}
                                {!isInputVisible && quickChoices.length > 0 && (
                                    <View style={styles.choicesContainer}>
                                        {quickChoices.map((choice) => (
                                            <TouchableOpacity
                                                key={choice.id}
                                                style={styles.choiceChip}
                                                onPress={() => handleChoiceSelect(choice)}
                                            >
                                                <Text style={styles.choiceText}>{choice.text}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        )}
                    />
                </View>
            </TouchableWithoutFeedback>

            {/* Input Footer - Only visible after interaction */}
            {isInputVisible && (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
                    style={[styles.inputWrapper, { paddingBottom: Math.max(insets.bottom, 20) + 10 }]}
                >
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="اكتب رسالتك هنا..."
                            placeholderTextColor={COLORS.textGray}
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                        />
                        <TouchableOpacity
                            style={[
                                styles.sendButton,
                                !inputText.trim() && styles.sendButtonDisabled
                            ]}
                            onPress={handleSendMessage}
                            disabled={!inputText.trim()}
                        >
                            <MaterialIcons name="send" size={20} color={inputText.trim() ? '#fff' : '#94a3b8'} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            )}
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
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.surfaceLight,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    backButton: {
        padding: 4,
    },
    chatContent: {
        padding: 16,
        paddingBottom: 24,
    },
    messageContainer: {
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    userMessageContainer: {
        justifyContent: 'flex-end',
    },
    botMessageContainer: {
        justifyContent: 'flex-start',
    },
    botAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    bubble: {
        maxWidth: '80%',
        padding: 12,
        borderRadius: 16,
    },
    userBubble: {
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    botBubble: {
        backgroundColor: COLORS.botBubble,
        borderBottomLeftRadius: 4,
    },
    messageText: {
        fontSize: 14,
        lineHeight: 20,
    },
    userMessageText: {
        color: '#fff', // White text on yellow bubble often needs contrast check, but requested design typically implies bold or dark if yellow is light. Assuming pure yellow #ecc813, black might be better, but "WhatsApp" uses white on green. "Primary Yellow" often pairs with dark text in this app based on other screens (UserSupportScreen), but let's check. 
        // Re-reading request: "Primary Yellow color for the User's message bubbles...". Usually yellow background has black text.
        // Let's stick to black text for better contrast on yellow.
        color: '#000',
    },
    botMessageText: {
        color: COLORS.textDark,
    },
    timestamp: {
        fontSize: 10,
        marginTop: 4,
        alignSelf: 'flex-end',
    },
    userTimestamp: {
        color: 'rgba(0,0,0,0.5)',
    },
    botTimestamp: {
        color: COLORS.textGray,
    },
    footerContainer: {
        paddingTop: 8,
    },
    choicesContainer: {
        alignItems: 'flex-start', // Align left (or right due to RTL)
        gap: 8,
    },
    choiceChip: {
        backgroundColor: COLORS.surfaceLight,
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.primary,
        alignSelf: 'flex-start', // chips behave like incoming options
    },
    choiceText: {
        color: COLORS.textDark,
        fontWeight: '500',
        fontSize: 14,
    },
    typingIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginLeft: 40, // align with bot messages
        marginBottom: 8,
    },
    typingText: {
        marginLeft: 8,
        fontSize: 12,
        color: COLORS.textGray,
    },
    inputWrapper: {
        backgroundColor: COLORS.surfaceLight,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        padding: 12,
        paddingBottom: Platform.OS === 'ios' ? 34 : 12, // Handle safe area manually if needed, but SafeAreaView edges should handle 'bottom' usually.
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundLight,
        borderRadius: 24,
        paddingHorizontal: 4,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxHeight: 100,
        color: COLORS.textDark,
        textAlign: 'right', // RTL default for Arabic
        fontSize: 14,
    },
    sendButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
    },
    sendButtonDisabled: {
        backgroundColor: COLORS.border,
    }
});
