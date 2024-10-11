package com.kaptansingh.EventBazaar.Controller;

import com.kaptansingh.EventBazaar.Dto.*;
import com.kaptansingh.EventBazaar.Model.User;
import com.kaptansingh.EventBazaar.Service.UserService;
import com.kaptansingh.EventBazaar.Utils.JwtUtils.JwtUtils;
import com.kaptansingh.EventBazaar.Utils.SecurityUtils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController // Marks this class as a REST controller where each method returns a ResponseEntity or JSON response
@RequestMapping("/user") // Base path for all endpoints in this controller
@RequiredArgsConstructor // Lombok will automatically create a constructor for final fields (Dependency Injection)
public class UserController {

    private final UserService userService; // JwtUtils class is used to generate and validate JWTs
    private final JwtUtils jwtUtils;
    private final SecurityUtils securityUtils; // SecurityUtils class is used to get the authenticated user's details
    private final AuthenticationManager authenticationManager; // Manages authentication process


    /*
    ResponseEntity<?>` is a part of the Spring Framework and is used to represent the entire HTTP response,
    including the status code, headers, and body.
    The `<?> is a wildcard that indicates that the body of the response can be of any type.
     */

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequestDto userDto){


        // Map fields from UserRegistrationRequestDto to User
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setRoles(userDto.getRoles());
        user.setPhone(userDto.getPhone());

        userService.saveUser(user);

        return ResponseEntity.ok("User registered successfully!");
    }


    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequestDto){
        Authentication authentication;
        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(), loginRequestDto.getPassword()));
        } catch (AuthenticationException e){
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad Credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        // Set the authenticated user into the SecurityContext
        securityUtils.setAuthenticatedUser(authentication);

        // Retrieve the authenticated user's details
        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();

        String jwtToken = jwtUtils.generateTokenFromUsername(userDetails);

        // Retrieve the user's roles and convert them to a list of strings
        List<String> roles = userDetails.getAuthorities()
                .stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        LoginResponseDto loginResponseDto = new LoginResponseDto(jwtToken, userDetails.getUsername(), roles);
        return ResponseEntity.ok(loginResponseDto);
    }


    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@Valid @RequestBody UserUpdateRequestDto userDto){

        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();
        String username = userDetails.getUsername();

        userService.updateUser(username, userDto);
        return ResponseEntity.ok("User updated successfully!");
    }

    @PostMapping("/updatePassword")
    public ResponseEntity<?> updatePassword(@Valid @RequestBody PasswordUpdateRequestDto updatePasswordDto){
        if(!updatePasswordDto.getNewPassword().equals(updatePasswordDto.getConfirmPassword())){
            return ResponseEntity.badRequest().body("Passwords do not match!");
        }

        UserDetails userDetails = securityUtils.getAuthenticatedUserDetails();
        String username = userDetails.getUsername();

        userService.updatePassword(username, updatePasswordDto.getOldPassword(), updatePasswordDto.getNewPassword());
        return ResponseEntity.ok("Password updated successfully!");
    }


    @GetMapping("/getAll")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }


    //////////////////////////////////// Helper Methods ////////////////////////////////////

}
