package com.example.merchantdemo.dao;

import com.example.merchantdemo.entity.Store;

import java.util.List;

public interface StoreDAO {
    Store updateStore(Store theStore);

    List<Store> findAllStores();

    Store getStoreById(int theStoreNumber);

    Object getStoresByUserId(int userId);
}
