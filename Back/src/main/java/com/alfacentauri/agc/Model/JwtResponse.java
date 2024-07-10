package com.alfacentauri.agc.Model;

import java.io.Serializable;

public class JwtResponse implements Serializable {
	private static final long serialVersionUID = 7008375124389347051L;
	
	private final String token;
	
	public JwtResponse(String token) {
		super();
		this.token = token;
	}
	
	public String getToken() {
		return token;
	}
}
