import { useEffect, useRef, useState } from "react";
import { Client, IMessage } from "@stomp/stompjs";
// import SockJS from "sockjs-client"; ← 제거

interface UseWebSocketProps {
  url: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

export function useWebSocket({
  url,
  onConnect,
  onDisconnect,
  onError,
}: UseWebSocketProps) {
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // STOMP 클라이언트 생성 (네이티브 WebSocket)
    const client = new Client({
      brokerURL: url,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => {
        console.log("STOMP:", str);
      },
      onConnect: () => {
        console.log("WebSocket Connected");
        setIsConnected(true);
        onConnect?.();
      },
      onDisconnect: () => {
        console.log("WebSocket Disconnected");
        setIsConnected(false);
        onDisconnect?.();
      },
      onStompError: (frame) => {
        console.error("STOMP Error:", frame);
        onError?.(frame);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      client.deactivate();
    };
  }, [url, onConnect, onDisconnect, onError]);

  const subscribe = (
    destination: string,
    callback: (message: IMessage) => void
  ) => {
    if (!clientRef.current?.connected) {
      console.warn("WebSocket is not connected");
      return;
    }

    const subscription = clientRef.current.subscribe(destination, callback);
    return () => subscription.unsubscribe();
  };

  const publish = (destination: string, body: any) => {
    if (!clientRef.current?.connected) {
      console.warn("WebSocket is not connected");
      return;
    }

    clientRef.current.publish({
      destination,
      body: JSON.stringify(body),
    });
  };

  return {
    isConnected,
    subscribe,
    publish,
    client: clientRef.current,
  };
}
