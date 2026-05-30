# 📝 Admin Panel Usage Guide

Complete guide on how to use the admin panel to manage your e-commerce store

---

## 🔐 Login to Admin Panel:

```
URL: http://localhost:8000/admin
Username: admin
Password: admin123
```

---

## 📦 1. CATEGORIES MANAGEMENT

### Add New Category:

1. Click **"Categories"** in left sidebar
2. Click **"Add Category"** button (top right)
3. Fill in the form:

```
┌─────────────────────────────────────┐
│ BASIC INFORMATION                   │
├─────────────────────────────────────┤
│ Name: T-Shirts                      │
│ Parent category: Baby (0-24M)       │
├─────────────────────────────────────┤
│ IMAGE UPLOAD                        │
├─────────────────────────────────────┤
│ Image: [Choose File] Browse...      │
│        Select image from computer   │
├─────────────────────────────────────┤
│ DISPLAY SETTINGS                    │
├─────────────────────────────────────┤
│ Order: 1                            │
│ Is active: ☑ (checked)              │
└─────────────────────────────────────┘
```

4. Click **"SAVE"** button (bottom right)

### Edit Category:

1. Click on category name in list
2. Modify fields
3. Click **"SAVE"**

### Delete Category:

1. Check checkbox next to category
2. Select "Delete selected categories" from dropdown
3. Click "Go"
4. Confirm deletion

---

## 🛍️ 2. PRODUCTS MANAGEMENT

### Add New Product:

1. Click **"Products"** in left sidebar
2. Click **"Add Product"** button
3. Fill in ALL sections:

#### BASIC INFORMATION:
```
Name: Sage Green Organic Jabla
Category: [Select from dropdown - e.g., T-Shirts]
Parent category: New Born (0–3 Months)
Description: Cloud-soft baby jabla stitched in 100% organic cotton. 
             Easy tie-on neck straps and loose fit for perfect 
             newborn breathability.
```

#### PRICING:
```
Price: 349.00
Original price: 499.00
Discount: -30%
```

#### INVENTORY:
```
Stock: 50
```

#### IMAGE UPLOAD:
```
Image: [Choose File] Upload product image
```

#### DESIGN COLORS:
```
Color hex: #e6fcf5
Cart btn color: bg-teal-500 hover:bg-teal-600
```

#### TAGS & STATUS:
```
Tag type: discount (or bestseller, new, featured)
Is new: ☑
Is active: ☑
Rating: 4.8
Reviews count: 120
```

4. **Add Product Colors** (Inline section below):

Click "Add another Product color" and fill:
```
Row 1: Name: Sage Green  | Hex: #0ca678
Row 2: Name: Off White   | Hex: #f8f9fa
```

5. **Add Product Sizes** (Inline section):

Click "Add another Product size" and fill:
```
Row 1: Size: 0-1M
Row 2: Size: 1-3M
Row 3: Size: 3-6M
```

6. **Add Product Features** (Inline section):

Click "Add another Product feature" and fill:
```
Row 1: Feature text: Material: 100% Organic Muslin Cotton
Row 2: Feature text: Stitch: External soft-locking seams
Row 3: Feature text: Care: Machine wash cold, gentle cycle
```

7. **Add Product Details** (Inline section):

Click "Add another Product detail" and fill:
```
Row 1: 
  Title: Muslin Softness
  Content: Gets softer with every wash. Hypoallergenic and highly breathable.

Row 2:
  Title: Size Guide
  Content: Designed for babies from 2.5 kg to 5.5 kg.
```

8. Click **"SAVE"** button

### Quick Edit Products:

1. Go to Products list
2. Edit directly in list:
   - Price
   - Stock
   - Discount
   - Is new
   - Is active
3. Click **"SAVE"** at bottom

---

## 🎨 3. HERO BANNERS MANAGEMENT

### Add Hero Banner:

1. Click **"Hero Banners"** in sidebar
2. Click **"Add Hero Banner"**
3. Fill in:

```
┌─────────────────────────────────────┐
│ CONTENT                             │
├─────────────────────────────────────┤
│ Title: Summer Collection 2024       │
│ Subtitle: Up to 50% Off             │
│ Alt: Summer sale banner             │
│ Link: /collections/summer           │
├─────────────────────────────────────┤
│ IMAGE UPLOAD                        │
├─────────────────────────────────────┤
│ Image: [Upload banner image]        │
│        Recommended: 1920x600px      │
├─────────────────────────────────────┤
│ DISPLAY SETTINGS                    │
├─────────────────────────────────────┤
│ Order: 1                            │
│ Is active: ☑                        │
└─────────────────────────────────────┘
```

