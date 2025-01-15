package com.kaptansingh.EventBazaar.Controller;


import com.kaptansingh.EventBazaar.Service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/mail")
@RequiredArgsConstructor
public class MailController {
    private final MailService mailService;

    // This endpoint will send an email the specified email address
    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestParam String to, @RequestParam String subject, @RequestParam String body){
        try {
            mailService.sendEmail(to, subject, body);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email");
        }
    }

    // This endpoint will notify all the users
    @PostMapping("/send-all")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> sendEmailToAll(@RequestParam String subject, @RequestParam String body){
        try {
            mailService.sendEmailToAll(subject, body);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email");
        }
    }

    // This endpoint will notify all the users(role = 'USER')
    @PostMapping("/send-users")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> sendEmailToAllUsers(@RequestParam String subject, @RequestParam String body){
        try {
            mailService.sendEmailToAllUsers(subject, body);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email");
        }
    }

    // This endpoint will notify all the organizers
    @PostMapping("/send-organizers")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> sendEmailToAllOrganizers(@RequestParam String subject, @RequestParam String body){
        try {
            mailService.sendEmailToAllOrganizers(subject, body);
            return ResponseEntity.ok("Email sent successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to send email");
        }
    }
}
