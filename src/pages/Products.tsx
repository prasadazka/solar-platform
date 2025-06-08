import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Star, 
  Filter, 
  Search, 
  Grid, 
  List, 
  Plus, 
  Minus,
  Heart,
  Eye,
  ShoppingCart,
  Zap,
  Battery,
  Sun,
  Settings,
  Award,
  Truck,
  Shield
} from 'lucide-react';
import { useThemeStore, useCartStore } from '../store';
import { Product } from '../types';

const Products: React.FC = () => {
  const { language } = useThemeStore();
  const { addItem, items: cartItems } = useCartStore();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Mock products data
  const products: Product[] = [
    {
      id: '1',
      name: language === 'en' ? 'Monocrystalline Solar Panel 450W' : 'لوح شمسي أحادي البلورة 450 واط',
      description: language === 'en' 
        ? 'High-efficiency monocrystalline solar panel with 21% efficiency rating'
        : 'لوح شمسي أحادي البلورة عالي الكفاءة بمعدل كفاءة 21%',
      price: 890,
      originalPrice: 1200,
      images: ['/api/placeholder/400/300'],
      category: 'panels',
      brand: 'SunPower',
      specifications: {
        [language === 'en' ? 'Power Output' : 'القدرة الخارجة']: '450W',
        [language === 'en' ? 'Efficiency' : 'الكفاءة']: '21%',
        [language === 'en' ? 'Warranty' : 'الضمان']: language === 'en' ? '25 years' : '25 سنة',
        [language === 'en' ? 'Dimensions' : 'الأبعاد']: '2108×1048×35mm'
      },
      inStock: true,
      rating: 4.8,
      reviewCount: 124,
      features: [
        language === 'en' ? 'High efficiency monocrystalline cells' : 'خلايا أحادية البلورة عالية الكفاءة',
        language === 'en' ? 'Anti-reflective glass coating' : 'طلاء زجاجي مقاوم للانعكاس',
        language === 'en' ? 'Weather resistant aluminum frame' : 'إطار ألومنيوم مقاوم للطقس'
      ]
    },
    {
      id: '2',
      name: language === 'en' ? 'Lithium Battery Storage 10kWh' : 'بطارية ليثيوم للتخزين 10 كيلوواط ساعة',
      description: language === 'en' 
        ? 'Advanced lithium battery system for solar energy storage'
        : 'نظام بطارية ليثيوم متقدم لتخزين الطاقة الشمسية',
      price: 4500,
      originalPrice: 5200,
      images: ['/api/placeholder/400/300'],
      category: 'batteries',
      brand: 'Tesla',
      specifications: {
        [language === 'en' ? 'Capacity' : 'السعة']: '10kWh',
        [language === 'en' ? 'Cycles' : 'الدورات']: '6000+',
        [language === 'en' ? 'Warranty' : 'الضمان']: language === 'en' ? '10 years' : '10 سنوات',
        [language === 'en' ? 'Depth of Discharge' : 'عمق التفريغ']: '95%'
      },
      inStock: true,
      rating: 4.9,
      reviewCount: 89,
      features: [
        language === 'en' ? 'Advanced Battery Management System' : 'نظام إدارة البطارية المتقدم',
        language === 'en' ? 'Remote monitoring capability' : 'إمكانية المراقبة عن بُعد',
        language === 'en' ? 'Expandable modular design' : 'تصميم معياري قابل للتوسيع'
      ]
    },
    {
      id: '3',
      name: language === 'en' ? 'String Inverter 5kW' : 'انفرتر سلسلة 5 كيلوواط',
      description: language === 'en' 
        ? 'High-efficiency string inverter for residential solar systems'
        : 'انفرتر سلسلة عالي الكفاءة للأنظمة الشمسية السكنية',
      price: 1850,
      originalPrice: 2100,
      images: ['/api/placeholder/400/300'],
      category: 'inverters',
      brand: 'SMA',
      specifications: {
        [language === 'en' ? 'Max Power' : 'القدرة القصوى']: '5kW',
        [language === 'en' ? 'Efficiency' : 'الكفاءة']: '97.1%',
        [language === 'en' ? 'Warranty' : 'الضمان']: language === 'en' ? '10 years' : '10 سنوات',
        [language === 'en' ? 'Protection Rating' : 'تصنيف الحماية']: 'IP65'
      },
      inStock: true,
      rating: 4.7,
      reviewCount: 156,
      features: [
        language === 'en' ? 'Wi-Fi monitoring included' : 'مراقبة واي فاي مضمنة',
        language === 'en' ? 'Integrated DC disconnect' : 'قاطع تيار مستمر متكامل',
        language === 'en' ? 'Rapid shutdown compliant' : 'متوافق مع الإغلاق السريع'
      ]
    },
    {
      id: '4',
      name: language === 'en' ? 'Solar Mounting System' : 'نظام تثبيت الألواح الشمسية',
      description: language === 'en' 
        ? 'Durable aluminum mounting system for rooftop installations'
        : 'نظام تثبيت ألومنيوم متين لتركيبات السطح',
      price: 320,
      originalPrice: 450,
      images: ['/api/placeholder/400/300'],
      category: 'mounting',
      brand: 'IronRidge',
      specifications: {
        [language === 'en' ? 'Material' : 'المادة']: language === 'en' ? 'Aluminum' : 'ألومنيوم',
        [language === 'en' ? 'Wind Load' : 'حمولة الرياح']: '2400 Pa',
        [language === 'en' ? 'Snow Load' : 'حمولة الثلج']: '5400 Pa',
        [language === 'en' ? 'Warranty' : 'الضمان']: language === 'en' ? '25 years' : '25 سنة'
      },
      inStock: true,
      rating: 4.6,
      reviewCount: 78,
      features: [
        language === 'en' ? 'Pre-assembled components' : 'مكونات مُجمعة مسبقاً',
        language === 'en' ? 'Grounding integrated' : 'نظام التأريض متكامل',
        language === 'en' ? 'Universal compatibility' : 'توافق عالمي'
      ]
    },
    {
      id: '5',
      name: language === 'en' ? 'Smart Energy Monitor' : 'مراقب الطاقة الذكي',
      description: language === 'en' 
        ? 'Real-time energy monitoring and analytics system'
        : 'نظام مراقبة وتحليل الطاقة في الوقت الفعلي',
      price: 680,
      originalPrice: 850,
      images: ['/api/placeholder/400/300'],
      category: 'monitoring',
      brand: 'Enphase',
      specifications: {
        [language === 'en' ? 'Connectivity' : 'الاتصال']: 'Wi-Fi, Ethernet',
        [language === 'en' ? 'Accuracy' : 'الدقة']: '±1%',
        [language === 'en' ? 'Display' : 'الشاشة']: language === 'en' ? 'Mobile App' : 'تطبيق الجوال',
        [language === 'en' ? 'Warranty' : 'الضمان']: language === 'en' ? '5 years' : '5 سنوات'
      },
      inStock: true,
      rating: 4.5,
      reviewCount: 203,
      features: [
        language === 'en' ? 'Real-time monitoring' : 'مراقبة في الوقت الفعلي',
        language === 'en' ? 'Mobile app control' : 'تحكم عبر تطبيق الجوال',
        language === 'en' ? 'Historical data analysis' : 'تحليل البيانات التاريخية'
      ]
    },
    {
      id: '6',
      name: language === 'en' ? 'Solar Installation Kit' : 'طقم تركيب الطاقة الشمسية',
      description: language === 'en' 
        ? 'Complete installation kit with all necessary tools and accessories'
        : 'طقم تركيب كامل مع جميع الأدوات والإكسسوارات الضرورية',
      price: 1250,
      originalPrice: 1500,
      images: ['/api/placeholder/400/300'],
      category: 'accessories',
      brand: 'SolarEdge',
      specifications: {
        [language === 'en' ? 'Contents' : 'المحتويات']: language === 'en' ? '50+ items' : '50+ قطعة',
        [language === 'en' ? 'Cable Length' : 'طول الكابل']: '100m MC4',
        [language === 'en' ? 'Connectors' : 'الموصلات']: 'MC4, DC',
        [language === 'en' ? 'Tools Included' : 'الأدوات المضمنة']: language === 'en' ? 'Yes' : 'نعم'
      },
      inStock: false,
      rating: 4.4,
      reviewCount: 92,
      features: [
        language === 'en' ? 'Professional-grade tools' : 'أدوات احترافية',
        language === 'en' ? 'Safety equipment included' : 'معدات السلامة مضمنة',
        language === 'en' ? 'Installation manual' : 'دليل التركيب'
      ]
    }
  ];

  const categories = [
    { id: 'all', name: language === 'en' ? 'All Products' : 'جميع المنتجات', icon: Grid },
    { id: 'panels', name: language === 'en' ? 'Solar Panels' : 'الألواح الشمسية', icon: Sun },
    { id: 'inverters', name: language === 'en' ? 'Inverters' : 'الانفرتر', icon: Zap },
    { id: 'batteries', name: language === 'en' ? 'Batteries' : 'البطاريات', icon: Battery },
    { id: 'mounting', name: language === 'en' ? 'Mounting' : 'التثبيت', icon: Settings },
    { id: 'monitoring', name: language === 'en' ? 'Monitoring' : 'المراقبة', icon: Eye },
    { id: 'accessories', name: language === 'en' ? 'Accessories' : 'الإكسسوارات', icon: Award }
  ];

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const isInCart = (productId: string) => {
    return cartItems.some(item => item.product.id === productId);
  };

  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`card p-0 overflow-hidden group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
        viewMode === 'list' ? 'flex flex-row' : ''
      }`}
    >
      {/* Product Image */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-square'
      }`}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">
              {language === 'en' ? 'Out of Stock' : 'نفد المخزون'}
            </span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <Heart className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
          <button 
            onClick={() => setSelectedProduct(product)}
            className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            <Eye className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg leading-tight">
            {product.name}
          </h3>
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg ml-2 rtl:ml-0 rtl:mr-2">
            {product.brand}
          </span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 rtl:space-x-reverse mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
          <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {product.price.toLocaleString()} SAR
          </span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
              {product.originalPrice.toLocaleString()} SAR
            </span>
          )}
        </div>

        {/* Features (List view only) */}
        {viewMode === 'list' && (
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
              {language === 'en' ? 'Key Features:' : 'الميزات الرئيسية:'}
            </h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={!product.inStock}
          className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform active:scale-95 flex items-center justify-center space-x-2 rtl:space-x-reverse ${
            isInCart(product.id)
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
              : product.inStock
              ? 'bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-500 dark:to-teal-600 text-white hover:shadow-lg hover:scale-105'
              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          <span>
            {!product.inStock
              ? (language === 'en' ? 'Out of Stock' : 'نفد المخزون')
              : isInCart(product.id)
              ? (language === 'en' ? 'In Cart' : 'في السلة')
              : (language === 'en' ? 'Add to Cart' : 'أضف للسلة')
            }
          </span>
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-4">
              {language === 'en' ? 'Solar Products Store' : 'متجر منتجات الطاقة الشمسية'}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {language === 'en' 
                ? 'High-quality solar equipment for your energy needs'
                : 'معدات طاقة شمسية عالية الجودة لاحتياجاتك'
              }
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={language === 'en' ? 'Search products...' : 'البحث عن المنتجات...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-12 rtl:pl-4 rtl:pr-12 w-full"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field min-w-[200px]"
              >
                <option value="name">{language === 'en' ? 'Sort by Name' : 'ترتيب بالاسم'}</option>
                <option value="price-low">{language === 'en' ? 'Price: Low to High' : 'السعر: من الأقل للأعلى'}</option>
                <option value="price-high">{language === 'en' ? 'Price: High to Low' : 'السعر: من الأعلى للأقل'}</option>
                <option value="rating">{language === 'en' ? 'Highest Rated' : 'الأعلى تقييماً'}</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    viewMode === 'list'
                      ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-64 flex-shrink-0"
          >
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2 rtl:space-x-reverse">
                <Filter className="w-5 h-5" />
                <span>{language === 'en' ? 'Categories' : 'الفئات'}</span>
              </h3>
              
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = selectedCategory === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 rtl:space-x-reverse p-3 rounded-xl transition-all duration-200 text-left rtl:text-right ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{category.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feature Highlights */}
              <div className="mt-8 space-y-4">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {language === 'en' ? 'Why Choose Us?' : 'لماذا تختارنا؟'}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Free Delivery' : 'توصيل مجاني'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Warranty Included' : 'ضمان شامل'}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {language === 'en' ? 'Premium Quality' : 'جودة متميزة'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'en' 
                  ? `Showing ${sortedProducts.length} products`
                  : `عرض ${sortedProducts.length} منتج`
                }
                {selectedCategory !== 'all' && (
                  <span className="ml-2 rtl:ml-0 rtl:mr-2">
                    {language === 'en' ? 'in' : 'في'} {categories.find(c => c.id === selectedCategory)?.name}
                  </span>
                )}
              </p>
            </motion.div>

            {/* Products */}
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-6'
            }`}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {language === 'en' ? 'No products found' : 'لم يتم العثور على منتجات'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'en' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'حاول تعديل معايير البحث أو التصفية'
                  }
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Product Quick View Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {selectedProduct.name}
                  </h2>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                  >
                    <Plus className="w-6 h-6 rotate-45 text-gray-600 dark:text-gray-300" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Product Image */}
                  <div className="aspect-square rounded-2xl overflow-hidden">
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedProduct.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedProduct.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">
                        {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                      <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        {selectedProduct.price.toLocaleString()} SAR
                      </span>
                      {selectedProduct.originalPrice && (
                        <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
                          {selectedProduct.originalPrice.toLocaleString()} SAR
                        </span>
                      )}
                    </div>

                    {/* Specifications */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {language === 'en' ? 'Specifications:' : 'المواصفات:'}
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">{key}:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        {language === 'en' ? 'Features:' : 'الميزات:'}
                      </h4>
                      <ul className="space-y-2">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Add to Cart */}
                    <button
                      onClick={() => {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null);
                      }}
                      disabled={!selectedProduct.inStock}
                      className="btn-primary w-full"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2 rtl:mr-0 rtl:ml-2" />
                      {!selectedProduct.inStock
                        ? (language === 'en' ? 'Out of Stock' : 'نفد المخزون')
                        : (language === 'en' ? 'Add to Cart' : 'أضف للسلة')
                      }
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
