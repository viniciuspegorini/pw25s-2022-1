package br.edu.utfpr.pb.pw26s.server;

import br.edu.utfpr.pb.pw26s.server.model.User;
import br.edu.utfpr.pb.pw26s.server.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {

    @Autowired
    TestEntityManager testEntityManager;
    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser() {
        User user = new User();
        user.setDisplayName("test-displayName");
        user.setUsername("test-username");
        user.setPassword("P4ssword");
        testEntityManager.persist(user);

        User userDB = userRepository.findByUsername("test-username");
        assertThat(userDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserExists_returnsNull() {
        User userDB = userRepository.findByUsername("test-username");
        assertThat(userDB).isNull();
    }

}
