# Financial Referral Application

A complete financial referral system consisting of a customer-facing mobile app and a web-based admin panel, powered by a unified backend API.

## Project Overview

This application enables users to earn wallet cash by referring financial products (credit cards) and allows administrators to manage users, referrals, and payout requests through a dedicated web panel.

### Components
- **Customer Mobile App** (React Native) - iOS & Android
- **Admin Web Panel** (React.js) - Web-based dashboard
- **Backend API** (Node.js + Express) - Unified backend service
- **Database** (MongoDB) - Data storage

## Development Workflow

### Phase 1: Project Setup & Environment Configuration

#### Step 1.1: Initialize Backend Structure
```bash
cd Backend
npm init -y
mkdir src controllers models routes middleware config utils
mkdir src/controllers src/models src/routes src/middleware src/config src/utils
touch src/app.js src/server.js
```

#### Step 1.2: Install Backend Dependencies
```bash
npm install express mongoose dotenv cors helmet morgan
npm install jsonwebtoken bcryptjs socket.io
npm install --save-dev nodemon concurrently
```

#### Step 1.3: Setup Environment Configuration
```bash
# Create .env file in Backend directory
touch .env
```
Add the following variables:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/referral-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
```

#### Step 1.4: Configure Package.json Scripts
Update [Backend/package.json](Backend/package.json) scripts:
```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js",
  "test": "echo \"Error: no test specified\" && exit 1"
}
```

#### Step 1.5: Initialize Frontend Projects
```bash
# Customer Mobile App
cd frontend
npx react-native init CustomerApp
cd CustomerApp
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install axios socket.io-client react-native-vector-icons

