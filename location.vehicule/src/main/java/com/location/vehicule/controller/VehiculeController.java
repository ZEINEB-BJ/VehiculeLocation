package com.location.vehicule.controller;

import com.location.vehicule.model.StatutVehicule;
import com.location.vehicule.model.Vehicule;
import com.location.vehicule.repository.VehiculeRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vehicules")
@CrossOrigin(origins = "http://localhost:4200")
public class VehiculeController {

    @Autowired
    private VehiculeRepository vehiculeRepository;

    @GetMapping
    public ResponseEntity<List<Vehicule>> getAllVehicules() {
        List<Vehicule> vehicules = vehiculeRepository.findAll();
        return ResponseEntity.ok(vehicules);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicule> getVehiculeById(@PathVariable Long id) {
        return vehiculeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Vehicule> createVehicule(@Valid @RequestBody Vehicule vehicule) {
        if (vehicule.getStatut() == null) {
            vehicule.setStatut(StatutVehicule.DISPONIBLE);
        }
        Vehicule savedVehicule = vehiculeRepository.save(vehicule);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedVehicule);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Vehicule> updateVehicule(
            @PathVariable Long id,
            @Valid @RequestBody Vehicule vehicule) {

        return vehiculeRepository.findById(id)
                .map(existingVehicule -> {
                    existingVehicule.setMarque(vehicule.getMarque());
                    existingVehicule.setModele(vehicule.getModele());
                    existingVehicule.setPrixJour(vehicule.getPrixJour());
                    existingVehicule.setStatut(vehicule.getStatut());
                    Vehicule updated = vehiculeRepository.save(existingVehicule);
                    return ResponseEntity.ok(updated);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/statut")
    public ResponseEntity<?> updateStatut(
            @PathVariable Long id,
            @RequestBody Map<String, String> statutRequest) {

        try {
            String nouveauStatutStr = statutRequest.get("statut");
            StatutVehicule nouveauStatut = StatutVehicule.valueOf(nouveauStatutStr);

            return vehiculeRepository.findById(id)
                    .map(vehicule -> {
                        vehicule.setStatut(nouveauStatut);
                        Vehicule updated = vehiculeRepository.save(vehicule);
                        return ResponseEntity.ok(updated);
                    })
                    .orElse(ResponseEntity.notFound().build());

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Statut invalide. Valeurs possibles: DISPONIBLE, LOUE, MAINTENANCE"));
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicule(@PathVariable Long id) {
        if (vehiculeRepository.existsById(id)) {
            vehiculeRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/statut/{statut}")
    public ResponseEntity<List<Vehicule>> getVehiculesByStatut(@PathVariable StatutVehicule statut) {
        List<Vehicule> vehicules = vehiculeRepository.findByStatut(statut);
        return ResponseEntity.ok(vehicules);
    }
}