package com.location.vehicule.repository;

import com.location.vehicule.model.Vehicule;
import com.location.vehicule.model.StatutVehicule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VehiculeRepository extends JpaRepository<Vehicule, Long> {

    List<Vehicule> findByStatut(StatutVehicule statut);

    List<Vehicule> findByMarqueContainingIgnoreCase(String marque);
}