package com.kaptansingh.EventBazaar.Config;

import com.kaptansingh.EventBazaar.Service.CustomUserDetailsService;
import com.kaptansingh.EventBazaar.Utils.JwtUtils.AuthEntryPointJwt;
import com.kaptansingh.EventBazaar.Utils.JwtUtils.AuthTokenFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration // Marks this class as a configuration class for Spring
@EnableWebSecurity // Enables Spring Security’s web security support and provides Spring MVC integration
@EnableMethodSecurity // Enables method-level security annotations like @PreAuthorize, @Secured, etc.
public class SecurityConfig {

    public static final String[] PUBLIC_URLS = {
            "/user/signup",
            "/user/signin",
            "/v1/api-docs/**",
            "/v2/api-docs/**",
            "/v3/api-docs/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-resources",
            "/swagger-resources/**",
            "/webjars/**"
    };

    @Autowired
    private CustomUserDetailsService customUserDetailsService; // Service to load user-specific data for authentication

    @Autowired
    private AuthEntryPointJwt unauthorizedHandler; // Handles unauthorized access (like invalid JWT)

    @Bean
    public AuthTokenFilter authenticationJwtTokenFilter(){ // Bean that filters and validates JWT tokens in incoming requests
        return new AuthTokenFilter();
    }

    @Bean // Configures security filter chain for HTTP requests
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {

        http.authorizeHttpRequests((authorizeRequests) ->
                authorizeRequests
                        .requestMatchers(PUBLIC_URLS).permitAll()
                        .requestMatchers("user/getAll").hasRole("ADMIN")
                        .anyRequest().authenticated());

        // Disables session management, forcing stateless requests (ideal for JWT)
        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Handles exceptions like unauthorized access (returns 401 for unauthorized requests)
        http.exceptionHandling(exception ->
                exception.authenticationEntryPoint(unauthorizedHandler));

        // Disables CSRF protection (typically not needed for APIs, especially JWT-based)
        http.csrf(csrf -> csrf.disable());

        // Adds custom JWT filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(authenticationJwtTokenFilter(),
                UsernamePasswordAuthenticationFilter.class);

        // Builds and returns the security filter chain
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean // Configures and returns the AuthenticationManager, used for managing authentication
    public AuthenticationManager authenticationManager(AuthenticationConfiguration builder)
    throws Exception{
        return builder.getAuthenticationManager();
    }
}
