package com.substring.chat.chat_app_backend.controllers;


import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.payload.MessageRequest;
import com.substring.chat.chat_app_backend.repositories.RoomRepository;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

@Controller
public class ChatController {
    private RoomRepository roomRepository;
    public ChatController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    //for sending and receiving messages we will use web sockets

    @MessageMapping("/sendMessage/{roomId}")
    @SendTo("/topic/room/{roomId}")
    public Message sendMessage(@RequestBody MessageRequest request, @DestinationVariable String roomId) {
        //save message to db
        Room room = roomRepository.findByRoomId(request.getRoomId());
        if (room != null) {
            Message message = new Message();
            message.setSender(request.getSender());
            message.setContent(request.getContent());
            message.setTimestamp(LocalDateTime.now());
            room.getMessages().add(message);
            roomRepository.save(room);
            return message;
        }
        return null;
    }
}