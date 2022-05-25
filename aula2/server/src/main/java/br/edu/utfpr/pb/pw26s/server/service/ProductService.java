package br.edu.utfpr.pb.pw26s.server.service;

import br.edu.utfpr.pb.pw26s.server.model.Product;

import java.util.List;

public interface ProductService extends CrudService<Product, Long> {

    List<Product> findByDescriptionContaining(String description);

}
