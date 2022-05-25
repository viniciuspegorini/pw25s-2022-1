package br.edu.utfpr.pb.pw26s.server.repository;

import br.edu.utfpr.pb.pw26s.server.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByDescriptionContaining(String description);

}
