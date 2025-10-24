package com.estateconnect.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private JwtFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    private static final String PROPERTIES = "/api/properties";
    private static final String PROPERTY_BY_ID = "/api/properties/{propertyId}";

    private static final String INQUIRIES = "/api/inquiries";
    private static final String INQUIRY_BY_ID = "/api/inquiries/{inquiryId}";

    private static final String FEEDBACK = "/api/feedback";
    private static final String FEEDBACK_BY_ID = "/api/feedback/{feedbackId}";

    private static final String ADMIN = "ADMIN";
    private static final String USER = "USER";

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .headers(headers -> headers.frameOptions(frame -> frame.disable())) // For H2 Console
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/auth/login", "/api/auth/register", "/db/**",
                                "/", "/index.html", "/favicon.ico", "/assets/**",
                                "/**/*.js", "/**/*.css", "/**/*.ico", "/**/*.webp",
                                "/{path:[^\\.]*}", "/**/{path:[^\\.]*}")
                        .permitAll()

                        .requestMatchers(HttpMethod.POST, PROPERTIES).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, PROPERTY_BY_ID).permitAll()
                        .requestMatchers(HttpMethod.GET, PROPERTIES).permitAll()
                        .requestMatchers(HttpMethod.PUT, PROPERTY_BY_ID).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, PROPERTY_BY_ID).hasRole(ADMIN)

                        .requestMatchers(HttpMethod.POST, INQUIRIES).hasRole(USER)
                        .requestMatchers(HttpMethod.GET, INQUIRY_BY_ID).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.GET, "/api/inquiries/user/{userId}").hasRole(USER)
                        .requestMatchers(HttpMethod.GET, INQUIRIES).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.PUT, INQUIRY_BY_ID).hasRole(ADMIN)
                        .requestMatchers(HttpMethod.DELETE, INQUIRY_BY_ID).hasAnyRole(ADMIN, USER)

                        .requestMatchers(HttpMethod.POST, FEEDBACK).hasRole(USER)
                        .requestMatchers(HttpMethod.GET, FEEDBACK_BY_ID).hasAnyRole(ADMIN, USER)
                        .requestMatchers(HttpMethod.GET, FEEDBACK).permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/feedback/user/{userId}").hasRole(USER)
                        .requestMatchers(HttpMethod.DELETE, FEEDBACK_BY_ID).hasRole(USER)
                        .anyRequest().authenticated())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}