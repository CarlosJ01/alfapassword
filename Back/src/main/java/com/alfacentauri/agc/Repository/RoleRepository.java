package com.alfacentauri.agc.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alfacentauri.agc.Model.Role;

public interface RoleRepository extends JpaRepository<Role, UUID>{
	Role findByRole(String role);
}
