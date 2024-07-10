package com.alfacentauri.agc.jwtUtils;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class TokenManager implements Serializable{
	private static final long serialVersionUID = 7008375124389347050L;
	
	public static final long TOKEN_VALIDITY = 30 * 60 * 60;
	
	@Value("${jwtSecret}")
	private String jwtSecret;
	
	public String generateJWT(UserDetails userDetails) {
		return Jwts.builder()
				.setClaims(new HashMap<>())
				.setSubject(userDetails.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + (TOKEN_VALIDITY * 1000)))
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public Boolean validateJWT(String token, UserDetails userDetails) {
		Claims claims = this.getClaimsJWT(token);
		String username = claims.getSubject();
		
		Boolean isTokenExpired = claims.getExpiration().before(new Date());
		return (username.equals(userDetails.getUsername())) && !isTokenExpired;
	}
	
	public Claims getClaimsJWT(String token) {
		return Jwts.parser()
				.setSigningKey(jwtSecret)
				.parseClaimsJws(token)
				.getBody();
	}
}
