package br.edu.utfpr.pb.pw26s.server.validator;

import br.edu.utfpr.pb.pw26s.server.annotation.UniqueUsername;
import br.edu.utfpr.pb.pw26s.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueUsernameValidator
        implements ConstraintValidator<UniqueUsername, String> {

    @Autowired
    UserRepository userRepository;

    @Override
    public boolean isValid(String username,
                           ConstraintValidatorContext constraintValidatorContext) {
        if (userRepository.findByUsername(username) == null) {
            return true;
        }
        return false;
    }
}
