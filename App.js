import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  const [postList, setPostList] = useState([])
  const fetchData = async (limit = 10) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`)
    const data = await response.json()
    setPostList(data)
  }

  useEffect(() => {
    fetchData();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={postList}
          renderItem={({ item }) => {
            return (
              <View style={styles.card} key={item.id}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.body}>{item.body}</Text>
              </View>
            )
          }}
          ListEmptyComponent={<Text>No posts</Text>}
          ListHeaderComponent={<Text style={styles.headerLists}>Post List</Text>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16
   },
  card: {
    backgroundColor: "grey",
    padding: 10,
    borderColor: "black",
    borderWidth: 2,
    marginBottom: 10,
    borderRadius: 10
  },
  title: {
    fontSize: 30
  },
  body: {
    fontSize: 24,
    color: "white"
  },
  headerLists: {
    fontSize: 30,
    textAlign: "center"
  }
});
