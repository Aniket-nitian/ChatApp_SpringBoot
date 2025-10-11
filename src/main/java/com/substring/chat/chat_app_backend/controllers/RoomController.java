package com.substring.chat.chat_app_backend.controllers;

import com.substring.chat.chat_app_backend.entities.Message;
import com.substring.chat.chat_app_backend.entities.Room;
import com.substring.chat.chat_app_backend.repositories.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/rooms")
@CrossOrigin("*")
public class RoomController {
    private RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }


    //create a room
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody String roomId) {
        if (roomRepository.findByRoomId(roomId) != null) {
            return ResponseEntity.badRequest().body("Room already exists");
        }

        Room room = new Room();
        room.setRoomId(roomId);
        roomRepository.save(room);
        return ResponseEntity.status(HttpStatus.CREATED).body(room);
    }

    //get room
    @GetMapping("{roomId}")
    public ResponseEntity<?> joinRoom(@PathVariable String roomId) {
        Room room = roomRepository.findByRoomId(roomId);
        if (room == null) {
            return ResponseEntity.badRequest().body("Room does not exist");
        }
        return ResponseEntity.ok(room);
    }

    //get messages of the room
    @GetMapping("{roomId}/messages")
    public ResponseEntity<?> getMessages(@PathVariable String roomId, @RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value = "size", defaultValue = "20") int size) {
        Room room = roomRepository.findByRoomId(roomId);

        if(room == null) {
            return ResponseEntity.badRequest().build();
        }
        //get message
        //pagination
        List<Message> message = room.getMessages();
        int start = Math.max(0, message.size()-(page + 1) * size);
        int end = Math.min(message.size(),start + size);
        List<Message> paginatedMessages = message.subList(start, end);

        return ResponseEntity.ok(paginatedMessages);
    }
}
