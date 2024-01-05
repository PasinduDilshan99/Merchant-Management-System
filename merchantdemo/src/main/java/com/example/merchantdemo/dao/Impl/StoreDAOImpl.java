package com.example.merchantdemo.dao.Impl;

import com.example.merchantdemo.dao.StoreDAO;
import com.example.merchantdemo.entity.Store;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class StoreDAOImpl implements StoreDAO {

    private EntityManager entityManager;

    @Autowired
    public StoreDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Store updateStore(Store theStore) {
        Store updatedStore = entityManager.merge(theStore);
       // System.out.println(updatedStore);
        return updatedStore;
    }

    @Override
    public List<Store> findAllStores() {
        TypedQuery<Store> theQuery = (TypedQuery<Store>) entityManager.createNativeQuery("SELECT * FROM Store", Store.class);
        List<Store> theStores = theQuery.getResultList();
        return theStores;
    }

    @Override
    public Store getStoreById(int theStoreNumber) {
        try {
            TypedQuery<Store> theQuery = (TypedQuery<Store>) entityManager.createNativeQuery("SELECT * FROM Store WHERE store_number = :theStoreNumber", Store.class);
            theQuery.setParameter("theStoreNumber", theStoreNumber);
            Store theStore = theQuery.getSingleResult();
            return theStore;
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public List<Store> getStoresByUserId(int userId) {
        try {
            TypedQuery<Store> theQuery = (TypedQuery<Store>) entityManager.createNativeQuery("SELECT * FROM Store WHERE user_user_id = :userId", Store.class);
            theQuery.setParameter("userId", userId);
            List<Store> stores = theQuery.getResultList();
            return stores;
        }catch (Exception e){
            return new ArrayList<>();
        }

    }
}
