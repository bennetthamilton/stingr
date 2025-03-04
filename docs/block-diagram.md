graph TD;
    subgraph Client Side
        A1[User Device] -->|Request| B[Frontend - React/Next.js]
        B -->|API Calls| C[Backend - Node.js/Express]
    end

    subgraph Server Side
        C -->|Auth Requests| D[Authentication - Firebase/Auth0]
        C -->|Data Read/Write| E[Database - PostgreSQL]
        C -->|File Uploads| F[Storage - Cloud Storage - AWS S3]
        C -->|Hosting & API| G[Hosting - Vercel/DigitalOcean]
    end

    subgraph External Services
        E -->|Data Sync| H[Analytics - Google Analytics]
        E -->|Payment Processing| I[Stripe API]
        D -->|User Auth Sync| J[OAuth - Google/Apple]
    end

    style A1 fill:#FFC107,stroke:#212121,stroke-width:2px;
    style B fill:#E0A800,stroke:#212121,stroke-width:2px;
    style C fill:#00796B,stroke:#F5F5F5,stroke-width:2px;
    style D fill:#212121,stroke:#F5F5F5,stroke-width:2px;
    style E fill:#00796B,stroke:#F5F5F5,stroke-width:2px;
    style F fill:#00796B,stroke:#F5F5F5,stroke-width:2px;
    style G fill:#E0A800,stroke:#212121,stroke-width:2px;
    style H fill:#212121,stroke:#F5F5F5,stroke-width:2px;
    style I fill:#26A69A,stroke:#212121,stroke-width:2px;
    style J fill:#26A69A,stroke:#212121,stroke-width:2px;