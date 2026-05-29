from rest_framework import serializers
from .models import Category, Product, ProductColor, ProductSize, ProductFeature, ProductDetail, Order, OrderItem, HeroBanner, CategoryItem, MarketingBanner

class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ['name', 'hex']

class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['size']

class ProductFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFeature
        fields = ['feature_text']

class ProductDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductDetail
        fields = ['title', 'content']

class ProductSerializer(serializers.ModelSerializer):
    colors = ProductColorSerializer(many=True, read_only=True)
    sizes = serializers.SerializerMethodField()
    features = serializers.SerializerMethodField()
    details = ProductDetailSerializer(many=True, read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'parent_category', 
            'price', 'original_price', 'discount', 'tag_type', 
            'rating', 'reviews_count', 'is_new', 'description', 
            'image', 'thumbnails', 'color_hex', 'cart_btn_color', 'stock',
            'colors', 'sizes', 'features', 'details'
        ]

    def get_sizes(self, obj):
        return [size_obj.size for size_obj in obj.sizes.all()]

    def get_features(self, obj):
        return [feat_obj.feature_text for feat_obj in obj.features.all()]

    @property
    def thumbnails(self):
        return [self.image]

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['price'] = float(instance.price)
        data['original_price'] = float(instance.original_price)
        data['thumbnails'] = [instance.image]
        return data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'parent_category']


class OrderItemCreateSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(default=1)
    selected_color = serializers.CharField(required=False, allow_blank=True, allow_null=True)
    selected_size = serializers.CharField(required=False, allow_blank=True, allow_null=True)


class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True, write_only=True)

    class Meta:
        model = Order
        fields = [
            'order_id', 'customer_name', 'email', 'phone', 
            'street_address', 'city', 'state', 'pin_code', 
            'payment_method', 'subtotal', 'discount_amount', 
            'shipping_fee', 'total_amount', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = Order.objects.create(**validated_data)
        
        for item in items_data:
            try:
                product = Product.objects.get(id=item['product_id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    product_name=product.name,
                    quantity=item['quantity'],
                    selected_color=item.get('selected_color'),
                    selected_size=item.get('selected_size'),
                    price=product.price
                )
            except Product.DoesNotExist:
                OrderItem.objects.create(
                    order=order,
                    product_name=f"Unknown Product (ID: {item['product_id']})",
                    quantity=item['quantity'],
                    selected_color=item.get('selected_color'),
                    selected_size=item.get('selected_size'),
                    price=0.00
                )
        return order


class HeroBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroBanner
        fields = ['id', 'src', 'alt']


class CategoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryItem
        fields = ['id', 'name', 'bg', 'img', 'categoryRef']


class MarketingBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingBanner
        fields = ['id', 'title', 'description', 'bg', 'img', 'buttonText', 'categoryRef']
