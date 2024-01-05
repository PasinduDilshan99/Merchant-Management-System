package com.example.merchantdemo.service;

import com.example.merchantdemo.dto.StoreDto;
import com.example.merchantdemo.entity.Store;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StoreService {
    ResponseEntity<Store> updateStore(StoreDto theStore);

    ResponseEntity<List<Store>> findAllStores();

    ResponseEntity<Store> getStoreById(int theStoreNumber);

    ResponseEntity<List<Store>> getStoresByUserId(int userId);
}
