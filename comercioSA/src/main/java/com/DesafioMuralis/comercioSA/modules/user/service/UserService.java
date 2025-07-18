package com.DesafioMuralis.comercioSA.modules.user.service;

import java.time.Duration;
import java.time.Instant;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.DesafioMuralis.comercioSA.exceptions.ResourceNotFoundException;
import com.DesafioMuralis.comercioSA.modules.user.dto.UserRequestDTO;
import com.DesafioMuralis.comercioSA.modules.user.model.User;
import com.DesafioMuralis.comercioSA.modules.user.repository.UserRepository;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class UserService {
    
    @Value("${authentication.secret.key}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEnconder;

    public User createUser(UserRequestDTO userRequest) {
        var cyptedPassword = passwordEnconder.encode(userRequest.password());

        User newUser = User.builder()
            .username(userRequest.username())
            .password(cyptedPassword)
            .build();

        return userRepository.save(newUser);
    }

    public String validateUser(UserRequestDTO userRequest) throws AuthenticationException {
        var user = userRepository.findByUsername(userRequest.username()).orElseThrow(
            () -> {
                throw new ResourceNotFoundException("Nome de usuário não encontrado", "username");
            });
        
        boolean passwordMatches = passwordEnconder.matches(userRequest.password(), user.getPassword());
        
        if (!passwordMatches) {
            throw new AuthenticationException();
        }

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        String token = JWT.create().withIssuer("comerciosa")
            .withExpiresAt(Instant.now().plus(Duration.ofHours(2)))
            .withSubject(user.getId().toString())
            .sign(algorithm);

        return token;
    }

}
