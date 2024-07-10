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

import com.alfacentauri.agc.Model.SitioWeb;
import com.alfacentauri.agc.Service.SitioWebService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SitioWebController {
	
	@Autowired
	SitioWebService sitioWebService;
	
	@RequestMapping(value = "/sitio-web", method = RequestMethod.POST)
	public SitioWeb create(@RequestBody SitioWeb sitioWeb, @RequestHeader("encpasskw") String clave) {
		return sitioWebService.create(sitioWeb, clave);
	}
	
	@RequestMapping(value = "/sitio-web/{id}", method = RequestMethod.GET)
	public SitioWeb read(@PathVariable(value = "id") UUID id, @RequestHeader("encpasskw") String clave) {
		return sitioWebService.get(id, clave);
	}
	
	@RequestMapping(value = "/sitio-web", method = RequestMethod.GET)
	public List<SitioWeb> readAll() {
		return sitioWebService.getAll();
	}
	
	@RequestMapping(value = "/sitio-web/{id}", method = RequestMethod.PUT)
	public SitioWeb edit(@PathVariable(value = "id") UUID id, @RequestBody SitioWeb sitioWeb, @RequestHeader("encpasskw") String clave) {
		return sitioWebService.update(id, sitioWeb, clave);
	}
	
	@RequestMapping(value = "/sitio-web/{id}", method = RequestMethod.DELETE)
	public void delete(@PathVariable(value = "id") UUID id) {
		sitioWebService.delete(id);
	}
}
