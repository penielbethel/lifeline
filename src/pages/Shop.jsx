import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  ShoppingBag, X, Filter, Package, Truck, CreditCard, CheckCircle,
  Plus, Minus, Trash2, Tag, Search, ChevronRight, Activity,
  ArrowRight, Star, Shield, Pill, Thermometer, Syringe, Heart
} from 'lucide-react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

const CURRENCY = '₦';
const API_URL = import.meta.env.VITE_API_URL || 'https://lifelineglobaloption.vercel.app/api';

// ─── FALLBACK PRODUCTS (shown while loading or if backend has no products) ───
const FALLBACK_PRODUCTS = [
  {
    id: 'paracetamol-500',
    name: 'Paracetamol 500mg',
    category: 'Analgesics',
    tagline: 'Fever & Pain Relief',
    size: 'Pack of 1000 tabs',
    description: 'Fast-acting paracetamol for relief of mild to moderate pain and reduction of fever.',
    price: 2500,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
    rating: 4.8, reviews: 312, isPrescriptionRequired: false, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'amoxicillin-250',
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    tagline: 'Broad Spectrum Antibiotic',
    size: 'Pack of 30 caps',
    description: 'Amoxicillin capsules for treatment of bacterial infections. Prescription required.',
    price: 3800,
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=400&q=80',
    rating: 4.7, reviews: 145, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'vitamin-c-1000',
    name: 'Vitamin C 1000mg',
    category: 'Supplements',
    tagline: 'Immunity Booster',
    size: 'Bottle of 60 tabs',
    description: 'High-dose Vitamin C effervescent tablets to support immune function and antioxidant protection.',
    price: 4500,
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=400&q=80',
    rating: 4.9, reviews: 289, isPrescriptionRequired: false, isNewArrival: true, stockStatus: 'in_stock'
  },
  {
    id: 'ibuprofen-400',
    name: 'Ibuprofen 400mg',
    category: 'Analgesics',
    tagline: 'Anti-inflammatory & Pain Relief',
    size: 'Pack of 100 tabs',
    description: 'Non-steroidal anti-inflammatory drug (NSAID) for pain, inflammation, and fever.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=400&q=80',
    rating: 4.6, reviews: 192, isPrescriptionRequired: false, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'metformin-500',
    name: 'Metformin 500mg',
    category: 'Chronic Care',
    tagline: 'Blood Sugar Management',
    size: 'Pack of 100 tabs',
    description: 'Oral diabetes medication that helps control blood sugar levels. Requires valid prescription.',
    price: 6200,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&q=80',
    rating: 4.8, reviews: 78, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'flagyl-400',
    name: 'Metronidazole 400mg',
    category: 'Antibiotics',
    tagline: 'Antiprotozoal & Antibacterial',
    size: 'Pack of 21 tabs',
    description: 'Effective against anaerobic bacterial infections and protozoal infections like amoeba.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=400&q=80',
    rating: 4.5, reviews: 223, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'bandage-kit',
    name: 'First Aid Dressing Kit',
    category: 'First Aid',
    tagline: 'Wound Care Essentials',
    size: 'Complete Kit',
    description: 'Comprehensive first aid kit with bandages, antiseptic wipes, dressing pads and medical tape.',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=400&q=80',
    rating: 4.7, reviews: 156, isPrescriptionRequired: false, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'artesunate-inj',
    name: 'Artesunate Injection',
    category: 'Injections',
    tagline: 'Severe Malaria Treatment',
    size: '60mg/vial',
    description: 'Injectable artesunate for the treatment of severe malaria. Hospital use only.',
    price: 8500,
    image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=400&q=80',
    rating: 4.9, reviews: 67, isPrescriptionRequired: true, isNewArrival: true, stockStatus: 'in_stock'
  },
  {
    id: 'omega-3',
    name: 'Omega-3 Fish Oil',
    category: 'Supplements',
    tagline: 'Cardiovascular Support',
    size: 'Bottle of 90 softgels',
    description: 'High-quality omega-3 fatty acids from deep-sea fish oil. Supports heart and brain health.',
    price: 5800,
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80',
    rating: 4.8, reviews: 334, isPrescriptionRequired: false, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'gloves-box',
    name: 'Nitrile Exam Gloves',
    category: 'First Aid',
    tagline: 'Medical Grade Protection',
    size: 'Box of 100 (Medium)',
    description: 'Powder-free nitrile examination gloves. Latex-free and suitable for clinical use.',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=400&q=80',
    rating: 4.6, reviews: 88, isPrescriptionRequired: false, isNewArrival: false, stockStatus: 'in_stock'
  },
  {
    id: 'losartan-50',
    name: 'Losartan 50mg',
    category: 'Chronic Care',
    tagline: 'Blood Pressure Management',
    size: 'Pack of 28 tabs',
    description: 'Angiotensin II receptor blocker for treating high blood pressure and protecting kidneys.',
    price: 5500,
    image: 'https://images.unsplash.com/photo-1548197673-5-fa14b0b5db4?auto=format&fit=crop&w=400&q=80',
    rating: 4.7, reviews: 92, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'low_stock'
  },
  {
    id: 'saline-500ml',
    name: 'Normal Saline 0.9%',
    category: 'Injections',
    tagline: 'IV Fluid Therapy',
    size: '500ml Bag',
    description: 'Isotonic intravenous fluid for rehydration and drug dilution. Hospital/clinic use.',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=400&q=80',
    rating: 4.9, reviews: 145, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'in_stock'
  }
];

