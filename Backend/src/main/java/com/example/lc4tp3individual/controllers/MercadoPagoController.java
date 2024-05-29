package com.example.lc4tp3individual.controllers;

import com.example.lc4tp3individual.entities.CartItem;
import com.mercadopago.MercadoPagoConfig;
import com.mercadopago.client.preference.PreferenceClient;
import com.mercadopago.client.preference.PreferenceItemRequest;
import com.mercadopago.client.preference.PreferencePayerRequest;
import com.mercadopago.client.preference.PreferenceRequest;
import com.mercadopago.exceptions.MPApiException;
import com.mercadopago.exceptions.MPException;
import com.mercadopago.resources.preference.Preference;
import com.mercadopago.resources.preference.PreferenceItem;
import com.mercadopago.resources.preference.PreferencePayer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/mercadopago")
public class MercadoPagoController {

    @Value("${mercadopago.access-token}")
    private String accessToken;

    @PostMapping("/create-preference")
    public ResponseEntity<Map<String, String>> createPreference(@RequestBody List<CartItem> cartItems) throws MPException, MPApiException {
        MercadoPagoConfig.setAccessToken(accessToken);

        List<PreferenceItemRequest> items = cartItems.stream().map(cartItem -> PreferenceItemRequest.builder()
                .title(cartItem.getInstrumento())
                .quantity(cartItem.getCantidad())
                .unitPrice(cartItem.getPrecio())
                .build()).collect(Collectors.toList());

        PreferencePayerRequest payer = PreferencePayerRequest.builder()
                .email("TESTUSER974379954")  // Email de usuario comprador de prueba
                .build();

        PreferenceRequest preferenceRequest = PreferenceRequest.builder()
                .items(items)
                .payer(payer)
                .build();

        PreferenceClient client = new PreferenceClient();
        Preference preference = client.create(preferenceRequest);

        Map<String, String> response = new HashMap<>();
        response.put("preferenceId", preference.getId());
        return ResponseEntity.ok(response);
    }
}


