package com.example.merchantdemo.dao.Impl;

import com.example.merchantdemo.dao.UserDAO;
import com.example.merchantdemo.entity.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.List;

@Repository
public class UserDAOImpl implements UserDAO {

    private EntityManager entityManager;

    @Autowired
    public UserDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public User adduser(User theUser) {
        try {
            User dbUser = entityManager.merge(theUser);
            return dbUser;
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public List<User> findAll() {
        try {
            TypedQuery<User> theQuery = entityManager.createQuery("from User", User.class);
            List<User> theUsers = theQuery.getResultList();
            return theUsers;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean loginUser(String userName, String password) {
        TypedQuery<User> theQuery = (TypedQuery<User>) entityManager.createNativeQuery
                ("SELECT * FROM User WHERE user_name = :userName", User.class);
        theQuery.setParameter("userName", userName);
        User theUser = theQuery.getSingleResult();
        if (theUser.getUserPassword().equals(password)) {
            return true;
        }
        return false;
    }



    @Override
    public User findUserByUserId(int theId) {
        try {
            TypedQuery<User> theQuery = (TypedQuery<User>) entityManager.createNativeQuery
                    ("SELECT * FROM User WHERE user_id =:theId", User.class);
            theQuery.setParameter("theId", theId);
            User theUser = theQuery.getSingleResult();
            return theUser;
        }catch (Exception e){
            return null;
        }

    }

    @Override
    public void updateUser(User theUser) {
        try {
            entityManager.merge(theUser);
        }catch (Exception e){

        }

    }


//    @Override
//    public String changePassword(LoginUser loginUser) {
//        String userName = loginUser.getUserName();
//        String newPassword = loginUser.getPassword();
//        TypedQuery<User> theQuery = (TypedQuery<User>) entityManager.createNativeQuery("UPDATE User SET userPassword = :newPassword WHERE userName = :userName", User.class);
//        theQuery.setParameter("userName", userName);
//        theQuery.setParameter("newPassword", newPassword);
//        return "Success";
//    }

    @Override
    public User findByName(String theName) {
        try {
        TypedQuery<User> theQuery = entityManager.createQuery("SELECT u FROM User u WHERE u.userName = :theName", User.class);
        theQuery.setParameter("theName", theName);
        return theQuery.getSingleResult();
    } catch (NoResultException e) {
        return null;
    }
    }

}
