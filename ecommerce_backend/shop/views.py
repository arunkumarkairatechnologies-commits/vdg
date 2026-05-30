from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Category, Product, Order, HeroBanner, CategoryItem, MarketingBanner
from .serializers import (
    CategorySerializer, ProductSerializer, OrderCreateSerializer, 
    HeroBannerSerializer, CategoryItemSerializer, MarketingBannerSerializer
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True).order_by('order', 'name')
    serializer_class = CategorySerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True).prefetch_related('colors', 'sizes', 'features', 'details').order_by('-created_at')
    serializer_class = ProductSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('-created_at')
    serializer_class = OrderCreateSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            order = serializer.save()
            return Response({
                "success": True,
                "order_id": order.order_id,
                "message": "Order placed successfully!"
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HeroBannerViewSet(viewsets.ModelViewSet):
    queryset = HeroBanner.objects.filter(is_active=True).order_by('order')
    serializer_class = HeroBannerSerializer


class CategoryItemViewSet(viewsets.ModelViewSet):
    queryset = CategoryItem.objects.filter(is_active=True).order_by('order')
    serializer_class = CategoryItemSerializer


class MarketingBannerViewSet(viewsets.ModelViewSet):
    queryset = MarketingBanner.objects.filter(is_active=True).order_by('order')
    serializer_class = MarketingBannerSerializer
