# 🚀 Admin Panel Setup Guide

Complete step-by-step setup instructions for E-Commerce Admin Panel

---

## 📋 Prerequisites:

### Required Software:
- ✅ Python 3.8+ installed
- ✅ XAMPP installed (for MySQL)
- ✅ Git (optional)

---

## 🔧 Installation Steps:

### STEP 1: Install Python Dependencies

```bash
cd c:\Users\WEB TEAM\Downloads\fashion\ecommerce_admin
pip install -r requirements.txt
```

**Packages installed:**
- Django 4.2.7
- Django REST Framework
- Django CORS Headers
- PyMySQL
- Pillow (for image handling)

---

### STEP 2: Start XAMPP MySQL

1. Open **XAMPP Control Panel**
2. Click **Start** button for MySQL
3. MySQL status should show **green "Running"**

---

### STEP 3: Create Database

**Option A: Using Script (Recommended)**
```bash
python scripts/setup_database.py
```

**Option B: Manual (phpMyAdmin)**
1. Open: http://localhost/phpmyadmin
2. Click "New" in left sidebar
3. Database name: `fashion_db`
4. Collation: `utf8mb4_unicode_ci`
5. Click "Create"

---

### STEP 4: Run Migrations

```bash
cd ../ecommerce_backend
python manage.py makemigrations
python manage.py migrate
```

**Expected output:**
```
Operations to perform:
  Apply all migrations: admin, auth, contenttypes, sessions, shop
Running migrations:
  Applying contenttypes.0001_initial... OK
  Applying auth.0001_initial... OK
  ...
  Applying shop.0001_initial... OK
```

---

### STEP 5: Create Admin User

**Option A: Using Script (Recommended)**
```bash
cd ../ecommerce_admin
python scripts/create_admin.py
```

**Option B: Manual**
```bash
cd ../ecommerce_backend
python manage.py createsuperuser
```
Enter:
- Username: `admin`
- Email: `admin@fashion.com`
- Password: `admin123`

---

### STEP 6: Start Server

```bash
cd ../ecommerce_backend
python manage.py runserver
```

**Expected output:**
```
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.
```

---

### STEP 7: Access Admin Panel

1. Open browser
2. Go to: **http://localhost:8000/admin**
3. Login with:
   - Username: `admin`
   - Password: `admin123`

---

## ✅ Verification:

### Check if setup successful:

1. **Admin Panel Loads:**
   - URL: http://localhost:8000/admin
   - Login page appears

2. **Database Connected:**
   - Can login to admin panel
   - No database errors

3. **Models Visible:**
   - See "Shop" section in admin
   - Categories, Products, Orders, etc. visible

4. **API Working:**
   - http://localhost:8000/api/categories/
   - Returns JSON response (empty array initially)

---

## 🎯 Next Steps:

After successful setup:

1. **Read Admin Usage Guide:**
   - `guides/ADMIN_USAGE.md`
   - Learn how to upload data

2. **Check API Documentation:**
   - `guides/API_DOCUMENTATION.md`
   - Understand API endpoints

3. **Start Uploading Data:**
   - Add categories
   - Add products
   - Add banners

---

## 🛑 Common Issues:

### Issue 1: MySQL Connection Error
**Error:** `(2003, "Can't connect to MySQL server")`

**Solution:**
- Start XAMPP MySQL
- Check MySQL running on port 3306
- Check database `fashion_db` exists

### Issue 2: Module Not Found
**Error:** `ModuleNotFoundError: No module named 'django'`

**Solution:**
```bash
pip install -r requirements.txt
```

### Issue 3: Migration Error
**Error:** `No migrations to apply`

**Solution:**
```bash
python manage.py makemigrations shop
python manage.py migrate
```

---

## 📞 Need Help?

Check: `guides/TROUBLESHOOTING.md` for more solutions!

---

## 🎉 Setup Complete!

Your admin panel is ready to use! 🚀
