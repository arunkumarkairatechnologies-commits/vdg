'use client';

import { useState, useEffect, useMemo, useRef } from 'react';

type Page = 
  | 'dashboard' 
  | 'orders' 
  | 'products' 
  | 'customers' 
  | 'categories' 
  | 'inventory' 
  | 'coupons' 
  | 'banners' 
  | 'payments' 
  | 'reports' 
  | 'roles' 
  | 'settings'
  | 'reviews'
  | 'inbox'
  | 'shipping'
  | 'audit';

// --- Types & Interfaces ---
interface Toast {
  id: number;
  message: string;
  type: 'info' | 'success' | 'warning';
}

interface Product {
  id: string;
  emoji: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'lowstock' | 'outofstock';
  lastRestocked: string;
}

interface Order {
  id: string;
  customerName: string;
  avatarGradient: string;
  itemsCount: number;
  amount: number;
  paymentStatus: 'delivered' | 'pending' | 'shipped' | 'returned' | 'cancelled' | 'processing';
  orderStatus: 'delivered' | 'pending' | 'shipped' | 'returned' | 'cancelled' | 'processing';
  date: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  segment: 'New' | 'Regular' | 'VIP' | 'Elite';
  avatarColor: string;
}

interface Category {
  emoji: string;
  name: string;
  productsCount: number;
  subcategoriesCount: number;
}

interface Coupon {
  code: string;
  description: string;
  expiry: string;
  used: number;
  max: number;
  type: 'coupons' | 'flash' | 'bogo' | 'bundle';
}

interface CMSBanner {
  key: string;
  color: string;
  emoji: string;
  title: string;
  slot: string;
  type: 'homepage' | 'promo' | 'cms' | 'popups';
}

interface Transaction {
  id: string;
  amount: number;
  method: string;
  status: 'delivered' | 'returned' | 'pending';
}

interface StaffAccount {
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: 'active' | 'draft';
}

interface ProductReview {
  id: string;
  customerName: string;
  avatarGradient: string;
  productName: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
}

interface SupportTicket {
  id: string;
  customerName: string;
  avatarGradient: string;
  subject: string;
  time: string;
  status: 'active' | 'solved';
  messages: { sender: 'customer' | 'agent'; text: string; time: string }[];
}

interface AuditLog {
  id: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'error';
  source: string;
  message: string;
}

interface Carrier {
  name: string;
  successRate: number;
  activeShipments: number;
  baseRate: number;
  status: 'active' | 'inactive';
  icon: string;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const handlePageChange = (page: Page) => {
    setActivePage(page);
    setSearchQuery('');
    setMobileMenuOpen(false);
  };

  // Simulation Metrics
  const [liveOrdersCount, setLiveOrdersCount] = useState(1248);
  const [liveRevenue, setLiveRevenue] = useState(2485000);

  // Page specific tabs states
  const [activeCouponTab, setActiveCouponTab] = useState('coupons');
  const [activeBannerTab, setActiveBannerTab] = useState('homepage');
  const [activeSettingsTab, setActiveSettingsTab] = useState('general');

  // Feature settings toggles
  const [settingsToggles, setSettingsToggles] = useState<{ [key: string]: boolean }>({
    reviews: true,
    wishlist: true,
    livechat: false,
    loyaltypoints: true,
    emailnotifications: true,
  });

  // Dynamic store data
  const [products, setProducts] = useState<Product[]>([
    { id: '1', emoji: '👕', name: 'Premium Cotton T-Shirt', sku: 'PROD-001', category: 'Apparel', price: 1299, stock: 85, status: 'active', lastRestocked: 'May 10, 2026' },
    { id: '2', emoji: '👖', name: 'Slim Fit Jeans', sku: 'PROD-002', category: 'Apparel', price: 2999, stock: 12, status: 'lowstock', lastRestocked: 'Apr 15, 2026' },
    { id: '3', emoji: '👟', name: 'Running Shoes', sku: 'PROD-003', category: 'Footwear', price: 4999, stock: 0, status: 'outofstock', lastRestocked: 'Mar 22, 2026' },
    { id: '4', emoji: '🎧', name: 'Wireless Headphones', sku: 'PROD-004', category: 'Electronics', price: 7999, stock: 45, status: 'active', lastRestocked: 'May 02, 2026' },
    { id: '5', emoji: '⌚', name: 'Smart Watch', sku: 'PROD-005', category: 'Electronics', price: 14999, stock: 20, status: 'active', lastRestocked: 'Apr 28, 2026' },
    { id: '6', emoji: '🧥', name: 'Leather Jacket', sku: 'PROD-006', category: 'Apparel', price: 8999, stock: 8, status: 'lowstock', lastRestocked: 'Apr 02, 2026' },
    { id: '7', emoji: '🖱️', name: 'Wireless Mouse', sku: 'PROD-007', category: 'Electronics', price: 1499, stock: 5, status: 'lowstock', lastRestocked: 'May 12, 2026' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-7842', customerName: 'Sarah Wilson', avatarGradient: 'from-accent to-cyan', itemsCount: 3, amount: 24500, paymentStatus: 'delivered', orderStatus: 'delivered', date: 'May 28, 2026' },
    { id: 'ORD-7841', customerName: 'Mike Johnson', avatarGradient: 'from-purple to-pink', itemsCount: 1, amount: 12999, paymentStatus: 'shipped', orderStatus: 'shipped', date: 'May 27, 2026' },
    { id: 'ORD-7840', customerName: 'Emily Davis', avatarGradient: 'from-warning to-orange-500', itemsCount: 5, amount: 54200, paymentStatus: 'pending', orderStatus: 'pending', date: 'May 26, 2026' },
    { id: 'ORD-7839', customerName: 'Chris Brown', avatarGradient: 'from-success to-cyan', itemsCount: 2, amount: 8750, paymentStatus: 'delivered', orderStatus: 'delivered', date: 'May 25, 2026' },
    { id: 'ORD-7838', customerName: 'Jessica Lee', avatarGradient: 'from-pink to-purple', itemsCount: 4, amount: 32000, paymentStatus: 'returned', orderStatus: 'returned', date: 'May 24, 2026' },
    { id: 'ORD-7837', customerName: 'David Miller', avatarGradient: 'from-accent to-purple', itemsCount: 2, amount: 18500, paymentStatus: 'cancelled', orderStatus: 'cancelled', date: 'May 23, 2026' },
    { id: 'ORD-7836', customerName: 'Anna Taylor', avatarGradient: 'from-success to-cyan', itemsCount: 3, amount: 22000, paymentStatus: 'processing', orderStatus: 'processing', date: 'May 22, 2026' },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'C-01', name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+91 98765 43210', ordersCount: 12, totalSpent: 45000, segment: 'Elite', avatarColor: 'from-accent to-cyan' },
    { id: 'C-02', name: 'Mike Johnson', email: 'mike@email.com', phone: '+91 98765 43211', ordersCount: 8, totalSpent: 28000, segment: 'VIP', avatarColor: 'from-purple to-pink' },
    { id: 'C-03', name: 'Emily Davis', email: 'emily@email.com', phone: '+91 98765 43212', ordersCount: 3, totalSpent: 8500, segment: 'Regular', avatarColor: 'from-warning to-orange-500' },
    { id: 'C-04', name: 'Chris Brown', email: 'chris@email.com', phone: '+91 98765 43213', ordersCount: 1, totalSpent: 2999, segment: 'New', avatarColor: 'from-success to-cyan' },
    { id: 'C-05', name: 'Jessica Lee', email: 'jessica@email.com', phone: '+91 98765 43214', ordersCount: 15, totalSpent: 62000, segment: 'Elite', avatarColor: 'from-pink to-purple' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { emoji: '👕', name: 'Apparel', productsCount: 245, subcategoriesCount: 12 },
    { emoji: '👟', name: 'Footwear', productsCount: 85, subcategoriesCount: 8 },
    { emoji: '🎧', name: 'Electronics', productsCount: 156, subcategoriesCount: 15 },
    { emoji: '🏠', name: 'Home & Living', productsCount: 312, subcategoriesCount: 24 },
    { emoji: '💄', name: 'Beauty', productsCount: 178, subcategoriesCount: 18 },
    { emoji: '🎮', name: 'Gaming', productsCount: 67, subcategoriesCount: 7 },
    { emoji: '📚', name: 'Books', productsCount: 423, subcategoriesCount: 32 },
    { emoji: '🎁', name: 'Gifts', productsCount: 134, subcategoriesCount: 11 },
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: 'SAVE20', description: '20% off on all orders', expiry: 'Jun 30, 2026', used: 1245, max: 2000, type: 'coupons' },
    { code: 'FIRST50', description: '50% off for first 100 customers', expiry: 'May 31, 2026', used: 87, max: 100, type: 'coupons' },
    { code: 'FREESHIP', description: 'Free shipping on orders above ₹999', expiry: 'Dec 31, 2026', used: 3421, max: 5000, type: 'coupons' },
    { code: 'FLASH50', description: 'Limited time 50% discount slider offer', expiry: 'May 30, 2026', used: 45, max: 50, type: 'flash' },
    { code: 'BOGOPREMIUM', description: 'Buy 1 Get 1 Free on Select Shoes', expiry: 'Jul 15, 2026', used: 112, max: 200, type: 'bogo' },
    { code: 'TECHBUNDLE', description: 'Save ₹2000 on Headphones + Watch bundle', expiry: 'Aug 20, 2026', used: 68, max: 150, type: 'bundle' },
  ]);

  const [banners, setBanners] = useState<CMSBanner[]>([
    { key: 'hero', color: 'from-accent to-purple', emoji: '🎉', title: 'Summer Sale Banner', slot: 'Hero Section', type: 'homepage' },
    { key: 'mid', color: 'from-warning to-orange-500', emoji: '🔥', title: 'Flash Deals', slot: 'Mid Section', type: 'promo' },
    { key: 'footer', color: 'from-success to-cyan', emoji: '🛍️', title: 'New Arrivals', slot: 'Footer Banner', type: 'homepage' },
    { key: 'popup', color: 'from-pink to-purple', emoji: '💬', title: 'Newsletter Pop-up', slot: 'Exit Intent Popup', type: 'popups' },
  ]);

  const [bannerToggles, setBannerToggles] = useState<{ [key: string]: boolean }>({
    hero: true,
    mid: false,
    footer: true,
    popup: true,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 'TXN-8921', amount: 24500, method: 'Razorpay (UPI)', status: 'delivered' },
    { id: 'TXN-8920', amount: 12999, method: 'Razorpay (Card)', status: 'delivered' },
    { id: 'TXN-8919', amount: 54200, method: 'PhonePe (Net)', status: 'returned' },
    { id: 'TXN-8918', amount: 8750, method: 'PhonePe (UPI)', status: 'delivered' },
  ]);

  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([
    { name: 'John Doe', email: 'john@email.com', role: 'Super Admin', lastActive: 'Just now', status: 'active' },
    { name: 'Sarah Wilson', email: 'sarah@email.com', role: 'Store Manager', lastActive: '5 min ago', status: 'active' },
    { name: 'Mike Johnson', email: 'mike@email.com', role: 'Warehouse Staff', lastActive: '1 hour ago', status: 'active' },
    { name: 'Emily Davis', email: 'emily@email.com', role: 'Support Agent', lastActive: 'Yesterday', status: 'active' },
  ]);

