import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import { isStaffOrAdmin } from '../utils/authRoles';
import { appEvents } from '../utils/eventEmitter';
import { showSuccess, showInfo } from './AlertMsg';
import { getApiBaseUrl } from '../app/api/auth';

const WebSocketContext = createContext<{
  connected: boolean;
  send: (event: string, data: any) => void;
} | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};

// --- CONFIGURATION ---
// Change this to your deployed Railway WebSocket URL (e.g., wss://your-ws-app.up.railway.app)
const RAILWAY_WS_URL = 'wss://remarkable-rebirth-production.up.railway.app';
const LOCAL_WS_PORT = '8080';
// ---------------------

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Read auth state from Redux
  const auth = useSelector((state: any) => state.auth.user);
  const u = auth?.user ?? auth;
  const isLoggedIn = !!auth;
  const staffMode = isStaffOrAdmin(auth);

  useEffect(() => {
    if (!isLoggedIn) {
      // Disconnect socket if user logs out
      if (socketRef.current) {
        socketRef.current.close();
      }
      return;
    }

    const connect = () => {
      // Always connect to the live Railway WebSocket server for final submission/testing
      let wsUrl = RAILWAY_WS_URL;

      console.log(`[WebSocket] Connecting to ${wsUrl}`);
      
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        console.log('[WebSocket] Connection established');
        setConnected(true);
      };

      ws.onmessage = (event) => {
        if (event.data === 'ping') {
          ws.send('pong');
          return;
        }

        try {
          const payload = JSON.parse(event.data);
          const { event: eventName, data } = payload;
          
          if (!eventName) return;

          console.log(`[WebSocket] Message received: ${eventName}`, data);

          // Trigger app-wide event
          appEvents.emit(eventName, data);

          // Handle notifications
          if (eventName === 'new-order') {
            if (staffMode) {
              showSuccess('New Order Placed!', data.message || `Order #${data.orderId} was just placed.`);
            }
          } else if (eventName === 'order-status-updated') {
            const currentUserId = u?.id || u?.userId;
            const targetCustomerId = data.customerId;
            
            // Notify customer if it's their order
            if (!staffMode && currentUserId && String(currentUserId) === String(targetCustomerId)) {
              showInfo(`Order Status Update`, data.message || `Order #${data.orderId} status is now: ${data.status}`);
              
              const statusStr = String(data.status || '').toLowerCase();
              let title = 'Order Update 🔔';
              let msg = `Your order #${data.orderId} status is now: ${data.status}`;
              
              if (statusStr === 'processing') {
                title = 'Order Processing ⚙️';
                msg = `Your order #${data.orderId} is now being processed.`;
              } else if (statusStr === 'shipped') {
                title = 'Order Shipped 🚚';
                msg = `Your order #${data.orderId} has been shipped and is on the way!`;
              } else if (statusStr === 'delivered') {
                title = 'Order Delivered 🎉';
                msg = `Your order #${data.orderId} has been successfully delivered!`;
              } else if (statusStr === 'completed') {
                title = 'Order Completed ✅';
                msg = `Your order #${data.orderId} is now complete. Thank you!`;
              } else if (statusStr === 'cancelled') {
                title = 'Order Cancelled ❌';
                msg = `Your order #${data.orderId} has been cancelled.`;
              }
              
              Alert.alert(title, msg, [{ text: 'OK' }]);
            }
          }
        } catch (err) {
          console.error('[WebSocket] Error parsing message:', err);
        }
      };

      ws.onclose = (e) => {
        console.log(`[WebSocket] Connection closed: ${e.code} - ${e.reason}`);
        setConnected(false);
        socketRef.current = null;
        
        // Auto-reconnect if still logged in
        reconnectTimeoutRef.current = setTimeout(() => {
          if (isLoggedIn) {
            console.log('[WebSocket] Attempting to reconnect...');
            connect();
          }
        }, 5000);
      };

      ws.onerror = (err) => {
        console.warn('[WebSocket] Error occurred', err);
      };
    };

    connect();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [isLoggedIn, staffMode, u?.id, u?.userId]);

  const send = (event: string, data: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ event, data }));
    } else {
      console.warn('[WebSocket] Cannot send message, socket not connected');
    }
  };

  return (
    <WebSocketContext.Provider value={{ connected, send }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketProvider;