# Admin Panel
cd ../
npx create-react-app AdminPanel
cd AdminPanel
npm install axios socket.io-client react-router-dom
```

### Phase 2: Backend Development

#### Step 2.1: Database Models & Schema Design
Create the following models in `src/models/`:

**User Model** (`src/models/User.js`):
- Fields: name, email, password, upiId, walletBalance, tier, role, isActive, createdAt
- Methods: Password hashing, JWT token generation
- Validation: Email format, required fields

**Offer Model** (`src/models/Offer.js`):
- Fields: title, description, benefits, termsAndConditions, rewardAmount, isActive, createdAt
- Validation: Required fields, minimum reward amount

**RedemptionRequest Model** (`src/models/RedemptionRequest.js`):
- Fields: userId, amount, upiId, status, requestedAt, completedAt
- Status enum: 'pending', 'completed', 'rejected'

**Transaction Model** (`src/models/Transaction.js`):
- Fields: userId, type, amount, description, relatedId, createdAt
- Type enum: 'credit', 'debit', 'referral_bonus'

#### Step 2.2: Authentication & Middleware Setup
Create middleware in `src/middleware/`:
- `auth.js` - JWT verification
- `adminAuth.js` - Admin role verification
- `errorHandler.js` - Global error handling
- `validation.js` - Request validation

#### Step 2.3: API Routes Development
Create routes in `src/routes/`:

**Authentication Routes** (`src/routes/auth.js`):
- POST `/api/auth/register` - User registration
- POST `/api/auth/login` - User/Admin login
- GET `/api/auth/me` - Get current user profile

**User Routes** (`src/routes/user.js`):
- GET `/api/user/profile` - Get user profile
- PUT `/api/user/profile` - Update user profile
- POST `/api/user/redeem` - Submit redemption request
- GET `/api/user/transactions` - Get transaction history

**Offer Routes** (`src/routes/offers.js`):
- GET `/api/offers` - Get all active offers
- GET `/api/offers/:id` - Get specific offer details

**Admin Routes** (`src/routes/admin.js`):
- GET `/api/admin/dashboard` - Dashboard statistics
- GET `/api/admin/users` - Get all users
- PUT `/api/admin/users/:id/balance` - Add funds to user wallet
- GET `/api/admin/requests` - Get redemption requests
- PUT `/api/admin/requests/:id` - Update redemption status

#### Step 2.4: Controllers Implementation
Create controllers in `src/controllers/`:
- `authController.js` - Handle authentication logic
- `userController.js` - Handle user operations
- `adminController.js` - Handle admin operations
- `offerController.js` - Handle offer operations

#### Step 2.5: Socket.IO Setup for Real-time Features
Configure Socket.IO in `src/app.js`:
- Real-time redemption request notifications
- Admin panel live updates
- Connection handling and room management

#### Step 2.6: Database Connection & Server Setup
Configure in `src/config/`:
- `database.js` - MongoDB connection
- `socket.js` - Socket.IO configuration

### Phase 3: Customer Mobile App Development

#### Step 3.1: Navigation Structure Setup
Configure React Navigation:
- Stack Navigator for main app flow
- Tab Navigator for main screens
- Authentication flow handling

#### Step 3.2: Authentication Screens
**Login Screen** (`src/screens/auth/LoginScreen.js`):
- Email/password input fields
- Login button with API integration
- Navigation to registration
- Form validation

**Registration Screen** (`src/screens/auth/RegisterScreen.js`):
- User details form (name, email, password, UPI ID)
- Registration API integration
- Input validation and error handling

#### Step 3.3: Main Application Screens
**Home Dashboard** (`src/screens/HomeScreen.js`):
- Wallet balance display
- User tier badge
- Offers list with clickable cards
- Pull-to-refresh functionality

**Offer Details Screen** (`src/screens/OfferDetailsScreen.js`):
- Offer information display
- Benefits list
- Terms and conditions
- External referral link integration

**Redemption Screen** (`src/screens/RedemptionScreen.js`):
- Amount input field
- UPI ID confirmation
- Minimum balance validation
- Redemption request submission

**Profile Screen** (`src/screens/ProfileScreen.js`):
- Editable user information
- UPI ID management
- Logout functionality
- Profile picture placeholder

**Transaction History** (`src/screens/HistoryScreen.js`):
- Transaction list with filters
- Credit/debit indicators
- Date sorting and pagination

#### Step 3.4: State Management & API Integration
- Context API for user state
- Axios configuration for API calls
- Error handling and loading states
- Offline data caching

#### Step 3.5: UI/UX Implementation
- Consistent design system
- Loading indicators
- Error messages
- Success notifications
- Responsive design for different screen sizes

### Phase 4: Admin Panel Development

#### Step 4.1: Authentication & Routing Setup
**Admin Login** (`src/components/auth/AdminLogin.js`):
- Secure admin login form
- Role-based authentication
- Protected route implementation

#### Step 4.2: Dashboard Components
**Main Dashboard** (`src/components/dashboard/Dashboard.js`):
- Key metrics display
- Total users count
- Pending requests summary
- Revenue statistics

**Redemption Management** (`src/components/requests/RequestsManager.js`):
- Real-time requests table
- Status update functionality
- Search and filter options
- Bulk actions support

**User Management** (`src/components/users/UserManager.js`):
- Users table with pagination
- Search functionality
- Manual balance addition
- User details modal

#### Step 4.3: Real-time Features Integration
- Socket.IO client setup
- Live request notifications
- Auto-refresh functionality
- Connection status indicators

#### Step 4.4: Admin Panel Styling
- Professional dashboard design
- Data tables with sorting
- Responsive layout
- Form components
- Modal dialogs

### Phase 5: Testing & Quality Assurance

#### Step 5.1: Backend Testing
```bash
npm install --save-dev jest supertest
```
- API endpoint testing
- Authentication flow testing
- Database operations testing
- Error handling validation

#### Step 5.2: Frontend Testing
- Component unit tests
- Integration testing
- User flow testing
- Cross-platform compatibility (iOS/Android)

#### Step 5.3: End-to-End Testing
- Complete user journey testing
- Admin panel functionality testing
- Real-time features testing
- Performance testing

### Phase 6: Security Implementation

#### Step 6.1: Backend Security
- Input validation and sanitization
- Rate limiting implementation
- CORS configuration
- Helmet.js security headers
- Environment variable security

#### Step 6.2: Frontend Security
- Secure token storage
- API key protection
- Input validation
- XSS prevention

### Phase 7: Deployment & Production Setup

#### Step 7.1: Backend Deployment
- MongoDB Atlas setup
- Environment configuration
- Heroku or Render deployment
- SSL certificate configuration

#### Step 7.2: Admin Panel Deployment
- Build optimization
- Vercel or Netlify deployment
- Environment variables setup
- Custom domain configuration

#### Step 7.3: Mobile App Deployment
- Android APK build
- iOS build configuration
- App store preparation
- Testing on real devices

### Phase 8: Documentation & Maintenance

#### Step 8.1: API Documentation
- Endpoint documentation
- Request/response examples
- Authentication guides
- Error code references

#### Step 8.2: User Guides
- Customer app user manual
- Admin panel guide
- Troubleshooting documentation

#### Step 8.3: Maintenance Setup
- Monitoring and logging
- Backup strategies
- Update procedures
- Performance optimization

## Project Structure

```
Refer-Earn/
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── CustomerApp/
│   └── AdminPanel/
├── .gitignore
└── README.md
```

## Technology Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Real-time**: Socket.IO
- **Mobile**: React Native
- **Web**: React.js
- **Deployment**: Heroku/Render (Backend), Vercel/Netlify (Frontend)

## Getting Started

1. Clone the repository
2. Follow Phase 1 setup instructions
3. Configure environment variables
4. Start development with Phase 2

## Development Timeline

- **Phase 1-2**: 1-2 weeks (Backend setup and development)
- **Phase 3**: 2-3 weeks (Mobile app development)
- **Phase 4**: 1-2 weeks (Admin panel development)
- **Phase 5-6**: 1 week (Testing and security)
- **Phase 7-8**: 1 week (Deployment and documentation)

**Total Estimated Time**: 6-9 weeks

## Contributing

1. Follow the established code structure
2. Implement proper error handling
3. Add appropriate comments and documentation
4. Test all functionality before committing
5. Follow security best practices

## License

This project is proprietary and confidential.