  // --- NEW 4 PAGES EXTRA STATE DATA ---
  const [reviews, setReviews] = useState<ProductReview[]>([
    { id: 'REV-01', customerName: 'Rajesh Kumar', avatarGradient: 'from-accent to-purple', productName: 'Premium Cotton T-Shirt', rating: 5, comment: 'Exceptional fit and superb fabric quality! Highly recommended.', date: 'May 28, 2026', status: 'approved' },
    { id: 'REV-02', customerName: 'Priya Sharma', avatarGradient: 'from-pink to-purple', productName: 'Smart Watch', rating: 4, comment: 'Battery life is brilliant. Syncing took a bit of time but works great now.', date: 'May 27, 2026', status: 'approved' },
    { id: 'REV-03', customerName: 'Amit Patel', avatarGradient: 'from-success to-cyan', productName: 'Wireless Headphones', rating: 2, comment: 'Sound is good but the fit is a bit too tight for long hours.', date: 'May 26, 2026', status: 'pending' },
    { id: 'REV-04', customerName: 'Neha Gupta', avatarGradient: 'from-warning to-orange-500', productName: 'Slim Fit Jeans', rating: 5, comment: 'Perfect ankle fit, stretching fabric makes it super comfortable.', date: 'May 25, 2026', status: 'pending' },
  ]);

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-104',
      customerName: 'Vikram Singh',
      avatarGradient: 'from-accent to-cyan',
      subject: 'Refund status for Cancelled Order ORD-7837',
      time: '10 min ago',
      status: 'active',
      messages: [
        { sender: 'customer', text: 'Hi, I cancelled my order ORD-7837 yesterday but have not received my UPI refund yet.', time: '10 min ago' },
        { sender: 'agent', text: 'Hello Vikram, checking this with the payment gateway gateway stack. One moment.', time: '8 min ago' },
      ],
    },
    {
      id: 'TKT-103',
      customerName: 'Ananya Roy',
      avatarGradient: 'from-purple to-pink',
      subject: 'Incorrect Size delivered for Jeans SKU PROD-002',
      time: '2 hours ago',
      status: 'active',
      messages: [
        { sender: 'customer', text: 'I ordered size 32 but received size 30 instead. Can we arrange a size swap dispatch?', time: '2 hours ago' },
      ],
    },
  ]);

  const [activeTicketId, setActiveTicketId] = useState<string>('TKT-104');

  const [carriers, setCarriers] = useState<Carrier[]>([
    { name: 'Delhivery Surface', successRate: 98.4, activeShipments: 142, baseRate: 45, status: 'active', icon: 'ti ti-truck' },
    { name: 'BlueDart Express', successRate: 99.1, activeShipments: 84, baseRate: 85, status: 'active', icon: 'ti ti-plane-departure' },
    { name: 'DHL Express Global', successRate: 99.5, activeShipments: 23, baseRate: 350, status: 'inactive', icon: 'ti ti-world' },
  ]);

  const [systemLogs, setSystemLogs] = useState<AuditLog[]>([
    { id: 'LOG-001', timestamp: '16:10:02', type: 'info', source: 'CRON', message: 'Catalog stock synchronization check finished' },
    { id: 'LOG-002', timestamp: '16:11:15', type: 'success', source: 'SYSTEM', message: 'Stripe API Gateway connected securely' },
    { id: 'LOG-003', timestamp: '16:12:44', type: 'warning', source: 'INVENTORY', message: 'Item PROD-002 SKU jeans stock fell below min threshold (12/20)' },
    { id: 'LOG-004', timestamp: '16:15:30', type: 'info', source: 'AUTH', message: 'Staff Sarah Wilson logged into manager panel portal' },
  ]);

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Apply theme class to body
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light');
    } else {
      document.body.classList.remove('light');
    }
  }, [theme]);

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
        const newOrder: Order = {
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
      } else if (chance < 0.6) {
        // Trigger a warning log entry (low-stock or security heartbeat)
        const timeStr = new Date().toLocaleTimeString();
        const sources: ('INVENTORY' | 'SYSTEM' | 'AUTH' | 'GATEWAY')[] = ['INVENTORY', 'SYSTEM', 'AUTH', 'GATEWAY'];
        const chosenSrc = sources[Math.floor(Math.random() * sources.length)];
        let message = 'Heartbeat ping received from main database engine';
        let type: 'info' | 'warning' | 'error' = 'info';

        if (chosenSrc === 'INVENTORY') {
          message = 'Background stock reconciliation daemon triggered';
        } else if (chosenSrc === 'AUTH') {
          message = 'API request validated from warehouse scanner console';
        } else if (chosenSrc === 'GATEWAY') {
          message = 'Razorpay server latency spike detected: 140ms';
          type = 'warning';
        }

        setSystemLogs((prev) => [
          { id: `LOG-${Date.now().toString().slice(-4)}`, timestamp: timeStr, type, source: chosenSrc, message },
          ...prev,
        ]);
      }
    }, 15000); // Trigger every 15 seconds

    return () => clearInterval(simulator);
  }, []);

  // Helper formats
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const sendPrompt = (prompt: string) => {
    console.log('Prompt sent:', prompt);
    showToast(`Action Triggered: "${prompt}"`, 'success');
  };

  const showToast = (message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newToast = { id: Date.now(), message, type };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  // Nav categories definition
  const pages: { [key in Page]: { label: string; breadcrumb: string[]; group: 'core' | 'marketing' | 'finance' | 'system' } } = {
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

  // --- Dynamic Search Filters ---
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
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      theme === 'dark' ? 'bg-base text-text-primary' : 'bg-base-light text-text-primary-light'
    }`}>
      {/* Mobile menu backdrop overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)} 
          className="fixed inset-0 z-40 bg-black/60 lg:hidden backdrop-blur-xs transition-opacity duration-300"
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-[220px] flex-shrink-0 flex flex-col border-r transition-all duration-300 ease-in-out lg:static lg:translate-x-0 ${
        mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      } ${
        theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
      }`}>
        {/* Logo */}
        <div className={`p-4 border-b transition-colors duration-200 ${
          theme === 'dark' ? 'border-border' : 'border-border-light'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-purple flex items-center justify-center shadow-lg shadow-accent/20 flex-shrink-0">
              <i className="ti ti-shopping-cart text-white text-lg animate-pulse"></i>
            </div>
            <span className={`font-bold text-base tracking-tight transition-colors duration-200 ${
              theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
            }`}>VDG Hub Pro</span>
          </div>
        </div>

        {/* Sidebar Scrollable Nav */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {/* Core */}
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 px-2.5 transition-colors duration-200 ${
              theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
            }`}>Core</p>
            <div className="space-y-0.5">
              <NavItem theme={theme} icon="ti ti-dashboard" label="Dashboard" active={activePage === 'dashboard'} onClick={() => handlePageChange('dashboard')} />
              <NavItem theme={theme} icon="ti ti-shopping-bag" label="Orders" badge="14" active={activePage === 'orders'} onClick={() => handlePageChange('orders')} />
              <NavItem theme={theme} icon="ti ti-package" label="Products" active={activePage === 'products'} onClick={() => handlePageChange('products')} />
              <NavItem theme={theme} icon="ti ti-users" label="Customers" active={activePage === 'customers'} onClick={() => handlePageChange('customers')} />
              <NavItem theme={theme} icon="ti ti-category" label="Categories" active={activePage === 'categories'} onClick={() => handlePageChange('categories')} />
              <NavItem theme={theme} icon="ti ti-warehouse" label="Inventory" badge={lowStockCount > 0 ? String(lowStockCount) : undefined} badgeType="warning" active={activePage === 'inventory'} onClick={() => handlePageChange('inventory')} />
              <NavItem theme={theme} icon="ti ti-star" label="Reviews & Stars" active={activePage === 'reviews'} onClick={() => handlePageChange('reviews')} />
            </div>
          </div>

          {/* Marketing */}
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 px-2.5 transition-colors duration-200 ${
              theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
            }`}>Marketing</p>
            <div className="space-y-0.5">
              <NavItem theme={theme} icon="ti ti-discount" label="Coupons & Offers" active={activePage === 'coupons'} onClick={() => handlePageChange('coupons')} />
              <NavItem theme={theme} icon="ti ti-ad-2" label="Banners & CMS" active={activePage === 'banners'} onClick={() => handlePageChange('banners')} />
            </div>
          </div>

          {/* Finance */}
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 px-2.5 transition-colors duration-200 ${
              theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
            }`}>Finance & logistics</p>
            <div className="space-y-0.5">
              <NavItem theme={theme} icon="ti ti-credit-card" label="Payments" active={activePage === 'payments'} onClick={() => handlePageChange('payments')} />
              <NavItem theme={theme} icon="ti ti-chart-bar" label="Reports" active={activePage === 'reports'} onClick={() => handlePageChange('reports')} />
              <NavItem theme={theme} icon="ti ti-truck-delivery" label="Carriers & Shipments" active={activePage === 'shipping'} onClick={() => handlePageChange('shipping')} />
            </div>
          </div>

          {/* System */}
          <div>
            <p className={`text-[9px] font-bold uppercase tracking-widest mb-1.5 px-2.5 transition-colors duration-200 ${
              theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
            }`}>System & Support</p>
            <div className="space-y-0.5">
              <NavItem theme={theme} icon="ti ti-message-chatbot" label="Support Inbox" badge="Active" badgeType="primary" active={activePage === 'inbox'} onClick={() => handlePageChange('inbox')} />
              <NavItem theme={theme} icon="ti ti-shield-lock" label="Roles & Users" active={activePage === 'roles'} onClick={() => handlePageChange('roles')} />
              <NavItem theme={theme} icon="ti ti-terminal" label="Audit system logs" active={activePage === 'audit'} onClick={() => handlePageChange('audit')} />
              <NavItem theme={theme} icon="ti ti-settings" label="Settings" active={activePage === 'settings'} onClick={() => handlePageChange('settings')} />
            </div>
          </div>
        </nav>

        {/* User profile card bottom */}
        <div className={`p-3 border-t transition-colors duration-200 ${
          theme === 'dark' ? 'border-border' : 'border-border-light'
        }`}>
          <div className={`rounded-card p-2 flex items-center gap-3 transition-colors duration-200 ${
            theme === 'dark' ? 'bg-elevated' : 'bg-elevated-light'
          }`}>
            <AvatarCircle name="John Doe" size="w-7 h-7" gradient="from-accent to-cyan" />
            <div className="flex-1 min-w-0">
              <p className={`text-[11px] font-bold truncate transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
              }`}>John Doe</p>
              <p className={`text-[9px] truncate transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
              }`}>Super Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar Header */}
        <header className={`border-b px-6 py-3 flex items-center justify-between flex-shrink-0 transition-colors duration-200 ${
          theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
        }`}>
          {/* Breadcrumb & Menu Toggle Left */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border transition-colors duration-200 border-border dark:border-border text-text-primary dark:text-text-primary hover:bg-elevated mr-1"
              title="Open Navigation Menu"
            >
              <i className="ti ti-menu-2 text-base"></i>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-xs">
              {pages[activePage].breadcrumb.map((crumb, idx) => (
                <span key={idx} className="flex items-center">
                  <span className={`transition-colors duration-200 ${
                    idx === pages[activePage].breadcrumb.length - 1 
                      ? (theme === 'dark' ? 'text-accent font-semibold' : 'text-accent font-semibold') 
                      : (theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light')
                  }`}>
                    {crumb}
                  </span>
                  {idx < pages[activePage].breadcrumb.length - 1 && (
                    <i className={`ti ti-chevron-right mx-1.5 text-[9px] ${
                      theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
                    }`}></i>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Search Bar Center (Max 320px) */}
          <div className="flex-1 max-w-[320px] mx-4">
            <div className="relative">
              <i className={`ti ti-search absolute left-3 top-1/2 -translate-y-1/2 text-xs transition-colors duration-200 ${
                theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
              }`}></i>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Filter current data stream...`}
                className={`w-full rounded-lg pl-9 pr-3.5 py-1.5 text-xs focus:outline-none focus:border-accent transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'bg-input border-border text-text-primary focus:ring-1 focus:ring-accent/30' 
                    : 'bg-input-light border-border-light text-text-primary-light focus:ring-1 focus:ring-accent/30'
                }`}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 hover:text-danger text-xs">
                  <i className="ti ti-x"></i>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons Right */}
          <div className="flex items-center gap-2.5">
            {/* Simulation Status Tag */}
            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-success/15 border border-success/20 text-success text-[9px] font-extrabold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping"></span> Live Connection
            </span>

            {/* Theme Switcher Toggle */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-1.5 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'border-border bg-input hover:bg-elevated hover:text-accent' 
                  : 'border-border-light bg-input-light hover:bg-elevated-light hover:text-accent'
              }`}
              title="Toggle Theme"
            >
              <i className={`${theme === 'dark' ? 'ti ti-sun' : 'ti ti-moon'} text-base`}></i>
            </button>

            {/* Notifications Bell */}
            <button 
              onClick={() => showToast('You are safely synchronized with local nodes.', 'info')}
              className={`relative p-1.5 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'border-border bg-input hover:bg-elevated text-text-primary' 
                  : 'border-border-light bg-input-light hover:bg-elevated-light text-text-primary-light'
              }`}
            >
              <i className="ti ti-bell text-base"></i>
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full ring-2 ring-card"></span>
            </button>

            {/* Refresh Button */}
            <button 
              onClick={() => showToast('Flushed cache maps successfully.', 'success')}
              className={`p-1.5 rounded-lg border transition-colors duration-200 ${
                theme === 'dark' 
                  ? 'border-border bg-input hover:bg-elevated text-text-primary' 
                  : 'border-border-light bg-input-light hover:bg-elevated-light text-text-primary-light'
              }`}
              title="Refresh Stats"
            >
              <i className="ti ti-refresh text-base"></i>
            </button>

            {/* New CTA button */}
            <button 
              onClick={() => sendPrompt('Global checkout flow wizard triggered')}
              className="bg-accent hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20 text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold transition-all duration-200"
            >
              <i className="ti ti-plus text-xs"></i>
              New
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Viewport */}
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
          {activePage === 'products' && <ProductsPage theme={theme} products={filteredProducts} formatCurrency={formatCurrency} sendPrompt={sendPrompt} setProducts={setProducts} />}
          {activePage === 'customers' && <CustomersPage theme={theme} customers={filteredCustomers} formatCurrency={formatCurrency} />}
          {activePage === 'categories' && <CategoriesPage theme={theme} categories={categories} />}
          {activePage === 'inventory' && <InventoryPage theme={theme} products={filteredProducts} lowStockCount={lowStockCount} setProducts={setProducts} showToast={showToast} />}
          {activePage === 'coupons' && <CouponsPage theme={theme} coupons={coupons} activeTab={activeCouponTab} setActiveTab={setActiveCouponTab} />}
          {activePage === 'banners' && <BannersPage theme={theme} banners={banners} activeTab={activeBannerTab} setActiveTab={setActiveBannerTab} toggles={bannerToggles} setToggles={setBannerToggles} />}
          {activePage === 'payments' && <PaymentsPage theme={theme} transactions={transactions} formatCurrency={formatCurrency} />}
          {activePage === 'reports' && <ReportsPage theme={theme} formatCurrency={formatCurrency} showToast={showToast} />}
          {activePage === 'roles' && <RolesPage theme={theme} staffAccounts={staffAccounts} />}
          {activePage === 'settings' && <SettingsPage theme={theme} activeTab={activeSettingsTab} setActiveTab={setActiveSettingsTab} toggles={settingsToggles} setToggles={setSettingsToggles} showToast={showToast} />}
          
          {/* --- NEW 4 PAGES RENDERS --- */}
          {activePage === 'reviews' && (
            <ReviewsPage 
              theme={theme} 
              reviews={filteredReviews} 
              setReviews={setReviews} 
              showToast={showToast} 
            />
          )}
          {activePage === 'inbox' && (
            <InboxPage 
              theme={theme} 
              tickets={supportTickets} 
              setTickets={setSupportTickets} 
              activeTicketId={activeTicketId} 
              setActiveTicketId={setActiveTicketId} 
            />
          )}
          {activePage === 'shipping' && (
            <ShippingPage 
              theme={theme} 
              carriers={carriers} 
              setCarriers={setCarriers} 
              showToast={showToast} 
            />
          )}
          {activePage === 'audit' && (
            <AuditLogsPage 
              theme={theme} 
              logs={systemLogs} 
              setLogs={setSystemLogs} 
            />
          )}
        </div>
      </main>

      {/* Floating Toast Notification System */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl animate-slide-in text-xs font-medium max-w-sm ${
              toast.type === 'success' 
                ? 'bg-success/10 border-success text-success' 
                : toast.type === 'warning'
                ? 'bg-warning/10 border-warning text-warning'
                : 'bg-accent/10 border-accent text-accent'
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

// --- Navigation Item Component ---
function NavItem({ 
  theme, 
  icon, 
  label, 
  badge, 
  badgeType = 'primary',
  active, 
  onClick 
}: { 
  theme: 'dark' | 'light';
  icon: string;
  label: string;
  badge?: string;
  badgeType?: 'primary' | 'warning';
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all duration-200 group ${
        active 
          ? 'bg-accentGlow text-accent font-semibold shadow-inner' 
          : (theme === 'dark' 
              ? 'text-text-secondary hover:bg-input hover:text-text-primary' 
              : 'text-text-secondary-light hover:bg-input-light hover:text-text-primary-light')
      }`}
    >
      <i className={`${icon} text-sm group-hover:scale-110 transition-transform`}></i>
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && (
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
          badgeType === 'warning' 
            ? 'bg-warning text-base dark:text-base' 
            : 'bg-accent text-white'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// --- Shared Reusable UI Components ---

function StatusPill({ status }: { status: string }) {
  const statusStyles: { [key: string]: { bg: string; text: string; label: string } } = {
    pending: { bg: 'bg-warning/10 border-warning/20', text: 'text-warning', label: 'Pending' },
    processing: { bg: 'bg-purple/10 border-purple/20', text: 'text-purple', label: 'Processing' },
    shipped: { bg: 'bg-cyan/10 border-cyan/20', text: 'text-cyan', label: 'Shipped' },
    delivered: { bg: 'bg-success/10 border-success/20', text: 'text-success', label: 'Delivered' },
    returned: { bg: 'bg-pink/10 border-pink/20 border', text: 'text-pink', label: 'Returned' },
    cancelled: { bg: 'bg-danger/10 border-danger/20', text: 'text-danger', label: 'Cancelled' },
    active: { bg: 'bg-success/10 border-success/20', text: 'text-success', label: 'Active' },
    draft: { bg: 'bg-text-muted/10 border-border/20', text: 'text-text-muted', label: 'Draft' },
    lowstock: { bg: 'bg-warning/10 border-warning/20', text: 'text-warning', label: 'Low Stock' },
    outofstock: { bg: 'bg-danger/10 border-danger/20', text: 'text-danger', label: 'Out of Stock' },
    approved: { bg: 'bg-success/10 border-success/20', text: 'text-success', label: 'Approved' },
    rejected: { bg: 'bg-danger/10 border-danger/20', text: 'text-danger', label: 'Rejected' },
    solved: { bg: 'bg-success/10 border-success/20', text: 'text-success', label: 'Solved' },
  };

  const style = statusStyles[status.toLowerCase()] || statusStyles.pending;

  return (
    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border tracking-wide uppercase transition-colors ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}

function MetricCard({ 
  theme, 
  label, 
  value, 
  trend, 
  trendUp, 
  icon, 
  color 
}: { 
  theme: 'dark' | 'light';
  label: string;
  value: string;
  trend: number;
  trendUp: boolean;
  icon: string;
  color: string;
}) {
  return (
    <div className={`rounded-card border p-4 relative overflow-hidden transition-all duration-300 group hover:shadow-lg ${
      theme === 'dark' ? 'bg-card border-border hover:border-accent/40' : 'bg-card-light border-border-light hover:border-accent/40'
    }`}>
      <div className={`absolute top-0 right-0 w-14 h-14 bg-gradient-to-bl ${color} opacity-[0.07] group-hover:opacity-15 rounded-bl-3xl transition-opacity duration-300`}></div>
      <div className="relative">
        <div className="flex items-center justify-between mb-2">
          <p className={`text-[10px] font-semibold tracking-wide uppercase transition-colors duration-200 ${
            theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
          }`}>{label}</p>
          <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-md`}>
            <i className={`${icon} text-sm`}></i>
          </div>
        </div>
        <p className={`text-lg font-black mb-1 transition-colors tracking-tight duration-200 ${
          theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
        }`}>{value}</p>
        <div className="flex items-center gap-1 text-[10px]">
          <span className={`flex items-center font-bold ${trendUp ? 'text-success' : 'text-danger'}`}>
            <i className={`ti ti-arrow-${trendUp ? 'up' : 'down'} mr-0.5`}></i>
            {Math.abs(trend)}%
          </span>
          <span className={`transition-colors duration-200 ${
            theme === 'dark' ? 'text-text-muted' : 'text-text-muted-light'
          }`}>vs last week</span>
        </div>
      </div>
    </div>
  );
}

function AvatarCircle({ name, size = "w-8 h-8", gradient = "from-accent to-cyan" }: { name: string; size?: string; gradient?: string }) {
  const initials = name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-[10px] font-bold shadow-sm`}>
      {initials}
    </div>
  );
}

function StockBar({ stock, max = 100 }: { stock: number; max?: number }) {
  const percent = Math.min((stock / max) * 100, 100);
  let color = 'bg-success';
  if (percent < 15) color = 'bg-danger';
  else if (percent <= 60) color = 'bg-warning';

  return (
    <div className="w-full">
      <div className="h-1 bg-border/20 rounded-full overflow-hidden w-full">
        <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}

function ToggleSwitch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-9 h-5 rounded-full transition-colors relative flex items-center ${
        checked ? 'bg-accent' : 'bg-border dark:bg-input'
      }`}
    >
      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform absolute shadow ${
        checked ? 'translate-x-[18px]' : 'translate-x-0.5'
      }`}></div>
    </button>
  );
}

function IconButton({ 
  theme, 
  icon, 
  variant = 'default',
  onClick 
}: { 
  theme: 'dark' | 'light';
  icon: string;
  variant?: 'default' | 'danger';
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
        variant === 'danger'
          ? 'bg-danger/10 hover:bg-danger text-danger hover:text-white border border-danger/20'
          : (theme === 'dark' 
              ? 'bg-input hover:bg-elevated border border-border text-text-secondary hover:text-accent' 
              : 'bg-input-light hover:bg-elevated-light border border-border-light text-text-secondary-light hover:text-accent')
      }`}
    >
      <i className={`${icon} text-xs`}></i>
    </button>
  );
}

