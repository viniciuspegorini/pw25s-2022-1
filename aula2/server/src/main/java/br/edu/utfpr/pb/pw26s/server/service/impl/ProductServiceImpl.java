package br.edu.utfpr.pb.pw26s.server.service.impl;

import br.edu.utfpr.pb.pw26s.server.model.Product;
import br.edu.utfpr.pb.pw26s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw26s.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl extends CrudServiceImpl<Product, Long>
        implements ProductService {

    private ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    protected JpaRepository<Product, Long> getRepository() {
        return this.productRepository;
    }

    @Override
    public List<Product> findByDescriptionContaining(String description) {
        return productRepository.findByDescriptionContaining(description);
    }
}
