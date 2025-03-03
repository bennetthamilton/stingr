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
    style A fill:#FFD54F,stroke:#212121,stroke-width:2px;  %% Light Honey
    style B fill:#FFC107,stroke:#212121,stroke-width:2px;  %% Honey Gold
    style C,D,F,G,H,I,J,K,L,M,O,P,Q,R fill:#F5F5F5,stroke:#212121,stroke-width:2px; %% Off-White UI Elements
    style E,N fill:#00796B,stroke:#F5F5F5,stroke-width:2px;  %% Teal (Decision Nodes)
    style N fill:#26A69A,stroke:#212121,stroke-width:2px;  %% Alternative Teal Shade