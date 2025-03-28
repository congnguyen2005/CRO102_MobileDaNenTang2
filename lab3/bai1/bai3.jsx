import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Animated,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image
} from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

const DATA = [
    { id: "1", title: "Design System", category: "Product Design", author: "Brandon", quizCount: 10, avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { id: "2", title: "React Native 101", category: "Development", author: "Jennifer", quizCount: 16, avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { id: "3", title: "Agile Basics", category: "Project Management", author: "Ewa", quizCount: 31, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: "4", title: "Agile Basics", category: "Project Management", author: "Ewa", quizCount: 31, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: "5", title: "Agile Basics", category: "Project Management", author: "Ewa", quizCount: 31, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: "6", title: "Agile Basics", category: "Project Management", author: "Ewa", quizCount: 31, avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { id: "7", title: "Agile Basics", category: "Project Management", author: "Ewa", quizCount: 31, avatar: "https://randomuser.me/api/portraits/women/3.jpg" }
];

const HEADER_MAX_HEIGHT = 180;
const HEADER_MIN_HEIGHT = 60;
const TAB_BAR_HEIGHT = 40;
const Bai3Screen = () => {
    const scrollY = new Animated.Value(0);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: "clamp",
    });

    const headerTitleOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    const avatarOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
        outputRange: [1, 0],
        extrapolate: "clamp",
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <Image source={require("../assets/logo.png")} style={styles.logo} />
                <Animated.Image source={{ uri: "https://randomuser.me/api/portraits/men/4.jpg" }} style={[styles.avatar, { opacity: avatarOpacity }]} />
                <Animated.Text style={[styles.greeting, { opacity: headerTitleOpacity }]}>Mornin' Mark! Ready for a quiz?</Animated.Text>
            </Animated.View>

            <Animated.View style={[styles.tabBarContainer, { top: headerHeight }]}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity><Text style={styles.tabActive}>Popular</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.tab}>Product Design</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.tab}>Development</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.tab}>Project Management</Text></TouchableOpacity>
                </ScrollView>
            </Animated.View>

            <FlatList
                data={DATA}
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + TAB_BAR_HEIGHT }}
                renderItem={({ item, index }) => {
                    const scale = scrollY.interpolate({
                        inputRange: [-1, 0, 200],
                        outputRange: [1, 1, 0.9],
                        extrapolate: "clamp",
                    });

                    const opacity = scrollY.interpolate({
                        inputRange: [-1, 0, index * 100, (index + 1) * 100],
                        outputRange: [1, 1, 1, 0],
                        extrapolate: "clamp",
                    });

                    return (
                        <Animated.View style={[styles.item, { transform: [{ scale }], opacity }]}>
                            <View>
                                <Text style={styles.category}>{item.category}</Text>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <View style={styles.authorContainer}>
                                    <Image source={{ uri: item.avatar }} style={styles.itemAvatar} />
                                    <Text style={styles.author}>{item.author}</Text>
                                </View>
                            </View>
                            <View style={styles.quizCount}>
                                <FontAwesome5 name="question-circle" size={16} color="white" />
                                <Text style={styles.quizCountText}>{item.quizCount}</Text>
                            </View>
                        </Animated.View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "#007f5f",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 40,
        zIndex: 10,
    },
    logo: { width: 100, height: 50, position: "absolute", top: 10, left: 10 },
    greeting: { fontSize: 18, fontWeight: "bold", color: "white", marginTop: 10 },
    avatar: { width: 50, height: 50, borderRadius: 25, position: "absolute", left: 150, top: 40 },
    tabBarContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        backgroundColor: "#007f5f",
        paddingVertical: 10,
        paddingLeft: 10,
        zIndex: 5,
    },
    tab: { color: "white", marginHorizontal: 10, fontSize: 14 },
    tabActive: { color: "#008080", fontWeight: "bold", marginHorizontal: 10, fontSize: 14, backgroundColor: "white", paddingHorizontal: 10, borderRadius: 10 },
    item: {
        backgroundColor: "#f8f8f8",
        padding: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    category: { fontSize: 12, color: "gray", marginBottom: 5 },
    itemTitle: { fontSize: 18, fontWeight: "bold" },
    authorContainer: { flexDirection: "row", alignItems: "center", marginTop: 5 },
    itemAvatar: { width: 25, height: 25, borderRadius: 12.5, marginRight: 10 },
    author: { fontSize: 14, color: "gray" },
    quizCount: {
        backgroundColor: "#3498db",
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    quizCountText: { color: "white", fontWeight: "bold" },
});

export default Bai3Screen;