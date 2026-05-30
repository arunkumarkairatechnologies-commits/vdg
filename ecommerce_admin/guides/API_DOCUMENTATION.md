# 🔗 API Documentation

Complete reference for all API endpoints

---

## 🌐 Base URL:

```
http://localhost:8000/api/
```

---

## 📋 ENDPOINTS:

### 1. Categories

#### Get All Categories
```
GET /api/categories/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "T-Shirts",
    "parent_category": "Baby (0-24M)",
    "image": "/media/categories/tshirt.jpg",
    "image_url": "http://localhost:8000/media/categories/tshirt.jpg",
    "order": 1,
    "is_active": true
  }
]
```

#### Get Single Category
```
GET /api/categories/{id}/
```

---

### 2. Products

#### Get All Products
```
GET /api/products/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Sage Green Organic Jabla",
    "category": 1,
    "category_name": "T-Shirts",
    "parent_category": "New Born (0–3 Months)",
    "price": 349.00,
    "original_price": 499.00,
    "discount": "-30%",
    "tag_type": "discount",
    "rating": 4.8,
    "reviews_count": 120,
    "is_new": true,
    "description": "Cloud-soft baby jabla...",
    "image": "http://localhost:8000/media/products/jabla.jpg",
    "thumbnails": ["http://localhost:8000/media/products/jabla.jpg"],
    "color_hex": "#e6fcf5",
    "cart_btn_color": "bg-teal-500 hover:bg-teal-600",
    "stock": 50,
    "colors": [
      {"name": "Sage Green", "hex": "#0ca678"},
      {"name": "Off White", "hex": "#f8f9fa"}
    ],
    "sizes": ["0-1M", "1-3M", "3-6M"],
    "features": [
      "Material: 100% Organic Cotton",
      "Stitch: Soft seams",
      "Care: Machine wash cold"
    ],
    "details": [
      {
        "title": "Muslin Softness",
        "content": "Gets softer with every wash"
      }
    ]
  }
]
```

#### Get Single Product
```
GET /api/products/{id}/
```

---

### 3. Hero Banners

#### Get All Hero Banners
```
GET /api/hero-banners/
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Summer Collection 2024",
    "subtitle": "Up to 50% Off",
    "src": "http://localhost:8000/media/banners/summer.jpg",
    "alt": "Summer banner",
    "link": "/collections/summer",
    "order": 1
  }
]
```

---

### 4. Category Items

#### Get All Category Items
```
GET /api/category-items/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Toys",
    "bg": "#fff0f6",
    "img": "http://localhost:8000/media/category_items/toys.jpg",
    "categoryRef": "Toys",
    "order": 1
  }
]
```

---

### 5. Marketing Banners

#### Get All Marketing Banners
```
GET /api/marketing-banners/
```

**Response:**
```json
[
  {
    "id": 1,
    "title": "Summer Outfits",
    "description": "100% Pure Cotton Wear",
    "bg": "#d9f2ec",
    "img": "http://localhost:8000/media/marketing/summer.jpg",
    "buttonText": "SHOP NOW",
    "categoryRef": "T-Shirts",
    "order": 1
  }
]
```

---

### 6. Orders

#### Get All Orders
```
GET /api/orders/
```

**Response:**
```json
[
  {
    "order_id": "ORD-20240530-001",
    "customer_name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "street_address": "123 Main St",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pin_code": "400001",
    "payment_method": "cod",
    "subtotal": 1000.00,
    "discount_amount": 100.00,
    "shipping_fee": 99.00,
    "total_amount": 999.00,
    "items": [
      {
        "product_id": 1,
        "product_name": "Sage Green Jabla",
        "quantity": 2,
        "selected_color": "Sage Green",
        "selected_size": "0-1M",
        "price": 349.00
      }
    ]
  }
]
```

#### Create Order
```
POST /api/orders/
```

**Request Body:**
```json
{
  "order_id": "ORD-20240530-001",
  "customer_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "street_address": "123 Main St",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pin_code": "400001",
  "payment_method": "cod",
  "subtotal": 1000.00,
  "discount_amount": 100.00,
  "shipping_fee": 99.00,
  "total_amount": 999.00,
  "items": [
    {
      "product_id": 1,
      "quantity": 2,
      "selected_color": "Sage Green",
      "selected_size": "0-1M"
    }
  ]
}
```

---

## 🔍 FILTERING & SORTING:

### Filter Products by Category:
```
GET /api/products/?category=1
```

### Filter Products by Active Status:
```
GET /api/products/?is_active=true
```

### Filter Products by New:
```
GET /api/products/?is_new=true
```

### Sort Products by Price:
```
GET /api/products/?ordering=price        # Low to High
GET /api/products/?ordering=-price       # High to Low
```

### Sort Products by Rating:
```
GET /api/products/?ordering=-rating
```

---

## 📸 MEDIA FILES:

### Image URLs:

All uploaded images are accessible via:
```
http://localhost:8000/media/{path}
```

**Examples:**
- Category: `http://localhost:8000/media/categories/tshirt.jpg`
- Product: `http://localhost:8000/media/products/jabla.jpg`
- Banner: `http://localhost:8000/media/banners/summer.jpg`

---

## 🔐 AUTHENTICATION:

Currently, all API endpoints are **public** (no authentication required).

For production, you should add authentication:
- Token-based authentication
- Session authentication
- OAuth2

---

## 🌐 CORS:

CORS is enabled for all origins in development.

**Allowed:**
- http://localhost:3000 (Frontend)
- http://localhost:8000 (Backend)
- All other origins

---

## 📊 RESPONSE CODES:

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Invalid data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## 🧪 TESTING APIS:

### Using Browser:
```
http://localhost:8000/api/products/
```

### Using cURL:
```bash
curl http://localhost:8000/api/products/
```

### Using Postman:
1. Create new request
2. Method: GET
3. URL: http://localhost:8000/api/products/
4. Send

---

## 💡 FRONTEND INTEGRATION:

### Fetch Categories:
```javascript
const response = await fetch('http://localhost:8000/api/categories/');
const categories = await response.json();
```

### Fetch Products:
```javascript
const response = await fetch('http://localhost:8000/api/products/');
const products = await response.json();
```

### Create Order:
```javascript
const response = await fetch('http://localhost:8000/api/orders/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(orderData)
});
const result = await response.json();
```

---

## 📞 Need Help?

Check: `TROUBLESHOOTING.md` for API issues!

---

## 🎉 API Ready!

All endpoints are working and ready to use! 🚀
