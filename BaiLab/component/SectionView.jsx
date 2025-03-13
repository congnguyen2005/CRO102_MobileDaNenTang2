import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

// Dữ liệu mẫu (nếu có)
const eventInfo = [
  {
    title: "Hội Thảo Công Nghệ",
    events: [
      {
        label: "Sự kiện AI",
        location: "TP.HCM",
        time: "10:00 AM - 12:00 PM",
        transport: "Xe Bus / Taxi",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMc1Eygs4Fq8dplbRatmyJM6-1kPsxBckTIw&s",
        button: true,
      },
      {
        label: "IoT và Tương Lai",
        location: "Hà Nội",
        time: "14:00 PM - 16:00 PM",
        transport: "Grab / Bike",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEra-Hetj_3VJ8i_L6l_Hbhq-IEs3qhNCwEg&s",
        button: true,
      },
    ],
  },
  {
    title: "Sự Kiện Khoa Học",
    events: [
      {
        label: "Khám Phá Vũ Trụ",
        location: "Đà Nẵng",
        time: "09:00 AM - 11:30 AM",
        transport: "Máy Bay / Taxi",
        image: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/12/23/base64-17102420779771986739397-17349477026061228252374.png",
        button: true,
      },
    ],
  },
];

const SectionView = () => {
  return (
    <ScrollView style={styles.container}>
      {eventInfo.map((section, index) => (
        <CustomSection key={index} section={section} />
      ))}
    </ScrollView>
  );
};

// 🟢 COMPONENT HIỂN THỊ SECTION
const CustomSection = ({ section }) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{section.title}</Text>
      {section.events.map((event, idx) => (
        <CustomCard key={idx} event={event} />
      ))}
    </View>
  );
};

// 🔵 COMPONENT HIỂN THỊ CHI TIẾT
const CustomCard = ({ event }) => {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {event.label && <Text style={styles.label}>{event.label}</Text>}

        {event.location && (
          <>
            <Text style={styles.subLabel}>📍 Địa điểm:</Text>
            <Text style={styles.value}>{event.location}</Text>
          </>
        )}

        {event.time && (
          <>
            <Text style={styles.subLabel}>⏰ Thời gian:</Text>
            <Text style={styles.value}>{event.time}</Text>
          </>
        )}

        {event.transport && (
          <>
            <Text style={styles.subLabel}>🚍 Phương tiện:</Text>
            <Text style={styles.value}>{event.transport}</Text>
          </>
        )}

        {event.image && (
          <Image source={{ uri: event.image }} style={styles.image} />
        )}
      </View>

      {/* Nút Chi Tiết */}
      {event.button && (
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>CHI TIẾT</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// 🌟 STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 15,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 5,
  },
  subLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 5,
  },
  value: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#2980b9",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default SectionView;
