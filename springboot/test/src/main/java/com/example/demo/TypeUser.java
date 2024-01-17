package com.example.demo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Typeuser")
public class TypeUser {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	private String type;

	/*
	 * @OneToOne(mappedBy = "usertype", cascade = { CascadeType.DETACH,
	 * CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH }) private User
	 * user;
	 */

	public TypeUser() {
	}

	/*
	 * public TypeUser(String type, User user) { this.type = type; this.user = user;
	 * }
	 */

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/*
	 * public User getUser() { return user; }
	 * 
	 * public void setUser(User user) { this.user = user; }
	 */

	/*
	 * @Override public String toString() { return "TypeUser [id=" + id + ", type="
	 * + type + ", user=" + user + "]"; }
	 */

}
