package com.pours;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.os.Build;

import androidx.core.app.NotificationCompat;
import android.util.Log;


// RETAIN THIS AS AN EXAMPLE FOR NATIVE MODULES

public class LocalNotificationsModule extends ReactContextBaseJavaModule {

    public LocalNotificationsModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    // Essential, provides the name for the module.
    @Override
    public String getName() {
        return "LocalNotificationsModule";
    }

    // declare any methods the module should use
    @ReactMethod
    public void showLocalNotification(String title, String message) {
        // This is what it looks like...
        NotificationManager notificationManager = (NotificationManager) getReactApplicationContext()
                .getSystemService(Context.NOTIFICATION_SERVICE);

        // Create a notification channel for Android Oreo and above
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel("default",
                    "Channel Name",
                    NotificationManager.IMPORTANCE_HIGH);
            notificationManager.createNotificationChannel(channel);
        }

        // Create a notification
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getReactApplicationContext(), "default")
                .setSmallIcon(android.R.drawable.star_on)
                .setContentTitle(title)
                .setContentText(message)
                .setPriority(NotificationCompat.PRIORITY_HIGH)
                .setAutoCancel(true);

        // Show the notification, the first argument should be a unique ID.
        notificationManager.notify(11231251, builder.build());

        // Next is to set this module as a package in PoursPackage.java...
    }
}