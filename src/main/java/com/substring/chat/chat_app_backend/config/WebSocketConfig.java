package com.substring.chat.chat_app_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/chat") // Endpoint for WebSocket connections
                .setAllowedOrigins("*") // Allows cross-origin requests from any domain
                .withSockJS(); // Enables SockJS fallback for browsers that don't support WebSockets
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Enables a simple memory-based message broker for subscriptions
        config.enableSimpleBroker("/topic");
        // All messages sent from client starting with this prefix will be routed to @MessageMapping methods
        config.setApplicationDestinationPrefixes("/app");
    }
}
