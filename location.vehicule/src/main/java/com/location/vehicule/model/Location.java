package com.location.vehicule.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;
@Entity
@Table(name = "locations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "La date de début est obligatoire")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate dateDebut;

    @NotNull(message = "La date de fin est obligatoire")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(nullable = false)
    private LocalDate dateFin;

    @NotBlank(message = "Le nom du client est obligatoire")
    @Column(nullable = false)
    private String clientNom;

    @NotNull(message = "Le véhicule est obligatoire")
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vehicule_id", nullable = false)
    private Vehicule vehicule;


    public Location(LocalDate dateDebut, LocalDate dateFin, String clientNom, Vehicule vehicule) {
        this.dateDebut = dateDebut;
        this.dateFin = dateFin;
        this.clientNom = clientNom;
        this.vehicule = vehicule;
    }
}