```mermaid
flowchart TD
    Client["Client Apps (Web / Mobile)"]

    Gateway["API Gateway"]

    Auth["Auth Service"]
    Users["Users Service"]
    Chat["Chat Service"]
    Messages["Messages Service"]
    Notif["Notifications Service"]
    Presence["Presence Service"]

    DB1[("PostgreSQL - Auth")]
    DB2[("PostgreSQL - Users")]
    DB3[("PostgreSQL - Chat")]
    DB4[("PostgreSQL - Messages")]
    DB5[("PostgreSQL - Notifications")]

    Redis[("Redis")]

    Client -->|HTTP / WS| Gateway

    Gateway --> Auth
    Gateway --> Users
    Gateway --> Chat
    Gateway --> Messages

    Auth --> DB1
    Users --> DB2
    Chat --> DB3
    Messages --> DB4
    Notif --> DB5

    Messages -->|Publish Events| Redis
    Chat -->|Publish Events| Redis

    Redis --> Notif
    Redis --> Presence
    Redis --> Gateway

    Presence --> Redis
```

PROJECT STRUCTURE

 ```mermaid
 flowchart TD
    Root[whatsapp-clone]

    Apps[apps]
    Libs[libs]

    Root --> Apps
    Root --> Libs

    Apps --> Gateway
    Apps --> Auth
    Apps --> Users
    Apps --> Chat
    Apps --> Messages
    Apps --> Notifications
    Apps --> Presence

    Libs --> Common
    Libs --> Database
    Libs --> Redis
```

DATABASE STRATEGY

```mermaid
flowchart TD
    Auth --> DB1[(Auth DB)]
    Users --> DB2[(Users DB)]
    Chat --> DB3[(Chat DB)]
    Messages --> DB4[(Messages DB)]
    Notifications --> DB5[(Notifications DB)]

    Presence --> Redis[(Redis Only)]
```
COMMUNICATION PATTERN

```mermaid
flowchart LR
    Gateway -->|Sync (HTTP/TCP)| Auth
    Gateway -->|Sync (HTTP/TCP)| Users

    Messages -->|Async (Pub/Sub)| Notifications
    Messages -->|Async (Pub/Sub)| Presence
    Chat -->|Async (Pub/Sub)| Messages
```

REAL-TIME MESSAGE FLOW

```mermaid
sequenceDiagram
    participant ClientA
    participant Gateway
    participant Messages
    participant Redis
    participant Notifications
    participant Presence
    participant ClientB

    ClientA->>Gateway: Send message (WebSocket)
    Gateway->>Messages: Forward (TCP)

    Messages->>Messages: Save to DB
    Messages->>Redis: Publish "new_message"

    Redis-->>Notifications: Event
    Redis-->>Presence: Event
    Redis-->>Gateway: Event

    Notifications->>ClientB: Push notification (if offline)
    Presence->>Presence: Update last seen

    Gateway->>ClientB: Deliver message (WebSocket)
```