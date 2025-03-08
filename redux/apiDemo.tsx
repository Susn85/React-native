// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// import axios from 'axios';


// const API_URL = process.env.API_URL || "http://192.168.1.100:3000";

// const App = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     axios.get(`${API_URL}/api/reels`)
//       .then(response => setData(response.data))
//       .catch(error => console.log("API Error:", error));
//   }, []);

//   return (
//     <View>
//       <Text>{data ? JSON.stringify(data) : "Loading..."}</Text>
//     </View>
//   );
// };

// export default App;
