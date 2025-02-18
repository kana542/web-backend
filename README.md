# diary api

## Authentication
- User registration: POST /api/users
- Login: POST /api/auth/login

## Authorization
- Regular users
- Admin users

## Authorization Rules
### Regular Users

- Can create new diary entries
- Can view, update and delete their own entries
- Can update their own user information
- Cannot access other users' data

### Admin Users

- Can view all users' information
- Can delete any user
- Have access to all diary entries
- Can perform any operation on the system

## API Endpoints
### Authentication
- POST /api/auth/login - User login
- GET /api/auth/me - Get current user info (requires authentication)

### Users
- POST /api/users - Create new user (public)
- GET /api/users - Get all users (admin only)
- GET /api/users/:id - Get user by ID (authenticated)
- PUT /api/users/:id - Update user (owner only)
- DELETE /api/users/:id - Delete user (admin only)

### Diary Entries

- POST /api/entries - Create new entry (authenticated)
- GET /api/entries - Get all entries (authenticated)
- GET /api/entries/:id - Get entry by ID (authenticated)
- PUT /api/entries/:id - Update entry (owner only)
- DELETE /api/entries/:id - Delete entry (owner only)
