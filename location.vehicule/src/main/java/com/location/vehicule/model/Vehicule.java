package com.location.vehicule.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "vehicules")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "La marque est obligatoire")
    @Column(nullable = false)
    private String marque;

    @NotBlank(message = "Le modèle est obligatoire")
    @Column(nullable = false)
    private String modele;

    @NotNull(message = "Le prix par jour est obligatoire")
    @Positive(message = "Le prix par jour doit être positif")
    @Column(nullable = false)
    private Double prixJour;

    @NotNull(message = "Le statut est obligatoire")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutVehicule statut = StatutVehicule.DISPONIBLE;


    public Vehicule(String marque, String modele, Double prixJour, StatutVehicule statut) {
        this.marque = marque;
        this.modele = modele;
        this.prixJour = prixJour;
        this.statut = statut;
    }
}