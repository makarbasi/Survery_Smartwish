# SmartWish Survey Frontend

A standalone React frontend application for SmartWish store interest surveys and partnership applications.

## 🌟 Features

- **Store Interest Form** - Public form for store partnership applications
- **Admin Dashboard** - View and manage submissions with image uploads
- **Professional UI** - Modern, responsive design with SmartWish branding
- **Real-time Updates** - Dynamic statistics and data visualization
- **Image Management** - Upload and view store images
- **Letter Preview** - View generated professional letters

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Survey Backend running on port 3002

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment (optional):**
```bash
# Create .env file if you need custom API URL
echo "VITE_API_URL=http://localhost:3002" > .env
```

3. **Start development server:**
```bash
npm run dev
```

4. **Access the application:**
- **Homepage:** http://localhost:5174
- **Interest Form:** http://localhost:5174/interest
- **Admin Dashboard:** http://localhost:5174/admin

### Production Build

```bash
npm run build
npm run preview
```

## 📱 Pages

### 1. **Homepage** (`/`)
- Welcome page with navigation
- Partnership information
- Call-to-action buttons

### 2. **Store Interest Form** (`/interest`)
- Professional partnership application form
- SmartWish branding and benefits
- Real-time form validation
- Success confirmation with details

### 3. **Admin Dashboard** (`/admin`)
- Statistics overview
- All store submissions
- Image upload functionality
- Letter preview
- Real-time data management

## 🎨 Design Features

### **Professional Branding**
- SmartWish logo and colors
- Gradient backgrounds
- Modern card-based layouts
- Professional typography

### **Responsive Design**
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Accessible design patterns

### **User Experience**
- Loading states
- Error handling
- Success confirmations
- Intuitive navigation

## 🔧 Configuration

### **Environment Variables**

```env
# API Configuration (optional)
VITE_API_URL=http://localhost:3002

# Production Settings
VITE_NODE_ENV=production
```

### **Vite Configuration**

The app uses Vite with:
- **Port:** 5174 (to avoid conflicts)
- **Proxy:** API calls routed to backend
- **Build optimization:** Modern bundle splitting

## 📡 API Integration

### **Backend Communication**

All API calls go through `src/services/api.js`:

```javascript
// Store Interest Submission
await submitStoreInterest({
  storeName: "My Store",
  storeAddress: "123 Main St",
  contactName: "John Doe",
  contactEmail: "john@store.com",
  contactPhone: "+1-555-123-4567"
});

// Get All Submissions
const interests = await getStoreInterests();

// Upload Images
await uploadImages(interestId, files);

// Get Statistics
const stats = await getStats();
```

### **Error Handling**

- Network errors are caught and displayed
- Loading states during API calls
- Retry mechanisms for failed requests
- User-friendly error messages

## 🏗️ Project Structure

```
survey_frontend/
├── src/
│   ├── pages/
│   │   ├── StoreInterest.jsx    # Interest form
│   │   └── AdminDashboard.jsx   # Admin interface
│   ├── services/
│   │   └── api.js               # API communication
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   ├── App.css              # Homepage styles
│   │   ├── StoreInterest.css    # Form styles
│   │   └── AdminDashboard.css   # Admin styles
│   ├── App.jsx                  # Homepage component
│   └── main.jsx                 # App entry point
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## 📊 Features Detail

### **Store Interest Form**
- **Professional Layout** - Business letter format
- **Smart Validation** - Required fields and format checks
- **Success State** - Confirmation with submission details
- **Professional Letter** - Auto-generated business letter
- **Contact Options** - Email and phone (optional)

### **Admin Dashboard**
- **Statistics Cards** - Total submissions, images, averages
- **Submission Grid** - Card-based layout with details
- **Image Upload** - Drag-and-drop multiple images
- **Image Gallery** - Thumbnail grid with hover effects
- **Letter Preview** - Expandable letter text
- **Real-time Updates** - Data refreshes after uploads

### **Professional Design**
- **SmartWish Branding** - Consistent colors and fonts
- **Modern UI** - Card layouts, gradients, shadows
- **Responsive Grid** - Adapts to all screen sizes
- **Accessibility** - Proper labels, contrast, keyboard nav

## 🎯 User Flows

### **Store Owner Flow**
1. Visit homepage
2. Click "Express Interest"
3. Fill out professional form
4. Submit and see confirmation
5. Receive contact from SmartWish team

### **Admin Flow**
1. Visit admin dashboard
2. View statistics overview
3. Browse all submissions
4. Upload images for stores
5. Preview generated letters
6. Track partnership progress

## 🔒 Security

- **Client-side validation** - Form input validation
- **Secure API calls** - HTTPS in production
- **File type validation** - Images only for uploads
- **No sensitive data** - No authentication tokens stored

## 📈 Performance

- **Vite optimization** - Fast builds and hot reload
- **Code splitting** - Lazy loading for pages
- **Image optimization** - Proper sizing and formats
- **Bundle analysis** - Optimized dependencies

## 🚀 Deployment

### **Development**
```bash
npm run dev  # Development server
```

### **Production**
```bash
npm run build    # Build for production
npm run preview  # Preview production build
```

### **Static Hosting**
- Deploy `dist/` folder to any static host
- Configure environment variables
- Ensure API backend is accessible

### **Docker (Optional)**
```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 📱 Browser Support

- **Modern Browsers** - Chrome, Firefox, Safari, Edge
- **Mobile Browsers** - iOS Safari, Chrome Mobile
- **ES2015+** - Modern JavaScript features
- **CSS Grid** - Modern layout support

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🔧 Troubleshooting

### **Common Issues**

1. **API Connection Failed**
   - Ensure backend is running on port 3002
   - Check CORS configuration
   - Verify environment variables

2. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Styling Issues**
   - Check CSS imports
   - Verify responsive breakpoints
   - Test on different devices

## 📄 License

MIT License - See LICENSE file for details

---

## 📞 Support

For questions or issues:
- **Email:** support@smartwish.com
- **Documentation:** See backend README
- **Issues:** GitHub Issues page
