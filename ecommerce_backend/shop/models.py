from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255, unique=True)
    parent_category = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    parent_category = models.CharField(max_length=255)  # e.g., "New Born (0–3 Months)", "3–6 Months"
    price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.CharField(max_length=50, blank=True, null=True)
    tag_type = models.CharField(max_length=50, blank=True, null=True) # "discount", "bestseller", "new"
    rating = models.FloatField(default=0.0)
    reviews_count = models.IntegerField(default=0)
    is_new = models.BooleanField(default=False)
    description = models.TextField()
    image = models.CharField(max_length=255)  # Store image path e.g. "/products/tshirt_green.png"
    color_hex = models.CharField(max_length=50) # e.g. "#e6fcf5"
    cart_btn_color = models.CharField(max_length=100, blank=True, null=True)
    stock = models.IntegerField(default=50)

    def __str__(self):
        return self.name


class ProductColor(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='colors')
    name = models.CharField(max_length=100)
    hex = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.product.name} - {self.name}"


class ProductSize(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sizes')
    size = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.product.name} - {self.size}"


class ProductFeature(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='features')
    feature_text = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.product.name} - Feature"


class ProductDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='details')
    title = models.CharField(max_length=255)
    content = models.TextField()

    def __str__(self):
        return f"{self.product.name} - {self.title}"


class Order(models.Model):
    PAYMENT_CHOICES = [
        ('card', 'Credit Card'),
        ('upi', 'UPI Transfer'),
        ('cod', 'Cash on Delivery'),
    ]

    order_id = models.CharField(max_length=100, unique=True)
    customer_name = models.CharField(max_length=255)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=50)
    street_address = models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    pin_code = models.CharField(max_length=20)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_CHOICES)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    shipping_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.order_id} - {self.customer_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=255)  # Snapshot product name at order time
    quantity = models.IntegerField(default=1)
    selected_color = models.CharField(max_length=100, blank=True, null=True)
    selected_size = models.CharField(max_length=50, blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product_name} in {self.order.order_id}"


class HeroBanner(models.Model):
    src = models.CharField(max_length=255)  # Image path, e.g. "/banner/banner1.png"
    alt = models.CharField(max_length=255)

    def __str__(self):
        return self.alt


class CategoryItem(models.Model):
    name = models.CharField(max_length=100)
    bg = models.CharField(max_length=50)  # pastel background color hex/rgb
    img = models.CharField(max_length=255)  # Image path, e.g. "/products/tshirt_green.png"
    categoryRef = models.CharField(max_length=100)  # filter reference, e.g. "Toys"

    def __str__(self):
        return self.name


class MarketingBanner(models.Model):
    title = models.CharField(max_length=255)
    description = models.CharField(max_length=255)
    bg = models.CharField(max_length=50)  # background color hex
    img = models.CharField(max_length=255)  # Image path, e.g. "/products/hoodie_pink.png"
    buttonText = models.CharField(max_length=100, default="SHOP NOW")
    categoryRef = models.CharField(max_length=100)  # filter reference, e.g. "T-Shirts"

    def __str__(self):
        return self.title

