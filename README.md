# 🛍️ Bidhub Marketplace

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.11-blue.svg)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-5.0-green.svg)](https://www.djangoproject.com/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14-336791.svg)](https://www.postgresql.org/)

A modern, full-stack auction marketplace enabling users to buy and sell new and second-hand items with real-time bidding, secure payments, and comprehensive seller profiles.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 Overview

**Bidhub Marketplace** is a feature-rich auction platform where users can:

- **List items** in minutes with multi-image uploads
- **Bid in real-time** on thousands of items across diverse categories
- **Pay securely** via PayPal integration
- **Manage seller profiles** with ratings, reviews, and transaction history
- **Protect accounts** with optional Two-Factor Authentication (TOTP)

Built with a **Django REST Framework** backend and **React (Vite)** frontend, Bidhub delivers a fast, accessible, and scalable user experience.

---

## ✨ Features

### Core Functionality

- **User Authentication & Authorization**

  - JWT-based authentication
  - Two-Factor Authentication (2FA) via TOTP
  - Password validation & secure storage
  - Token blacklisting on logout

- **Item Management**

  - Create, update, delete listings
  - Multi-image upload via Cloudinary
  - Category-based filtering (Electronics, Fashion, Collectibles, etc.)
  - Condition tracking (New, Like New, Good, Fair, Poor)
  - Shipping dimensions & weight

- **Bidding System**

  - Real-time bid placement
  - Automatic highest bidder tracking
  - Bid history modal
  - Auction end-date enforcement

- **Payments & Wallet**

  - PayPal Checkout integration
  - Secure payment confirmation
  - Wallet balance tracking
  - Transaction history

- **Reviews & Ratings**

  - Star-based seller ratings (1-5)
  - Written feedback system
  - Average rating calculation
  - Review moderation

- **User Profiles**
  - Favorites/watchlist management
  - Seller statistics (items sold, join date, rating)
  - Profile image upload
  - Editable account details

---

## 🛠️ Tech Stack

### Backend

- **Framework:** Django 5.0.6 + Django REST Framework 3.15.2
- **Database:** PostgreSQL 14+ (via psycopg2)
- **Authentication:** JWT (djangorestframework-simplejwt), django-two-factor-auth
- **Cloud Storage:** Cloudinary (images)
- **Payments:** PayPal REST SDK
- **Security:** django-cors-headers, Helmet policies

### Frontend

- **Framework:** React 18.3.1 (Vite 6.0.3)
- **Routing:** React Router DOM 7.1.1
- **HTTP Client:** Axios 1.7.9
- **Styling:** Custom CSS (responsive, accessible)
- **Build Tool:** Vite (fast HMR, optimized production builds)

### DevOps & Tools

- **Environment Management:** pipenv (Python), npm/yarn (Node.js)
- **Linting:** ESLint (frontend), flake8 (backend)
- **Version Control:** Git + GitHub
- **CI/CD:** GitHub Actions (optional)
- **Deployment:** AWS/Heroku/DigitalOcean (backend), Netlify/Vercel (frontend)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Layer                           │
│  React SPA (Vite) - Responsive UI, Protected Routes         │
└────────────────┬────────────────────────────────────────────┘
                 │ HTTP/HTTPS (Axios)
┌────────────────▼────────────────────────────────────────────┐
│                   API Gateway (CORS)                        │
│  Django REST Framework - JWT Auth Middleware                │
└────────────────┬────────────────────────────────────────────┘
                 │
       ┌─────────┴─────────┐
       │                   │
┌──────▼──────┐    ┌───────▼────────┐
│  Business   │    │   External     │
│   Logic     │    │   Services     │
│             │    │                │
│ - Items     │    │ - Cloudinary   │
│ - Bids      │    │ - PayPal API   │
│ - Reviews   │    │ - Email (SMTP) │
│ - Payments  │    │                │
└──────┬──────┘    └────────────────┘
       │
┌──────▼──────────────────────────┐
│   Data Layer (PostgreSQL)       │
│  - Users, Items, Bids, Reviews  │
│  - Payments, Wallet             │
└─────────────────────────────────┘
```

**Key Design Patterns:**

- **RESTful API:** Stateless endpoints, HTTP verbs (GET, POST, PUT, DELETE)
- **JWT Tokens:** Secure, scalable authentication
- **Middleware Pipeline:** Logging, CORS, OTP verification
- **Service Layer:** Business logic separation (e.g., `bidService.js`, `paymentService.js`)

---

## 🚀 Getting Started

### Prerequisites

- **Python:** 3.11+
- **Node.js:** 18+
- **PostgreSQL:** 14+
- **Git**
- **Cloudinary Account** (for image uploads)
- **PayPal Developer Account** (for payments)

---

### Backend Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/Bidhub_Marketplace.git
   cd Bidhub_Marketplace/Bidhub_Marketplace_Django_Back_End
   ```

2. **Install dependencies**

   ```bash
   pipenv install
   pipenv shell
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your credentials (see Environment Variables section)
   ```

4. **Create PostgreSQL database**

   ```bash
   # macOS (Homebrew)
   brew services start postgresql@14
   createdb bidhub_db

   # Linux
   sudo systemctl start postgresql
   sudo -u postgres createdb bidhub_db
   ```

5. **Run migrations**

   ```bash
   python manage.py migrate
   ```

6. **Create superuser (optional)**

   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```
   Backend runs at `http://localhost:8000`

---

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd ../Bidhub_Marketplace_React_Front_End
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Add VITE_API_URL=http://localhost:8000
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Frontend runs at `http://localhost:5173`

---

## 🔐 Environment Variables

### Backend (`.env`)

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/bidhub_db

# Cloudinary (Image Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_API_BASE_URL=https://api-m.sandbox.paypal.com  # Use sandbox for dev

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173

# 2FA
OTP_TOTP_ISSUER=Bidhub Marketplace
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:8000
VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:8000/bidhub/
```

### Authentication Endpoints

| Method | Endpoint             | Description          | Auth Required |
| ------ | -------------------- | -------------------- | ------------- |
| POST   | `/auth/register/`    | Register new user    | ❌            |
| POST   | `/auth/login/`       | Login (returns JWT)  | ❌            |
| POST   | `/auth/logout/`      | Blacklist token      | ✅            |
| GET    | `/auth/user/`        | Get current user     | ✅            |
| GET    | `/auth/2fa/setup/`   | Generate 2FA QR code | ✅            |
| POST   | `/auth/2fa/confirm/` | Confirm 2FA setup    | ✅            |
| POST   | `/auth/2fa/disable/` | Disable 2FA          | ✅            |

### Items Endpoints

| Method | Endpoint          | Description                | Auth Required |
| ------ | ----------------- | -------------------------- | ------------- |
| GET    | `/items/`         | List all items (paginated) | ❌            |
| POST   | `/items/`         | Create new item            | ✅            |
| GET    | `/items/:id/`     | Get item details           | ❌            |
| PUT    | `/items/:id/`     | Update item                | ✅ (owner)    |
| DELETE | `/items/:id/`     | Delete item                | ✅ (owner)    |
| POST   | `/items/:id/bid/` | Place bid                  | ✅            |

### Payments Endpoints

| Method | Endpoint                   | Description         | Auth Required |
| ------ | -------------------------- | ------------------- | ------------- |
| POST   | `/payments/create-order/`  | Create PayPal order | ✅            |
| POST   | `/payments/capture-order/` | Capture payment     | ✅            |
| GET    | `/wallet/balance/`         | Get wallet balance  | ✅            |

### Reviews Endpoints

| Method | Endpoint               | Description        | Auth Required |
| ------ | ---------------------- | ------------------ | ------------- |
| GET    | `/reviews/seller/:id/` | Get seller reviews | ❌            |
| POST   | `/reviews/`            | Create review      | ✅            |

**Example Request (Login):**

```bash
curl -X POST http://localhost:8000/bidhub/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!"}'
```

**Example Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "message": "Welcome back john_doe",
  "two_factor_enabled": false
}
```

---

## 🗄️ Database Schema

### Core Models

**User** (`authentication.User`)

```python
- id: AutoField (PK)
- username: CharField(24, unique)
- email: EmailField(unique)
- first_name, last_name: CharField(50)
- user_rating: DecimalField(3,2, nullable)
- favorites: JSONField (array of item IDs)
- profile_image: CharField (Cloudinary URL)
- items_sold: IntegerField
- two_factor_enabled: BooleanField
- date_joined: DateTimeField
```

**Item** (`items.Item`)

```python
- id: AutoField (PK)
- owner: ForeignKey(User)
- item_name: CharField(200)
- description: TextField
- category: CharField (choices)
- condition: CharField (choices)
- images: JSONField (array of Cloudinary URLs)
- starting_bid: DecimalField(10,2)
- current_bid: DecimalField(10,2)
- highest_bidder: ForeignKey(User, nullable)
- auction_end_date: DateTimeField
- shipping_info, payment_confirmation: JSONField
- created_at, updated_at: DateTimeField
```

**Bid** (`bids.Bid`)

```python
- id: AutoField (PK)
- item_id: ForeignKey(Item)
- bidder_id: ForeignKey(User)
- bid_amount: DecimalField(10,2)
- bid_time: DateTimeField
```

**Review** (`reviews.Review`)

```python
- id: AutoField (PK)
- seller: ForeignKey(User, related_name='received_reviews')
- reviewer: ForeignKey(User)
- rating: IntegerField (1-5)
- comment: TextField
- created_at: DateTimeField
```

---

## 🔒 Security

### Implemented Measures

1. **Authentication**

   - JWT tokens with 7-day expiration
   - Token blacklisting on logout
   - TOTP-based Two-Factor Authentication
   - Password strength validation (Django validators)

2. **Authorization**

   - Permission classes (`IsAuthenticated`, custom `IsOwnerOrReadOnly`)
   - Protected routes (React Router)
   - Owner-only mutations (update/delete items)

3. **Data Protection**

   - CORS whitelisting
   - HTTPS enforcement (production)
   - Helmet policies (CSP, XSS protection)
   - SQL injection prevention (ORM)
   - XSS prevention (React auto-escaping)

4. **API Security**
   - Rate limiting (future: DRF throttling)
   - Input validation (serializers)
   - CSRF token exemption (stateless JWT API)

### Security Checklist (Production)

- [ ] Set `DEBUG=False` in Django
- [ ] Use strong `SECRET_KEY` (50+ chars)
- [ ] Enable HTTPS (SSL/TLS certificates)
- [ ] Configure `ALLOWED_HOSTS` (no wildcards)
- [ ] Rotate PayPal credentials to production
- [ ] Enable database connection pooling
- [ ] Set up monitoring (Sentry, CloudWatch)
- [ ] Implement rate limiting (django-ratelimit)
- [ ] Regular dependency updates (`pipenv update`)

---

## 🧪 Testing

### Backend Tests

```bash
cd Bidhub_Marketplace_Django_Back_End

# Run all tests
python manage.py test

# Run specific app tests
python manage.py test items.tests

# Coverage report (install coverage first)
pipenv install --dev coverage
coverage run --source='.' manage.py test
coverage report
```

**Test Structure:**

```
items/tests/
├── __init__.py
├── tests_models.py    # Model validation, methods
└── tests_api.py       # Endpoint integration tests
```

### Frontend Tests (Future)

```bash
# Install testing libraries
npm install --save-dev vitest @testing-library/react

# Run tests
npm run test
```

---

## 🚢 Deployment

### Backend (Django)

**Recommended Platforms:**

- **Heroku:** Easy Django deployment with PostgreSQL addon
- **AWS Elastic Beanstalk:** Scalable, managed service
- **DigitalOcean App Platform:** Simple pricing, Docker support

**Example: Heroku Deployment**

1. **Install Heroku CLI**

   ```bash
   brew install heroku/brew/heroku  # macOS
   ```

2. **Create Heroku app**

   ```bash
   heroku create bidhub-backend
   heroku addons:create heroku-postgresql:essential-0
   ```

3. **Set environment variables**

   ```bash
   heroku config:set SECRET_KEY=your_production_secret
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=bidhub-backend.herokuapp.com
   ```

4. **Deploy**
   ```bash
   git push heroku main
   heroku run python manage.py migrate
   ```

### Frontend (React)

**Recommended Platforms:**

- **Netlify:** Zero-config React deployments
- **Vercel:** Optimized for Vite/React
- **AWS S3 + CloudFront:** Full control, CDN integration

**Example: Netlify Deployment**

1. **Build production bundle**

   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**

   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

3. **Set environment variables** (Netlify dashboard)
   - `VITE_API_URL=https://bidhub-backend.herokuapp.com`

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Code Style

- **Python:** Follow PEP 8 (use `flake8`)
- **JavaScript:** Follow Airbnb style guide (use `eslint`)
- **Commits:** Use conventional commits (`feat:`, `fix:`, `docs:`)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contact

**Quan** - [GitHub](https://github.com/quan) | [LinkedIn](https://linkedin.com/in/quan) | [Email](mailto:quan@example.com)

**David** - [GitHub](https://github.com/david) | [LinkedIn](https://linkedin.com/in/david) | [Email](mailto:david@example.com)

**Project Link:** [https://github.com/your-org/Bidhub_Marketplace](https://github.com/your-org/Bidhub_Marketplace)

---

## 🙏 Acknowledgments

- [Django REST Framework](https://www.django-rest-framework.org/) - Powerful API toolkit
- [React](https://reactjs.org/) - UI library
- [Cloudinary](https://cloudinary.com/) - Media management
- [PayPal Developer](https://developer.paypal.com/) - Payment processing
- [Vite](https://vitejs.dev/) - Next-generation frontend tooling

---

<div align="center">
  <sub>Built with ❤️ by aspiring software engineers. Open to opportunities!</sub>
</div>
