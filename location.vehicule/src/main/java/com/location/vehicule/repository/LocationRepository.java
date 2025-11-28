package com.location.vehicule.repository;

import com.location.vehicule.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {

    List<Location> findByClientNomContainingIgnoreCase(String clientNom);

    List<Location> findByVehiculeId(Long vehiculeId);
}