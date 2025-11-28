package com.location.vehicule.model;

public enum StatutVehicule {
    DISPONIBLE("Disponible"),
    LOUE("Loué"),
    MAINTENANCE("En maintenance");

    private final String libelle;

    StatutVehicule(String libelle) {
        this.libelle = libelle;
    }

    public String getLibelle() {
        return libelle;
    }

    @Override
    public String toString() {
        return this.libelle;
    }
}