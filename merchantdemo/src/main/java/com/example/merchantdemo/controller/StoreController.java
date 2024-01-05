package com.example.merchantdemo.controller;

import com.example.merchantdemo.dto.StoreDto;
import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/store")
public class StoreController {

    private StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Store>> findAllStores(){
        return storeService.findAllStores();
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Store>> getStoresByUserId(@PathVariable int userId){
        return storeService.getStoresByUserId(userId);
    }

    @GetMapping("/{theStoreNumber}")
    public ResponseEntity<Store> getStoreById(@PathVariable int theStoreNumber){
        return storeService.getStoreById(theStoreNumber);
    }
    @PutMapping("/")
    public ResponseEntity<Store> updateStore(@RequestBody StoreDto theStore){
        return storeService.updateStore(theStore);
    }


}
