import { StyleSheet, Text, View } from 'react-native';
import { Button } from "@react-native-material/core";
import { useEffect, useState } from 'react';
import axios from 'axios';


interface Workout {
page:number,
pageDisplay:number,
items:[]
}
export default function App() {
const [data, setdata] = useState<Workout>();
useEffect(() => {
axios.get("http://localhost:8080/api/v1/workouts/exercises?page=1&limit=10").then((response) =>{
setdata(response.data)


})
}, []);
  
  return (
    <View style={styles.container}>
      <Text>{data?.page}</Text>
      <Text>{data?.pageDisplay}</Text>
      {data?.items.map((item:any, idx) =>  <Text key={idx}>{item.name}</Text>)}
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
