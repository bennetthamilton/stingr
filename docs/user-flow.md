# 🐝 Stingr - User Flow Diagram

This document outlines the user journey for **Clients** and **Artists** within the Stingr platform.

## User Flow Diagram

```mermaid
graph TD;
    %% User Entry Points
    A[User Opens Stingr] --> B{Are they a Client or an Artist?};
    
    %% Client Flow
    B -->|Client| C[Sign Up/Login]
    C --> D[Swipe Through Artists]
    D --> E{Found an Artist?}
    E -->|Yes| F[View Artist Profile]
    F --> G[Send Booking Request]
    G --> H[Chat for Consultation]
    H --> I[Confirm Booking & Pay]
    I --> J[Get Tattoo & Leave Review]

    %% Artist Flow
    B -->|Artist| K[Sign Up/Login]
    K --> L[Create Profile & Upload Portfolio]
    L --> M[Receive Booking Requests]
    M --> N{Accept or Decline?}
    N -->|Accept| O[Chat with Client]
    O --> P[Confirm Appointment & Payment]
    P --> Q[Complete Tattoo Session]
    Q --> R[Receive Payment & Review]
    
    %% Decision Nodes
    E -->|No| D
    N -->|Decline| M

    %% Styles
    style A fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Entry Point
    style B fill:#805305,stroke:#F5F5F5,stroke-width:2px;  %% Brown - Main Decision Node
    style C fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Sign Up/Login
    style D fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Swipe Artists
    style E fill:#805305,stroke:#F5F5F5,stroke-width:2px;  %% Brown - Decision Node
    style F fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - View Profile
    style G fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Booking Request
    style H fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Chat for Consultation
    style I fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Confirm Payment
    style J fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Leave Review
    style K fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Artist Sign Up
    style L fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Profile Setup
    style M fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Booking Requests
    style N fill:#805305,stroke:#F5F5F5,stroke-width:2px;  %% Brown - Accept/Decline Decision
    style O fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal - Chat with Client
    style P fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Confirm Appointment
    style Q fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Complete Tattoo
    style R fill:#E0A800,stroke:#F5F5F5,stroke-width:2px;  %% Deep Honey - Receive Payment
