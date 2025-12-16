import { CaretLeft } from "@/assets/icons";
import { Colors } from "@/constants/Colors";
import { Button } from "@/ui/Button";
import { Header } from "@/ui/Header";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import * as ImagePicker from 'expo-image-picker';

export default function ProfileDetailsScreen() {
  const { colors } = useTheme();
  const { user, updateUser } = useUser();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [image, setImage] = useState(user.image);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    updateUser({ name, email, phone, image });
    Alert.alert("Success", "Profile updated successfully!");
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <Header>
        <CaretLeft width="16" height="16" onPress={() => router.back()} fill={colors.text} />
        <Text style={[styles.headerTitle, { color: colors.text }]}>Profile Details</Text>
        <View style={{ width: 16 }} />
      </Header>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.avatarSection}>
          <Image source={{ uri: image }} style={styles.avatar} />
          <TouchableOpacity onPress={pickImageAsync}>
            <Text style={styles.changeAvatarText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Full Name</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Email Address</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.tabIconDefault }]}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        <Button title="Save Changes" onPress={handleSave} style={styles.saveButton} styleTitle={styles.saveButtonText} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.default.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  changeAvatarText: {
    fontSize: 14,
    color: Colors.default.blue,
    fontWeight: "500",
  },
  form: {
    width: "100%",
    marginBottom: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.default.black,
    fontWeight: "500",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.default.line,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: Colors.default.black,
  },
  saveButton: {
    backgroundColor: Colors.default.blue,
    width: "100%",
    borderColor: Colors.default.blue,
  },
  saveButtonText: {
    color: Colors.default.white,
  },
});