function FilterChips({ 
  theme, 
  chips, 
  activeChip, 
  onSelect 
}: { 
  theme: 'dark' | 'light';
  chips: string[];
  activeChip: string;
  onSelect: (chip: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip) => (
        <button
          key={chip}
          onClick={() => onSelect(chip)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            activeChip.toLowerCase() === chip.toLowerCase()
              ? 'bg-accent border-accent text-white shadow-md shadow-accent/15'
              : (theme === 'dark' 
                  ? 'bg-input border-border text-text-secondary hover:bg-elevated hover:text-text-primary' 
                  : 'bg-input-light border-border-light text-text-secondary-light hover:bg-elevated-light hover:text-text-primary-light')
          }`}
        >
          {chip.charAt(0).toUpperCase() + chip.slice(1).replace(/([A-Z])/g, ' $1')}
        </button>
      ))}
    </div>
  );
}

function TabBar({ 
  theme, 
  tabs, 
  activeTab, 
  onSelect 
}: { 
  theme: 'dark' | 'light';
  tabs: { id: string; label: string }[];
  activeTab: string;
  onSelect: (tabId: string) => void;
}) {
  return (
    <div className={`flex gap-0.5 p-1 w-fit rounded-lg border transition-colors ${
      theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
    }`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onSelect(tab.id)}
          className={`px-3.5 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
            activeTab === tab.id 
              ? (theme === 'dark' ? 'bg-elevated text-accent shadow-sm' : 'bg-elevated-light text-accent shadow-sm') 
              : (theme === 'dark' 
                  ? 'text-text-muted hover:text-text-secondary' 
                  : 'text-text-muted-light hover:text-text-secondary-light')
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// --- 16 PAGE DEFINITIONS ---

// 1. Dashboard Page
function DashboardPage({ 
  theme, 
  products, 
  orders, 
  liveOrdersCount,
  liveRevenue,
  formatCurrency 
}: { 
  theme: 'dark' | 'light';
  products: Product[];
  orders: Order[];
  liveOrdersCount: number;
  liveRevenue: number;
  formatCurrency: (n: number) => string;
}) {
  return (
    <div className="space-y-6">
      {/* 4-column Metrics Grid (Linked to live simulator) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard 
          theme={theme}
          label="Total Revenue"
          value={formatCurrency(liveRevenue)}
          trend={12.5}
          trendUp={true}
          icon="ti ti-cash"
          color="from-accent to-cyan"
        />
        <MetricCard 
          theme={theme}
          label="Total Orders"
          value={String(liveOrdersCount)}
          trend={8.2}
          trendUp={true}
          icon="ti ti-shopping-cart"
          color="from-success to-cyan"
        />
        <MetricCard 
          theme={theme}
          label="Customers"
          value="8,542"
          trend={-2.1}
          trendUp={false}
          icon="ti ti-users"
          color="from-purple to-pink"
        />
        <MetricCard 
          theme={theme}
          label="Products"
          value={String(products.length)}
          trend={5.3}
          trendUp={true}
          icon="ti ti-package"
          color="from-warning to-orange-500"
        />
      </div>

      {/* SVG Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Full-width Area Chart Card (taking 2 columns) */}
        <div className={`col-span-1 lg:col-span-2 rounded-container border p-4.5 transition-colors ${
          theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className={`text-sm font-semibold transition-colors ${
                theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
              }`}>Monthly Sales Trend</h3>
              <p className="text-[10px] text-text-secondary dark:text-text-secondary-light">Store performance overview</p>
            </div>
            <select className={`rounded-lg px-2.5 py-1 text-[11px] focus:outline-none border ${
              theme === 'dark' 
                ? 'bg-input border-border text-text-primary' 
                : 'bg-input-light border-border-light text-text-primary-light'
            }`}>
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>

          <svg viewBox="0 0 600 220" className="w-full h-44 drop-shadow">
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4f7fff" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#4f7fff" stopOpacity="0.00" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="40" y1="30" x2="570" y2="30" stroke={theme === 'dark' ? '#1e2535' : '#e2e8f0'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="80" x2="570" y2="80" stroke={theme === 'dark' ? '#1e2535' : '#e2e8f0'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="130" x2="570" y2="130" stroke={theme === 'dark' ? '#1e2535' : '#e2e8f0'} strokeWidth="1" strokeDasharray="4 4" />
            <line x1="40" y1="180" x2="570" y2="180" stroke={theme === 'dark' ? '#2a3145' : '#cbd5e1'} strokeWidth="1.5" />

            <path d="M 40 180 Q 120 120 200 135 T 360 85 T 480 110 T 570 50 L 570 180 Z" fill="url(#areaGradient)" />
            <path d="M 40 180 Q 120 120 200 135 T 360 85 T 480 110 T 570 50" fill="none" stroke="#4f7fff" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="200" cy="135" r="4.5" fill="#4f7fff" stroke={theme === 'dark' ? '#10141c' : '#ffffff'} strokeWidth="2" />
            <circle cx="360" cy="85" r="4.5" fill="#22d3ee" stroke={theme === 'dark' ? '#10141c' : '#ffffff'} strokeWidth="2" />
            <circle cx="570" cy="50" r="4.5" fill="#22c55e" stroke={theme === 'dark' ? '#10141c' : '#ffffff'} strokeWidth="2" />

            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((m, i) => (
              <text key={i} x={40 + i * 88} y="202" textAnchor="middle" className="text-[10px] font-bold" fill={theme === 'dark' ? '#5a637a' : '#94a3b8'}>
                {m}
              </text>
            ))}

            <text x="30" y="34" textAnchor="end" className="text-[9px] font-mono" fill={theme === 'dark' ? '#5a637a' : '#94a3b8'}>₹8L</text>
            <text x="30" y="84" textAnchor="end" className="text-[9px] font-mono" fill={theme === 'dark' ? '#5a637a' : '#94a3b8'}>₹5L</text>
            <text x="30" y="134" textAnchor="end" className="text-[9px] font-mono" fill={theme === 'dark' ? '#5a637a' : '#94a3b8'}>₹2L</text>
            <text x="30" y="184" textAnchor="end" className="text-[9px] font-mono" fill={theme === 'dark' ? '#5a637a' : '#94a3b8'}>0</text>
          </svg>
        </div>

        {/* Donut Chart Card */}
        <div className={`rounded-container border p-4.5 transition-colors ${
          theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
        }`}>
          <h3 className={`text-sm font-semibold mb-3 transition-colors ${
            theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
          }`}>Order Delivery Split</h3>
          
          <div className="flex items-center justify-center mb-4">
            <svg viewBox="0 0 100 100" className="w-32 h-32 drop-shadow-md">
              <circle cx="50" cy="50" r="38" fill="none" stroke={theme === 'dark' ? '#161b26' : '#f1f5f9'} strokeWidth="9" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#22c55e" strokeWidth="9" strokeDasharray="131.3 238.7" strokeDashoffset="0" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#22d3ee" strokeWidth="9" strokeDasharray="71.6 238.7" strokeDashoffset="-131.3" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f59e0b" strokeWidth="9" strokeDasharray="28.6 238.7" strokeDashoffset="-202.9" transform="rotate(-90 50 50)" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#f472b6" strokeWidth="9" strokeDasharray="7.2 238.7" strokeDashoffset="-231.5" transform="rotate(-90 50 50)" />
              <text x="50" y="54" textAnchor="middle" className="text-[12px] font-extrabold fill-current">1.2K</text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-semibold">
            {[
              { color: 'bg-success', label: 'Delivered', percentage: '55%' },
              { color: 'bg-cyan', label: 'Shipped', percentage: '30%' },
              { color: 'bg-warning', label: 'Pending', percentage: '12%' },
              { color: 'bg-pink', label: 'Returned', percentage: '3%' },
            ].map((status, i) => (
              <div key={i} className={`flex items-center justify-between p-1.5 rounded-lg border ${
                theme === 'dark' ? 'bg-elevated border-border' : 'bg-elevated-light border-border-light'
              }`}>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${status.color} flex-shrink-0`}></span>
                  <span className="truncate">{status.label}</span>
                </div>
                <span className="text-accent">{status.percentage}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders List Table */}
      <div className={`rounded-container border p-4.5 transition-colors ${
        theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-sm font-semibold transition-colors ${
              theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
            }`}>Recent Customer Orders</h3>
            <p className="text-[10px] text-text-secondary dark:text-text-secondary-light">Real-time order submission logs</p>
          </div>
          <span className="text-[9px] bg-accent/10 border border-accent/25 text-accent font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Live Stream
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`text-[10px] font-bold uppercase tracking-wider border-b ${
                theme === 'dark' ? 'text-text-muted border-border' : 'text-text-muted-light border-border-light'
              }`}>
                <th className="pb-3.5">Order ID</th>
                <th className="pb-3.5">Customer Name</th>
                <th className="pb-3.5">Order Summary</th>
                <th className="pb-3.5">Status</th>
                <th className="pb-3.5 text-right">Invoice Amount</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className={`border-b hover:bg-elevated transition-colors ${
                  theme === 'dark' ? 'border-border hover:bg-elevated/40' : 'border-border-light hover:bg-elevated-light/40'
                }`}>
                  <td className="py-3 font-mono text-accent font-bold">{order.id}</td>
                  <td className={`py-3 font-medium transition-colors ${
                    theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
                  }`}>{order.customerName}</td>
                  <td className={`py-3 transition-colors ${
                    theme === 'dark' ? 'text-text-secondary' : 'text-text-secondary-light'
                  }`}>{order.date} • {order.itemsCount} items</td>
                  <td className="py-3">
                    <StatusPill status={order.orderStatus} />
                  </td>
                  <td className={`py-3 text-right font-bold transition-colors ${
                    theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'
                  }`}>{formatCurrency(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// 2. Orders Page
function OrdersPage({ 
  theme, 
  orders, 
  formatCurrency 
}: { 
  theme: 'dark' | 'light';
  orders: Order[];
  formatCurrency: (n: number) => string;
}) {
  const [activeChip, setActiveChip] = useState('all');

  const filteredOrders = useMemo(() => {
    if (activeChip.toLowerCase() === 'all') return orders;
    return orders.filter((o) => o.orderStatus.toLowerCase() === activeChip.toLowerCase());
  }, [orders, activeChip]);

  return (
    <div className="space-y-6">
      <FilterChips 
        theme={theme}
        chips={['all', 'pending', 'processing', 'shipped', 'delivered', 'returned', 'cancelled']}
        activeChip={activeChip}
        onSelect={setActiveChip}
      />

      <div className={`rounded-container border overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${
              theme === 'dark' ? 'bg-elevated border-border text-text-muted' : 'bg-elevated-light border-border-light text-text-muted-light'
            }`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Order ID</th>
                <th className="px-5 py-4">Customer</th>
                <th className="px-5 py-4">Items</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Payment Status</th>
                <th className="px-5 py-4">Order Status</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-10 font-bold opacity-50">No matches found matching selection.</td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className={`border-b hover:bg-elevated transition-colors ${
                    theme === 'dark' ? 'border-border hover:bg-elevated/40' : 'border-border-light hover:bg-elevated-light/40'
                  }`}>
                    <td className="px-5 py-3.5 font-mono text-accent font-bold">{o.id}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <AvatarCircle name={o.customerName} size="w-7 h-7" gradient={o.avatarGradient} />
                        <span className="font-semibold">{o.customerName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono">{o.itemsCount}</td>
                    <td className="px-5 py-3.5 font-bold">{formatCurrency(o.amount)}</td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={o.paymentStatus} />
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill status={o.orderStatus} />
                    </td>
                    <td className="px-5 py-3.5 text-text-muted dark:text-text-muted">{o.date}</td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <IconButton theme={theme} icon="ti ti-eye" />
                        <IconButton theme={theme} icon="ti ti-file-invoice" />
                        <IconButton theme={theme} icon="ti ti-map-pin" />
                      </div>
                    </td>
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
function ProductsPage({ 
  theme, 
  products, 
  formatCurrency,
  sendPrompt,
  setProducts
}: { 
  theme: 'dark' | 'light';
  products: Product[];
  formatCurrency: (n: number) => string;
  sendPrompt: (s: string) => void;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
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
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => sendPrompt('Trigger Bulk Import spreadsheet parser')} className={`border px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 font-semibold transition-all ${theme === 'dark' ? 'border-border text-text-secondary hover:text-accent hover:border-accent' : 'border-border-light text-text-secondary-light hover:text-accent hover:border-accent'}`}>
            <i className="ti ti-upload"></i> Bulk Import
          </button>
          <button onClick={() => sendPrompt('Show custom modal form: "Add Product"')} className="bg-accent hover:bg-accent/90 text-white text-xs px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 font-semibold shadow-md shadow-accent/15 transition-all">
            <i className="ti ti-plus"></i> Add Product
          </button>
        </div>
      </div>

      <div className={`rounded-container border overflow-hidden transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${theme === 'dark' ? 'bg-elevated border-border text-text-muted' : 'bg-elevated-light border-border-light text-text-muted-light'}`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Product Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Base Price</th>
                <th className="px-5 py-4 w-44">Stock Level Status</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {filtered.map((p) => (
                <tr key={p.id} className={`border-t hover:bg-elevated transition-colors ${theme === 'dark' ? 'border-border hover:bg-elevated/40' : 'border-border-light hover:bg-elevated-light/40'}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-colors ${theme === 'dark' ? 'bg-elevated border border-border' : 'bg-elevated-light border border-border-light'}`}>
                        {p.emoji}
                      </div>
                      <div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-[10px] font-mono text-text-muted dark:text-text-muted-light uppercase tracking-wider">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-light font-medium">{p.category}</td>
                  <td className="px-5 py-3 font-bold text-accent">{formatCurrency(p.price)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-between gap-3 mb-1 font-mono text-[10px] font-bold">
                      <span className={p.stock < 15 ? 'text-danger' : p.stock <= 60 ? 'text-warning' : 'text-success'}>{p.stock} units</span>
                      <span className="text-text-muted dark:text-text-muted-light">/ 100</span>
                    </div>
                    <StockBar stock={p.stock} />
                  </td>
                  <td className="px-5 py-3">
                    <StatusPill status={p.stock === 0 ? 'outofstock' : p.stock < 15 ? 'lowstock' : p.status} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <IconButton theme={theme} icon="ti ti-edit" />
                      <IconButton theme={theme} icon="ti ti-copy" />
                      <IconButton theme={theme} icon="ti ti-trash" variant="danger" onClick={() => setProducts((prev) => prev.filter((item) => item.id !== p.id))} />
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
function CustomersPage({ theme, customers, formatCurrency }: { theme: 'dark' | 'light'; customers: Customer[]; formatCurrency: (n: number) => string }) {
  return (
    <div className={`rounded-container border overflow-hidden transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className={`border-b ${theme === 'dark' ? 'bg-elevated border-border text-text-muted' : 'bg-elevated-light border-border-light text-text-muted-light'}`}>
            <tr className="text-[10px] font-bold uppercase tracking-wider">
              <th className="px-5 py-4">Customer Details</th>
              <th className="px-5 py-4">Email Address</th>
              <th className="px-5 py-4 font-mono">Orders Placed</th>
              <th className="px-5 py-4">Total Amount Spent</th>
              <th className="px-5 py-4">Loyalty Segment</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {customers.map((c) => (
              <tr key={c.id} className={`border-t hover:bg-elevated transition-colors ${theme === 'dark' ? 'border-border hover:bg-elevated/40' : 'border-border-light hover:bg-elevated-light/40'}`}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <AvatarCircle name={c.name} size="w-8 h-8" gradient={c.avatarColor} />
                    <span className="font-bold">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-light font-medium">{c.email}</td>
                <td className="px-5 py-3 font-mono font-bold text-center">{c.ordersCount}</td>
                <td className="px-5 py-3 font-extrabold text-accent">{formatCurrency(c.totalSpent)}</td>
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-wide uppercase ${
                    c.segment === 'Elite' ? 'bg-success/15 text-success border border-success/35' : c.segment === 'VIP' ? 'bg-warning/15 text-warning border border-warning/35' : 'bg-purple/15 text-purple border border-purple/35'
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
function CategoriesPage({ theme, categories }: { theme: 'dark' | 'light'; categories: Category[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <div key={i} className={`rounded-card border p-4.5 relative overflow-hidden transition-all duration-300 group hover:border-accent hover:shadow-lg ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300 w-fit">{cat.emoji}</div>
          <h3 className={`text-sm font-bold mb-1 group-hover:text-accent transition-colors ${theme === 'dark' ? 'text-text-primary' : 'text-text-primary-light'}`}>{cat.name}</h3>
          <div className="flex gap-3 mb-4 text-[10px] font-bold text-text-muted dark:text-text-muted-light">
            <span>{cat.productsCount} products</span>
            <span>•</span>
            <span>{cat.subcategoriesCount} sub-categories</span>
          </div>
          <div className="flex gap-2">
            <button className={`flex-1 py-1.5 border rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${theme === 'dark' ? 'border-border bg-input hover:bg-elevated hover:text-accent' : 'border-border-light bg-input-light hover:bg-elevated-light hover:text-accent'}`}><i className="ti ti-edit"></i> Edit</button>
            <button className="flex-1 py-1.5 border border-danger/25 bg-danger/5 hover:bg-danger text-danger hover:text-white rounded-lg text-[10px] font-bold flex items-center justify-center gap-1 transition-all"><i className="ti ti-trash"></i> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

// 6. Inventory Page
function InventoryPage({ 
  theme, 
  products, 
  lowStockCount,
  setProducts,
  showToast
}: { 
  theme: 'dark' | 'light';
  products: Product[];
  lowStockCount: number;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}) {
  const handleRestock = (sku: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.sku === sku ? { ...p, stock: 100, lastRestocked: 'Just now' } : p))
    );
    showToast(`Successfully restocked ${sku} to 100 units`, 'success');
  };

  return (
    <div className="space-y-6">
      {lowStockCount > 0 && (
        <div className="bg-warning/10 border border-warning/30 rounded-container p-3.5 flex items-center gap-3 animate-pulse">
          <i className="ti ti-alert-triangle text-warning text-lg flex-shrink-0"></i>
          <div>
            <p className="text-warning text-xs font-bold leading-tight">{lowStockCount} products have critically low stock levels!</p>
            <p className="text-[10px] text-warning/80">Trigger carrier supply routes to avoid outages.</p>
          </div>
        </div>
      )}

      <div className={`rounded-container border overflow-hidden transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className={`border-b ${theme === 'dark' ? 'bg-elevated border-border text-text-muted' : 'bg-elevated-light border-border-light text-text-muted-light'}`}>
              <tr className="text-[10px] font-bold uppercase tracking-wider">
                <th className="px-5 py-4">Item Details</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Qty Stock</th>
                <th className="px-5 py-4">Last Stocked Date</th>
                <th className="px-5 py-4">State</th>
                <th className="px-5 py-4 text-center">CTAs</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              {products.map((item) => (
                <tr key={item.id} className={`border-t hover:bg-elevated transition-colors ${theme === 'dark' ? 'border-border hover:bg-elevated/40' : 'border-border-light hover:bg-elevated-light/40'}`}>
                  <td className="px-5 py-3 font-semibold">{item.name}</td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-light font-medium">{item.category}</td>
                  <td className="px-5 py-3 font-mono font-bold">
                    <span className={item.stock < 15 ? 'text-danger' : 'text-success'}>{item.stock} units</span>
                  </td>
                  <td className="px-5 py-3 text-text-secondary dark:text-text-secondary-light">{item.lastRestocked}</td>
                  <td className="px-5 py-3">
                    <StatusPill status={item.stock === 0 ? 'outofstock' : item.stock < 15 ? 'lowstock' : 'active'} />
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button onClick={() => handleRestock(item.sku)} className="bg-accent hover:bg-accent/90 text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1.5 mx-auto transition-all">
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

// 7. Coupons & Offers Page
function CouponsPage({ theme, coupons, activeTab, setActiveTab }: { theme: 'dark' | 'light'; coupons: Coupon[]; activeTab: string; setActiveTab: (t: string) => void }) {
  const filteredCoupons = coupons.filter((c) => c.type === activeTab);
  return (
    <div className="space-y-6">
      <TabBar theme={theme} tabs={[{ id: 'coupons', label: 'Coupons' }, { id: 'flash', label: 'Flash Sales' }, { id: 'bogo', label: 'BOGO Offers' }, { id: 'bundle', label: 'Bundle Deals' }]} activeTab={activeTab} onSelect={setActiveTab} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredCoupons.map((coupon, i) => (
          <div key={i} className={`rounded-card border-2 border-dashed p-5 relative overflow-hidden group hover:border-accent transition-all duration-300 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
            <div className="absolute -right-5 -top-5 w-12 h-12 bg-accent/15 rotate-45 group-hover:bg-accent/25 transition-colors"></div>
            <div className="font-mono text-xl font-black text-accent tracking-wider mb-2">{coupon.code}</div>
            <p className="text-xs font-semibold mb-3">{coupon.description}</p>
            <div className="flex items-center justify-between text-[10px] font-bold mb-3">
              <span className="text-text-muted">Expires: {coupon.expiry}</span>
              <span className="text-accent">{coupon.used} / {coupon.max} limit</span>
            </div>
            <div className="h-1 bg-border/20 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-accent rounded-full" style={{ width: `${(coupon.used / coupon.max) * 100}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 8. Banners Page
function BannersPage({ theme, banners, activeTab, setActiveTab, toggles, setToggles }: any) {
  const filteredBanners = banners.filter((b: any) => b.type === activeTab);
  return (
    <div className="space-y-6">
      <TabBar theme={theme} tabs={[{ id: 'homepage', label: 'Homepage Banners' }, { id: 'promo', label: 'Promo Sliders' }, { id: 'cms', label: 'CMS Pages' }, { id: 'popups', label: 'Pop-ups' }]} activeTab={activeTab} onSelect={setActiveTab} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredBanners.map((banner: any, i: number) => (
          <div key={i} className={`rounded-card border p-4.5 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
            <div className={`h-24 rounded-lg bg-gradient-to-br ${banner.color} flex items-center justify-center mb-4 text-3xl relative overflow-hidden`}>
              <span className="relative z-10">{banner.emoji}</span>
              <div className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${toggles[banner.key] ? 'bg-success text-white' : 'bg-input/60'}`}>{toggles[banner.key] ? 'Active' : 'Inactive'}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold">{banner.title}</h4>
                <p className="text-[10px] text-text-secondary dark:text-text-secondary-light font-medium">{banner.slot}</p>
              </div>
              <ToggleSwitch checked={toggles[banner.key] || false} onChange={() => setToggles((prev: any) => ({ ...prev, [banner.key]: !prev[banner.key] }))} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 9. Payments Page
function PaymentsPage({ theme, transactions, formatCurrency }: { theme: 'dark' | 'light'; transactions: Transaction[]; formatCurrency: (n: number) => string }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className={`lg:col-span-2 rounded-container border p-4.5 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <h3 className="text-xs font-bold mb-3 uppercase tracking-wide">Gateway Gateways</h3>
          <div className="space-y-2">
            {[{ name: 'Razorpay', type: 'UPI/Cards', volume: 1245000, active: true }, { name: 'PhonePe', type: 'UPI direct', volume: 685000, active: true }].map((gw, idx) => (
              <div key={idx} className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark' ? 'bg-elevated border-border' : 'bg-elevated-light border-border-light'}`}>
                <div>
                  <p className="text-xs font-bold leading-tight">{gw.name}</p>
                  <p className="text-[9px] text-text-secondary dark:text-text-secondary-light font-medium">{gw.type}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-accent font-mono leading-none mb-1">{formatCurrency(gw.volume)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`lg:col-span-3 rounded-container border p-4.5 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <h3 className="text-xs font-bold mb-3 uppercase tracking-wide">Clearing Logs</h3>
          <div className="space-y-2">
            {transactions.map((txn, idx) => (
              <div key={idx} className={`flex items-center justify-between p-2.5 rounded-lg border ${theme === 'dark' ? 'bg-elevated/40 border-border/60' : 'bg-elevated-light/40 border-border-light/60'}`}>
                <div className="flex items-center gap-2">
                  <div className="font-mono text-xs font-bold text-accent">{txn.id}</div>
                  <span className="text-[10px] text-text-secondary dark:text-text-secondary-light font-semibold">{txn.method}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-black">{formatCurrency(txn.amount)}</span>
                  <StatusPill status={txn.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 10. Reports Page
function ReportsPage({ theme, formatCurrency, showToast }: { theme: 'dark' | 'light'; formatCurrency: (n: number) => string; showToast: (msg: string, type?: 'info' | 'success' | 'warning') => void }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Revenue', value: formatCurrency(2485000), sparkPoints: '0,25 15,20 30,15 45,8 60,10', isUp: true },
          { label: 'Total Orders', value: '1,248', sparkPoints: '0,28 15,25 30,18 45,22 60,15', isUp: true },
        ].map((report, idx) => (
          <div key={idx} className={`rounded-card border p-4 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
            <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-light mb-1">{report.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold tracking-tight mb-1">{report.value}</p>
              <svg viewBox="0 0 60 30" className="w-16 h-8 flex-shrink-0">
                <polyline fill="none" stroke={report.isUp ? '#22c55e' : '#ef4444'} strokeWidth="2.5" points={report.sparkPoints} />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className={`rounded-container border p-5 transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wide">Export Modules</h3>
          <div className="flex gap-1.5">
            <button onClick={() => showToast('Excel sheet export queued.', 'success')} className="border px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1"><i className="ti ti-file-spreadsheet"></i> Excel</button>
            <button onClick={() => showToast('PDF document generated successfully.', 'success')} className="border px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1"><i className="ti ti-file-type-pdf"></i> PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Roles & Users Page
function RolesPage({ theme, staffAccounts }: { theme: 'dark' | 'light'; staffAccounts: StaffAccount[] }) {
  return (
    <div className={`rounded-container border overflow-hidden transition-colors ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
      <h3 className="px-5 py-4 font-bold border-b text-xs">Configured Staff Accounts</h3>
      <table className="w-full text-left border-collapse">
        <thead className={`border-b ${theme === 'dark' ? 'bg-elevated border-border text-text-muted' : 'bg-elevated-light border-border-light'}`}>
          <tr className="text-[10px] font-bold uppercase tracking-wider">
            <th className="px-5 py-3">User</th>
            <th className="px-5 py-3">Access Email</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-xs">
          {staffAccounts.map((user, idx) => (
            <tr key={idx} className={`border-t hover:bg-elevated transition-colors ${theme === 'dark' ? 'border-border' : 'border-border-light'}`}>
              <td className="px-5 py-3">
                <div className="flex items-center gap-2">
                  <AvatarCircle name={user.name} size="w-7 h-7" gradient="from-accent to-purple" />
                  <span className="font-semibold">{user.name}</span>
                </div>
              </td>
              <td className="px-5 py-3 font-mono text-text-secondary">{user.email}</td>
              <td className="px-5 py-3 font-bold">{user.role}</td>
              <td className="px-5 py-3"><StatusPill status={user.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 12. Settings Page
function SettingsPage({ 
  theme, 
  activeTab, 
  setActiveTab, 
  toggles, 
  setToggles,
  showToast 
}: { 
  theme: 'dark' | 'light';
  activeTab: string;
  setActiveTab: (t: string) => void;
  toggles: { [key: string]: boolean };
  setToggles: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}) {
  const handleToggle = (key: string) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    showToast(`Feature toggle changed: ${key.toUpperCase()}`, 'info');
  };

  return (
    <div className="space-y-6">
      <TabBar theme={theme} tabs={[{ id: 'general', label: 'General' }, { id: 'payment', label: 'Payment' }, { id: 'shipping', label: 'Shipping' }]} activeTab={activeTab} onSelect={setActiveTab} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`rounded-container border p-4.5 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4">General Configuration</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Entity Name</label>
              <input type="text" defaultValue="VDG Store Global Ltd." className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent border ${theme === 'dark' ? 'bg-input border-border text-text-primary' : 'bg-input-light border-border-light text-text-primary-light'}`} />
            </div>
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-text-muted mb-1">Accounting Currency</label>
              <select className={`w-full rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent border ${theme === 'dark' ? 'bg-input border-border text-text-primary' : 'bg-input-light border-border-light text-text-primary-light'}`}>
                <option>INR (₹)</option>
                <option>USD ($)</option>
              </select>
            </div>
          </div>
        </div>

        <div className={`rounded-container border p-4.5 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4">Toggles</h3>
          <div className="space-y-3">
            {[
              { key: 'reviews', label: 'Product Reviews' },
              { key: 'wishlist', label: 'Wishlists' },
            ].map((feat) => (
              <div key={feat.key} className={`flex items-center justify-between p-3 rounded-lg border ${theme === 'dark' ? 'bg-elevated border-border' : 'bg-elevated-light border-border-light'}`}>
                <span className="text-xs font-bold">{feat.label}</span>
                <ToggleSwitch checked={toggles[feat.key] || false} onChange={() => handleToggle(feat.key)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// --- NEW 4 PAGES COMPONENTS ---

// 13. Reviews Page
function ReviewsPage({
  theme,
  reviews,
  setReviews,
  showToast
}: {
  theme: 'dark' | 'light';
  reviews: ProductReview[];
  setReviews: React.Dispatch<React.SetStateAction<ProductReview[]>>;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}) {
  const handleModerate = (id: string, action: 'approved' | 'rejected') => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    showToast(`Review ${id} state updated to: ${action}`, 'success');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5">
        <div className={`rounded-card border p-4.5 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Average Star Rating</p>
          <p className="text-2xl font-black text-warning">4.8 <span className="text-xs font-bold text-text-muted">/ 5.0 stars</span></p>
        </div>
        <div className={`rounded-card border p-4.5 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Unmoderated Reviews</p>
          <p className="text-2xl font-black text-accent">{reviews.filter(r => r.status === 'pending').length} items</p>
        </div>
        <div className={`rounded-card border p-4.5 ${theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'}`}>
          <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-1">Total Ratings Scanned</p>
          <p className="text-2xl font-black text-success">8,521</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {reviews.map((rev) => (
          <div key={rev.id} className={`rounded-card border p-4.5 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4 ${
            theme === 'dark' ? 'bg-card border-border hover:border-accent/40' : 'bg-card-light border-border-light hover:border-accent/40'
          }`}>
            <div className="flex gap-3">
              <AvatarCircle name={rev.customerName} size="w-8 h-8" gradient={rev.avatarGradient} />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-xs">{rev.customerName}</span>
                  <span className="text-[10px] text-text-secondary dark:text-text-secondary-light font-semibold">reviewed {rev.productName}</span>
                  <StatusPill status={rev.status} />
                </div>
                <div className="flex items-center gap-1.5 my-1 text-warning">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <i key={idx} className={idx < rev.rating ? 'ti ti-star-filled' : 'ti ti-star'}></i>
                  ))}
                  <span className="text-[10px] font-bold font-mono text-text-muted ml-1">{rev.date}</span>
                </div>
                <p className="text-xs font-medium text-text-secondary dark:text-text-secondary-light mt-1.5">{rev.comment}</p>
              </div>
            </div>

            {rev.status === 'pending' && (
              <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
                <button 
                  onClick={() => handleModerate(rev.id, 'approved')}
                  className="bg-success hover:bg-success/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                >
                  <i className="ti ti-circle-check"></i> Approve
                </button>
                <button 
                  onClick={() => handleModerate(rev.id, 'rejected')}
                  className="bg-danger hover:bg-danger/90 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all"
                >
                  <i className="ti ti-x"></i> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 14. Inbox Page (Live Interactive Chat Simulator)
function InboxPage({
  theme,
  tickets,
  setTickets,
  activeTicketId,
  setActiveTicketId
}: {
  theme: 'dark' | 'light';
  tickets: SupportTicket[];
  setTickets: React.Dispatch<React.SetStateAction<SupportTicket[]>>;
  activeTicketId: string;
  setActiveTicketId: (id: string) => void;
}) {
  const [chatInput, setChatInput] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const activeTicket = useMemo(() => {
    return tickets.find((t) => t.id === activeTicketId) || tickets[0];
  }, [tickets, activeTicketId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTicket]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !activeTicket) return;

    const userMessage = {
      sender: 'agent' as const,
      text: chatInput,
      time: 'Just now',
    };

    // Update locally
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === activeTicket.id
          ? { ...t, messages: [...t.messages, userMessage] }
          : t
      )
    );

    setChatInput('');

    // Trigger customer auto reply simulator
    setTimeout(() => {
      const customerAutoReplies = [
        'Perfect, thank you! Let me check this in my banking portal.',
        'Got it. I appreciate the speedy assistance.',
        'Alright, please let me know as soon as the package is dispatched.',
        'Perfect, that works for me. Thanks for solving this!',
      ];
      const selectedReply = customerAutoReplies[Math.floor(Math.random() * customerAutoReplies.length)];

      const customerReply = {
        sender: 'customer' as const,
        text: selectedReply,
        time: 'Just now',
      };

      setTickets((prevTickets) =>
        prevTickets.map((t) =>
          t.id === activeTicket.id
            ? { ...t, messages: [...t.messages, customerReply] }
            : t
        )
      );
    }, 1500);
  };

  const handleResolveTicket = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'solved' } : t))
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-[calc(100vh-140px)] overflow-hidden">
      {/* Active Ticket List Left */}
      <div className={`rounded-container border flex flex-col overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
      }`}>
        <div className="p-3 border-b border-border/40 bg-elevated/20">
          <h3 className="text-xs font-bold uppercase tracking-wider">Inbox Tickets</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
          {tickets.map((tkt) => (
            <button
              key={tkt.id}
              onClick={() => setActiveTicketId(tkt.id)}
              className={`w-full rounded-lg p-3 text-left border transition-all ${
                activeTicketId === tkt.id
                  ? 'bg-accent/10 border-accent/40 shadow-sm'
                  : theme === 'dark'
                  ? 'bg-elevated/40 border-border/40 hover:bg-elevated hover:border-border'
                  : 'bg-elevated-light/40 border-border-light/40 hover:bg-elevated-light hover:border-border-light'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <AvatarCircle name={tkt.customerName} size="w-7 h-7" gradient={tkt.avatarGradient} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold truncate">{tkt.customerName}</span>
                    <span className="text-[8px] font-mono text-text-muted flex-shrink-0">{tkt.time}</span>
                  </div>
                  <p className="text-[10px] text-text-secondary truncate font-medium">{tkt.subject}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="font-mono text-[8px] font-bold text-accent">{tkt.id}</span>
                    <StatusPill status={tkt.status} />
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Pane Right (Takes 2/3 width) */}
      <div className={`lg:col-span-2 rounded-container border flex flex-col overflow-hidden transition-colors ${
        theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
      }`}>
        {activeTicket ? (
          <>
            {/* Chat Pane Header */}
            <div className="p-3 border-b border-border/40 flex items-center justify-between bg-elevated/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <AvatarCircle name={activeTicket.customerName} size="w-7 h-7" gradient={activeTicket.avatarGradient} />
                <div>
                  <h4 className="text-xs font-bold leading-tight">{activeTicket.customerName}</h4>
                  <p className="text-[9px] text-text-muted truncate max-w-sm">{activeTicket.subject}</p>
                </div>
              </div>

              {activeTicket.status === 'active' && (
                <button 
                  onClick={() => handleResolveTicket(activeTicket.id)}
                  className="bg-success/15 border border-success/35 text-success hover:bg-success hover:text-white text-[9px] font-bold px-2.5 py-1 rounded transition-all"
                >
                  Mark Solved
                </button>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-elevated/5">
              {activeTicket.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md rounded-xl p-3 text-xs shadow-sm border ${
                    msg.sender === 'agent'
                      ? 'bg-accent border-accent/20 text-white rounded-br-none'
                      : theme === 'dark'
                      ? 'bg-elevated border-border text-text-primary rounded-bl-none'
                      : 'bg-elevated-light border-border-light text-text-primary-light rounded-bl-none'
                  }`}>
                    <p className="leading-relaxed font-medium">{msg.text}</p>
                    <span className={`text-[8px] font-bold mt-1 block text-right ${
                      msg.sender === 'agent' ? 'text-white/60' : 'text-text-muted'
                    }`}>{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatBottomRef}></div>
            </div>

            {/* Chat Input form Footer */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-border/40 flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type response, press Enter..."
                disabled={activeTicket.status === 'solved'}
                className={`flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-accent border transition-colors ${
                  theme === 'dark' 
                    ? 'bg-input border-border text-text-primary focus:ring-1 focus:ring-accent/30' 
                    : 'bg-input-light border-border-light text-text-primary-light focus:ring-1 focus:ring-accent/30'
                }`}
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || activeTicket.status === 'solved'}
                className="bg-accent hover:bg-accent/90 disabled:opacity-50 text-white text-xs px-3 py-2 rounded-lg font-bold flex items-center justify-center transition-all"
              >
                <i className="ti ti-send"></i>
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center font-bold opacity-30 text-xs">No active ticket selected.</div>
        )}
      </div>
    </div>
  );
}

// 15. Shipping & Carriers Page
function ShippingPage({
  theme,
  carriers,
  setCarriers,
  showToast
}: {
  theme: 'dark' | 'light';
  carriers: Carrier[];
  setCarriers: React.Dispatch<React.SetStateAction<Carrier[]>>;
  showToast: (msg: string, type?: 'info' | 'success' | 'warning') => void;
}) {
  const handleToggleStatus = (name: string) => {
    setCarriers((prev) =>
      prev.map((c) => (c.name === name ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c))
    );
    showToast(`Carrier ${name} status toggled!`, 'info');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {carriers.map((carrier, idx) => (
          <div key={idx} className={`rounded-card border p-4.5 relative overflow-hidden transition-all duration-300 group hover:border-accent hover:shadow-lg ${
            theme === 'dark' ? 'bg-card border-border' : 'bg-card-light border-border-light'
          }`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white bg-gradient-to-br from-accent to-cyan shadow-sm`}>
                  <i className={`${carrier.icon} text-base`}></i>
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{carrier.name}</h4>
                  <span className={`text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                    carrier.status === 'active' ? 'bg-success/15 text-success' : 'bg-input text-text-muted'
                  }`}>{carrier.status === 'active' ? 'Active' : 'Disabled'}</span>
                </div>
              </div>
              
              <ToggleSwitch 
                checked={carrier.status === 'active'} 
                onChange={() => handleToggleStatus(carrier.name)} 
              />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4 text-[10px] font-bold">
              <div className={`p-2 rounded border ${theme === 'dark' ? 'bg-elevated border-border' : 'bg-elevated-light border-border-light'}`}>
                <p className="text-text-muted mb-0.5">Success Rate</p>
                <p className="text-xs font-black text-success">{carrier.successRate}%</p>
              </div>
              <div className={`p-2 rounded border ${theme === 'dark' ? 'bg-elevated border-border' : 'bg-elevated-light border-border-light'}`}>
                <p className="text-text-muted mb-0.5">Active Dispatches</p>
                <p className="text-xs font-black text-accent">{carrier.activeShipments}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 16. Audit Logs Page (Developer Terminal logs)
function AuditLogsPage({
  theme,
  logs,
  setLogs
}: {
  theme: 'dark' | 'light';
  logs: AuditLog[];
  setLogs: React.Dispatch<React.SetStateAction<AuditLog[]>>;
}) {
  const [filterType, setFilterType] = useState<string>('all');

  const filteredLogs = useMemo(() => {
    if (filterType === 'all') return logs;
    return logs.filter((l) => l.type === filterType);
  }, [logs, filterType]);

  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    <div className="space-y-6">
      {/* Terminal Pane controls */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-1.5">
          {['all', 'info', 'success', 'warning', 'error'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded text-[10px] font-extrabold uppercase tracking-wider border transition-all ${
                filterType === type
                  ? 'bg-accent text-white border-accent'
                  : theme === 'dark'
                  ? 'bg-input border-border text-text-secondary hover:text-text-primary'
                  : 'bg-input-light border-border-light text-text-secondary-light hover:text-text-primary-light'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        <button 
          onClick={handleClearLogs}
          className="border border-danger/30 hover:bg-danger hover:text-white text-danger px-3 py-1 rounded text-[10px] font-bold transition-all"
        >
          Clear Stream
        </button>
      </div>

      {/* Terminal Viewport */}
      <div className="rounded-container border overflow-hidden bg-black text-green-400 font-mono p-4 border-zinc-800 shadow-2xl h-[420px] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 text-[10px] text-zinc-500 font-bold tracking-wider">
          <span>SYSTEM AUDIT CONSOLE - LOGGING AGENT VER 2.14</span>
          <span>DASHBOARD STREAMING</span>
        </div>
        
        <div className="space-y-2 text-[11px] leading-tight">
          {filteredLogs.length === 0 ? (
            <div className="text-center text-zinc-600 py-20">Console stream idle. Waiting for network events...</div>
          ) : (
            filteredLogs.map((log) => {
              let tagColor = 'text-blue-400';
              if (log.type === 'success') tagColor = 'text-green-400';
              else if (log.type === 'warning') tagColor = 'text-yellow-500';
              else if (log.type === 'error') tagColor = 'text-red-500';

              return (
                <div key={log.id} className="hover:bg-zinc-950 p-1 rounded flex items-start gap-2.5 transition-colors">
                  <span className="text-zinc-600">[{log.timestamp}]</span>
                  <span className={`font-bold uppercase tracking-wider w-16 flex-shrink-0 ${tagColor}`}>[{log.type}]</span>
                  <span className="text-zinc-500 font-bold uppercase w-20 flex-shrink-0">{log.source}</span>
                  <span className="text-zinc-300 font-medium">{log.message}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
