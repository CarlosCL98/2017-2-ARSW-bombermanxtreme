/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.BomberManX.controllers;

import edu.eci.arsw.BomberManX.services.BomberManXServices;
import edu.eci.arsw.BomberManX.services.GameServicesException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Kevin S. Sanchez
 */
@RestController
@RequestMapping("/canvas")
public class BomberManXAPIControllerCanvas {

    @Autowired
    BomberManXServices gameServices;

    @Autowired
    SimpMessagingTemplate msmt;

    @RequestMapping(method = RequestMethod.GET)
    public String test() {
        return "Ok";
    }

    private static final Logger LOG = Logger.getLogger(BomberManXAPIControllerUser.class.getName());
    
    // Author: Kevin S. Sanchez
    @RequestMapping(path = "/tablero", method = RequestMethod.GET)
    public ResponseEntity<?> getTablero() {
        
        try {
            ArrayList<Object> informacion = new ArrayList();
            informacion.add(gameServices.getTablero(1));
            return new ResponseEntity<>(informacion, HttpStatus.ACCEPTED);
        } catch (GameServicesException ex) {
            Logger.getLogger(BomberManXAPIControllerCanvas.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>(ex.getLocalizedMessage(),HttpStatus.NOT_FOUND);
        } catch (NumberFormatException ex){
            Logger.getLogger(BomberManXAPIControllerCanvas.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("", HttpStatus.BAD_REQUEST);
        }
    }
}