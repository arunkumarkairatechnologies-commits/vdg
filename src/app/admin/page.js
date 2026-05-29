'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

// --- MAIN ADMIN ROUTER COMPONENT ---
export default function AdminRoute() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Load login state from session
  useEffect(() => {
    const sessionAuth = sessionStorage.getItem('vdg_admin_authenticated');
    if (sessionAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        sessionStorage.setItem('vdg_admin_authenticated', 'true');
        setIsLoggedIn(true);
      } else {
        setError('Invalid username or password credentials.');
      }
      setLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('vdg_admin_authenticated');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-[#0a0c10] text-[#e8eaf0] flex items-center justify-center p-4 relative font-sans admin-portal-font-boost">
        {/* Dynamic abstract glowing radial backdrops */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-rose-600/10 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[420px] bg-[#10141c]/80 border border-[#2a3145] backdrop-blur-md rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
          
          {/* Logo Header */}
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4f7fff] to-purple-500 flex items-center justify-center shadow-lg shadow-[#4f7fff]/20">
              <i className="ti ti-shopping-cart text-white text-2xl animate-pulse"></i>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white pt-2 font-sans">VDG Hub Portal</h2>
            <p className="text-xs text-[#8892a8] font-normal">Merchant Secure System Administration Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Error Message */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-start gap-2 text-rose-400 text-xs animate-shake">
                <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8892a8]">Username</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a637a]" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full px-10 py-3 bg-[#1e2535] border border-[#2a3145] rounded-xl text-sm font-normal text-white placeholder-[#5a637a] focus:outline-none focus:border-[#4f7fff] focus:ring-2 focus:ring-[#4f7fff]/10 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#8892a8]">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#5a637a]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-10 py-3 bg-[#1e2535] border border-[#2a3145] rounded-xl text-sm font-normal text-white placeholder-[#5a637a] focus:outline-none focus:border-[#4f7fff] focus:ring-2 focus:ring-[#4f7fff]/10 transition-all"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-sm font-black uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#4f7fff]/10 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
              ) : (
                'SECURE LOG IN'
              )}
            </button>

          </form>

          {/* Footer Warning */}
          <p className="text-[10px] text-center text-[#5a637a] leading-normal font-normal">
            * Authorized operator personnel only. Heartbeats and session keys are audited automatically.
          </p>

        </div>
      </div>
    );
  }

  // If logged in, render the main Dynamic Dashboard Panel!
  return <DashboardPortal onLogout={handleLogout} />;
}

