package com.cms.clinic.service;

public interface EmailService {
    void sendSimpleEmail(String to, String body, String subject);
}
