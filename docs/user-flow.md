# 🐝 Stingr - User Flow Diagram

This document outlines the user journey for **Clients** and **Artists** within the Stingr platform.

## User Flow Diagram

```mermaid
graph TD;
    %% User Entry Points
    A[User Opens Stingr] --> B{Are they a Client or an Artist?};
    
    %% Client Flow
    B -->|Client| C[Sign Up/Login];
    C --> D[Browse Artists (Swipe Interface)];
    D --> E{Match Found?};
    E -->|Yes| F[View Artist Profile];
    F --> G[Send Booking Request];
    G --> H[Consultation Chat];
    H --> I[Finalize Booking & Payment];
    I --> J[Receive Tattoo & Leave Review];

    %% Artist Flow
    B -->|Artist| K[Sign Up/Login];
    K --> L[Set Up Profile (Portfolio, Pricing)];
    L --> M[Receive Booking Requests];
    M --> N[Accept or Decline Consultation];
    N --> O[Chat with Client];
    O --> P[Confirm Appointment & Payment];
    P --> Q[Tattoo Session Completed];
    Q --> R[Receive Review & Payment];

    %% Decision Nodes
    E -->|No| D;
    N -->|Decline| M;
    N -->|Accept| O;
