package com.geargridapp

import android.content.Context
import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class StorageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "SharedStorage"
    }

    private fun startService() {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, WebSocketNotificationService::class.java)
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                context.startForegroundService(intent)
            } else {
                context.startService(intent)
            }
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    private fun stopService() {
        try {
            val context = reactApplicationContext
            val intent = Intent(context, WebSocketNotificationService::class.java)
            context.stopService(intent)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @ReactMethod
    fun setItem(key: String, value: String, promise: Promise) {
        try {
            val sharedPref = reactApplicationContext.getSharedPreferences("GearGridStorage", Context.MODE_PRIVATE)
            with (sharedPref.edit()) {
                putString(key, value)
                apply()
            }
            if (key == "userToken") {
                startService()
            }
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_SET_ITEM", e.message)
        }
    }

    @ReactMethod
    fun getItem(key: String, promise: Promise) {
        try {
            val sharedPref = reactApplicationContext.getSharedPreferences("GearGridStorage", Context.MODE_PRIVATE)
            val value = sharedPref.getString(key, null)
            if (key == "userToken" && value != null) {
                startService()
            }
            promise.resolve(value)
        } catch (e: Exception) {
            promise.reject("ERR_GET_ITEM", e.message)
        }
    }

    @ReactMethod
    fun removeItem(key: String, promise: Promise) {
        try {
            val sharedPref = reactApplicationContext.getSharedPreferences("GearGridStorage", Context.MODE_PRIVATE)
            with (sharedPref.edit()) {
                remove(key)
                apply()
            }
            if (key == "userToken") {
                stopService()
            }
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_REMOVE_ITEM", e.message)
        }
    }

    @ReactMethod
    fun clear(promise: Promise) {
        try {
            val sharedPref = reactApplicationContext.getSharedPreferences("GearGridStorage", Context.MODE_PRIVATE)
            with (sharedPref.edit()) {
                clear()
                apply()
            }
            stopService()
            promise.resolve(null)
        } catch (e: Exception) {
            promise.reject("ERR_CLEAR", e.message)
        }
    }
}
