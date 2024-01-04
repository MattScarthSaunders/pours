package com.pours;
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

// RETAIN THIS AS AN EXAMPLE FOR NATIVE MODULES
// This is basically just boilerplate.

public class PoursPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();
    
    // basically, just add any new modules for the app here, like this...
       modules.add(new LocalNotificationsModule(reactContext));

       return modules;
   }

//    Now to link it to the app in MainApplication.kt!
}