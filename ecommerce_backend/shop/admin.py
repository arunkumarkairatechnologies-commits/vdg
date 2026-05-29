from django.contrib import admin
from .models import Category, Product, ProductColor, ProductSize, ProductFeature, ProductDetail, Order, OrderItem, HeroBanner, CategoryItem, MarketingBanner

class ProductColorInline(admin.TabularInline):
    model = ProductColor
    extra = 1

class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1

class ProductFeatureInline(admin.TabularInline):
    model = ProductFeature
    extra = 1

class ProductDetailInline(admin.StackedInline):
    model = ProductDetail
    extra = 1

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent_category')
    search_fields = ('name', 'parent_category')
    list_filter = ('parent_category',)

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category', 'price', 'original_price', 'discount', 'rating', 'is_new')
    list_editable = ('price', 'original_price', 'discount', 'is_new')
    search_fields = ('name', 'category__name', 'description')
    list_filter = ('category', 'is_new', 'tag_type')
    inlines = [ProductColorInline, ProductSizeInline, ProductFeatureInline, ProductDetailInline]

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ('product', 'product_name', 'quantity', 'selected_color', 'selected_size', 'price')
    can_delete = False

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('order_id', 'customer_name', 'phone', 'payment_method', 'total_amount', 'created_at')
    readonly_fields = ('order_id', 'customer_name', 'email', 'phone', 'street_address', 'city', 'state', 'pin_code', 'payment_method', 'subtotal', 'discount_amount', 'shipping_fee', 'total_amount', 'created_at')
    search_fields = ('order_id', 'customer_name', 'phone', 'email')
    list_filter = ('payment_method', 'created_at')
    inlines = [OrderItemInline]

    def has_add_permission(self, request):
        return False  # Prevent creating orders from admin interface directly

@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'alt', 'src')
    search_fields = ('alt', 'src')

@admin.register(CategoryItem)
class CategoryItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'bg', 'categoryRef')
    search_fields = ('name', 'categoryRef')

@admin.register(MarketingBanner)
class MarketingBannerAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'bg', 'categoryRef')
    search_fields = ('title', 'categoryRef')

