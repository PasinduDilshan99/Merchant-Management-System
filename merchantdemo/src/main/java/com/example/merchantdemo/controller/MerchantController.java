package com.example.merchantdemo.controller;

import com.example.merchantdemo.dto.MerchantDto;
import com.example.merchantdemo.entity.Merchant;
import com.example.merchantdemo.entity.Store;
import com.example.merchantdemo.entity.User;
import com.example.merchantdemo.exception.InvalidUserIdException;
import com.example.merchantdemo.service.MerchantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/merchant")
public class MerchantController {

    private MerchantService merchantService;

    @Autowired
    public MerchantController(MerchantService merchantService) {
        this.merchantService = merchantService;
    }
    @GetMapping("/getAll")
    public ResponseEntity<List<Merchant>> getAllMerchants(){
        return merchantService.getAllMerchants();
    }

    @GetMapping("/{merchantId}")
    public ResponseEntity<Merchant> getMerchantById(@PathVariable int merchantId){
        return merchantService.getMerchantById(merchantId);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Merchant>> getMerchantsByUserId(@PathVariable int userId) {
        return merchantService.getMerchantsByUserId(userId);
    }


    @PostMapping()
    public ResponseEntity<String> addMerchant(@RequestBody MerchantDto theMerchant){
        return merchantService.addMerchant(theMerchant);
    }

    @PutMapping()
    public ResponseEntity<Merchant> updateMerchant(@RequestBody MerchantDto theMerchant){
        return merchantService.updateMerchant(theMerchant);
    }

    @PutMapping("/changeStore")
    public ResponseEntity<String> changeMerchantStore(@RequestParam int theMerchantId, @RequestParam int theStoreNumber){
        return merchantService.changeMerchantStore(theMerchantId, theStoreNumber);
    }


}