4. Click **"SAVE"**

---

## 🏷️ 4. CATEGORY ITEMS MANAGEMENT

### Add Category Item:

1. Click **"Category Items"** in sidebar
2. Click **"Add Category Item"**
3. Fill in:

```
┌─────────────────────────────────────┐
│ BASIC INFORMATION                   │
├─────────────────────────────────────┤
│ Name: Toys                          │
│ Category ref: Toys                  │
│ Bg: #fff0f6                         │
├─────────────────────────────────────┤
│ IMAGE UPLOAD                        │
├─────────────────────────────────────┤
│ Image: [Upload category image]      │
│        Recommended: 500x500px       │
├─────────────────────────────────────┤
│ DISPLAY SETTINGS                    │
├─────────────────────────────────────┤
│ Order: 1                            │
│ Is active: ☑                        │
└─────────────────────────────────────┘
```

4. Click **"SAVE"**

---

## 📢 5. MARKETING BANNERS MANAGEMENT

### Add Marketing Banner:

1. Click **"Marketing Banners"** in sidebar
2. Click **"Add Marketing Banner"**
3. Fill in:

```
┌─────────────────────────────────────┐
│ CONTENT                             │
├─────────────────────────────────────┤
│ Title: Summer Outfits               │
│ Description: 100% Pure Cotton Wear  │
│ Button text: SHOP NOW               │
│ Category ref: T-Shirts              │
├─────────────────────────────────────┤
│ DESIGN                              │
├─────────────────────────────────────┤
│ Bg: #d9f2ec                         │
├─────────────────────────────────────┤
│ IMAGE UPLOAD                        │
├─────────────────────────────────────┤
│ Image: [Upload banner image]        │
│        Recommended: 800x400px       │
├─────────────────────────────────────┤
│ DISPLAY SETTINGS                    │
├─────────────────────────────────────┤
│ Order: 1                            │
│ Is active: ☑                        │
└─────────────────────────────────────┘
```

4. Click **"SAVE"**

---

## 📦 6. ORDERS MANAGEMENT

### View Orders:

1. Click **"Orders"** in sidebar
2. See all customer orders
3. Click on order ID to view details

### Order Details Include:
- Customer name, email, phone
- Shipping address
- Order items with quantities
- Payment method
- Total amount
- Order date

**Note:** Orders are created from frontend (customer purchases). Admin can only view, not create.

---

## 🎯 BEST PRACTICES:

### Image Guidelines:
- **Categories:** 500x500px, square, clear background
- **Products:** 800x800px, square, white background
- **Hero Banners:** 1920x600px, wide, high quality
- **Marketing Banners:** 800x400px, rectangle
- **Format:** JPG, PNG, WebP
- **Max Size:** 10MB per image

### Naming Conventions:
- Use clear, descriptive names
- Avoid special characters
- Use proper capitalization

### Display Order:
- Lower number = appears first
- Use: 1, 2, 3, 4... for ordering
- Leave gaps (10, 20, 30) for future insertions

### Active Status:
- ☑ Is Active = Shows on frontend
- ☐ Is Active = Hidden from frontend
- Use to temporarily hide items

---

## 🔄 WORKFLOW EXAMPLE:

### Complete Product Upload:

1. **Add Category First:**
   - Name: "Baby Rompers"
   - Upload category image
   - Save

2. **Add Product:**
   - Select category: "Baby Rompers"
   - Fill all product details
   - Upload product image
   - Add colors (2-3 variants)
   - Add sizes (3-4 options)
   - Add features (3-5 points)
   - Add details (2-3 sections)
   - Save

3. **Verify on Frontend:**
   - Open: http://localhost:3000
   - Check product appears
   - Check all details visible
   - Check images loading

---

## ✅ CHECKLIST:

After uploading data, verify:

- [ ] Category has image
- [ ] Category is active
- [ ] Product has all details filled
- [ ] Product has image
- [ ] Product has colors added
- [ ] Product has sizes added
- [ ] Product has features added
- [ ] Product is active
- [ ] Banner has image
- [ ] Banner is active
- [ ] Data shows on frontend

---

## 📞 Need Help?

Check: `TROUBLESHOOTING.md` for common issues!

---

## 🎉 Happy Managing!

Your store is ready to go live! 🚀