// ─── PRODUCT DETAILS MODAL ───────────────────────────────────────────────────
const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;
  const isOutOfStock = product.stockStatus === 'out_of_stock';
  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
      zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      backdropFilter: 'blur(6px)', padding: '1rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff', width: '100%', maxWidth: '820px', borderRadius: '24px',
        overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '90vh',
        boxShadow: '0 25px 60px rgba(0,0,0,0.25)'
      }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: '#F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={18} color="#374151" />
          </button>
        </div>
        <div style={{ overflowY: 'auto', padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
            {/* Image */}
            <div style={{ borderRadius: '16px', overflow: 'hidden', background: '#F8FAFC', height: '300px' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {/* Info */}
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span style={{ padding: '0.3rem 0.9rem', backgroundColor: '#EFF6FF', color: '#1D4ED8', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>{product.category}</span>
                {product.isNewArrival && <span style={{ padding: '0.3rem 0.9rem', backgroundColor: '#ECFDF5', color: '#059669', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>New Arrival</span>}
                {product.isPrescriptionRequired && <span style={{ padding: '0.3rem 0.9rem', backgroundColor: '#FEF2F2', color: '#DC2626', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '800' }}>Rx Required</span>}
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#0F172A', marginBottom: '0.5rem' }}>{product.name}</h2>
              <p style={{ color: '#0F766E', fontWeight: '600', marginBottom: '1rem' }}>{product.tagline}</p>
              <p style={{ color: '#475569', lineHeight: '1.7', marginBottom: '1.5rem' }}>{product.description}</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '2.25rem', fontWeight: '900', color: '#1D4ED8' }}>₦{product.price.toLocaleString()}</span>
                <span style={{ color: '#94A3B8' }}>/ {product.size}</span>
              </div>
              {product.isPrescriptionRequired && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '1rem', borderRadius: '10px', marginBottom: '1.25rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <Shield size={18} color="#DC2626" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '0.875rem', color: '#991B1B', margin: 0, lineHeight: '1.5' }}>This medication requires a valid doctor's prescription. Please have it ready upon pickup or delivery.</p>
                </div>
              )}
              <button onClick={() => { onAddToCart(product); onClose(); }} disabled={isOutOfStock}
                style={{ width: '100%', padding: '1rem', background: isOutOfStock ? '#E5E7EB' : 'linear-gradient(135deg, #1D4ED8, #3B82F6)', color: isOutOfStock ? '#9CA3AF' : '#fff', border: 'none', borderRadius: '12px', fontSize: '1rem', fontWeight: '800', cursor: isOutOfStock ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                {isOutOfStock ? 'Out of Stock' : <><Plus size={20} /> Add to Basket</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── PROMO BANNER ─────────────────────────────────────────────────────────────
const PromoBanner = ({ promos }) => {
  const [timeLeft, setTimeLeft] = useState('');
  useEffect(() => {
    if (!promos || promos.length === 0) return;
    const endDates = promos.map(p => new Date(p.endDate).getTime());
    const targetDate = Math.min(...endDates);
    const updateTimer = () => {
      const distance = targetDate - Date.now();
      if (distance < 0) { setTimeLeft('Ended'); return; }
      const d = Math.floor(distance / 86400000);
      const h = Math.floor((distance % 86400000) / 3600000);
      const m = Math.floor((distance % 3600000) / 60000);
      const s = Math.floor((distance % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    updateTimer();
    const iv = setInterval(updateTimer, 1000);
    return () => clearInterval(iv);
  }, [promos]);
  if (!promos || promos.length === 0) return null;
  const max = Math.max(...promos.map(p => p.discountPercent));
  return (
    <div style={{ background: 'linear-gradient(90deg, #1D4ED8, #3B82F6)', color: '#fff', padding: '0.85rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
      <span style={{ fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>🏥 Active Promotion</span>
      <span style={{ background: '#fff', color: '#1D4ED8', padding: '0.2rem 0.75rem', borderRadius: '6px', fontWeight: '800', fontSize: '0.9rem' }}>UP TO {max}% OFF</span>
      {timeLeft && <span style={{ opacity: 0.85 }}>Ends in: <strong style={{ fontFamily: 'monospace' }}>{timeLeft}</strong></span>}
    </div>
  );
};

// ─── MAIN SHOP COMPONENT ─────────────────────────────────────────────────────
const Shop = () => {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('lifeline_cart') || '[]'); }
    catch { return []; }
  });
  const [products, setProducts] = useState([]);
  const [activePromos, setActivePromos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingProduct, setViewingProduct] = useState(null);
  const [pendingOrderId, setPendingOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState({ type: '', text: '' });
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '', email: '', phone: '', address: '', state: ''
  });

  // Fetch data
  useEffect(() => {
    document.title = "Lifeline Pharmacy — Genuine Medications Delivered";
    const fetchData = async () => {
      try {
        const [prodRes, promoRes] = await Promise.all([
          axios.get(`${API_URL}/products`),
          axios.get(`${API_URL}/promos/active`)
        ]);
        const fetchedProducts = prodRes.data && prodRes.data.length > 0 ? prodRes.data : FALLBACK_PRODUCTS;
        setProducts(fetchedProducts);
        setActivePromos(promoRes.data || []);
      } catch {
        // Backend unavailable — use fallback products
        setProducts(FALLBACK_PRODUCTS);
        setLoadError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Persist cart
  useEffect(() => {
    localStorage.setItem('lifeline_cart', JSON.stringify(cart));
  }, [cart]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchCat = filter === 'All' || p.category === filter;
        const matchSearch = !searchQuery ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCat && matchSearch;
      })
      .sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
  }, [products, filter, searchQuery]);

  // Get effective price with promos
  const getPrice = (product) => {
    const applicable = activePromos.filter(p =>
      p.applicableProducts?.length === 0 || p.applicableProducts?.includes(product.id)
    );
    if (!applicable.length) return { original: product.price, current: product.price, isPromo: false };
    applicable.sort((a, b) => b.discountPercent - a.discountPercent);
    const best = applicable[0];
    const discount = Math.round((product.price * best.discountPercent) / 100);
    return { original: product.price, current: product.price - discount, discountPercent: best.discountPercent, isPromo: true };
  };

  // Cart totals
  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
    const delivery = cart.length > 0 ? 1500 : 0;
    let discount = 0;
    if (activeCoupon) {
      if (activeCoupon.applicableProducts?.length > 0) {
        const base = cart.reduce((s, i) => activeCoupon.applicableProducts.includes(i.id) ? s + i.price * i.quantity : s, 0);
        discount = Math.round((base * activeCoupon.discountPercent) / 100);
      } else {
        discount = Math.round((subtotal * activeCoupon.discountPercent) / 100);
      }
    }
    const total = Math.max(0, subtotal + delivery - discount);
    return { subtotal, delivery, discount, total };
  }, [cart, activeCoupon]);

  // Flutterwave config
  const flwConfig = useMemo(() => ({
    public_key: 'FLWPUBK_TEST-1f887ca9f241fd06e18bb705c9ae73c9-X',
    tx_ref: pendingOrderId || 'temp',
    amount: cartTotals.total,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: { email: checkoutForm.email, phone_number: checkoutForm.phone, name: checkoutForm.fullName },
    customizations: {
      title: 'Lifeline Pharmacy',
      description: `Order for ${cart.length} items`,
      logo: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=100&q=80'
    }
  }), [pendingOrderId, cartTotals.total, checkoutForm, cart.length]);

  const handleFlutterwavePayment = useFlutterwave(flwConfig);

  useEffect(() => {
    if (!pendingOrderId) return;
    handleFlutterwavePayment({
      callback: (response) => {
        closePaymentModal();
        if (response.status === 'successful') {
          axios.post(`${API_URL}/payment/verify`, { transaction_id: response.transaction_id, order_id: pendingOrderId })
            .then(res => {
              if (res.data.status === 'success') {
                setOrderStatus('success');
                clearCart();
                setTimeout(() => { setOrderStatus(null); setPendingOrderId(null); }, 6000);
              } else { alert('Payment verification failed. Contact support.'); }
            })
            .catch(() => alert('Error verifying payment. Please contact support.'));
        }
      },
      onClose: () => setPendingOrderId(null)
    });
  }, [pendingOrderId]);

  // Cart operations
  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id);
      if (ex) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };
  const updateQty = (id, q) => {
    if (q <= 0) { setCart(prev => prev.filter(i => i.id !== id)); return; }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: q } : i));
  };
  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => { setCart([]); setActiveCoupon(null); setCouponCode(''); setCouponMessage({ type: '', text: '' }); };

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponMessage({ type: 'loading', text: 'Verifying...' });
    try {
      const res = await axios.post(`${API_URL}/coupons/validate`, {
        code: couponCode, email: checkoutForm.email, productIds: cart.map(i => i.id)
      });
      if (res.data.valid) {
        setActiveCoupon({ code: couponCode, discountPercent: res.data.discountPercent, applicableProducts: res.data.applicableProducts });
        setCouponMessage({ type: 'success', text: res.data.message });
      } else {
        setActiveCoupon(null);
        setCouponMessage({ type: 'error', text: res.data.message });
      }
    } catch (err) {
      setActiveCoupon(null);
      setCouponMessage({ type: 'error', text: err.response?.data?.message || 'Invalid coupon code' });
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) { alert('Your basket is empty.'); return; }
    if (!checkoutForm.fullName || !checkoutForm.email || !checkoutForm.phone || !checkoutForm.address) {
      alert('Please fill in all delivery details.'); return;
    }
    try {
      const orderNumber = `LPH-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      await axios.post(`${API_URL}/orders`, {
        orderNumber,
        customerName: checkoutForm.fullName,
        customerEmail: checkoutForm.email,
        customerPhone: checkoutForm.phone,
        items: cart.map(i => ({ productName: i.name, quantity: i.quantity, price: i.price })),
        totalAmount: cartTotals.total,
        couponCode: activeCoupon?.code,
        discountAmount: cartTotals.discount,
        status: 'pending',
        paymentStatus: 'unpaid'
      });
      setPendingOrderId(orderNumber);
    } catch (err) {
      alert('Failed to place order. ' + (err.response?.data?.message || 'Please try again.'));
    }
  };

  // Categories with icons
  const CATEGORIES = [
    { id: 'All', label: 'All Products', icon: <Package size={15} /> },
    { id: 'Analgesics', label: 'Pain Relief', icon: <Thermometer size={15} /> },
    { id: 'Antibiotics', label: 'Antibiotics', icon: <Shield size={15} /> },
    { id: 'Supplements', label: 'Supplements', icon: <Heart size={15} /> },
    { id: 'Injections', label: 'Injections', icon: <Syringe size={15} /> },
    { id: 'First Aid', label: 'First Aid', icon: <Plus size={15} /> },
    { id: 'Chronic Care', label: 'Chronic Care', icon: <Activity size={15} /> },
  ];

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <Navbar />

      {/* HERO */}
      <section className="shop-hero" style={{ paddingTop: '9rem', paddingBottom: '5rem' }}>
        <div className="shop-hero-bg" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="shop-pill" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <Pill size={14} style={{ marginRight: '0.5rem' }} />
              NAFDAC Certified • Genuine Medications Only
            </div>
            <h1 className="shop-title">Lifeline Pharmacy</h1>
            <p className="shop-subtitle" style={{ margin: '1rem auto 0' }}>
              Browse certified medications, supplements & wellness products.
              Prescriptions handled safely. Nationwide delivery available.
            </p>
            <div className="shop-search-bar" style={{ margin: '2rem auto 0' }}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search medications, supplements, categories..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section style={{ padding: '3rem 0 6rem' }}>
        <div className="container">

          {/* Order Success */}
          {orderStatus === 'success' && (
            <div className="order-success-banner animate-fade-in" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <div className="success-icon"><CheckCircle size={28} /></div>
              <div>
                <h3 style={{ margin: 0, marginBottom: '0.25rem' }}>Order Placed Successfully!</h3>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Your medications are being processed. Our team will contact you at <strong>{checkoutForm.phone}</strong>.</p>
              </div>
            </div>
          )}

          {/* Backend Warning */}
          {loadError && (
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '1rem 1.5rem', borderRadius: '12px', marginBottom: '1.5rem', color: '#1D4ED8', fontSize: '0.875rem' }}>
              <strong>Note:</strong> Showing sample catalog — backend may be offline. Products are for reference.
            </div>
          )}

          <div className="shop-layout">
            {/* PRODUCTS MAIN AREA */}
            <main>
              {/* Promo Banner */}
              <PromoBanner promos={activePromos} />

              {/* Filters */}
              <div className="shop-filters-container" style={{ marginBottom: '1.75rem', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#475569', fontWeight: '600', fontSize: '0.875rem', flexShrink: 0 }}>
                  <Filter size={16} /> Filter:
                </div>
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    className={`filter-pill ${filter === cat.id ? 'active' : ''}`}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.icon} {cat.label}
                  </button>
                ))}
              </div>

              {/* Feature Highlights */}
              <div className="shop-features grid grid-cols-3" style={{ gap: '1rem', marginBottom: '2rem' }}>
                <div className="shop-feature-card">
                  <div className="f-icon-box"><Truck size={22} /></div>
                  <div><h4>Nationwide Delivery</h4><p>Tracked & subsidized</p></div>
                </div>
                <div className="shop-feature-card">
                  <div className="f-icon-box"><Shield size={22} /></div>
                  <div><h4>NAFDAC Certified</h4><p>100% genuine drugs</p></div>
                </div>
                <div className="shop-feature-card">
                  <div className="f-icon-box"><CreditCard size={22} /></div>
                  <div><h4>Secure Payment</h4><p>Card or bank transfer</p></div>
                </div>
              </div>

              {/* Count */}
              <div style={{ marginBottom: '1.25rem', color: '#64748B', fontSize: '0.875rem' }}>
                Showing <strong style={{ color: '#1E293B' }}>{filteredProducts.length}</strong> product{filteredProducts.length !== 1 ? 's' : ''}
                {filter !== 'All' && <> in <strong style={{ color: '#1D4ED8' }}>{filter}</strong></>}
                {searchQuery && <> matching "<strong>{searchQuery}</strong>"</>}
              </div>

              {/* Products Grid */}
              <div className="shop-grid">
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ borderRadius: '20px', background: '#F1F5F9', height: '340px', animation: 'pulse 1.5s ease infinite' }} />
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map(product => {
                    const { original, current, isPromo, discountPercent } = getPrice(product);
                    const isOut = product.stockStatus === 'out_of_stock';
                    const isLow = product.stockStatus === 'low_stock';
                    const isNew = product.isNewArrival;

                    return (
                      <div key={product.id} className="modern-product-card animate-fade-in-up" style={{ opacity: isOut ? 0.75 : 1 }}>
                        <div className="product-image-wrapper">
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ filter: isOut ? 'grayscale(80%)' : 'none', cursor: 'pointer' }}
                            onClick={() => setViewingProduct(product)}
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80'; }}
                          />

                          {/* Top-left badges */}
                          <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '5px', zIndex: 5 }}>
                            <span className="product-badge">{product.category}</span>
                            {isNew && !isOut && <span style={{ padding: '3px 8px', borderRadius: '999px', background: '#059669', color: '#fff', fontSize: '0.65rem', fontWeight: '800', textTransform: 'uppercase', textAlign: 'center' }}>NEW</span>}
                            {product.isPrescriptionRequired && !isOut && <span style={{ padding: '3px 8px', borderRadius: '999px', background: '#DC2626', color: '#fff', fontSize: '0.65rem', fontWeight: '800', textAlign: 'center' }}>Rx REQ.</span>}
                            {isLow && !isOut && <span style={{ padding: '3px 8px', borderRadius: '999px', background: '#D97706', color: '#fff', fontSize: '0.65rem', fontWeight: '800', textAlign: 'center' }}>LOW STOCK</span>}
                          </div>

                          {/* Promo badge top-right */}
                          {isPromo && !isOut && (
                            <span style={{ position: 'absolute', top: '10px', right: '10px', background: '#1D4ED8', color: '#fff', padding: '3px 8px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', zIndex: 5 }}>
                              -{discountPercent}%
                            </span>
                          )}

                          {/* Out of stock overlay */}
                          {isOut && (
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                              <span style={{ background: '#1E293B', color: '#fff', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: '800', fontSize: '0.85rem', letterSpacing: '1px' }}>SOLD OUT</span>
                            </div>
                          )}

                          <button
                            className="quick-add-btn"
                            disabled={isOut}
                            onClick={() => !isOut && addToCart({ ...product, price: current })}
                          >
                            <Plus size={20} />
                          </button>
                        </div>

                        <div className="product-info-wrapper">
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                            <div>
                              <h3 className="product-name">{product.name}</h3>
                              <p className="product-tagline">{product.tagline}</p>
                            </div>
                            <div className="product-rating">
                              <Star size={12} fill="#D97706" color="#D97706" />
                              <span style={{ color: '#374151' }}>{product.rating}</span>
                            </div>
                          </div>
                          <p className="product-desc">{product.description}</p>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                            <div className="product-price-box">
                              {isPromo && !isOut ? (
                                <>
                                  <span style={{ textDecoration: 'line-through', color: '#9CA3AF', fontSize: '0.8rem', marginRight: '0.4rem' }}>₦{original.toLocaleString()}</span>
                                  <span className="currency">₦</span>
                                  <span className="amount" style={{ color: '#1D4ED8' }}>{Math.round(current).toLocaleString()}</span>
                                </>
                              ) : (
                                <>
                                  <span className="currency">₦</span>
                                  <span className="amount">{current.toLocaleString()}</span>
                                  <span className="size"> / {product.size}</span>
                                </>
                              )}
                            </div>
                            <button
                              className="shop-cart-btn"
                              disabled={isOut}
                              onClick={() => !isOut && addToCart({ ...product, price: current })}
                              style={{ background: isOut ? '#E5E7EB' : undefined, color: isOut ? '#9CA3AF' : undefined, cursor: isOut ? 'not-allowed' : 'pointer' }}
                            >
                              {isOut ? 'Sold Out' : 'Add'}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '5rem 0', color: '#94A3B8' }}>
                    <Search size={48} style={{ margin: '0 auto 1.5rem', opacity: 0.3 }} />
                    <h3 style={{ color: '#475569', marginBottom: '0.5rem' }}>No products found</h3>
                    <p>Try a different search term or category.</p>
                  </div>
                )}
              </div>
            </main>

            {/* SIDEBAR: Cart + Checkout */}
            <aside className="shop-sidebar">
              {/* Cart */}
              <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                    <ShoppingBag size={18} style={{ color: '#60A5FA' }} />
                    Your Basket
                  </h2>
                  <span className="cart-count">{cartCount} items</span>
                </div>

                {cart.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '2.5rem 0', color: '#64748B' }}>
                    <Package size={40} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                    <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: 0 }}>Your basket is empty.<br />Browse products and add items!</p>
                  </div>
                ) : (
                  <div>
                    {/* Items */}
                    <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '1.25rem' }}>
                      {cart.map(item => (
                        <div key={item.id} className="cart-item-modern" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.875rem' }}>
                          <div className="cart-item-img">
                            <img src={item.image} alt={item.name} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&q=80'; }} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '0.825rem', fontWeight: '700', color: '#fff', margin: '0 0 0.15rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</h4>
                            <p style={{ fontSize: '0.75rem', color: '#94A3B8', margin: 0 }}>₦{item.price.toLocaleString()}</p>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: '8px', padding: '0.25rem 0.5rem', border: '1px solid rgba(255,255,255,0.08)' }}>
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: 0 }}><Minus size={12} /></button>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fff', minWidth: '18px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', display: 'flex', padding: 0 }}><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', display: 'flex', padding: '0.25rem' }}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Coupon */}
                    <div style={{ padding: '1rem 0', borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1rem' }}>
                      {!activeCoupon ? (
                        <div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input
                              type="text"
                              placeholder="Coupon code"
                              value={couponCode}
                              onChange={e => setCouponCode(e.target.value)}
                              style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '0.6rem 0.75rem', color: '#fff', fontSize: '0.85rem', fontFamily: 'inherit' }}
                            />
                            <button
                              onClick={handleApplyCoupon}
                              disabled={!couponCode || couponMessage.type === 'loading'}
                              style={{ background: '#1D4ED8', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
                            >
                              {couponMessage.type === 'loading' ? '...' : 'Apply'}
                            </button>
                          </div>
                          {couponMessage.type === 'error' && <p style={{ color: '#F87171', fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: 0 }}>{couponMessage.text}</p>}
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: '8px', padding: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <Tag size={14} color="#60A5FA" />
                            <span style={{ fontSize: '0.8rem', color: '#93C5FD', fontWeight: '700' }}>
                              {activeCoupon.code} — {activeCoupon.discountPercent}% OFF
                            </span>
                          </div>
                          <button onClick={() => { setActiveCoupon(null); setCouponCode(''); setCouponMessage({ type: '', text: '' }); }} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer' }}>
                            <X size={14} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Totals */}
                    <div style={{ fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                        <span>Subtotal</span><span style={{ color: '#fff' }}>₦{cartTotals.subtotal.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94A3B8' }}>
                        <span>Delivery Fee</span><span style={{ color: '#fff' }}>₦{cartTotals.delivery.toLocaleString()}</span>
                      </div>
                      {activeCoupon && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34D399' }}>
                          <span>Coupon Discount</span><span>-₦{cartTotals.discount.toLocaleString()}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                        <span style={{ color: '#fff' }}>Total</span>
                        <span style={{ color: '#60A5FA' }}>₦{cartTotals.total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
                      <button className="btn-clear" onClick={clearCart} style={{ flex: 1 }}>Clear Basket</button>
                    </div>
                  </div>
                )}
              </div>

              {/* Checkout Form */}
              <div className="glass-card">
                <div style={{ marginBottom: '1.25rem' }}>
                  <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', fontSize: '1.1rem', margin: '0 0 0.25rem' }}>
                    <CreditCard size={18} style={{ color: '#60A5FA' }} />
                    Secure Checkout
                  </h2>
                  <p style={{ color: '#64748B', fontSize: '0.8rem', margin: 0 }}>Fill details to place your order</p>
                </div>

                <form onSubmit={handlePlaceOrder} className="modern-form">
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input name="fullName" required placeholder="Yinka Michael" value={checkoutForm.fullName} onChange={e => setCheckoutForm(p => ({ ...p, fullName: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input name="email" type="email" required placeholder="you@email.com" value={checkoutForm.email} onChange={e => setCheckoutForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input name="phone" type="tel" required placeholder="+234 800 000 0000" value={checkoutForm.phone} onChange={e => setCheckoutForm(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>Delivery Address *</label>
                    <textarea name="address" required rows="2" placeholder="Street, Area, LGA..." value={checkoutForm.address} onChange={e => setCheckoutForm(p => ({ ...p, address: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select value={checkoutForm.state} onChange={e => setCheckoutForm(p => ({ ...p, state: e.target.value }))}>
                      <option value="">Select State</option>
                      {['Lagos', 'Ogun', 'Kwara', 'Abuja', 'Kano', 'Rivers', 'Oyo', 'Delta', 'Other'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="place-order-btn"
                    disabled={cart.length === 0}
                    style={{ width: '100%', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', fontSize: '0.95rem', marginTop: '0.5rem' }}
                  >
                    Place Order <ArrowRight size={18} />
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1rem', fontSize: '0.7rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={10} /> SSL Secured</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Shield size={10} /> Encrypted</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={10} /> NAFDAC</span>
                  </div>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#fff', borderTop: '1px solid #E2E8F0' }}>
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: <Shield size={24} />, title: 'NAFDAC Certified', text: 'All drugs are verified' },
              { icon: <Truck size={24} />, title: 'Nationwide Delivery', text: 'Tracked shipments' },
              { icon: <Package size={24} />, title: 'Safe Packaging', text: 'Hygienically sealed' },
              { icon: <Heart size={24} />, title: 'Clinical Support', text: 'Pharmacist on call' }
            ].map((item, i) => (
              <div key={i} className="trust-item" style={{ textAlign: 'center' }}>
                <div className="trust-icon">{item.icon}</div>
                <h5 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#1E293B', marginBottom: '0.25rem' }}>{item.title}</h5>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        companyName="Lifeline Healthcare Global Options"
        registration="RC 1506925"
        address="Okewande Street, Budo Nuhu Village, Airport Area, Kwara State"
        email="pharmacy@lifelinehealthcareglobal.com"
        phone="+234-XXX-XXX-XXXX"
        aboutText="Lifeline Pharmacy — certified medications, supplements and wellness products delivered nationwide."
        quickLinks={[
          { label: 'Home', url: '/' },
          { label: 'About', url: '/about' },
          { label: 'Pharmacy', url: '/shop' },
          { label: 'Contact', url: '/contact' },
          { label: 'Privacy', url: '/privacy' }
        ]}
        ctaText="Staff Portal"
        ctaLink="/login"
      />

      {/* Product Modal */}
      {viewingProduct && (
        <ProductModal product={viewingProduct} onClose={() => setViewingProduct(null)} onAddToCart={addToCart} />
      )}

      {/* Floating Cart */}
      <button
        className={`floating-cart-bubble ${cartCount > 0 ? 'has-items' : ''}`}
        onClick={() => document.querySelector('.shop-sidebar')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ShoppingBag size={24} />
        {cartCount > 0 && <span className="item-count">{cartCount}</span>}
      </button>
    </div>
  );
};

export default Shop;
