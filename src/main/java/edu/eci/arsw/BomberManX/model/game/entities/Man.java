/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.BomberManX.model.game.entities;

/**
 *
 * @author Kvn CF <ECI>
 */
public class Man implements Elemento{
    public static final String[] colores = {"red", "yellow", "blue"};
    private Jugador jugador; 
    private Poder poder;
    private int bombas; //numero de bombas
    private String color, key;  
    private int posRow, posCol;
    
    public Man(String color, Jugador jugador, String key, int posRow, int posCol) {
        this.color = color;
        this.jugador = jugador;
        bombas = 3;  
        this.key = key;
        this.posRow = posRow;
        this.posCol = posCol;
    }
    
    /***
     * retorna si puede o no realizar un acciones
     * @return 
     */
    public boolean puede_realizar_accion(){
        return false;
    }
    
    public void explotar_bomba(){
    
    }
    
    public boolean moverse(){
        return false;
    
    }
    
    public boolean recoger_poder(){
        return false;
    
    }

    @Override
    public int getPosRow() {
        return this.posRow;
    }

    @Override
    public void setPosRow(int pos) {
        this.posRow = pos;
    }

    @Override
    public int getPosCol() {
        return this.posCol;
    }

    @Override
    public void setPosCol(int pos) {
        this.posCol = pos;
    }

    public static String[] getColores() {
        return colores;
    }

    public Jugador getJugador() {
        return jugador;
    }

    public Poder getPoder() {
        return poder;
    }

    public int getBombas() {
        return bombas;
    }

    public String getColor() {
        return color;
    }
    
    @Override
    public String getKey() {
        return this.key;
    }

    @Override
    public void setKey(String k) {
        this.key = k;
    }
}
