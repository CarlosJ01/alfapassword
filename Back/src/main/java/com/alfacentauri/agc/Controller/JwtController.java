package com.alfacentauri.agc.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.alfacentauri.agc.Model.JwtRequest;
import com.alfacentauri.agc.Model.JwtResponse;
import com.alfacentauri.agc.Model.Role;
import com.alfacentauri.agc.Model.User;
import com.alfacentauri.agc.Repository.RoleRepository;
import com.alfacentauri.agc.Service.JwtUserDetailsService;
import com.alfacentauri.agc.Service.UserService;
import com.alfacentauri.agc.jwtUtils.TokenManager;

@RestController
@CrossOrigin
public class JwtController {
	
	@Autowired
	private JwtUserDetailsService jwtUserDetailsService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private TokenManager tokenManager;
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest request) throws Exception{
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							request.getUsername(), 
							request.getPassword()
							)
					);			
		} catch (DisabledException e) {
			throw new Exception("USER_DISABLED", e);
		} catch (BadCredentialsException e) {
			throw new Exception("INVALID_CREDENTIALS", e);
		}
		
		final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(request.getUsername());
		final String token = tokenManager.generateJWT(userDetails);
		return ResponseEntity.ok(new JwtResponse(token));
	}
}
