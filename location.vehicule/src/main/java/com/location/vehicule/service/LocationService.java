package com.location.vehicule.service;

import com.location.vehicule.model.Location;
import com.location.vehicule.model.StatutVehicule;
import com.location.vehicule.model.Vehicule;
import com.location.vehicule.repository.LocationRepository;
import com.location.vehicule.repository.VehiculeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @Transactional
    public Location creerLocation(Location location) {
        Vehicule vehicule = vehiculeRepository.findById(location.getVehicule().getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Véhicule introuvable avec l'ID : " + location.getVehicule().getId()
                ));


        if (vehicule.getStatut() != StatutVehicule.DISPONIBLE) {
            throw new IllegalStateException(
                    "Le véhicule " + vehicule.getMarque() + " " + vehicule.getModele() +
                            " n'est pas disponible (Statut actuel : " + vehicule.getStatut() + ")"
            );
        }

        if (location.getDateFin().isBefore(location.getDateDebut())) {
            throw new IllegalArgumentException(
                    "La date de fin doit être après la date de début"
            );
        }


        vehicule.setStatut(StatutVehicule.LOUE);
        vehiculeRepository.save(vehicule);


        location.setVehicule(vehicule);


        return locationRepository.save(location);
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }


    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Location introuvable avec l'ID : " + id));
    }


    public List<Location> getLocationsByVehicule(Long vehiculeId) {
        return locationRepository.findByVehiculeId(vehiculeId);
    }


    public List<Location> getLocationsByClient(String clientNom) {
        return locationRepository.findByClientNomContainingIgnoreCase(clientNom);
    }

    @Transactional
    public void deleteLocation(Long id) {
        Location location = getLocationById(id);
        locationRepository.delete(location);
    }
}