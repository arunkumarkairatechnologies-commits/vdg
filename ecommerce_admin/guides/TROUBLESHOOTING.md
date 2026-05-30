# 🔧 Troubleshooting Guide

Solutions to common issues with the admin panel

---

## 🚨 DATABASE ISSUES:

### Issue 1: Can't Connect to MySQL

**Error:**
```
(2003, "Can't connect to MySQL server on 'localhost'")
```

**Solutions:**
1. Start XAMPP MySQL:
   - Open XAMPP Control Panel
   - Click "Start" for MySQL
   - Wait for green "Running" status

2. Check MySQL Port:
   - Default port: 3306
   - Check if another service using port 3306

3. Check Database Exists:
   - Open: http://localhost/phpmyadmin
   - Look for `fashion_db` database
   - If not exists, run: `python scripts/setup_database.py`

---

### Issue 2: Database Does Not Exist

**Error:**
```
(1049, "Unknown database 'fashion_db'")
```

**Solution:**
```bash
cd ecommerce_admin
python scripts/setup_database.py
```

Or manually create in phpMyAdmin:
1. Go to: http://localhost/phpmyadmin
2. Click "New"
3. Database name: `fashion_db`
4. Click "Create"

---

### Issue 3: Migration Errors

**Error:**
```
No migrations to apply
```

**Solution:**
```bash
cd ../ecommerce_backend
python manage.py makemigrations shop
python manage.py migrate
```

---

## 🔐 ADMIN PANEL ISSUES:

### Issue 4: Can't Login to Admin

**Error:**
```
Please enter the correct username and password
```

**Solutions:**
1. Check credentials:
   - Username: `admin`
   - Password: `admin123`

2. Create new admin user:
```bash
cd ecommerce_admin
python scripts/create_admin.py
```

3. Reset password:
```bash
cd ../ecommerce_backend
python manage.py changepassword admin
```

---

### Issue 5: Admin Panel Not Loading

**Error:**
```
This site can't be reached
```

**Solutions:**
1. Check server is running:
```bash
cd ecommerce_backend
python manage.py runserver
```

2. Check URL:
   - Try: http://localhost:8000/admin
   - Try: http://127.0.0.1:8000/admin

3. Check port 8000 is free:
   - Close other applications using port 8000
   - Or run on different port:
```bash
python manage.py runserver 8001
```

---

## 📸 IMAGE UPLOAD ISSUES:

### Issue 6: Images Not Uploading

**Error:**
```
Upload failed
```

**Solutions:**
1. Check file size:
   - Max size: 10MB
   - Compress large images

2. Check file format:
   - Supported: JPG, JPEG, PNG, WebP
   - Not supported: GIF, BMP, TIFF

3. Check media folder exists:
```bash
cd ecommerce_backend
mkdir media
mkdir media\categories
mkdir media\products
mkdir media\banners
mkdir media\category_items
mkdir media\marketing
```

4. Check file permissions:
   - Media folder should be writable

---

### Issue 7: Images Not Showing on Frontend

**Error:**
```
Image broken icon
```

**Solutions:**
1. Check image uploaded:
   - Go to admin panel
   - Edit item
   - Check "Image Status" shows ✅

2. Check image URL:
   - Open: http://localhost:8000/media/products/image.jpg
   - Should show image

3. Check "Is Active" is checked:
   - Edit item in admin
   - Make sure "Is active" is ☑

4. Check CORS settings:
   - Should be enabled in settings.py

---

## 🔗 API ISSUES:

### Issue 8: API Returns Empty Array

**Error:**
```json
[]
```

**Solutions:**
1. Check data exists in admin:
   - Login to admin panel
   - Check items exist
   - Check "Is active" is checked

2. Check API URL:
   - http://localhost:8000/api/products/
   - Not: http://localhost:8000/products/

3. Check server running:
   - Backend server must be running

---

### Issue 9: API Returns 404

**Error:**
```
Not Found
```

