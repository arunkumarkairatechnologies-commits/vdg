# 🎯 E-Commerce Admin Panel

Complete Django Admin Panel for Fashion E-Commerce Website

---

## 📁 Folder Structure:

```
ecommerce_admin/
├── guides/                    # All documentation
│   ├── SETUP_GUIDE.md        # Initial setup instructions
│   ├── ADMIN_USAGE.md        # How to use admin panel
│   ├── API_DOCUMENTATION.md  # API endpoints reference
│   └── TROUBLESHOOTING.md    # Common issues & solutions
├── scripts/                   # Utility scripts
│   ├── setup_database.py     # Create MySQL database
│   ├── create_admin.py       # Create superuser
│   └── reset_database.py     # Reset database
├── requirements.txt           # Python dependencies
└── README.md                 # This file
```

---

## 🚀 Quick Start:

### 1. Install Dependencies:
```bash
cd ecommerce_admin
pip install -r requirements.txt
```

### 2. Setup Database:
```bash
python scripts/setup_database.py
```

### 3. Create Admin User:
```bash
python scripts/create_admin.py
```

### 4. Run Server:
```bash
cd ../ecommerce_backend
python manage.py runserver
```

### 5. Access Admin Panel:
```
URL: http://localhost:8000/admin
Username: admin
Password: admin123
```

---

## 📚 Documentation:

All guides are in the `guides/` folder:

1. **SETUP_GUIDE.md** - Complete setup instructions
2. **ADMIN_USAGE.md** - How to upload data in admin panel
3. **API_DOCUMENTATION.md** - API endpoints reference
4. **TROUBLESHOOTING.md** - Solutions to common problems

---

## 🔐 Admin Panel Features:

### ✅ Categories Management
- Add/Edit/Delete categories
- Upload category images
- Set display order
- Enable/Disable categories

### ✅ Products Management
- Complete product details
- Multiple images support
- Colors & sizes variants
- Features & specifications
- Stock management
- Pricing & discounts

### ✅ Banners Management
- Hero banners for homepage
- Category showcase items
- Marketing promotional banners
- Image upload support

### ✅ Orders Management
- View all customer orders
- Order details & items
- Customer information
- Payment tracking

---

## 🔗 Related Folders:

- **Backend:** `../ecommerce_backend/` - Django backend server
- **Frontend:** `../ecommerce-frontend/` - Next.js frontend

---

## 📞 Support:

Check the guides folder for detailed documentation!
