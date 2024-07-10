package com.alfacentauri.agc.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alfacentauri.agc.Model.Correo;
import com.alfacentauri.agc.Repository.CorreoRepository;

@Service
public class CorreoService {
	
	@Autowired
	CorreoRepository correoRepository;
	
	@Autowired
	EncryptorService encryptorService;
	
	// Create un correo	
	public Correo createCorreo(Correo correo, String clave) {
		try {
			correo.setContrasenia(encryptorService.encrypt(correo.getContrasenia(), clave));
		} catch (Exception e) {
			System.err.println("Error al encriptar");
		}
		
		correo = correoRepository.save(correo);
		correo.setContrasenia("");
		
		return correo;
	}
	
	// Read all correos
	public List<Correo> getCorreos() {
		List<Correo> correos = correoRepository.findAll();
		correos.stream().forEach(correo -> correo.setContrasenia(""));
		return correos;
	}
	
	// Read correo by Id
	public Correo getCorreo(UUID id, String clave) {
		Correo correo = correoRepository.findById(id).get();
		try {
			correo.setContrasenia(encryptorService.decrypt(correo.getContrasenia(), clave));
		} catch (Exception e) {
			System.err.println("Error al desencriptar");
			correo.setContrasenia("ERROR");
		}
		return correo;
	}
	
	// Update
	public Correo updateCorreo(UUID id, Correo correoUpdated, String clave) {
		Correo correo = correoRepository.findById(id).get();
		correo.setNombre(correoUpdated.getNombre());
		correo.setCorreo(correoUpdated.getCorreo());
		
			
		try {
			correo.setContrasenia(encryptorService.encrypt(correoUpdated.getContrasenia(), clave));
		} catch (Exception e) {
			System.err.println("Error al encriptar");
		}
		
		correo = correoRepository.save(correo);
		correo.setContrasenia("");
		
		return correo;
	}
	
	// Delete
	public void deleteCorreo(UUID id) {
		correoRepository.deleteById(id);
	}
}
