package com.example.merchantdemo.dao.Impl;

import com.example.merchantdemo.dao.MerchantDAO;
import com.example.merchantdemo.entity.Merchant;
import com.example.merchantdemo.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class MerchantDAOImpl implements MerchantDAO {

    private EntityManager entityManager;

    @Autowired
    public MerchantDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Merchant getMerchantById(int merchantId) {
        try {
            TypedQuery<Merchant> theQuery = entityManager.createQuery("SELECT m FROM Merchant m WHERE m.merchantId = :merchantId", Merchant.class);
            theQuery.setParameter("merchantId", merchantId);
            Merchant theMerchant = theQuery.getSingleResult();
            return theMerchant;
        }catch (Exception e){
           return null;
        }

    }

    @Override
    public List<Merchant> getMerchantsByUserId(int userId) {
        try {
            TypedQuery<Merchant> theQuery = (TypedQuery<Merchant>) entityManager.createNativeQuery("SELECT * FROM Merchant  WHERE user_user_id = :userId", Merchant.class);
            theQuery.setParameter("userId", userId);
            List<Merchant> merchants = theQuery.getResultList();
            return merchants;
        }catch (Exception e){
            return new ArrayList<>();
        }

    }

    @Override
    public Merchant addMerchant(Merchant theMerchant) {
        try {
            Merchant dbMerchant = entityManager.merge(theMerchant);
            return dbMerchant;
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public Merchant updateMerchant(Merchant theMerchant) {
        try {
            Merchant updatedMerchant = entityManager.merge(theMerchant);
            return updatedMerchant;
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public List<Merchant> getAllMerchants() {
        try {
            TypedQuery<Merchant> theQuery = (TypedQuery<Merchant>) entityManager.createNativeQuery("SELECT * FROM Merchant", Merchant.class);
            List<Merchant> merchants= theQuery.getResultList();
            return merchants;
        }catch (Exception e){
            return null;
        }

    }

//    @Override
//    public void addUserForMercahnt(User theUser, int merchantId) {
//        TypedQuery<Merchant> theQuery = (TypedQuery<Merchant>) entityManager.createNativeQuery
//                ("UPDATE Merchant SET Merchant.user = :theUser WHERE m_id = :merchantId", Merchant.class );
//        theQuery.setParameter("theUser", theUser);
//        theQuery.setParameter("merchantId", merchantId);
//
//    }


}
