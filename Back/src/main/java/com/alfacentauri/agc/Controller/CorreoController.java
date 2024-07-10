package com.alfacentauri.agc.Controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alfacentauri.agc.Model.Correo;
import com.alfacentauri.agc.Service.CorreoService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class CorreoController {
	
	@Autowired
	CorreoService correoService;
	
	@RequestMapping(value = "/correo", method = RequestMethod.POST)
	public Correo createCorreo(@RequestBody Correo correo, @RequestHeader("encpasskw") String clave) {
		return correoService.createCorreo(correo, clave);
	}
	
	@RequestMapping(value = "/correo", method = RequestMethod.GET)
	public List<Correo> readAllCorreos() {
		return correoService.getCorreos();
	}
	
	@RequestMapping(value = "/correo/{id}", method = RequestMethod.GET)
	public Correo readCorreo(@PathVariable(value = "id") UUID id, @RequestHeader("encpasskw") String clave) {
		return correoService.getCorreo(id, clave);
	}
		
	@RequestMapping(value = "/correo/{id}", method = RequestMethod.PUT)
	public Correo editCorreo(@PathVariable(value = "id") UUID id, @RequestBody Correo correo, @RequestHeader("encpasskw") String clave) {
		return correoService.updateCorreo(id, correo, clave);
	}
	
	@RequestMapping(value = "/correo/{id}", method = RequestMethod.DELETE)
	public void deleteCorreo(@PathVariable(value = "id") UUID id) {
		correoService.deleteCorreo(id);
	}
}
