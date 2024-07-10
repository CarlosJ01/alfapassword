package com.alfacentauri.agc.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.alfacentauri.agc.Model.Correo;

@Repository
public interface CorreoRepository extends JpaRepository<Correo, UUID> {

}
