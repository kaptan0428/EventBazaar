package com.kaptansingh.EventBazaar.Service;

import com.kaptansingh.EventBazaar.Dto.UserUpdateRequestDto;
import com.kaptansingh.EventBazaar.Exception.EmailAlreadyInUseException;
import com.kaptansingh.EventBazaar.Exception.IncorrectPasswordException;
import com.kaptansingh.EventBazaar.Exception.UserNotFoundException;
import com.kaptansingh.EventBazaar.Model.User;
import com.kaptansingh.EventBazaar.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok will automatically create a constructor for 'final' fields(Dependency Injection)
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

    public User findByID(Long id){
        if (userRepository.findById(id).isEmpty()) {
            throw new UserNotFoundException("User not found!");
        }
        return userRepository.findById(id).get();
    }

    public String encodePassword(String password){
        return passwordEncoder.encode(password);
    }

    public void saveUser(User user){

        // check if user already exists
        if(userRepository.existsByEmail(user.getEmail())){
            throw new EmailAlreadyInUseException("Email already in use!");
        }

        //Encode the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
    }

    public void updatePassword(String email, String oldPassword, String newPassword){

        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User not found!");
        }
        User user = userOptional.get();

        if(!passwordEncoder.matches(oldPassword, user.getPassword())){
            throw new IncorrectPasswordException("Incorrect password!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));

        userRepository.save(user);
    }
}
