package com.kaptansingh.EventBazaar.Service;


import com.kaptansingh.EventBazaar.Model.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor // Lombok will automatically create a constructor for 'final' fields(Dependency Injection)
public class MailService {

    private final JavaMailSender javaMailSender;
    private final UserService userService;

    public void sendEmail(String to, String subject, String body) throws MessagingException {
        // Code to send email
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(body, true);

        javaMailSender.send(message);
    }

    public void sendEmails(List<String> emails, String subject, String body) {
        for (String email : emails) {
            try {
                sendEmail(email, subject, body);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

    public void sendEmailToAll(String subject, String body) {
        List<String> emails = userService.getAllUsers().stream().map(User::getEmail).toList();
        for (String email : emails) {
            try {
                sendEmail(email, subject, body);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

    public void sendEmailToAllUsers(String subject, String body) {
        List<String> emails = userService.getAllUsersByRole("ROLE_USER").stream().map(User::getEmail).toList();
        for (String email : emails) {
            try {
                sendEmail(email, subject, body);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

    public void sendEmailToAllOrganizers(String subject, String body) {
        List<String> emails = userService.getAllUsersByRole("ROLE_ORGANIZER").stream().map(User::getEmail).toList();
        for (String email : emails) {
            try {
                sendEmail(email, subject, body);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }
}





