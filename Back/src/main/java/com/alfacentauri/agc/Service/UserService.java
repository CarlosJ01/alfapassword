package com.alfacentauri.agc.Service;

import java.util.Arrays;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.alfacentauri.agc.Model.Role;
import com.alfacentauri.agc.Model.User;
import com.alfacentauri.agc.Repository.RoleRepository;
import com.alfacentauri.agc.Repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
//	@Autowired
//	private RoleRepository roleRepository;
//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
	
	public User findUser(String username) {
		return userRepository.findByUserName(username);
	}
	
//	public User saveUser(User user) {
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
//		user.setActive(true);
//		
//		Role userRole = roleRepository.findByRole("ADMIN");
//		user.setRoles(new HashSet<Role>(Arrays.asList(userRole)));
//		
//		return userRepository.save(user);
//	}
//	
}