// --- DYNAMIC CMS DASHBOARD COMPONENT ---
function DashboardPortal({ onLogout }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('light');
  const [toasts, setToasts] = useState([]);

  const handlePageChange = (page) => {
    setActivePage(page);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  const [liveOrdersCount, setLiveOrdersCount] = useState(1248);
  const [liveRevenue, setLiveRevenue] = useState(2485000);

  const [activeCouponTab, setActiveCouponTab] = useState('coupons');
  const [activeBannerTab, setActiveBannerTab] = useState('homepage');
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');

  const [settingsToggles, setSettingsToggles] = useState({
    reviews: true,
    wishlist: true,
    livechat: false,
    loyaltypoints: true,
    emailnotifications: true,
  });

  // Dynamic state populated by real backend Django REST API
  const [products, setProducts] = useState([
    { id: '1', emoji: '👕', name: 'Premium Cotton T-Shirt', sku: 'PROD-001', category: 'Apparel', price: 1299, stock: 85, status: 'active', lastRestocked: 'May 10, 2026' }
  ]);

  const [orders, setOrders] = useState([
    { id: 'ORD-7842', customerName: 'Sarah Wilson', avatarGradient: 'from-accent to-cyan', itemsCount: 3, amount: 24500, paymentStatus: 'delivered', orderStatus: 'delivered', date: 'May 28, 2026' }
  ]);

  const [customers, setCustomers] = useState([
    { id: 'C-01', name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+91 98765 43210', ordersCount: 12, totalSpent: 45000, segment: 'Elite', avatarColor: 'from-accent to-cyan' }
  ]);

  const [categories, setCategories] = useState([
    { emoji: '👕', name: 'Apparel', productsCount: 245, subcategoriesCount: 12 }
  ]);

  const [coupons, setCoupons] = useState([
    { code: 'SAVE20', description: '20% off on all orders', expiry: 'Jun 30, 2026', used: 1245, max: 2000, type: 'coupons' }
  ]);

  const [banners, setBanners] = useState([
    { key: 'hero', color: 'from-accent to-purple', emoji: '🎉', title: 'Summer Sale Banner', slot: 'Hero Section', type: 'homepage' }
  ]);

  const [bannerToggles, setBannerToggles] = useState({
    hero: true,
    mid: false,
    footer: true,
    popup: true,
  });

  const [transactions, setTransactions] = useState([
    { id: 'TXN-8921', amount: 24500, method: 'Razorpay (UPI)', status: 'delivered' }
  ]);

  const [staffAccounts, setStaffAccounts] = useState([
    { name: 'John Doe', email: 'john@email.com', role: 'Super Admin', lastActive: 'Just now', status: 'active' }
  ]);

  const [reviews, setReviews] = useState([
    { id: 'REV-01', customerName: 'Rajesh Kumar', avatarGradient: 'from-accent to-purple', productName: 'Premium Cotton T-Shirt', rating: 5, comment: 'Exceptional fit and superb fabric quality!', date: 'May 28, 2026', status: 'approved' }
  ]);

  const [supportTickets, setSupportTickets] = useState([
    { id: 'TKT-104', customerName: 'Vikram Singh', avatarGradient: 'from-accent to-cyan', subject: 'Refund status', time: '10 min ago', status: 'active', messages: [] }
  ]);

  const [activeTicketId, setActiveTicketId] = useState('TKT-104');

  const [carriers, setCarriers] = useState([
    { name: 'Delhivery Surface', successRate: 98.4, activeShipments: 142, baseRate: 45, status: 'active', icon: 'ti ti-truck' }
  ]);

  const [systemLogs, setSystemLogs] = useState([
    { id: 'LOG-001', timestamp: '16:10:02', type: 'info', source: 'CRON', message: 'Catalog stock synchronization check finished' }
  ]);

  // --- DYNAMIC DATA SYNC AND API FETCHER SYSTEM ---
  const fetchProducts = useCallback(() => {
    fetch('http://127.0.0.1:8000/api/products/')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && data.length > 0) {
          const mappedProducts = data.map((p) => ({
            id: String(p.id),
            emoji: p.category_name === 'Shoes' ? '👟' : p.category_name === 'School Bags' ? '🎒' : p.category_name === 'Toys' ? '🧸' : '👕',
            name: p.name,
            sku: `PROD-00${p.id}`,
            category: p.category_name || 'Apparel',
            categoryId: p.category,
            parentCategory: p.parent_category,
            price: Number(p.price),
            originalPrice: Number(p.original_price),
            discount: p.discount,
            tagType: p.tag_type,
            stock: p.stock !== undefined ? p.stock : 50,
            status: Number(p.stock) === 0 ? 'outofstock' : Number(p.stock) < 15 ? 'lowstock' : 'active',
            lastRestocked: 'Just now',
            description: p.description,
            image: p.image,
            colorHex: p.color_hex,
            cartBtnColor: p.cart_btn_color
          }));
          setProducts(mappedProducts);
        }
      })
      .catch(() => {});
  }, []);

  const fetchOrders = useCallback(() => {
    fetch('http://127.0.0.1:8000/api/orders/')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && data.length > 0) {
          const mappedOrders = data.map((o, idx) => ({
            id: o.order_id || `ORD-${7842 - idx}`,
            customerName: o.customer_name,
            avatarGradient: ['from-accent to-cyan', 'from-purple to-pink', 'from-warning to-orange-500', 'from-success to-cyan'][idx % 4],
            itemsCount: o.items ? o.items.length : 2,
            amount: Number(o.total_amount),
            paymentStatus: o.payment_method === 'cod' ? 'pending' : 'delivered',
            orderStatus: o.payment_method === 'cod' ? 'pending' : 'delivered',
            date: new Date(o.created_at || Date.now()).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
          }));
          setOrders(mappedOrders);
        }
      })
      .catch(() => {});
  }, []);

  const fetchCategories = useCallback(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && data.length > 0) {
          const mappedCategories = data.map((c) => ({
            id: c.id,
            emoji: c.name === 'Shoes' ? '👟' : c.name === 'School Bags' ? '🎒' : c.name === 'Toys' ? '🧸' : '👕',
            name: c.name,
            productsCount: 12 + c.id * 4,
            subcategoriesCount: 3,
            parentCategory: c.parent_category
          }));
          setCategories(mappedCategories);
        }
      })
      .catch(() => {});
  }, []);

  const fetchBanners = useCallback(() => {
    fetch('http://127.0.0.1:8000/api/hero-banners/')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (data && data.length > 0) {
          const mappedBanners = data.map((b) => ({
            id: b.id,
            key: `hero-${b.id}`,
            color: 'from-accent to-purple',
            emoji: '🎉',
            title: b.alt,
            slot: 'Hero Section',
            type: 'homepage',
            src: b.src,
            alt: b.alt
          }));
          setBanners(mappedBanners);
        }
      })
      .catch(() => {});
  }, []);

  // Modal and form states
  const [modalType, setModalType] = useState(null); // 'product' | 'category' | 'banner'
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedItem, setSelectedItem] = useState(null);

  const [productForm, setProductForm] = useState({
    name: '', category: '', parent_category: '', price: '', original_price: '',
    discount: '', tag_type: 'new', description: '', image: '/products/tshirt_green.png',
    color_hex: '#e6fcf5', cart_btn_color: 'bg-teal-500 hover:bg-teal-600', stock: 50
  });

  const [categoryForm, setCategoryForm] = useState({
    name: '', parent_category: ''
  });

  const [bannerForm, setBannerForm] = useState({
    alt: '', src: ''
  });

  // Modal open helpers
  const handleOpenProductModal = (mode, item = null) => {
    setModalType('product');
    setModalMode(mode);
    setSelectedItem(item);
    if (mode === 'edit' && item) {
      setProductForm({
        name: item.name || '',
        category: item.categoryId || '',
        parent_category: item.parentCategory || '',
        price: item.price || '',
        original_price: item.originalPrice || '',
        discount: item.discount || '',
        tag_type: item.tagType || 'new',
        description: item.description || '',
        image: item.image || '',
        color_hex: item.colorHex || '',
        cart_btn_color: item.cartBtnColor || '',
        stock: item.stock !== undefined ? item.stock : 50
      });
    } else {
      setProductForm({
        name: '', category: categories[0]?.id || '', parent_category: 'New Born (0–3 Months)',
        price: '', original_price: '', discount: '', tag_type: 'new',
        description: '', image: '/products/tshirt_green.png', color_hex: '#e6fcf5',
        cart_btn_color: 'bg-teal-500 hover:bg-teal-600', stock: 50
      });
    }
  };

  const handleOpenCategoryModal = (mode, item = null) => {
    setModalType('category');
    setModalMode(mode);
    setSelectedItem(item);
    if (mode === 'edit' && item) {
      setCategoryForm({
        name: item.name || '',
        parent_category: item.parentCategory || ''
      });
    } else {
      setCategoryForm({ name: '', parent_category: '' });
    }
  };

  const handleOpenBannerModal = (mode, item = null) => {
    setModalType('banner');
    setModalMode(mode);
    setSelectedItem(item);
    if (mode === 'edit' && item) {
      setBannerForm({
        alt: item.alt || '',
        src: item.src || ''
      });
    } else {
      setBannerForm({ alt: '', src: '/banner/banner1.png' });
    }
  };

  // CRUD API Handlers
  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const url = modalMode === 'edit'
      ? `http://127.0.0.1:8000/api/products/${selectedItem.id}/`
      : 'http://127.0.0.1:8000/api/products/';
    const method = modalMode === 'edit' ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productForm.name,
          category: parseInt(productForm.category) || null,
          parent_category: productForm.parent_category,
          price: parseFloat(productForm.price),
          original_price: parseFloat(productForm.original_price || productForm.price),
          discount: productForm.discount,
          tag_type: productForm.tag_type,
          description: productForm.description,
          image: productForm.image,
          color_hex: productForm.color_hex,
          cart_btn_color: productForm.cart_btn_color,
          stock: parseInt(productForm.stock)
        })
      });
      if (res.ok) {
        showToast(modalMode === 'edit' ? 'Product updated successfully' : 'Product created successfully', 'success');
        setModalType(null);
        fetchProducts();
      } else {
        const errors = await res.json();
        showToast('Error: ' + JSON.stringify(errors), 'warning');
      }
    } catch (err) {
      showToast('Network error saving product', 'warning');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast('Product deleted successfully', 'success');
        fetchProducts();
      } else {
        showToast('Failed to delete product', 'warning');
      }
    } catch (err) {
      showToast('Network error deleting product', 'warning');
    }
  };

  const handleRestockProduct = async (id) => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/products/${id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: 100 })
      });
      if (res.ok) {
        showToast('Product stock refilled to 100 units', 'success');
        fetchProducts();
      } else {
        showToast('Failed to restock product', 'warning');
      }
    } catch (err) {
      showToast('Network error during restock', 'warning');
    }
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    const url = modalMode === 'edit'
      ? `http://127.0.0.1:8000/api/categories/${selectedItem.id}/`
      : 'http://127.0.0.1:8000/api/categories/';
    const method = modalMode === 'edit' ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: categoryForm.name,
          parent_category: categoryForm.parent_category
        })
      });
      if (res.ok) {
        showToast(modalMode === 'edit' ? 'Category updated successfully' : 'Category created successfully', 'success');
        setModalType(null);
        fetchCategories();
      } else {
        const errors = await res.json();
        showToast('Error: ' + JSON.stringify(errors), 'warning');
      }
    } catch (err) {
      showToast('Network error saving category', 'warning');
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/categories/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast('Category deleted successfully', 'success');
        fetchCategories();
      } else {
        showToast('Failed to delete category', 'warning');
      }
    } catch (err) {
      showToast('Network error deleting category', 'warning');
    }
  };

  const handleSaveBanner = async (e) => {
    e.preventDefault();
    const url = modalMode === 'edit'
      ? `http://127.0.0.1:8000/api/hero-banners/${selectedItem.id}/`
      : 'http://127.0.0.1:8000/api/hero-banners/';
    const method = modalMode === 'edit' ? 'PATCH' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          alt: bannerForm.alt,
          src: bannerForm.src
        })
      });
      if (res.ok) {
        showToast(modalMode === 'edit' ? 'Banner updated successfully' : 'Banner created successfully', 'success');
        setModalType(null);
        fetchBanners();
      } else {
        const errors = await res.json();
        showToast('Error: ' + JSON.stringify(errors), 'warning');
      }
    } catch (err) {
      showToast('Network error saving banner', 'warning');
    }
  };

  const handleDeleteBanner = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/hero-banners/${id}/`, {
        method: 'DELETE'
      });
      if (res.ok) {
        showToast('Banner deleted successfully', 'success');
        fetchBanners();
      } else {
        showToast('Failed to delete banner', 'warning');
      }
    } catch (err) {
      showToast('Network error deleting banner', 'warning');
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchCategories();
    fetchBanners();
  }, [fetchProducts, fetchOrders, fetchCategories, fetchBanners]);

  // --- BACKGROUND REAL-TIME SIMULATION ENGINE ---
  useEffect(() => {
    const simulator = setInterval(() => {
      const chance = Math.random();

      if (chance < 0.35) {
        // Trigger a fresh Order!
        const randomNames = ['Deepak Verma', 'Kavita Rao', 'Arjun Mehta', 'Sneha Paul', 'Rohan Sharma'];
        const chosenName = randomNames[Math.floor(Math.random() * randomNames.length)];
        const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
        const randomAmount = Math.floor(800 + Math.random() * 8000);
        
        // Pick a random product to deduct stock from
        setProducts((prevProducts) => {
          if (prevProducts.length === 0) return prevProducts;
          const idx = Math.floor(Math.random() * prevProducts.length);
          return prevProducts.map((p, i) => {
            if (i === idx) {
              const newStock = Math.max(0, p.stock - 1);
              return { ...p, stock: newStock, status: newStock === 0 ? 'outofstock' : newStock < 15 ? 'lowstock' : p.status };
            }
            return p;
          });
        });

        // Add to orders list
        const newOrder = {
          id: orderId,
          customerName: chosenName,
          avatarGradient: ['from-accent to-purple', 'from-success to-cyan', 'from-warning to-orange-500', 'from-pink to-purple'][Math.floor(Math.random() * 4)],
          itemsCount: Math.floor(1 + Math.random() * 4),
          amount: randomAmount,
          paymentStatus: 'pending',
          orderStatus: 'pending',
          date: 'Just now',
        };

        setOrders((prev) => [newOrder, ...prev]);
        setLiveRevenue((prev) => prev + randomAmount);
        setLiveOrdersCount((prev) => prev + 1);

        // Show Toast
        showToast(`New Live Order Placed! ${orderId} by ${chosenName} for ${formatCurrency(randomAmount)}`, 'success');

        // Append log entry
        const timeStr = new Date().toLocaleTimeString();
        setSystemLogs((prev) => [
          { id: `LOG-${Date.now().toString().slice(-4)}`, timestamp: timeStr, type: 'success', source: 'CHECKOUT', message: `Order ${orderId} initialized successfully by client` },
          ...prev,
        ]);
      }
    }, 15000);

    return () => clearInterval(simulator);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sendPrompt = (prompt) => {
    showToast(`Action Triggered: "${prompt}"`, 'success');
  };

  const showToast = (message, type = 'info') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const pages = {
    dashboard: { label: 'Dashboard', breadcrumb: ['Home', 'Dashboard'], group: 'core' },
    orders: { label: 'Orders', breadcrumb: ['Home', 'Orders'], group: 'core' },
    products: { label: 'Products', breadcrumb: ['Home', 'Products'], group: 'core' },
    customers: { label: 'Customers', breadcrumb: ['Home', 'Customers'], group: 'core' },
    categories: { label: 'Categories', breadcrumb: ['Home', 'Categories'], group: 'core' },
    inventory: { label: 'Inventory', breadcrumb: ['Home', 'Inventory'], group: 'core' },
    reviews: { label: 'Reviews & Ratings', breadcrumb: ['Home', 'Core', 'Reviews'], group: 'core' },
    
    coupons: { label: 'Coupons & Offers', breadcrumb: ['Home', 'Marketing', 'Coupons'], group: 'marketing' },
    banners: { label: 'Banners & CMS', breadcrumb: ['Home', 'Marketing', 'Banners'], group: 'marketing' },
    
    payments: { label: 'Payments', breadcrumb: ['Home', 'Finance', 'Payments'], group: 'finance' },
    reports: { label: 'Reports', breadcrumb: ['Home', 'Finance', 'Reports'], group: 'finance' },
    shipping: { label: 'Shipping & Logistics', breadcrumb: ['Home', 'Finance', 'Shipping'], group: 'finance' },
    
    roles: { label: 'Roles & Users', breadcrumb: ['Home', 'System', 'Roles'], group: 'system' },
    settings: { label: 'Settings', breadcrumb: ['Home', 'System', 'Settings'], group: 'system' },
    inbox: { label: 'Support Inbox', breadcrumb: ['Home', 'System', 'Inbox'], group: 'system' },
    audit: { label: 'System logs', breadcrumb: ['Home', 'System', 'Logs'], group: 'system' },
  };

  const lowStockCount = useMemo(() => {
    return products.filter((p) => p.stock < 15).length;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) =>
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [orders, searchQuery]);

  const filteredCustomers = useMemo(() => {
    return customers.filter((c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.segment.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  const filteredReviews = useMemo(() => {
    return reviews.filter((r) =>
      r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [reviews, searchQuery]);

  return (
    <div className={`flex h-screen overflow-hidden font-sans admin-portal-font-boost transition-colors duration-200 ${
      theme === 'dark' ? 'bg-[#0a0c10] text-[#e8eaf0]' : 'bg-[#f8fafc] text-[#0f172a]'
    }`}>
      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[220px] flex-shrink-0 flex flex-col border-r transition-all duration-300 lg:static lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      } ${
        theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
      }`}>
        <div className={`p-4 border-b ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#8b5cf6] to-pink-500 flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20 flex-shrink-0">
              <i className="ti ti-brand-tailwind text-white text-lg"></i>
            </div>
            <span className={`font-black text-base tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Trendify</span>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          <div>
            <div className="space-y-0.5">
              <NavItem theme={theme} icon="ti ti-dashboard" label="Dashboard" active={activePage === 'dashboard'} onClick={() => handlePageChange('dashboard')} />
              <NavItem theme={theme} icon="ti ti-package" label="Products" active={activePage === 'products'} onClick={() => handlePageChange('products')} />
              <NavItem theme={theme} icon="ti ti-category" label="Categories" active={activePage === 'categories'} onClick={() => handlePageChange('categories')} />
              <NavItem theme={theme} icon="ti ti-shopping-bag" label="Orders" badge="14" active={activePage === 'orders'} onClick={() => handlePageChange('orders')} />
              <NavItem theme={theme} icon="ti ti-users" label="Customers" active={activePage === 'customers'} onClick={() => handlePageChange('customers')} />
              <NavItem theme={theme} icon="ti ti-discount-2" label="Coupons" active={activePage === 'coupons'} onClick={() => handlePageChange('coupons')} />
              <NavItem theme={theme} icon="ti ti-star" label="Reviews" active={activePage === 'reviews'} onClick={() => handlePageChange('reviews')} />
              <NavItem theme={theme} icon="ti ti-chart-bar" label="Analytics" active={activePage === 'inventory'} onClick={() => handlePageChange('inventory')} />
              <NavItem theme={theme} icon="ti ti-speakerphone" label="Marketing" active={activePage === 'banners'} onClick={() => handlePageChange('banners')} />
              <NavItem theme={theme} icon="ti ti-cash" label="Withdrawals" active={activePage === 'payments'} onClick={() => handlePageChange('payments')} />
              <NavItem theme={theme} icon="ti ti-settings" label="Settings" active={activePage === 'settings'} onClick={() => handlePageChange('settings')} />
              <NavItem theme={theme} icon="ti ti-user-check" label="Users" active={activePage === 'roles'} onClick={() => handlePageChange('roles')} />
              <NavItem theme={theme} icon="ti ti-file-text" label="Reports" active={activePage === 'reports'} onClick={() => handlePageChange('reports')} />
            </div>
          </div>

          {/* Sidebar Summer Sale Promo Card */}
          <div className="px-1.5 pt-4 pb-2 border-t border-dashed border-[#cbd5e1]/40 dark:border-[#2a3145]/40">
            <div className="relative rounded-2xl overflow-hidden shadow-md group aspect-[3/4] w-full flex flex-col justify-end p-4 bg-gradient-to-br from-[#8b5cf6] to-pink-500">
              <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-1" />
              <img 
                src="/sidebar_promo_banner.png" 
                alt="Summer Sale Banner" 
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500" 
              />
              
              <div className="relative z-10 space-y-1.5">
                <span className="bg-white/95 text-[#8b5cf6] font-black text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full shadow-sm">Promo</span>
                <h4 className="text-white text-xs font-black leading-tight tracking-tight uppercase">Summer SALE<br/><span className="text-yellow-300 font-extrabold">UP TO 50% OFF</span></h4>
                <button className="w-full bg-white hover:bg-white/90 text-[#0f172a] text-[9px] font-black uppercase tracking-wider py-1 rounded shadow transition-all active:scale-98 cursor-pointer">Explore Now</button>
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar Footer profile cockpit */}
        <div className={`p-3 border-t flex items-center justify-between gap-2.5 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors ${
          theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'
        }`} onClick={onLogout}>
          <div className="flex items-center gap-2 min-w-0">
            <AvatarCircle name="Admin User" size="w-8 h-8" gradient="from-[#8b5cf6] to-pink-500" />
            <div className="min-w-0">
              <p className={`font-bold text-xs truncate ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Admin User</p>
              <p className="text-[10px] text-[#8892a8] truncate">admin@trendify.com</p>
            </div>
          </div>
          <i className="ti ti-chevron-right text-xs text-[#8892a8]"></i>
        </div>
      </aside>

      {/* Main Panel content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className={`border-b px-6 py-3 flex items-center justify-between flex-shrink-0 ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-[#cbd5e1] dark:border-[#2a3145] hover:bg-[#161b26] mr-1"
            >
              <i className="ti ti-menu-2 text-base"></i>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold">
              {pages[activePage].breadcrumb.map((crumb, idx) => (
                <span key={idx} className="flex items-center">
                  <span className={idx === pages[activePage].breadcrumb.length - 1 ? 'text-[#8b5cf6] font-bold' : 'text-[#8892a8]'}>
                    {crumb}
                  </span>
                  {idx < pages[activePage].breadcrumb.length - 1 && (
                    <i className="ti ti-chevron-right mx-1.5 text-[9px] text-[#8892a8]"></i>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Search Shortcut Bar */}
          <div className="flex-grow max-w-[360px] mx-4 relative hidden sm:block">
            <i className="ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#8892a8]"></i>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products, orders, customers..."
              className={`w-full rounded-xl pl-9 pr-12 py-2 text-xs focus:outline-none focus:border-[#8b5cf6] border transition-all ${
                theme === 'dark' 
                  ? 'bg-[#1e2535] border-[#2a3145] text-[#e8eaf0]' 
                  : 'bg-[#f8fafc] border-[#cbd5e1] text-[#0f172a]'
              }`}
            />
            <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold px-1.5 py-0.5 rounded border ${
              theme === 'dark' ? 'border-[#2a3145] text-[#5a637a]' : 'border-[#cbd5e1] text-[#94a3b8]'
            }`}>⌘K</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-green-500/15 border border-green-500/20 text-green-500 text-[9px] font-extrabold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-ping"></span> Live Connection
            </span>

            {/* Dark/Light mode toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                theme === 'dark' 
                  ? 'border-[#2a3145] bg-[#1e2535] hover:bg-[#161b26] text-[#8892a8] hover:text-white' 
                  : 'border-[#e2e8f0] bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#64748b] hover:text-[#0f172a]'
              }`}
            >
              <i className={theme === 'dark' ? 'ti ti-sun text-sm' : 'ti ti-moon text-sm'}></i>
            </button>

            {/* Notifications with red Badge */}
            <div className="relative cursor-pointer group">
              <div className={`p-1.5 rounded-lg border transition-all ${
                theme === 'dark' ? 'border-[#2a3145] bg-[#1e2535]' : 'border-[#e2e8f0] bg-[#f1f5f9]'
              }`}>
                <i className="ti ti-bell text-sm text-[#8892a8]"></i>
              </div>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white font-extrabold text-[8px] flex items-center justify-center shadow-md animate-pulse">5</span>
            </div>

            {/* Header User Profile Widget */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#cbd5e1] dark:border-[#e2e8f0]/10">
              <AvatarCircle name="Admin User" size="w-8 h-8" gradient="from-[#8b5cf6] to-pink-500" />
              <div className="hidden md:block text-left min-w-0">
                <p className={`font-bold text-[11px] leading-tight truncate ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Admin User</p>
                <p className="text-[9px] text-[#8892a8]">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-5 relative">
          {activePage === 'dashboard' && (
            <DashboardPage 
              theme={theme} 
              products={products}
              orders={orders}
              liveOrdersCount={liveOrdersCount}
              liveRevenue={liveRevenue}
              formatCurrency={formatCurrency} 
            />
          )}
          {activePage === 'orders' && <OrdersPage theme={theme} orders={filteredOrders} formatCurrency={formatCurrency} />}
          {activePage === 'products' && <ProductsPage theme={theme} products={filteredProducts} formatCurrency={formatCurrency} onAddProduct={handleOpenProductModal} onEditProduct={handleOpenProductModal} onDeleteProduct={handleDeleteProduct} />}
          {activePage === 'customers' && <CustomersPage theme={theme} customers={filteredCustomers} formatCurrency={formatCurrency} />}
          {activePage === 'categories' && <CategoriesPage theme={theme} categories={categories} onAddCategory={handleOpenCategoryModal} onEditCategory={handleOpenCategoryModal} onDeleteCategory={handleDeleteCategory} />}
          {activePage === 'inventory' && <InventoryPage theme={theme} products={filteredProducts} lowStockCount={lowStockCount} onRestock={handleRestockProduct} />}
          {activePage === 'coupons' && <CouponsPage theme={theme} coupons={coupons} activeTab={activeCouponTab} setActiveTab={setActiveCouponTab} />}
          {activePage === 'banners' && <BannersPage theme={theme} banners={banners} activeTab={activeBannerTab} setActiveTab={setActiveBannerTab} toggles={bannerToggles} setToggles={setBannerToggles} onAddBanner={handleOpenBannerModal} onEditBanner={handleOpenBannerModal} onDeleteBanner={handleDeleteBanner} />}
          {activePage === 'payments' && <PaymentsPage theme={theme} transactions={transactions} formatCurrency={formatCurrency} />}
          {activePage === 'reports' && <ReportsPage theme={theme} formatCurrency={formatCurrency} showToast={showToast} />}
          {activePage === 'roles' && <RolesPage theme={theme} staffAccounts={staffAccounts} />}
          {activePage === 'settings' && <SettingsPage theme={theme} activeTab={activeSettingsTab} setActiveTab={setActiveSettingsTab} toggles={settingsToggles} setToggles={setSettingsToggles} showToast={showToast} />}
          
          {activePage === 'reviews' && (
            <ReviewsPage theme={theme} reviews={filteredReviews} setReviews={setReviews} showToast={showToast} />
          )}
          {activePage === 'inbox' && (
            <InboxPage theme={theme} tickets={supportTickets} setTickets={setSupportTickets} activeTicketId={activeTicketId} setActiveTicketId={setActiveTicketId} />
          )}
          {activePage === 'shipping' && (
            <ShippingPage theme={theme} carriers={carriers} setCarriers={setCarriers} showToast={showToast} />
          )}
          {activePage === 'audit' && (
            <AuditLogsPage theme={theme} logs={systemLogs} setLogs={setSystemLogs} />
          )}
        </div>
      </main>

      {/* Floating Modal Overlays */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className={`w-full max-w-md border backdrop-blur-md rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-[#10141c]/95 border-[#2a3145] text-white' : 'bg-white/95 border-[#cbd5e1] text-[#0f172a]'
          }`}>
            <div className="flex items-center justify-between border-b pb-3 border-[#2a3145]/40">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#4f7fff]">
                {modalMode === 'edit' ? 'Edit' : 'Add New'} {modalType}
              </h3>
              <button onClick={() => setModalType(null)} className="text-[#8892a8] hover:text-white transition-colors cursor-pointer">
                <i className="ti ti-x text-lg"></i>
              </button>
            </div>

            {modalType === 'product' && (
              <form onSubmit={handleSaveProduct} className="space-y-3.5 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Category</label>
                    <select
                      value={productForm.category}
                      onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Parent Category</label>
                    <input
                      type="text"
                      required
                      value={productForm.parent_category}
                      onChange={(e) => setProductForm({ ...productForm, parent_category: e.target.value })}
                      placeholder="e.g. New Born (0–3 Months)"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Original Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={productForm.original_price}
                      onChange={(e) => setProductForm({ ...productForm, original_price: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Stock Level</label>
                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Discount Tag</label>
                    <input
                      type="text"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                      placeholder="e.g. -30% or NEW"
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Tag Type</label>
                    <select
                      value={productForm.tag_type}
                      onChange={(e) => setProductForm({ ...productForm, tag_type: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    >
                      <option value="new">New</option>
                      <option value="discount">Discount</option>
                      <option value="bestseller">Bestseller</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Image Asset Path</label>
                  <input
                    type="text"
                    required
                    value={productForm.image}
                    onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Theme Hex</label>
                    <input
                      type="text"
                      required
                      value={productForm.color_hex}
                      onChange={(e) => setProductForm({ ...productForm, color_hex: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#8892a8]">Cart Button Theme</label>
                    <input
                      type="text"
                      value={productForm.cart_btn_color}
                      onChange={(e) => setProductForm({ ...productForm, cart_btn_color: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                        theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Description</label>
                  <textarea
                    rows={2}
                    required
                    value={productForm.description}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>

                <button type="submit" className="w-full py-2.5 bg-[#4f7fff] hover:bg-[#4f7fff]/95 text-white font-extrabold rounded-lg tracking-wider transition-all cursor-pointer">
                  SAVE PRODUCT DETAILS
                </button>
              </form>
            )}

            {modalType === 'category' && (
              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Category Name</label>
                  <input
                    type="text"
                    required
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Parent Category</label>
                  <input
                    type="text"
                    value={categoryForm.parent_category}
                    onChange={(e) => setCategoryForm({ ...categoryForm, parent_category: e.target.value })}
                    placeholder="e.g. New Born (0–3 Months)"
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-[#4f7fff] hover:bg-[#4f7fff]/95 text-white font-extrabold rounded-lg tracking-wider transition-all cursor-pointer">
                  SAVE CATEGORY DETAILS
                </button>
              </form>
            )}

            {modalType === 'banner' && (
              <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Banner Title / Alt text</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.alt}
                    onChange={(e) => setBannerForm({ ...bannerForm, alt: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#8892a8]">Banner Image Path</label>
                  <input
                    type="text"
                    required
                    value={bannerForm.src}
                    onChange={(e) => setBannerForm({ ...bannerForm, src: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#4f7fff] ${
                      theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1]'
                    }`}
                  />
                </div>
                <button type="submit" className="w-full py-2.5 bg-[#4f7fff] hover:bg-[#4f7fff]/95 text-white font-extrabold rounded-lg tracking-wider transition-all cursor-pointer">
                  SAVE BANNER DETAILS
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl animate-slide-in text-xs font-medium max-w-sm ${
              toast.type === 'success' 
                ? 'bg-green-500/10 border-green-500 text-green-500' 
                : toast.type === 'warning'
                ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500'
                : 'bg-[#4f7fff]/10 border-[#4f7fff] text-[#4f7fff]'
            }`}
          >
            <i className={`text-base ${
              toast.type === 'success' 
                ? 'ti ti-circle-check' 
                : toast.type === 'warning'
                ? 'ti ti-alert-triangle'
                : 'ti ti-info-circle'
            }`}></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- CHILD COMPONENTS & RENDERS ---

function NavItem({ theme, icon, label, badge, badgeType = 'primary', active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all group ${
        active 
          ? 'bg-[#4f7fff]/15 text-[#4f7fff] font-semibold' 
          : (theme === 'dark' 
              ? 'text-[#8892a8] hover:bg-[#1e2535] hover:text-[#e8eaf0]' 
              : 'text-[#64748b] hover:bg-[#e2e8f0] hover:text-[#0f172a]')
      }`}
    >
      <i className={`${icon} text-sm group-hover:scale-110 transition-transform`}></i>
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && (
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
          badgeType === 'warning' ? 'bg-yellow-500 text-white' : 'bg-[#4f7fff] text-white'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

function StatusPill({ status }) {
  const statusStyles = {
    pending: { bg: 'bg-yellow-500/10 border-yellow-500/20', text: 'text-yellow-500', label: 'Pending' },
    processing: { bg: 'bg-purple-500/10 border-purple-500/20', text: 'text-purple-500', label: 'Processing' },
    shipped: { bg: 'bg-cyan-500/10 border-cyan-500/20', text: 'text-cyan-500', label: 'Shipped' },
    delivered: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-500', label: 'Delivered' },
    returned: { bg: 'bg-pink-500/10 border-pink-500/20 border', text: 'text-pink-500', label: 'Returned' },
    cancelled: { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-500', label: 'Cancelled' },
    active: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-500', label: 'Active' },
    draft: { bg: 'bg-[#5a637a]/10 border-[#2a3145]/20', text: 'text-[#5a637a]', label: 'Draft' },
    lowstock: { bg: 'bg-yellow-500/10 border-yellow-500/20', text: 'text-yellow-500', label: 'Low Stock' },
    outofstock: { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-500', label: 'Out of Stock' },
    approved: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-500', label: 'Approved' },
    rejected: { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-500', label: 'Rejected' },
    solved: { bg: 'bg-green-500/10 border-green-500/20', text: 'text-green-500', label: 'Solved' },
  };

  const style = statusStyles[status.toLowerCase()] || statusStyles.pending;

  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border tracking-wide uppercase ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

function MetricCard({ theme, label, value, trend, trendUp, icon, color }) {
  return (
    <div className={`rounded-container border p-4 relative overflow-hidden transition-all duration-300 group hover:shadow-lg ${
      theme === 'dark' ? 'bg-[#10141c] border-[#2a3145] hover:border-[#4f7fff]/40' : 'bg-white border-[#e2e8f0] hover:border-[#4f7fff]/40'
    }`}>
      <div className={`absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl ${color} opacity-[0.07] group-hover:opacity-15 rounded-bl-3xl transition-opacity duration-300`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <p className={`text-[10px] font-semibold tracking-wide uppercase ${
            theme === 'dark' ? 'text-[#8892a8]' : 'text-[#64748b]'
          }`}>{label}</p>
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}>
            <i className={`${icon} text-sm`}></i>
          </div>
        </div>
        <p className={`text-lg font-black mb-1 tracking-tight ${theme === 'dark' ? 'text-[#e8eaf0]' : 'text-[#0f172a]'}`}>{value}</p>
        <div className="flex items-center gap-1 text-[10px]">
          <span className={`flex items-center font-bold ${trendUp ? 'text-green-500' : 'text-rose-500'}`}>
            <i className={`ti ti-arrow-${trendUp ? 'up' : 'down'} mr-0.5`}></i>
            {Math.abs(trend)}%
          </span>
          <span className={theme === 'dark' ? 'text-[#8892a8]' : 'text-[#64748b]'}>vs last week</span>
        </div>
      </div>
    </div>
  );
}

function AvatarCircle({ name, size = "w-8 h-8", gradient = "from-[#4f7fff] to-cyan-500" }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
      {initials}
    </div>
  );
}

function StockBar({ stock, max = 100 }) {
  const percent = Math.min((stock / max) * 100, 100);
  let color = 'bg-green-500';
  if (percent < 15) color = 'bg-rose-500';
  else if (percent <= 60) color = 'bg-yellow-500';

  return (
    <div className="w-full">
      <div className="h-1 bg-border/20 rounded-full overflow-hidden w-full">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${
        checked ? 'bg-[#4f7fff]' : 'bg-[#1e2535]'
      }`}
    >
      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform absolute shadow ${
        checked ? 'translate-x-[18px]' : 'translate-x-0.5'
      }`}></div>
    </button>
  );
}

function IconButton({ theme, icon, variant = 'default', onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
        variant === 'danger'
          ? 'bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20'
          : (theme === 'dark' 
              ? 'bg-[#1e2535] hover:bg-[#161b26] border border-[#2a3145] text-[#8892a8] hover:text-[#4f7fff]' 
              : 'bg-[#e2e8f0] hover:bg-[#f1f5f9] border border-[#e2e8f0] text-[#64748b] hover:text-[#4f7fff]')
      }`}
    >
      <i className={`${icon} text-xs`}></i>
    </button>
  );
}

function FilterChips({ theme, chips, activeChip, onSelect }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            activeChip.toLowerCase() === chip.toLowerCase()
              ? 'bg-[#4f7fff] border-[#4f7fff] text-white shadow-md shadow-[#4f7fff]/15'
              : (theme === 'dark' 
                  ? 'bg-[#1e2535] border-[#2a3145] text-[#8892a8] hover:bg-[#161b26] hover:text-[#e8eaf0]' 
                  : 'bg-[#e2e8f0] border-[#e2e8f0] text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]')
          }`}
        >
          {chip.charAt(0).toUpperCase() + chip.slice(1).replace(/([A-Z])/g, ' $1')}
        </button>
      ))}
    </div>
  );
}

function TabBar({ theme, tabs, activeTab, onSelect }) {
  return (
    <div className={`flex gap-0.5 p-1 w-fit rounded-lg border transition-colors ${
      theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
    }`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
            activeTab === tab.id 
              ? (theme === 'dark' ? 'bg-[#161b26] text-[#4f7fff]' : 'bg-[#f1f5f9] text-[#4f7fff]') 
              : (theme === 'dark' ? 'text-[#5a637a] hover:text-[#8892a8]' : 'text-[#94a3b8] hover:text-[#64748b]')
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// 1. Dashboard Page
function DashboardPage({ theme, products, orders, liveOrdersCount, liveRevenue, formatCurrency }) {
  // Mock statistics matching Trendify screenshot
  const stats = [
    { label: "Total Sales", value: "₹2,47,800", trend: "+12.5%", icon: "ti ti-shopping-cart", color: "text-[#8b5cf6] bg-[#8b5cf6]/10", border: "hover:border-[#8b5cf6]/40" },
    { label: "Total Orders", value: "1,248", trend: "+8.3%", icon: "ti ti-package", color: "text-[#ec4899] bg-[#ec4899]/10", border: "hover:border-[#ec4899]/40" },
    { label: "Total Customers", value: "2,856", trend: "+15.2%", icon: "ti ti-users", color: "text-[#3b82f6] bg-[#3b82f6]/10", border: "hover:border-[#3b82f6]/40" },
    { label: "Products", value: String(products.length), trend: "+6.4%", icon: "ti ti-shirt", color: "text-[#f97316] bg-[#f97316]/10", border: "hover:border-[#f97316]/40" },
    { label: "Revenue", value: "₹1,83,400", trend: "+10.1%", icon: "ti ti-cash", color: "text-[#14b8a6] bg-[#14b8a6]/10", border: "hover:border-[#14b8a6]/40" },
    { label: "Coupons Used", value: "128", trend: "+4.7%", icon: "ti ti-discount-2", color: "text-[#a855f7] bg-[#a855f7]/10", border: "hover:border-[#a855f7]/40" }
  ];

  const recentOrdersFeed = [
    { id: "#ORD-1452", date: "May 18, 2026", amount: "₹8,999", status: "delivered", customer: "Sarah Wilson", gradient: "from-[#8b5cf6] to-pink-500" },
    { id: "#ORD-1451", date: "May 18, 2026", amount: "₹12,950", status: "processing", customer: "Vikram Singh", gradient: "from-[#3b82f6] to-cyan-500" },
    { id: "#ORD-1450", date: "May 17, 2026", amount: "₹7,900", status: "pending", customer: "Sneha Paul", gradient: "from-[#f97316] to-yellow-500" },
    { id: "#ORD-1449", date: "May 17, 2026", amount: "₹14,999", status: "delivered", customer: "Arjun Mehta", gradient: "from-[#14b8a6] to-emerald-500" },
    { id: "#ORD-1448", date: "May 16, 2026", amount: "₹5,999", status: "processing", customer: "Kavita Rao", gradient: "from-[#ec4899] to-pink-500" }
  ];

  const topProducts = [
    { name: "Sage Green Organic Jabla", category: "Jablas", sold: 320, revenue: "₹1,11,680", emoji: "👕" },
    { name: "Baby Pink Fleece Romper", category: "Rompers", sold: 280, revenue: "₹2,23,720", emoji: "🧸" },
    { name: "Toddler Premium Soft Wash Jeans", category: "Jeans", sold: 250, revenue: "₹2,99,750", emoji: "👖" },
    { name: "First Steps Soft Sole Trainers", category: "Shoes", sold: 210, revenue: "₹3,14,790", emoji: "👟" },
    { name: "Dinosaur Kids School Backpack", category: "School Bags", sold: 180, revenue: "₹1,79,820", emoji: "🎒" }
  ];

  return (
    <div className="space-y-6">
      {/* 6-Column Stat Highlight Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`rounded-2xl border p-4 transition-all duration-300 group hover:shadow-lg ${
            theme === 'dark' ? 'bg-[#10141c] border-[#2a3145] ' + stat.border : 'bg-white border-[#e2e8f0] ' + stat.border
          }`}>
            <div className="flex items-center justify-between mb-2">
              <p className={`text-[10px] font-bold tracking-wider uppercase ${theme === 'dark' ? 'text-[#8892a8]' : 'text-[#64748b]'}`}>{stat.label}</p>
              <div className={`w-7 h-7 rounded-lg ${stat.color} flex items-center justify-center shadow-sm`}>
                <i className={`${stat.icon} text-sm`}></i>
              </div>
            </div>
            <p className={`text-base font-black tracking-tight mb-1 ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{stat.value}</p>
            <div className="flex items-center gap-1.5 text-[9px] font-bold">
              <span className="text-green-500 flex items-center">
                <i className="ti ti-arrow-up-right mr-0.5"></i> {stat.trend}
              </span>
              <span className={theme === 'dark' ? 'text-[#5a637a]' : 'text-[#94a3b8]'}>vs last week</span>
            </div>
          </div>
        ))}
      </div>

      {/* Row 2: Charts and Recent Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Sales Overview Line Chart */}
        <div className={`lg:col-span-6 rounded-2xl border p-4.5 transition-colors ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Sales Overview</h3>
              <p className="text-[10px] text-[#8892a8]">Welcome back! Here's what's happening with your store today.</p>
            </div>
            <div className="relative">
              <select className={`text-[10px] font-bold py-1.5 px-3 rounded-lg border focus:outline-none cursor-pointer ${
                theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1] text-[#0f172a]'
              }`}>
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
          </div>
          
          <svg viewBox="0 0 500 200" className="w-full h-44 drop-shadow">
            <defs>
              <linearGradient id="purpleAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.00" />
              </linearGradient>
            </defs>
            <line x1="30" y1="30" x2="480" y2="30" stroke={theme === 'dark' ? '#1e2535' : '#f1f5f9'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30" y1="75" x2="480" y2="75" stroke={theme === 'dark' ? '#1e2535' : '#f1f5f9'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30" y1="120" x2="480" y2="120" stroke={theme === 'dark' ? '#1e2535' : '#f1f5f9'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="30" y1="160" x2="480" y2="160" stroke={theme === 'dark' ? '#2a3145' : '#e2e8f0'} strokeWidth="1.5" />
            
            <path d="M 30 160 Q 105 105 180 120 T 330 70 T 480 40 L 480 160 Z" fill="url(#purpleAreaGrad)" />
            <path d="M 30 160 Q 105 105 180 120 T 330 70 T 480 40" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />
            
            <circle cx="105" cy="118" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="255" cy="98" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="405" cy="55" r="4" fill="#ec4899" stroke="#ffffff" strokeWidth="1.5" />
            
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
              <text key={i} x={30 + i * 75} y="180" textAnchor="middle" className="text-[9px] font-bold" fill="#8892a8">{d}</text>
            ))}
            <text x="22" y="34" textAnchor="end" className="text-[8px] font-mono font-bold" fill="#8892a8">₹10K</text>
            <text x="22" y="79" textAnchor="end" className="text-[8px] font-mono font-bold" fill="#8892a8">₹6K</text>
            <text x="22" y="124" textAnchor="end" className="text-[8px] font-mono font-bold" fill="#8892a8">₹2K</text>
            <text x="22" y="164" textAnchor="end" className="text-[8px] font-mono font-bold" fill="#8892a8">0</text>
          </svg>
        </div>

        {/* Sales by Category Donut Chart */}
        <div className={`lg:col-span-3 rounded-2xl border p-4.5 transition-colors ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <h3 className={`text-sm font-extrabold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Sales by Category</h3>
          <div className="flex items-center justify-center mb-5">
            <svg viewBox="0 0 100 100" className="w-28 h-28 drop-shadow-sm">
              <circle cx="50" cy="50" r="38" fill="none" stroke={theme === 'dark' ? '#161b26' : '#f1f5f9'} strokeWidth="9" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#8b5cf6" strokeWidth="9" strokeDasharray="83.5 238.7" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#3b82f6" strokeWidth="9" strokeDasharray="59.6 238.7" strokeDashoffset="-83.5" transform="rotate(-90 50 50)" transform-origin="center" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f97316" strokeWidth="9" strokeDasharray="35.8 238.7" strokeDashoffset="-143.1" transform="rotate(-90 50 50)" transform-origin="center" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#14b8a6" strokeWidth="9" strokeDasharray="35.8 238.7" strokeDashoffset="-178.9" transform="rotate(-90 50 50)" transform-origin="center" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#ec4899" strokeWidth="9" strokeDasharray="24.0 238.7" strokeDashoffset="-214.7" transform="rotate(-90 50 50)" transform-origin="center" />
              <text x="50" y="54" textAnchor="middle" className={`text-[11px] font-black fill-current ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>₹24.7K</text>
            </svg>
          </div>
          <div className="space-y-1.5 text-[10px] font-bold">
            {[
              { color: "bg-[#8b5cf6]", label: "T-Shirts", percentage: "35%", value: "₹8,673" },
              { color: "bg-[#3b82f6]", label: "Hoodies", percentage: "25%", value: "₹6,195" },
              { color: "bg-[#f97316]", label: "Jeans", percentage: "15%", value: "₹3,710" },
              { color: "bg-[#14b8a6]", label: "Shoes", percentage: "15%", value: "₹3,710" },
              { color: "bg-[#ec4899]", label: "Bags", percentage: "10%", value: "₹2,476" }
            ].map((cat, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${cat.color} shrink-0`}></span>
                  <span className="truncate opacity-80">{cat.label}</span>
                </div>
                <span className="opacity-90">{cat.percentage} • {cat.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Vertical Scroll Feed */}
        <div className={`lg:col-span-3 rounded-2xl border p-4.5 transition-colors flex flex-col justify-between ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Recent Orders</h3>
            <span className="text-[10px] text-[#8b5cf6] font-bold hover:underline cursor-pointer">View All</span>
          </div>
          <div className="space-y-3.5 flex-1 overflow-y-auto max-h-[170px] pr-1.5">
            {recentOrdersFeed.map((order, i) => (
              <div key={i} className="flex items-center justify-between gap-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <AvatarCircle name={order.customer} size="w-7.5 h-7.5" gradient={order.gradient} />
                  <div className="min-w-0">
                    <p className={`font-bold text-[11px] truncate ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{order.id}</p>
                    <p className="text-[9px] text-[#8892a8] truncate">{order.date}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-0.5">
                  <p className={`font-black text-xs ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{order.amount}</p>
                  <StatusPill status={order.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Row 3: Bottom Selling Products Table & Customer Growth Daily Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Top Selling Products Table */}
        <div className={`lg:col-span-8 rounded-2xl border p-4.5 transition-colors ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Top Selling Products</h3>
              <p className="text-[10px] text-[#8892a8]">High-volume storefront item configurations</p>
            </div>
            <span className="text-[10px] text-[#8b5cf6] font-bold hover:underline cursor-pointer">View All</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-wider text-[#8892a8] border-b border-[#2a3145]/40 pb-2">
                  <th className="pb-2">Product</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2 text-center">Sold</th>
                  <th className="pb-2">Revenue</th>
                  <th className="pb-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {topProducts.map((prod, i) => (
                  <tr key={i} className="border-b border-[#cbd5e1]/30 dark:border-[#2a3145]/20 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{prod.emoji}</span>
                        <span className={`font-semibold text-xs truncate max-w-[160px] ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{prod.name}</span>
                      </div>
                    </td>
                    <td className="py-2.5 text-[#8892a8] font-medium">{prod.category}</td>
                    <td className="py-2.5 font-mono text-center font-bold">{prod.sold}</td>
                    <td className={`py-2.5 font-extrabold text-[#8b5cf6]`}>{prod.revenue}</td>
                    <td className="py-2.5 text-center"><StatusPill status="active" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Customer Growth Daily Bar Chart */}
        <div className={`lg:col-span-4 rounded-2xl border p-4.5 transition-colors flex flex-col justify-between ${
          theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-extrabold ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>Customer Growth</h3>
              <p className="text-[10px] text-[#8892a8]">Daily registered users trend</p>
            </div>
            <div className="relative">
              <select className={`text-[10px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#cbd5e1] text-[#0f172a]'
              }`}>
                <option>This Month</option>
                <option>This Quarter</option>
              </select>
            </div>
          </div>
          
          <svg viewBox="0 0 300 130" className="w-full h-36">
            <line x1="20" y1="20" x2="280" y2="20" stroke={theme === 'dark' ? '#1e2535' : '#f1f5f9'} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="60" x2="280" y2="60" stroke={theme === 'dark' ? '#1e2535' : '#f1f5f9'} strokeWidth="1" strokeDasharray="3 3" />
            <line x1="20" y1="100" x2="280" y2="100" stroke={theme === 'dark' ? '#2a3145' : '#cbd5e1'} strokeWidth="1.5" />
            
            {/* 12 Vertical Columns representing daily registration growth */}
            {[25, 45, 60, 30, 48, 72, 85, 50, 78, 92, 110, 118].map((val, idx) => (
              <rect
                key={idx}
                x={25 + idx * 20}
                y={100 - val * 0.65}
                width="10"
                height={val * 0.65}
                rx="2"
                fill="url(#barPurpleGrad)"
              />
            ))}
            
            <defs>
              <linearGradient id="barPurpleGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            
            <text x="25" y="112" textAnchor="middle" className="text-[8px] font-bold" fill="#8892a8">May 1</text>
            <text x="145" y="112" textAnchor="middle" className="text-[8px] font-bold" fill="#8892a8">May 9</text>
            <text x="265" y="112" textAnchor="middle" className="text-[8px] font-bold" fill="#8892a8">May 16</text>
            
            <text x="14" y="23" textAnchor="end" className="text-[7px] font-mono" fill="#8892a8">1.5K</text>
            <text x="14" y="63" textAnchor="end" className="text-[7px] font-mono" fill="#8892a8">900</text>
            <text x="14" y="103" textAnchor="end" className="text-[7px] font-mono" fill="#8892a8">0</text>
          </svg>
        </div>

      </div>

      {/* Premium Footer matching screenshot */}
      <footer className="flex items-center justify-between text-[10px] font-semibold text-[#8892a8] pt-4 border-t border-[#cbd5e1]/40 dark:border-[#2a3145]/30">
        <p>© 2026 Trendify Admin. All rights reserved.</p>
        <p>Made with ❤️ by Trendify</p>
      </footer>
    </div>
  );
}

// 2. Orders Page
function OrdersPage({ theme, orders, formatCurrency }) {
  const [activeChip, setActiveChip] = useState('all');
  const filteredOrders = useMemo(() => {
    if (activeChip.toLowerCase() === 'all') return orders;
    return orders.filter((o) => o.orderStatus.toLowerCase() === activeChip.toLowerCase());
  }, [orders, activeChip]);

  return (
    <div className="space-y-6">
      <FilterChips theme={theme} chips={['all', 'pending', 'processing', 'shipped', 'delivered', 'returned', 'cancelled']} activeChip={activeChip} onSelect={setActiveChip} />
      <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 font-bold opacity-50">No matches found.</td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className={`border-b hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                    <td className="px-5 py-3.5 font-mono text-[#4f7fff] font-bold">{o.id}</td>
                    <td className="px-5 py-3.5 font-semibold">{o.customerName}</td>
                    <td className="px-5 py-3.5 font-mono">{o.itemsCount}</td>
                    <td className="px-5 py-3.5 font-bold">{formatCurrency(o.amount)}</td>
                    <td className="px-5 py-3.5"><StatusPill status={o.paymentStatus} /></td>
                    <td className="px-5 py-3.5"><StatusPill status={o.orderStatus} /></td>
                    <td className="px-5 py-3.5 text-[#8892a8]">{o.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 3. Products Page
function ProductsPage({ theme, products, formatCurrency, onAddProduct, onEditProduct, onDeleteProduct }) {
  const [activeChip, setActiveChip] = useState('all');
  const filtered = useMemo(() => {
    if (activeChip === 'all') return products;
    if (activeChip === 'lowstock') return products.filter((p) => p.stock < 15 && p.stock > 0);
    return products.filter((p) => p.status === activeChip || (activeChip === 'outofstock' && p.stock === 0));
  }, [products, activeChip]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <FilterChips theme={theme} chips={['all', 'active', 'draft', 'lowstock', 'outofstock']} activeChip={activeChip} onSelect={setActiveChip} />
        <button onClick={() => onAddProduct('add')} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold shadow-md shadow-[#4f7fff]/15 cursor-pointer">
          <i className="ti ti-plus"></i> Add Product
        </button>
      </div>

      <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Product Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Base Price</th>
                <th className="px-5 py-4 w-44">Stock Level</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map((p) => (
                <tr key={p.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${theme === 'dark' ? 'bg-[#161b26] border border-[#2a3145]' : 'bg-[#f1f5f9] border border-[#e2e8f0]'}`}>
                        {p.emoji}
                      </div>
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-[10px] font-mono text-[#8892a8] uppercase tracking-wider">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[#8892a8] font-medium">{p.category}</td>
                  <td className="px-5 py-3 font-bold text-[#4f7fff]">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-between gap-3 mb-1 font-mono text-[10px] font-bold">
                      <span className={p.stock < 15 ? 'text-rose-500' : 'text-green-500'}>{p.stock} units</span>
                    </div>
                    <StockBar stock={p.stock} />
                  </td>
                  <td className="px-5 py-3"><StatusPill status={p.stock === 0 ? 'outofstock' : p.stock < 15 ? 'lowstock' : p.status} /></td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onEditProduct('edit', p)}
                        className="p-1.5 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Edit Product"
                      >
                        <i className="ti ti-pencil text-sm"></i>
                      </button>
                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete Product"
                      >
                        <i className="ti ti-trash text-sm"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 4. Customers Page
function CustomersPage({ theme, customers, formatCurrency }) {
  return (
    <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Customer Details</th>
              <th className="px-5 py-4">Email Address</th>
              <th className="px-5 py-4 font-mono text-center">Orders</th>
              <th className="px-5 py-4">Total Spent</th>
              <th className="px-5 py-4">Segment</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {customers.map((c) => (
              <tr key={c.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <AvatarCircle name={c.name} size="w-8 h-8" gradient={c.avatarColor} />
                    <span className="font-bold">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[#8892a8] font-medium">{c.email}</td>
                <td className="px-5 py-3 font-mono font-bold text-center">{c.ordersCount}</td>
                <td className="px-5 py-3 font-extrabold text-[#4f7fff]">{formatCurrency(c.totalSpent)}</td>
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase ${
                    c.segment === 'Elite' ? 'bg-green-500/15 text-green-500 border border-green-500/35' : c.segment === 'VIP' ? 'bg-yellow-500/15 text-yellow-500 border border-yellow-500/35' : 'bg-purple-500/15 text-purple-500 border border-purple-500/35'
                  }`}>{c.segment}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 5. Categories Page
function CategoriesPage({ theme, categories, onAddCategory, onEditCategory, onDeleteCategory }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => onAddCategory('add')} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold shadow-md shadow-[#4f7fff]/15 cursor-pointer">
          <i className="ti ti-plus"></i> Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <div key={i} className={`rounded-card border p-4.5 relative overflow-hidden group hover:border-[#4f7fff] hover:shadow-lg transition-all duration-300 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
            {/* Hover Actions Menu */}
            <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => onEditCategory('edit', cat)}
                className="p-1 text-blue-400 hover:text-blue-500 bg-[#1e2535]/85 hover:bg-[#1e2535] border border-[#2a3145] rounded-md transition-all cursor-pointer"
                title="Edit Category"
              >
                <i className="ti ti-pencil text-xs"></i>
              </button>
              <button
                onClick={() => onDeleteCategory(cat.id)}
                className="p-1 text-rose-400 hover:text-rose-500 bg-[#1e2535]/85 hover:bg-[#1e2535] border border-[#2a3145] rounded-md transition-all cursor-pointer"
                title="Delete Category"
              >
                <i className="ti ti-trash text-xs"></i>
              </button>
            </div>

            <div className="text-3xl mb-3 w-fit">{cat.emoji}</div>
            <h3 className={`text-sm font-bold mb-1 group-hover:text-[#4f7fff] transition-colors ${theme === 'dark' ? 'text-white' : 'text-[#0f172a]'}`}>{cat.name}</h3>
            {cat.parentCategory && (
              <p className="text-[10px] text-[#8892a8] mb-2 italic">Parent: {cat.parentCategory}</p>
            )}
            <div className="flex gap-3 text-[10px] font-bold text-[#5a637a] pt-1">
              <span>{cat.productsCount || 0} products</span>
              <span>•</span>
              <span>{cat.subcategoriesCount || 0} sub-categories</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 6. Inventory Page
function InventoryPage({ theme, products, lowStockCount, onRestock }) {
  return (
    <div className="space-y-6">
      {lowStockCount > 0 && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-container p-3.5 flex items-center gap-3 animate-pulse">
          <i className="ti ti-alert-triangle text-yellow-500 text-lg flex-shrink-0"></i>
          <div>
            <p className="text-yellow-500 text-xs font-bold leading-tight">{lowStockCount} products have critically low stock levels!</p>
            <p className="text-[10px] text-yellow-500/80">Trigger carrier supply routes to avoid outages.</p>
          </div>
        </div>
      )}

      <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Item Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Qty Stock</th>
                <th className="px-5 py-4">Last Stocked Date</th>
                <th className="px-5 py-4 text-center">CTAs</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.map((item) => (
                <tr key={item.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                  <td className="px-5 py-3 font-semibold">{item.name}</td>
                  <td className="px-5 py-3 text-[#8892a8] font-medium">{item.category}</td>
                  <td className="px-5 py-3 font-mono font-bold">
                    <span className={item.stock < 15 ? 'text-rose-500' : 'text-green-500'}>{item.stock} units</span>
                  </td>
                  <td className="px-5 py-3 text-[#8892a8]">{item.lastRestocked}</td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => onRestock(item.id)} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 mx-auto transition-all cursor-pointer">
                      <i className="ti ti-plus"></i> Restock
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 7. Coupons Page
function CouponsPage({ theme, coupons, activeTab, setActiveTab }) {
  const filteredCoupons = coupons.filter((c) => c.type === activeTab);
  return (
    <div className="space-y-6">
      <TabBar theme={theme} tabs={[{ id: 'coupons', label: 'Coupons' }, { id: 'flash', label: 'Flash Sales' }, { id: 'bogo', label: 'BOGO Offers' }, { id: 'bundle', label: 'Bundle Deals' }]} activeTab={activeTab} onSelect={setActiveTab} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCoupons.map((coupon, i) => (
          <div key={i} className={`rounded-card border-2 border-dashed p-5 relative overflow-hidden group hover:border-[#4f7fff] transition-all duration-300 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
            <div className="font-mono text-xl font-black text-[#4f7fff] tracking-wider mb-2">{coupon.code}</div>
            <p className="text-xs font-semibold mb-3">{coupon.description}</p>
            <div className="flex items-center justify-between text-[10px] font-bold">
              <span className="text-[#5a637a]">Expires: {coupon.expiry}</span>
              <span className="text-[#4f7fff]">{coupon.used} / {coupon.max} limit</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. Banners Page
function BannersPage({ theme, banners, activeTab, setActiveTab, toggles, setToggles, onAddBanner, onEditBanner, onDeleteBanner }) {
  const filteredBanners = banners.filter((b) => b.type === activeTab);
  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between sm:flex-row flex-col gap-4">
        <TabBar theme={theme} tabs={[{ id: 'homepage', label: 'Home Carousel' }, { id: 'promo', label: 'Promotion Side' }, { id: 'popups', label: 'Exit Intent' }]} activeTab={activeTab} onSelect={setActiveTab} />
        {activeTab === 'homepage' && (
          <button onClick={() => onAddBanner('add')} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold shadow-md shadow-[#4f7fff]/15 cursor-pointer">
            <i className="ti ti-plus"></i> Add Banner
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBanners.map((banner, i) => (
          <div key={i} className={`rounded-container border p-5 flex items-center justify-between transition-colors ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1e2535] flex items-center justify-center text-lg">{banner.emoji}</div>
              <div>
                <h4 className="font-bold text-xs">{banner.title}</h4>
                <p className="text-[10px] text-[#5a637a]">{banner.slot}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {activeTab === 'homepage' && (
                <>
                  <button
                    onClick={() => onEditBanner('edit', banner)}
                    className="p-1 text-blue-500 hover:bg-blue-500/10 rounded-md transition-colors cursor-pointer"
                    title="Edit Banner"
                  >
                    <i className="ti ti-pencil text-xs"></i>
                  </button>
                  <button
                    onClick={() => onDeleteBanner(banner.id)}
                    className="p-1 text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors cursor-pointer"
                    title="Delete Banner"
                  >
                    <i className="ti ti-trash text-xs"></i>
                  </button>
                </>
              )}
              <ToggleSwitch checked={toggles[banner.key] || false} onChange={() => handleToggle(banner.key)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Payments Page
function PaymentsPage({ theme, transactions, formatCurrency }) {
  return (
    <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Transaction ID</th>
              <th className="px-5 py-4">Amount Invoice</th>
              <th className="px-5 py-4">Gateway Source</th>
              <th className="px-5 py-4">State</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {transactions.map((t) => (
              <tr key={t.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                <td className="px-5 py-3 font-mono font-bold text-[#4f7fff]">{t.id}</td>
                <td className="px-5 py-3 font-bold">{formatCurrency(t.amount)}</td>
                <td className="px-5 py-3 text-[#8892a8]">{t.method}</td>
                <td className="px-5 py-3"><StatusPill status={t.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 10. Reports Page
function ReportsPage({ theme, formatCurrency, showToast }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className={`rounded-container border p-5 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
        <h3 className="font-bold text-sm mb-2">Export Sales Spreadsheet</h3>
        <p className="text-xs text-[#8892a8] mb-4">Download comprehensive catalog and transaction streams in Excel format.</p>
        <button onClick={() => showToast('Sales Report export queued successfully.', 'success')} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-4 py-2 rounded-lg font-bold">Download Excel XLS</button>
      </div>
      <div className={`rounded-container border p-5 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
        <h3 className="font-bold text-sm mb-2">Tax Invoice Logs</h3>
        <p className="text-xs text-[#8892a8] mb-4">Export all quarterly merchant invoices for accounting compliance records.</p>
        <button onClick={() => showToast('Tax Invoice Report scheduled.', 'success')} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-4 py-2 rounded-lg font-bold">Export GST Summary</button>
      </div>
    </div>
  );
}

// 11. Roles Page
function RolesPage({ theme, staffAccounts }) {
  return (
    <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Account Member</th>
              <th className="px-5 py-4">Email Address</th>
              <th className="px-5 py-4">System Role</th>
              <th className="px-5 py-4">Heartbeat Active</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {staffAccounts.map((s, idx) => (
              <tr key={idx} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                <td className="px-5 py-3 font-semibold">{s.name}</td>
                <td className="px-5 py-3 text-[#8892a8]">{s.email}</td>
                <td className="px-5 py-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-[#4f7fff] text-[10px] font-bold">{s.role}</span></td>
                <td className="px-5 py-3 text-[#8892a8]">{s.lastActive}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 12. Settings Page
function SettingsPage({ theme, activeTab, setActiveTab, toggles, setToggles, showToast }) {
  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast('Dashboard setting configuration saved.', 'success');
  };

  return (
    <div className="space-y-6">
      <TabBar theme={theme} tabs={[{ id: 'general', label: 'General Portal' }, { id: 'modules', label: 'Modules Configuration' }]} activeTab={activeTab} onSelect={setActiveTab} />
      {activeTab === 'general' ? (
        <div className={`rounded-container border p-5 space-y-4 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
          <h3 className="font-bold text-sm">General Merchant Portal Settings</h3>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a8]">Merchant Shop Title</label>
            <input type="text" defaultValue="VDG Boutique Fashion" className={`w-full max-w-sm rounded-lg px-3 py-2 text-xs focus:outline-none border ${theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#e2e8f0]'}`} />
          </div>
        </div>
      ) : (
        <div className={`rounded-container border p-5 space-y-4 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
          <h3 className="font-bold text-sm">Modular Configuration Heartbeats</h3>
          {Object.keys(toggles).map((key) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-[#2a3145]/40 max-w-md">
              <span className="text-xs font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')} Module</span>
              <ToggleSwitch checked={toggles[key]} onChange={() => handleToggle(key)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 13. Reviews Page
function ReviewsPage({ theme, reviews, setReviews, showToast }) {
  const handleApproval = (id, status) => {
    setReviews((prev) => prev.map((r) => r.id === id ? { ...r, status } : r));
    showToast(`Review is now marked as ${status}!`, 'success');
  };

  return (
    <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Customer Details</th>
              <th className="px-5 py-4">Product Name</th>
              <th className="px-5 py-4">Review Content</th>
              <th className="px-5 py-4 text-center">Rating</th>
              <th className="px-5 py-4">State</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {reviews.map((r) => (
              <tr key={r.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                <td className="px-5 py-3 font-semibold">{r.customerName}</td>
                <td className="px-5 py-3 text-[#8892a8] font-medium">{r.productName}</td>
                <td className="px-5 py-3 max-w-xs truncate">{r.comment}</td>
                <td className="px-5 py-3 text-center font-bold text-yellow-500">{"★".repeat(r.rating)}</td>
                <td className="px-5 py-3"><StatusPill status={r.status} /></td>
                <td className="px-5 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <IconButton theme={theme} icon="ti ti-check" onClick={() => handleApproval(r.id, 'approved')} />
                    <IconButton theme={theme} icon="ti ti-x" variant="danger" onClick={() => handleApproval(r.id, 'rejected')} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// 14. Inbox Page
function InboxPage({ theme, tickets, setTickets, activeTicketId, setActiveTicketId }) {
  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];
  const [replyText, setReplyText] = useState('');

  const sendReply = () => {
    if (!replyText.trim()) return;
    setTickets((prev) =>
      prev.map((t) =>
        t.id === activeTicket.id
          ? {
              ...t,
              messages: [
                ...t.messages,
                { sender: 'agent', text: replyText, time: 'Just now' }
              ]
            }
          : t
      )
    );
    setReplyText('');
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-5 rounded-container border overflow-hidden min-h-[480px] ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className={`border-r p-4 space-y-3 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
        <h4 className="font-bold text-xs pb-2 border-b border-[#2a3145]">Active Support Tickets</h4>
        <div className="space-y-1">
          {tickets.map((t) => (
            <div key={t.id} onClick={() => setActiveTicketId(t.id)} className={`p-2.5 rounded-lg cursor-pointer transition-all ${t.id === activeTicketId ? (theme === 'dark' ? 'bg-[#1e2535]' : 'bg-[#e2e8f0]') : ''}`}>
              <p className="font-bold text-[11px] truncate">{t.subject}</p>
              <p className="text-[10px] text-[#5a637a] mt-0.5">{t.customerName} • {t.time}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:col-span-2 flex flex-col justify-between h-full p-4 space-y-4">
        {activeTicket ? (
          <>
            <div className="space-y-1.5 border-b border-[#2a3145] pb-3">
              <h3 className="font-bold text-xs">{activeTicket.subject}</h3>
              <p className="text-[10px] text-[#5a637a]">Customer: {activeTicket.customerName}</p>
            </div>
            <div className="flex-1 overflow-y-auto space-y-3 max-h-[260px] pr-1">
              {activeTicket.messages.map((m, idx) => (
                <div key={idx} className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${m.sender === 'agent' ? 'ml-auto bg-[#4f7fff] text-white rounded-tr-none' : 'bg-[#1e2535] text-[#e8eaf0] rounded-tl-none'}`}>
                  <p>{m.text}</p>
                  <span className="block text-[8px] text-right mt-1 opacity-70">{m.time}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type customer response message..." className={`flex-1 rounded-xl px-4 py-2.5 text-xs focus:outline-none border ${theme === 'dark' ? 'bg-[#1e2535] border-[#2a3145] text-white' : 'bg-white border-[#e2e8f0]'}`} />
              <button onClick={sendReply} className="bg-[#4f7fff] hover:bg-[#4f7fff]/90 text-white text-xs px-4 py-2.5 rounded-xl font-bold">Send</button>
            </div>
          </>
        ) : (
          <div className="text-center py-20 opacity-50 font-bold">No active support chat.</div>
        )}
      </div>
    </div>
  );
}

// 15. Shipping Page
function ShippingPage({ theme, carriers, setCarriers, showToast }) {
  const handleToggleCarrier = (name) => {
    setCarriers((prev) =>
      prev.map((c) => (c.name === name ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
    );
    showToast('Logistics carrier configuration saved successfully.', 'success');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {carriers.map((c, i) => (
        <div key={i} className={`rounded-container border p-5 flex flex-col justify-between gap-3 ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1e2535] flex items-center justify-center text-[#4f7fff]"><i className={c.icon}></i></div>
            <div>
              <h4 className="font-bold text-xs">{c.name}</h4>
              <p className="text-[10px] text-[#5a637a]">Active Shipments: {c.activeShipments}</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold pt-2 border-t border-[#2a3145]/40">
            <span>Success Rate: {c.successRate}%</span>
            <span>Base rate: ₹{c.baseRate}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${c.status === 'active' ? 'bg-green-500/10 text-green-500' : 'bg-rose-500/10 text-rose-500'}`}>{c.status}</span>
            <ToggleSwitch checked={c.status === 'active'} onChange={() => handleToggleCarrier(c.name)} />
          </div>
        </div>
      ))}
    </div>
  );
}

// 16. Audit Logs Page
function AuditLogsPage({ theme, logs }) {
  return (
    <div className={`rounded-container border overflow-hidden ${theme === 'dark' ? 'bg-[#10141c] border-[#2a3145]' : 'bg-white border-[#e2e8f0]'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-[#161b26] border-[#2a3145] text-[#5a637a]' : 'bg-[#f1f5f9] border-[#e2e8f0] text-[#94a3b8]'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Timestamp</th>
              <th className="px-5 py-4">Module/Source</th>
              <th className="px-5 py-4">Stream/Activity Message</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {logs.map((log) => (
              <tr key={log.id} className={`border-t hover:bg-[#161b26]/40 ${theme === 'dark' ? 'border-[#2a3145]' : 'border-[#e2e8f0]'}`}>
                <td className="px-5 py-3 font-mono text-[#5a637a]">{log.timestamp}</td>
                <td className="px-5 py-3"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-[#4f7fff] text-[10px] font-bold uppercase tracking-wider">{log.source}</span></td>
                <td className="px-5 py-3 text-[#8892a8] font-medium">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
