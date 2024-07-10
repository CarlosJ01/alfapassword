package com.alfacentauri.agc.Repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.alfacentauri.agc.Model.User;

public interface UserRepository extends JpaRepository<User, UUID>{
	User findByUserName(String userName);
}
