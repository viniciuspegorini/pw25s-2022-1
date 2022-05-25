package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Product;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import br.edu.utfpr.pb.pw26s.server.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController extends CrudController<Product, Long> {

    @Autowired
    private ProductService productService;

    @Override
    protected CrudService<Product, Long> getService() {
        return this.productService;
    }

    // http://localhost:8080/products/description?desc=TV&price=900
    @GetMapping("description")
    public List<Product> findByDescription(@RequestParam("desc") String desc) {
        return this.productService.findByDescriptionContaining(desc);
    }

    // http://localhost:8080/products/description/TV
    /*
    @GetMapping("description/{desc}")
    public List<Product> findByDescription(@PathVariable("desc") String desc) {
        return this.productService.findByDescriptionContaining(desc);
    }*/
}