**Solutions:**
1. Check URL spelling:
   - Correct: `/api/products/`
   - Wrong: `/api/product/`

2. Check trailing slash:
   - Include: `/api/products/`
   - Not: `/api/products`

---

### Issue 10: CORS Error

**Error:**
```
Access to fetch blocked by CORS policy
```

**Solutions:**
1. Check CORS installed:
```bash
pip install django-cors-headers
```

2. Check settings.py:
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True
```

---

## 🖥️ SERVER ISSUES:

### Issue 11: Port Already in Use

**Error:**
```
Error: That port is already in use.
```

**Solutions:**
1. Use different port:
```bash
python manage.py runserver 8001
```

2. Kill process using port 8000:
   - Windows: Open Task Manager
   - Find Python process
   - End task

---

### Issue 12: Module Not Found

**Error:**
```
ModuleNotFoundError: No module named 'django'
```

**Solution:**
```bash
cd ecommerce_admin
pip install -r requirements.txt
```

---

### Issue 13: Python Not Found

**Error:**
```
'python' is not recognized
```

**Solutions:**
1. Check Python installed:
```bash
python --version
```

2. Add Python to PATH:
   - Windows: System Properties > Environment Variables
   - Add Python installation path

3. Use full path:
```bash
C:\Python39\python.exe manage.py runserver
```

---

## 📦 FRONTEND INTEGRATION ISSUES:

### Issue 14: Frontend Not Showing Data

**Error:**
```
No products found
```

**Solutions:**
1. Check backend running:
   - http://localhost:8000/api/products/
   - Should return JSON data

2. Check frontend API URL:
   - Should be: `http://localhost:8000/api/`
   - Not: `http://localhost:3000/api/`

3. Check data is active:
   - Admin panel > Edit item
   - "Is active" should be ☑

4. Refresh frontend:
   - Press F5
   - Clear cache: Ctrl + Shift + R

---

### Issue 15: Images Not Loading on Frontend

**Error:**
```
Failed to load resource: 404
```

**Solutions:**
1. Check image URL in API:
   - Should be full URL: `http://localhost:8000/media/...`
   - Not relative: `/media/...`

2. Check backend serving media:
   - Open: http://localhost:8000/media/products/image.jpg
   - Should show image

3. Check MEDIA_URL in settings.py:
```python
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

## 🔄 RESET & CLEAN:

### Reset Database:

```bash
cd ecommerce_admin
python scripts/reset_database.py
cd ../ecommerce_backend
python manage.py migrate
python manage.py createsuperuser
```

### Clear Cache:

```bash
cd ecommerce_backend
python manage.py clearsessions
```

### Restart Server:

```bash
# Stop: CTRL + C
# Start:
python manage.py runserver
```

---

## 📞 STILL NEED HELP?

### Check Logs:

1. **Server Terminal:**
   - Look for error messages
   - Copy full error text

2. **Browser Console:**
   - Press F12
   - Check Console tab
   - Look for errors

3. **Django Debug:**
   - Check DEBUG = True in settings.py
   - Error page shows detailed info

---

## 🎯 QUICK FIXES:

### Complete Reset:

```bash
# 1. Stop server (CTRL + C)

# 2. Reset database
cd ecommerce_admin
python scripts/reset_database.py

# 3. Run migrations
cd ../ecommerce_backend
python manage.py migrate

# 4. Create admin
cd ../ecommerce_admin
python scripts/create_admin.py

# 5. Start server
cd ../ecommerce_backend
python manage.py runserver
```

---

## ✅ VERIFICATION CHECKLIST:

After fixing issues, verify:

- [ ] XAMPP MySQL running
- [ ] Database `fashion_db` exists
- [ ] Backend server running
- [ ] Admin panel accessible
- [ ] Can login to admin
- [ ] Can upload data
- [ ] Images uploading
- [ ] API returning data
- [ ] Frontend showing data
- [ ] Images loading on frontend

---

## 🎉 Issues Resolved!

Your admin panel should be working now! 🚀
