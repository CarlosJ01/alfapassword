package com.alfacentauri.agc.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alfacentauri.agc.Model.SitioWeb;
import com.alfacentauri.agc.Repository.SitioWebRepository;

@Service
public class SitioWebService {
	
	@Autowired
	SitioWebRepository sitioWebRepository;
	
	@Autowired
	EncryptorService encryptorService;
	
	// CREATE
	public SitioWeb create(SitioWeb sitioWeb, String clave) {
		try {
			sitioWeb.setPassword(encryptorService.encrypt(sitioWeb.getPassword(), clave));
		} catch (Exception e) {
			System.err.println("Error al encriptar");
		}
		
		sitioWeb = sitioWebRepository.save(sitioWeb);
		sitioWeb.setPassword("");
		
		return sitioWeb;
	}
	
	// GET
	public SitioWeb get(UUID id, String clave) {
		SitioWeb sitioWeb = sitioWebRepository.findById(id).get();
		try {
			sitioWeb.setPassword(encryptorService.decrypt(sitioWeb.getPassword(), clave));
		} catch (Exception e) {
			System.err.println("Error al desencriptar");
			sitioWeb.setPassword("ERROR");
		}
		return sitioWeb;
	}
	
	// GET ALL
	public List<SitioWeb> getAll() {
		List<SitioWeb> sitiosWeb = sitioWebRepository.findAll();
		sitiosWeb.stream().forEach(sitioWeb -> sitioWeb.setPassword(""));
		return sitiosWeb;
	}
	
	// UPDATE
	public SitioWeb update(UUID id, SitioWeb sitioWebUpdated, String clave) {
		SitioWeb sitioWeb = sitioWebRepository.findById(id).get();
		sitioWebUpdated.setId(sitioWeb.getId());
		return this.create(sitioWebUpdated, clave);
	}
	
	// DELETE
	public void delete(UUID id) {
		sitioWebRepository.deleteById(id);
	}
	
}
