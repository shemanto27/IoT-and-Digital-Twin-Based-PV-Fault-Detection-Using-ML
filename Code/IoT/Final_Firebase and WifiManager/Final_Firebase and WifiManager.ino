#include <WiFiManager.h> // WiFi Manager library
#include <Firebase_ESP_Client.h>
#include <Wire.h>

// Firebase token and payload helper files
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

// Firebase project credentials
#define API_KEY "AIzaSyBjzmTD1OpoWvnHHTSca0oClG3goOOk0RA"
#define USER_EMAIL "shemantosharkarofficial@gmail.com"
#define USER_PASSWORD "pass1234"
#define DATABASE_URL "https://esp32-iot-00-default-rtdb.asia-southeast1.firebasedatabase.app/"

// Firebase objects
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

// Custom database paths
String CurrentPath = "/Sensors/Current";
String IrradiancePath = "/Sensors/Irradiance";
String TemperaturePath = "/Sensors/Temperature";
String VoltagePath = "/Sensors/Voltage";

float Current;
float Irradiance;
float Temperature;
float Voltage;
unsigned long sendDataPrevMillis = 0;
unsigned long timerDelay = 10000;

void setup() {
  Serial.begin(115200);

  // Initialize WiFi using WiFiManager
  WiFiManager wm;
  bool res = wm.autoConnect("AutoConnectAP", "password");

  if (!res) {
    Serial.println("Failed to connect to WiFi");
    ESP.restart();  // Restart if connection fails
  } else {
    Serial.println("Connected to WiFi!");
  }

  // Firebase configuration
  config.api_key = API_KEY;
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;
  config.database_url = DATABASE_URL;

  // Enable Firebase reconnection and set response size
  Firebase.reconnectWiFi(true);
  fbdo.setResponseSize(4096);
  config.token_status_callback = tokenStatusCallback;
  config.max_token_generation_retry = 5;
  Firebase.begin(&config, &auth);
}

void sendFloat(String path, float value) {
  if (Firebase.RTDB.setFloat(&fbdo, path.c_str(), value)) {
    Serial.println("Data sent: " + path + " = " + String(value));
  } else {
    Serial.println("Failed to send data: " + fbdo.errorReason());
  }
}

void loop() {
  // Send sensor data every 30 seconds
  if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();

    // Generate random readings for demonstration
    Current = random(200, 350) / 10.0;
    Irradiance = random(300, 700) / 10.0;
    Temperature = random(9500, 10500) / 100.0;
    Voltage = random(300, 700) / 10.0;

    // Send data to Firebase without user-specific paths
    sendFloat(CurrentPath, Current);
    sendFloat(IrradiancePath, Irradiance);
    sendFloat(TemperaturePath, Temperature);
    sendFloat(VoltagePath, Voltage);
  }
}
