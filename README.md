# Jaliyaakadmin Backend Setup

## Installation

1. Installera Node.js från https://nodejs.org/

2. Öppna terminal i projektmappen och kör:
   ```
   npm install
   ```

3. Starta servern:
   ```
   npm start
   ```
   eller för utveckling:
   ```
   npm run dev
   ```

Servern körs på http://localhost:3000

## API Endpoints

### Registrering
POST /api/register
Body: { "email": "parent@example.com", "phone": "+46XXXXXXXXX", "password": "password123" }

### Inloggning
POST /api/login
Body: { "email": "parent@example.com", "password": "password123" }

### Profil
GET /api/profile
Headers: Authorization: Bearer <token>

### Lägg till barn
POST /api/children
Headers: Authorization: Bearer <token>
Body: { "name": "Barnets namn", "age": 10 }

### Hämta barn
GET /api/children
Headers: Authorization: Bearer <token>

## Säkerhet
- Ändra JWT_SECRET i server.js innan produktion
- Använd HTTPS i produktion
- Validera input bättre