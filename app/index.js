import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

export default function Page() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [biodata, setBiodata] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kota, setKota] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [kelurahan, setKelurahan] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [subdistricts, setSubdistricts] = useState([]);
  const [imageKtp, setImageKtp] = useState(null);
  const [imageSelfie, setImageSelfie] = useState(null);
  const [imageBebas, setImageBebas] = useState(null);

  useEffect(() => {
    fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
      .then(response => response.json())
      .then(data => setProvinces(data));
  }, []);

  useEffect(() => {
    if (provinsi) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`)
        .then(response => response.json())
        .then(data => setCities(data));
    }
  }, [provinsi]);

  useEffect(() => {
    if (kota) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kota}.json`)
        .then(response => response.json())
        .then(data => setDistricts(data));
    }
  }, [kota]);

  useEffect(() => {
    if (kecamatan) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/villages/${kecamatan}.json`)
        .then(response => response.json())
        .then(data => setSubdistricts(data));
    }
  }, [kecamatan]);

  const pickImageKtp = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImageKtp(result.assets[0].uri);
    }
  };

  const pickImageSelfie = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (!result.canceled) {
      setImageSelfie(result.assets[0].uri);
    }
  };

  const pickImageBebas = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });
    if (!result.canceled) {
      setImageBebas(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Form</Text>

        <Text>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="First Name"
        />

        <Text>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Last Name"
        />

        <Text>Biodata</Text>
        <TextInput
          style={styles.textArea}
          value={biodata}
          onChangeText={setBiodata}
          placeholder="Biodata"
          multiline={true}
          numberOfLines={4}
        />

        <Text>Provinsi</Text>
        <Picker
          selectedValue={provinsi}
          onValueChange={(itemValue) => setProvinsi(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Provinsi" value="" />
          {provinces.map((prov) => (
            <Picker.Item key={prov.id} label={prov.name} value={prov.id} />
          ))}
        </Picker>

        <Text>Kota</Text>
        <Picker
          selectedValue={kota}
          onValueChange={(itemValue) => setKota(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Kota" value="" />
          {cities.map((city) => (
            <Picker.Item key={city.id} label={city.name} value={city.id} />
          ))}
        </Picker>

        <Text>Kecamatan</Text>
        <Picker
          selectedValue={kecamatan}
          onValueChange={(itemValue) => setKecamatan(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Kecamatan" value="" />
          {districts.map((district) => (
            <Picker.Item key={district.id} label={district.name} value={district.id} />
          ))}
        </Picker>

        <Text>Kelurahan</Text>
        <Picker
          selectedValue={kelurahan}
          onValueChange={(itemValue) => setKelurahan(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Kelurahan" value="" />
          {subdistricts.map((subdistrict) => (
            <Picker.Item key={subdistrict.id} label={subdistrict.name} value={subdistrict.id} />
          ))}
        </Picker>

        {/* Image KTP */}
        <View style={styles.imageContainerKtp}>
          {imageKtp && <Image source={{ uri: imageKtp }} style={styles.imageKtp} />}
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImageKtp}>
          <Text style={styles.buttonText}>Pick KTP</Text>
        </TouchableOpacity>

        {/* Image Selfie */}
        <View style={styles.imageContainer}>
          {imageSelfie && <Image source={{ uri: imageSelfie }} style={styles.image} />}
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImageSelfie}>
          <Text style={styles.buttonText}>Pick Selfie</Text>
        </TouchableOpacity>

        {/* Image Bebas */}
        <View style={styles.imageContainer}>
          {imageBebas && <Image source={{ uri: imageBebas }} style={styles.image} />}
        </View>
        <TouchableOpacity style={styles.button} onPress={pickImageBebas}>
          <Text style={styles.buttonText}>Pick Bebas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonSub}>
        <Text style={styles.buttonText}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
  },
  buttonSub: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 8,
    marginTop: 12,
    borderRadius: 4,
    width: "100%",
    maxWidth: 600,
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,

  },
  imageContainer: {
    marginBottom: 12,
    alignItems: 'center',
  },
  imageContainerKtp: {
    marginBottom: 12,
    alignItems: 'center',
  },
  imageKtp: {
    width: 200,
    height: 112.5, // For 16:9 aspect ratio
    borderWidth: 2,
    borderColor: "black",
  },
  image: {
    width: 200,
    height: 355.55, // For 9:16 aspect ratio
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  main: {
    width: "100%",
    maxWidth: 600,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  picker: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1

  },
  placeholder: {
    textAlign: "center",
    color: "gray",
  },
});
