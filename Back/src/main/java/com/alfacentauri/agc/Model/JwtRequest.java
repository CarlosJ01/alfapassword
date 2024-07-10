package com.alfacentauri.agc.Model;

import java.io.Serializable;

public class JwtRequest implements Serializable{
	private static final long serialVersionUID = 7008375124389347052L;
	
	private String username;
	private String password;
	
	public JwtRequest() {
		this.username = "";
		this.password = "";
	}

	public JwtRequest(String username, String password) {
		this.username = username;
		this.password = password;
	}
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}



	public String getPassword() {
		return password;
	}



	public void setPassword(String password) {
		this.password = password;
	}
	
}
