package com.pours;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;

import com.facebook.react.bridge.Callback;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import android.content.Context;
import android.os.Build;

import android.util.Log;



public class LocalStorageModule extends ReactContextBaseJavaModule {

    private Context context;

    public LocalStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "LocalStorageModule";
    }

    @ReactMethod
    public void saveFile(String filename, String fileContents) {
        try {
            try (FileOutputStream fos = context.openFileOutput(filename, Context.MODE_PRIVATE)) {
                fos.write(fileContents.getBytes(StandardCharsets.UTF_8));
            }
        } catch (FileNotFoundException e) {
            Log.e("ReactNative", "File not found: " + e.getMessage());
        } catch (IOException e) {
            Log.e("ReactNative", "Error saving file: " + e.getMessage());
        }
    }

    @ReactMethod
    public void readFile(String filename, Callback successCallback, Callback errorCallback) {
        try {
            FileInputStream fis = context.openFileInput(filename);
    
            InputStreamReader inputStreamReader =
                    new InputStreamReader(fis, StandardCharsets.UTF_8);
    
            StringBuilder stringBuilder = new StringBuilder();
    
            try (BufferedReader reader = new BufferedReader(inputStreamReader)) {
                String line = reader.readLine();
                while (line != null) {
                    stringBuilder.append(line).append('\n');
                    line = reader.readLine();
                }
            }
    
            String contents = stringBuilder.toString();
            successCallback.invoke(contents);
        } catch (FileNotFoundException e) {
            Log.e("ReactNative", "File not found: " + e.getMessage());
            errorCallback.invoke("File not found");
        } catch (IOException e) {
            Log.e("ReactNative", "Error reading file: " + e.getMessage());
            errorCallback.invoke("Error reading file");
        }

    }

    @ReactMethod
    public void deleteFile(String filename, Callback successCallback, Callback errorCallback) {
        if (context.deleteFile(filename)) {
            successCallback.invoke("File deleted successfully");
        } else {
            errorCallback.invoke("Error deleting file");
        }
    }
}