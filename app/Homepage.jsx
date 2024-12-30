import React, { useState, useEffect, useContext, createContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";
import { FloatingAction } from "react-native-floating-action";
import SubjectDropdown from "../components/Dropdown";


const ClickCountContext = createContext();

// Custom Hook to use click count context
const useClickCount = () => {
  return useContext(ClickCountContext);
};

// Provider Component for managing and providing click count state
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
  const [books, setBooks] = useState([]);
  const { clickCount, incrementClickCount } = useClickCount();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=education&maxResults=10`
        );
        console.log(response.data.items);
        setBooks(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.maintitle}></Text>
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
                  book.volumeInfo.imageLinks?.thumbnail || "default-image-url",
              }} // Use the thumbnail image from 'volumeInfo'
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
            </Text>Hi Sachini, welcome back!
            <Text style={styles.bookStatus}>
              {book.saleInfo.saleability === "FOR_SALE"
                ? "Available for Sale"
                : "Not For Sale"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Floating Action Button */}
       
      <FloatingAction
        actions={[
          {
            text: `Item Clicks: ${clickCount}`,
            //icon: require('./assets/icon.png'), // You can replace it with your custom icon
            name: "bt_item_clicks",
            position:"1",
            textStyle: styles.actionText,
          },
        ]}
        onPressItem={(name) => console.log(name)}
        color="#9400D3"  
        buttonSize={60}
        distanceToEdge={30}
         
      />
       
    </ScrollView>
  );
};

const App = () => {
  return (
    <ClickCountProvider>
      <HomePage />
    </ClickCountProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E0B0FF",
  },
  maintitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color:"#6A0DAD"
  },
  subjectSelector: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
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
    fontSize: 16,
    color: '#9400D3',   
    fontWeight: 'bold',   
  },
   
});

export default App;
