package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.model.Product;
import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.repository.CategoryRepository;
import br.edu.utfpr.pb.pw26s.server.repository.ProductRepository;
import br.edu.utfpr.pb.pw26s.server.repository.UserRepository;
import br.edu.utfpr.pb.pw26s.server.security.AuthenticationResponse;
import br.edu.utfpr.pb.pw26s.server.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.test.context.ActiveProfiles;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class ProductControllerTest {
    public static final String API_PRODUCTS = "/products";
    private static final String URL_LOGIN = "/login";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    ProductRepository productRepository;
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @BeforeEach
    public void cleanup() {
        productRepository.deleteAll();
        categoryRepository.deleteAll();
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postProduct_whenProductIsValidAndUserNotLoggedIn_receiveUnauthorized() {
        Product product = createValidProduct();
        ResponseEntity<Object> response = postProduct(product, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postProduct_whenProductIsValidAndUserLoggedIn_receiveOk() {
        authenticate();
        Product product = createValidProduct();
        ResponseEntity<Object> response = postProduct(product, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getProduct_whenProductIdIsProvidedAndUserLoggedIn_receiveCategory() {
        authenticate();
        Product product = productRepository.save(createValidProduct());
        ResponseEntity<List<Product>> list =
                getAllProducts(new ParameterizedTypeReference<>() {});
        ResponseEntity<Product> response =
                getOneProduct(list.getBody().get(0).getId(), Product.class);
        assertThat(response.getBody().getId()).isEqualTo(product.getId());
    }

    public <T> ResponseEntity<T> postProduct(Object request,  Class<T> responseType) {
        return testRestTemplate.postForEntity(API_PRODUCTS, request, responseType);
    }

    public <T> ResponseEntity<T> getOneProduct(Long id,  Class<T> responseType) {
        return testRestTemplate.exchange(API_PRODUCTS + "/" + id, HttpMethod.GET,null, responseType);
    }

    public <T> ResponseEntity<T> getAllProducts(ParameterizedTypeReference<T> responseType) {
        authenticate();
        return testRestTemplate.exchange(API_PRODUCTS, HttpMethod.GET, null, responseType);
    }

    private void authenticate() {
        if (testRestTemplate.getRestTemplate().getInterceptors().size() == 0) {
            userService.save(getValidLoginUser());
            ResponseEntity<AuthenticationResponse> responseToken = testRestTemplate.postForEntity(URL_LOGIN, getValidLoginUser(), AuthenticationResponse.class);
            String accessToken = responseToken.getBody().getToken();

            testRestTemplate.getRestTemplate().getInterceptors().add(new ClientHttpRequestInterceptor() {
                @Override
                public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException, IOException {
                    request.getHeaders().add("Authorization", "Bearer " + accessToken);
                    request.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                    return execution.execute(request, body);
                }
            });
        }
    }

    private Product createValidProduct() {
        Product product = new Product();
        product.setName("test-product");
        product.setDescription("test-product-description");
        product.setPrice(999.99);
        product.setCategory(categoryRepository.save(createValidCategory()));
        return product;
    }

    private Category createValidCategory() {
        Category category = new Category();
        category.setName("test-category");
        return category;
    }

    public User getValidLoginUser() {
        User user = new User();
        user.setUsername("test-user");
        user.setPassword("P4ssword");
        return user;
    }
}
