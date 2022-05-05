package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.model.Category;
import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.repository.CategoryRepository;
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
public class CategoryControllerTest {
    public static final String API_CATEGORIES = "/categories";
    private static final String URL_LOGIN = "/login";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserService userService;

    @BeforeEach
    public void cleanup() {
        userRepository.deleteAll();
        categoryRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postCategory_whenCategoryIsValidAndUserNotLoggedIn_receiveUnauthorized() {
        Category category = createValidCategory();
        ResponseEntity<Object> response = postCategory(category, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postCategory_whenCategoryIsValidAndUserLoggedIn_receiveOk() {
        authenticate();
        Category category = createValidCategory();
        ResponseEntity<Object> response = postCategory(category, Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void getCategory_whenCategoryIdIsProvidedAndUserLoggedIn_receiveCategory() {
        authenticate();
        Category category = categoryRepository.save(createValidCategory());
        ResponseEntity<List<Category>> categoryList =
                getAllCategories(new ParameterizedTypeReference<>() {});
        ResponseEntity<Category> response =
                getOneCategory(categoryList.getBody().get(0).getId(), Category.class);
        assertThat(response.getBody().getId()).isEqualTo(category.getId());
    }

    public <T> ResponseEntity<T> postCategory(Object request,  Class<T> responseType) {
        return testRestTemplate.postForEntity(API_CATEGORIES, request, responseType);
    }

    public <T> ResponseEntity<T> getOneCategory(Long id,  Class<T> responseType) {
        return testRestTemplate.exchange(API_CATEGORIES + "/" + id, HttpMethod.GET,null, responseType);
    }

    public <T> ResponseEntity<T> getAllCategories(ParameterizedTypeReference<T> responseType) {
        authenticate();
        return testRestTemplate.exchange(API_CATEGORIES, HttpMethod.GET, null, responseType);
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
