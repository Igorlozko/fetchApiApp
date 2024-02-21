import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, Button, View, TextInput } from 'react-native';

const Stack = createNativeStackNavigator(); // sets up the navigation manages navigation flow 

const HomeScreen = ({ navigation, route }) => { // homescreen componment navigation and route as props used to navigate to other screens 
  const { text } = route.params || {};
  
  const handleProfilePress = () => {
    navigation.navigate('Profile', { name: 'Jane' });
  };

  const handleThirdScreenPress = () => {
    navigation.navigate('Third');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Welcome to the Home Screen</Text>
      {text && <Text>You entered: {text}</Text>}
      <Button title="Go to Jane's Profile" onPress={handleProfilePress} />
      <Button title="Go to Third Screen" onPress={handleThirdScreenPress} />
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => { //componment navigation and route as props used to navigate to other screens 
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
};

const ThirdScreen = ({ navigation }) => {
  const [inputText, setInputText] = React.useState('');
  const [quote, setQuote] = React.useState(null);

  const handleButtonPress = async () => {
    try {
      const response = await fetch('https://quotes15.p.rapidapi.com/quotes/random/', {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'quotes15.p.rapidapi.com',
          'x-rapidapi-key': 'e3a30e8caemsh68d7c40a5ad8065p1387cajsn426d9b7b9db1', // Replace with your actual RapidAPI key
          'accept': 'application/json'
        }
      });
      const data = await response.json();
      setQuote(data.content);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };
  const handleSubmitText = () => {
    navigation.navigate('Home', { text: inputText });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TextInput
        style={{ height: 40, width: '80%', borderColor: 'gray', borderWidth: 1, marginBottom: 20, padding: 10 }}
        placeholder="Enter text"
        onChangeText={setInputText}
        value={inputText}
      />
      <Button
        title="Submit Text to Home Screen"
        onPress={handleSubmitText}
      />
      <Button
        title="Fetch Quote"
        onPress={handleButtonPress}
      />
      {quote ? (
        <View>
          <Text>{quote}</Text>
        </View>
      ) : (
        <Text>Press to fetch a quote</Text>
      )}
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
      <Button
        title="Go to Profile Screen"
        onPress={() => navigation.navigate('Profile', { name: 'Jane' })}
      />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Third" component={ThirdScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
