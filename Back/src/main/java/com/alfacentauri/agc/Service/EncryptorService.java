package com.alfacentauri.agc.Service;

import java.io.UnsupportedEncodingException;
import java.security.InvalidKeyException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Base64;

import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Component
public class EncryptorService {
	
	private MessageDigest sha1;
	
	private Cipher cipher;
	
	 public EncryptorService() {
		try {
			this.sha1 = MessageDigest.getInstance("SHA-1");
			this.cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchPaddingException e) {
			e.printStackTrace();
		}
	}

	/*
	  * Crear la llave a partir de la palabra clave para encriptar o desencriptar
	 */
	@SuppressWarnings("unused")
	private SecretKeySpec getKey(String clave) throws UnsupportedEncodingException, NoSuchAlgorithmException {
		byte[] keyEncryption = clave.getBytes("UTF-8");
		keyEncryption = Arrays.copyOf(this.sha1.digest(keyEncryption), 16);
		return new SecretKeySpec(keyEncryption, "AES");
	}
	
	/*
	 * Encriptar
	*/
	public String encrypt(String datos, String clave) throws UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
		SecretKeySpec secretKey = this.getKey(clave);
		
		this.cipher.init(Cipher.ENCRYPT_MODE, secretKey);
		
		byte[] datosEncriptados = this.cipher.doFinal(datos.getBytes("UTF-8"));
		
		return Base64.getEncoder().encodeToString(datosEncriptados);
	}
	
	/*
	 * Desencriptar
	*/
	public String decrypt(String datosEncriptados, String clave) throws UnsupportedEncodingException, NoSuchAlgorithmException, InvalidKeyException, NoSuchPaddingException, IllegalBlockSizeException, BadPaddingException {
		SecretKeySpec secretKey = this.getKey(clave);
		
		this.cipher.init(Cipher.DECRYPT_MODE, secretKey);
		
		byte[] datos = this.cipher.doFinal(Base64.getDecoder().decode(datosEncriptados));
		
		return new String(datos);
	}
}
