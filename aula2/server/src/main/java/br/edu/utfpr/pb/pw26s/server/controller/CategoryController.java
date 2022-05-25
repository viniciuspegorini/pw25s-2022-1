package br.edu.utfpr.pb.pw26s.server.controller;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.service.CategoryService;
import br.edu.utfpr.pb.pw26s.server.service.CrudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categories")
public class CategoryController extends CrudController<Category, Long> {

    @Autowired
    private CategoryService categoryService;


    @Override
    protected CrudService<Category, Long> getService() {
        return categoryService;
    }
}
