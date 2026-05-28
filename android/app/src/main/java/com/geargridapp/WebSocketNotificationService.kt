package com.geargridapp

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Context
import android.content.Intent
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener
import org.json.JSONObject
import java.util.concurrent.TimeUnit

class WebSocketNotificationService : Service() {

    private var webSocket: WebSocket? = null
    private val client = OkHttpClient.Builder()
        .readTimeout(0, TimeUnit.MILLISECONDS)
        .build()

    private val CHANNEL_ID = "GearGridBackgroundService"
    private val NOTIFICATION_CHANNEL_ID = "GearGridOrderUpdates"

    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }

    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
        )

        val notification = NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("GearGrid Background Sync")
            .setContentText("Listening for real-time order updates...")
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_MIN)
            .build()

        startForeground(1001, notification)
        connectWebSocket()

        return START_STICKY
    }

    private fun connectWebSocket() {
        val request = Request.Builder()
            .url("wss://remarkable-rebirth-production.up.railway.app")
            .build()

        webSocket = client.newWebSocket(request, object : WebSocketListener() {
            override fun onOpen(webSocket: WebSocket, response: Response) {
                super.onOpen(webSocket, response)
                println("[BG-WS] Connected to WebSocket server")
            }

            override fun onMessage(webSocket: WebSocket, text: String) {
                super.onMessage(webSocket, text)
                if (text == "ping") {
                    webSocket.send("pong")
                    return
                }
                
                try {
                    val payload = JSONObject(text)
                    val event = payload.optString("event")
                    val data = payload.optJSONObject("data")

                    if (data != null) {
                        // Read logged-in user from SharedPreferences
                        val sharedPref = getSharedPreferences("GearGridStorage", Context.MODE_PRIVATE)
                        val rawUserToken = sharedPref.getString("userToken", null)
                        if (rawUserToken != null) {
                            val userObj = JSONObject(rawUserToken)
                            val nestedUserObj = userObj.optJSONObject("user")
                            val loggedInUserId = if (nestedUserObj != null) {
                                nestedUserObj.optString("id", "")
                            } else {
                                userObj.optString("id", "")
                            }

                            val rolesArray = if (nestedUserObj != null) {
                                nestedUserObj.optJSONArray("roles")
                            } else {
                                userObj.optJSONArray("roles")
                            }
                            var isStaffOrAdmin = false
                            if (rolesArray != null) {
                                for (i in 0 until rolesArray.length()) {
                                    val role = rolesArray.getString(i)
                                    if (role == "ROLE_ADMIN" || role == "ROLE_STAFF") {
                                        isStaffOrAdmin = true
                                    }
                                }
                            }

                            if (event == "order-status-updated") {
                                val orderId = data.optInt("orderId")
                                val customerId = data.optString("customerId")
                                val status = data.optString("status")
                                val message = data.optString("message")

                                if (isStaffOrAdmin || (loggedInUserId.isNotEmpty() && loggedInUserId == customerId)) {
                                    showOrderUpdateNotification(orderId, status, message)
                                }
                            } else if (event == "new-order") {
                                val orderId = data.optInt("orderId")
                                val message = data.optString("message")

                                if (isStaffOrAdmin) {
                                    showNewOrderNotification(orderId, message)
                                }
                            }
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }

            override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
                super.onClosing(webSocket, code, reason)
            }

            override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
                super.onFailure(webSocket, t, response)
                println("[BG-WS] WebSocket Failure: " + t.message)
                Thread {
                    try {
                        Thread.sleep(10000)
                        connectWebSocket()
                    } catch (e: InterruptedException) {
                        e.printStackTrace()
                    }
                }.start()
            }
        })
    }

    private fun showOrderUpdateNotification(orderId: Int, status: String, message: String) {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
        )

        val title = "Order Update #$orderId 🔔"
        val msg = message.ifEmpty { "Your order status is now: $status" }

        val notification = NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(msg)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .build()

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(orderId, notification)
    }

    private fun showNewOrderNotification(orderId: Int, message: String) {
        val notificationIntent = Intent(this, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            this, 0, notificationIntent,
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0
        )

        val title = "New Order Placed 🔔"
        val msg = message.ifEmpty { "Order #$orderId was just placed." }

        val notification = NotificationCompat.Builder(this, NOTIFICATION_CHANNEL_ID)
            .setContentTitle(title)
            .setContentText(msg)
            .setSmallIcon(android.R.drawable.ic_dialog_info)
            .setContentIntent(pendingIntent)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setAutoCancel(true)
            .build()

        val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
        notificationManager.notify(orderId + 100000, notification)
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val serviceChannel = NotificationChannel(
                CHANNEL_ID,
                "GearGrid Background Sync Service Channel",
                NotificationManager.IMPORTANCE_LOW
            )
            val updateChannel = NotificationChannel(
                NOTIFICATION_CHANNEL_ID,
                "GearGrid Order Status Updates Channel",
                NotificationManager.IMPORTANCE_HIGH
            )
            val manager = getSystemService(NotificationManager::class.java)
            manager?.createNotificationChannel(serviceChannel)
            manager?.createNotificationChannel(updateChannel)
        }
    }

    override fun onDestroy() {
        super.onDestroy()
        webSocket?.close(1000, "Service destroyed")
    }

    override fun onBind(intent: Intent?): IBinder? {
        return null
    }
}
