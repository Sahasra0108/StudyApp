import React, { useState, useEffect, useContext, createContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { FloatingAction } from "react-native-floating-action";
import { useLocalSearchParams } from "expo-router";
import { auth } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import logout from "../assets/images/logout (2).png";

const ClickCountContext = createContext();

const useClickCount = () => useContext(ClickCountContext);

const ClickCountProvider = ({ children }) => {
  const [clickCount, setClickCount] = useState(0);

  const incrementClickCount = () => {
    setClickCount((prev) => prev + 1);
  };

  return (
    <ClickCountContext.Provider value={{ clickCount, incrementClickCount }}>
      {children}
    </ClickCountContext.Provider>
  );
};

const HomePage = () => {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const { clickCount, incrementClickCount } = useClickCount();
  const { name } = useLocalSearchParams();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Success", "You have logged out successfully!");
      router.push("(auth)/Sign_in");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred while logging out.");
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=education&maxResults=10`
        );
        setBooks(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.maintitle}>Hi {name}, Welcome back!</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Image source={logout} style={styles.logut} />
        </TouchableOpacity>
        <Text style={styles.title}>Recommended Reads for You Today</Text>

        <View style={styles.bookList}>
          {books.map((book) => (
            <TouchableOpacity
              key={book.id}
              style={styles.card}
              onPress={() => incrementClickCount()}
            >
              <Image
                source={{
                  uri:
                    book.volumeInfo.imageLinks?.thumbnail ||
                    "default-image-url",
                }}
                style={styles.bookImage}
              />
              <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
              <Text style={styles.bookAuthor}>
                {book.volumeInfo.authors?.[0] || "Unknown Author"}
              </Text>
              <Text style={styles.bookDescription}>
                {book.volumeInfo.description
                  ? `${book.volumeInfo.description.split(".")[0]}...`
                  : "No description available"}
              </Text>
              <Text style={styles.bookStatus}>
                {book.saleInfo.saleability === "FOR_SALE"
                  ? "Available for Sale"
                  : "Not For Sale"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FloatingAction
        actions={[
          {
            text: `Books Checked: ${clickCount}`,
            icon: require("../assets/images/open_bokk.png"),
            name: "bt_item_clicks",
            position: 1,
            textStyle: styles.actionText,
          },
        ]}
        color="#9400D3"
        buttonSize={60}
        distanceToEdge={30}
      />
    </View>
  );
};

export default () => (
  <ClickCountProvider>
    <HomePage />
  </ClickCountProvider>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E0B0FF",
  },
  maintitle: {
    fontSize: 19,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6A0DAD",
  },
  bookList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#9400D3",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  bookTitle: {
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 20,
    textAlign: "center",
    color: "#9400D3",
  },
  bookAuthor: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "bold",
  },
  bookDescription: {
    fontSize: 14,
    color: "#000",
    textAlign: "center",
  },
  bookStatus: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
    textAlign: "center",
  },
  actionText: {
    fontSize: 19,
    color: "#9400D3",
    fontWeight: "bold",
  },
  logut: {
    height: 30,
    width: 30,
    position: "absolute",
    right: 20,
    bottom: 20,
  },
});
