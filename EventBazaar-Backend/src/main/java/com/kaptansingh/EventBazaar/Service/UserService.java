package com.kaptansingh.EventBazaar.Service;

import com.kaptansingh.EventBazaar.Dto.UserUpdateRequestDto;
import com.kaptansingh.EventBazaar.Exception.UserNotFoundException;
import com.kaptansingh.EventBazaar.Model.User;
import com.kaptansingh.EventBazaar.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor // Lombok will automatically create a constructor for 'final' fields(Dependency Injection)
public class UserService {

    private final UserRepository userRepository;

    public User findByID(Long id){
        Optional<User> userOptional = userRepository.findById(id);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User not found!");
        }
        return userOptional.get();
    }


    public User findByEmail(String email){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User not found!");
        }
        return userOptional.get();
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    public void updateUser(String email, UserUpdateRequestDto userUpdateRequestDto){
        Optional<User> userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty()){
            throw new UserNotFoundException("User not found!");
        }
        User user = userOptional.get();

        user.setFirstName(userUpdateRequestDto.getFirstName());
        user.setLastName(userUpdateRequestDto.getLastName());
        user.setPhone(userUpdateRequestDto.getPhone());

        userRepository.save(user);
    }
}
