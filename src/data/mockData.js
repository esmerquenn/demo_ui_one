// User data
export const userData = {
  id: 1,
  name: 'Əli',
  surname: 'Məmmədov',
  phone: '+994 50 123 45 67',
  avatar: null,
  points: 2450,
  friendsCount: 24,
  isUpgradeActive: true,
  upgradeExpiresAt: '2025-03-15',
  dailySpinAvailable: true,
  lastSpinAt: null,
  joinedAt: '2024-12-15T10:30:00',
}

// User statistics
export const userStats = {
  totalChecks: 48,
  totalSpent: 4520.80,
  totalEarned: 2450,
  avgCheckAmount: 94.18,
  favoriteStore: 'Bravo Supermarket',
  thisMonthChecks: 12,
  thisMonthPoints: 680,
  streak: 5, // ardıcıl gün
  longestStreak: 14,
}

// Daily Streak data
export const streakData = {
  currentDay: 5, // hazırda 5-ci gündə
  lastCheckDate: '2025-02-23', // son çek skan edilən tarix
  bonusDay: 4, // 4-cü gün bonus gündür (10-15 xal)
  days: [
    { day: 1, points: 1, isCompleted: true, date: '2025-02-19' },
    { day: 2, points: 2, isCompleted: true, date: '2025-02-20' },
    { day: 3, points: 3, isCompleted: true, date: '2025-02-21' },
    { day: 4, points: 12, isCompleted: true, date: '2025-02-22', isBonus: true }, // Bonus gün
    { day: 5, points: 5, isCompleted: true, date: '2025-02-23' },
    { day: 6, points: 6, isCompleted: false, date: null },
    { day: 7, points: 7, isCompleted: false, date: null },
  ],
  totalEarnedThisWeek: 23, // 1+2+3+12+5 = 23
}

// Son çeklər - detailed
export const recentChecks = [
  {
    id: 1,
    storeName: 'Bravo Supermarket',
    storeAddress: 'Nizami küç. 45, Bakı',
    amount: 45.50,
    points: 46,
    date: '2025-02-23T14:30:00',
    status: 'completed',
    fiscalId: 'FI-2025-0223-001458',
    receiptImage: null,
    items: [
      { name: 'Süd 1L', price: 2.50, qty: 2 },
      { name: 'Çörək', price: 0.80, qty: 3 },
      { name: 'Pendir 200q', price: 4.50, qty: 1 },
      { name: 'Yumurta 10-lu', price: 3.20, qty: 1 },
    ],
    paymentMethod: 'card',
    cashier: 'Aynur M.',
    taxAmount: 3.64,
  },
  {
    id: 2,
    storeName: 'Araz Market',
    storeAddress: '28 May küç. 12, Bakı',
    amount: 120.00,
    points: 120,
    date: '2025-02-22T18:15:00',
    status: 'completed',
    fiscalId: 'FI-2025-0222-002891',
    receiptImage: null,
    items: [
      { name: 'Ət 1kg', price: 18.00, qty: 2 },
      { name: 'Düyü 1kg', price: 4.50, qty: 2 },
      { name: 'Yağ 1L', price: 8.00, qty: 1 },
    ],
    paymentMethod: 'card',
    cashier: 'Rəşad K.',
    taxAmount: 9.60,
  },
  {
    id: 3,
    storeName: 'Kontakt Home',
    storeAddress: 'Azadlıq pr. 156, Bakı',
    amount: 350.00,
    points: 350,
    date: '2025-02-21T11:45:00',
    status: 'completed',
    fiscalId: 'FI-2025-0221-004521',
    receiptImage: null,
    items: [
      { name: 'Bluetooth qulaqlıq', price: 89.00, qty: 1 },
      { name: 'USB kabel', price: 15.00, qty: 2 },
      { name: 'Power bank 10000mAh', price: 65.00, qty: 1 },
    ],
    paymentMethod: 'cash',
    cashier: 'Nigar A.',
    taxAmount: 28.00,
  },
  {
    id: 4,
    storeName: 'Bolt Food',
    storeAddress: 'Online Çatdırılma',
    amount: 28.90,
    points: 29,
    date: '2025-02-20T20:00:00',
    status: 'completed',
    fiscalId: 'FI-2025-0220-008745',
    receiptImage: null,
    items: [
      { name: 'Pizza Medium', price: 18.90, qty: 1 },
      { name: 'Cola 0.5L', price: 2.50, qty: 2 },
    ],
    paymentMethod: 'card',
    cashier: 'System',
    taxAmount: 2.31,
  },
  {
    id: 5,
    storeName: 'McDonald\'s',
    storeAddress: '20 Yanvar küç. 8, Bakı',
    amount: 15.50,
    points: 16,
    date: '2025-02-20T13:30:00',
    status: 'completed',
    fiscalId: 'FI-2025-0220-006123',
    receiptImage: null,
    items: [
      { name: 'Big Mac Menu', price: 12.50, qty: 1 },
      { name: 'McFlurry', price: 3.00, qty: 1 },
    ],
    paymentMethod: 'card',
    cashier: 'Əli H.',
    taxAmount: 1.24,
  },
]

// Bütün çeklər (history üçün)
export const allChecks = [
  ...recentChecks,
  {
    id: 6,
    storeName: 'Wolt',
    storeAddress: 'Online Çatdırılma',
    amount: 42.00,
    points: 42,
    date: '2025-02-19T19:00:00',
    status: 'completed',
    fiscalId: 'FI-2025-0219-003456',
    receiptImage: null,
    items: [
      { name: 'Dönər', price: 8.00, qty: 2 },
      { name: 'Ayran', price: 1.50, qty: 2 },
      { name: 'Baklava', price: 12.00, qty: 1 },
    ],
    paymentMethod: 'card',
    cashier: 'System',
    taxAmount: 3.36,
  },
  {
    id: 7,
    storeName: 'Neptun',
    storeAddress: 'Bakıxanov küç. 32, Bakı',
    amount: 890.00,
    points: 890,
    date: '2025-02-18T16:20:00',
    status: 'completed',
    fiscalId: 'FI-2025-0218-009012',
    receiptImage: null,
    items: [
      { name: 'Samsung Galaxy Buds', price: 250.00, qty: 1 },
      { name: 'Phone Case', price: 35.00, qty: 1 },
      { name: 'Screen Protector', price: 15.00, qty: 2 },
    ],
    paymentMethod: 'card',
    cashier: 'Tural M.',
    taxAmount: 71.20,
  },
  {
    id: 8,
    storeName: 'Bazarstore',
    storeAddress: 'Əhmədli m. 15, Bakı',
    amount: 67.30,
    points: 67,
    date: '2025-02-17T10:45:00',
    status: 'completed',
    fiscalId: 'FI-2025-0217-001234',
    receiptImage: null,
    items: [
      { name: 'Meyvə-tərəvəz', price: 25.00, qty: 1 },
      { name: 'İçkilər', price: 18.30, qty: 1 },
      { name: 'Şirniyyat', price: 24.00, qty: 1 },
    ],
    paymentMethod: 'cash',
    cashier: 'Leyla Q.',
    taxAmount: 5.38,
  },
]

// Store list for filter
export const stores = [
  'Bravo Supermarket',
  'Araz Market',
  'Kontakt Home',
  'Bolt Food',
  'McDonald\'s',
  'Wolt',
  'Neptun',
  'Bazarstore',
]

// Daily spinner prizes
export const spinnerPrizes = [
  { id: 1, type: 'points', value: 10, label: '10 Xal', color: '#5B8CFF' },
  { id: 2, type: 'points', value: 25, label: '25 Xal', color: '#4FD1C5' },
  { id: 3, type: 'points', value: 50, label: '50 Xal', color: '#EC4899' },
  { id: 4, type: 'points', value: 100, label: '100 Xal', color: '#F59E0B' },
  { id: 5, type: 'multiplier', value: 2, label: '2x Bonus', color: '#8B5CF6' },
  { id: 6, type: 'empty', value: 0, label: 'Boş', color: '#6B7280' },
  { id: 7, type: 'points', value: 15, label: '15 Xal', color: '#10B981' },
  { id: 8, type: 'points', value: 5, label: '5 Xal', color: '#EF4444' },
]

// Referral sistemi
export const referralData = {
  myCode: 'ALI2024',
  myLink: 'https://birbir.az/ref/ALI2024',
  totalEarnings: 750, // Ümumi qazanılan xal
  totalInvited: 5, // Ümumi dəvət edilən
  pendingRewards: 100, // Gözləyən mükafatlar
}

// Dəvət edilmiş dostlar
export const invitedFriends = [
  {
    id: 1,
    name: 'Aysel Məmmədova',
    avatar: null,
    joinedAt: '2025-02-20T14:30:00',
    status: 'active', // active, pending, inactive
    earnedFromThem: 150, // Bu dostdan qazanılan
    theirTotalPoints: 1850,
    lastActive: '2025-02-23T10:00:00',
  },
  {
    id: 2,
    name: 'Rəşad Əliyev',
    avatar: null,
    joinedAt: '2025-02-18T09:15:00',
    status: 'active',
    earnedFromThem: 200,
    theirTotalPoints: 3200,
    lastActive: '2025-02-22T18:30:00',
  },
  {
    id: 3,
    name: 'Nigar Həsənli',
    avatar: null,
    joinedAt: '2025-02-15T16:45:00',
    status: 'active',
    earnedFromThem: 100,
    theirTotalPoints: 980,
    lastActive: '2025-02-23T08:15:00',
  },
  {
    id: 4,
    name: 'Tural Quliyev',
    avatar: null,
    joinedAt: '2025-02-10T11:20:00',
    status: 'pending', // hələ ilk çekini yükləməyib
    earnedFromThem: 0,
    theirTotalPoints: 0,
    lastActive: '2025-02-10T11:20:00',
  },
  {
    id: 5,
    name: 'Leyla Kazımova',
    avatar: null,
    joinedAt: '2025-02-05T20:00:00',
    status: 'active',
    earnedFromThem: 300,
    theirTotalPoints: 4500,
    lastActive: '2025-02-23T12:45:00',
  },
]

// Referral milestones
export const referralMilestones = [
  {
    id: 1,
    target: 1,
    reward: 100,
    title: 'İlk dost',
    description: 'İlk dostunu dəvət et',
    icon: 'user-plus',
    isCompleted: true,
    completedAt: '2025-02-05T20:00:00',
  },
  {
    id: 2,
    target: 3,
    reward: 200,
    title: '3 dost',
    description: '3 dost dəvət et',
    icon: 'users',
    isCompleted: true,
    completedAt: '2025-02-15T16:45:00',
  },
  {
    id: 3,
    target: 5,
    reward: 500,
    title: '5 dost',
    description: '5 dost dəvət et',
    icon: 'users',
    isCompleted: true,
    completedAt: '2025-02-20T14:30:00',
  },
  {
    id: 4,
    target: 10,
    reward: 1000,
    title: '10 dost',
    description: '10 dost dəvət et',
    icon: 'crown',
    isCompleted: false,
    completedAt: null,
  },
  {
    id: 5,
    target: 25,
    reward: 3000,
    title: '25 dost',
    description: '25 dost dəvət et',
    icon: 'trophy',
    isCompleted: false,
    completedAt: null,
  },
  {
    id: 6,
    target: 50,
    reward: 7500,
    title: '50 dost',
    description: '50 dost dəvət et - VIP status',
    icon: 'gem',
    isCompleted: false,
    completedAt: null,
  },
]

// Tapşırıqlar - Admin panel strukturu
// userStatus: 'idle' (hələ başlamayıb) | 'pending' (yoxlanılır) | 'completed' (tamamlanıb)
export const tasks = [
  // ===== LINK TAPŞIRIQLARI (Sosial media) =====
  {
    id: 1,
    icon: 'instagram',
    name: 'Instagram-da izlə',
    description: '@birbir.az səhifəsini izlə',
    link: 'https://instagram.com/birbir.az',
    reward: 50,
    limit: 5000, // ilk 5000 nəfər üçün
    currentParticipants: 2341,
    startDate: '2025-02-01T00:00:00',
    endDate: '2025-03-31T23:59:59',
    userStatus: 'idle',
  },
  {
    id: 2,
    icon: 'telegram',
    name: 'Telegram kanalına qoşul',
    description: 'Rəsmi Telegram kanalımıza üzv ol',
    link: 'https://t.me/birbir_az',
    reward: 30,
    limit: null, // limitsiz
    currentParticipants: 8920,
    startDate: '2025-01-15T00:00:00',
    endDate: null, // müddətsiz
    userStatus: 'completed',
  },
  {
    id: 3,
    icon: 'youtube',
    name: 'YouTube videoya bax',
    description: 'Yeni reklam videomuzu tam izlə',
    link: 'https://youtube.com/watch?v=abc123',
    reward: 25,
    limit: 1000,
    currentParticipants: 756,
    startDate: '2025-02-20T10:00:00',
    endDate: '2025-02-28T23:59:59',
    userStatus: 'idle',
  },
  {
    id: 4,
    icon: 'facebook',
    name: 'Facebook posta like qoy',
    description: 'Son paylaşımımıza like at',
    link: 'https://facebook.com/birbir/posts/123',
    reward: 20,
    limit: 2000,
    currentParticipants: 1876,
    startDate: '2025-02-22T00:00:00',
    endDate: '2025-03-01T23:59:59',
    userStatus: 'pending', // linki açıb, indi yoxlayır
  },
  {
    id: 5,
    icon: 'tiktok',
    name: 'TikTok-da izlə',
    description: '@birbir hesabını izlə',
    link: 'https://tiktok.com/@birbir',
    reward: 40,
    limit: 3000,
    currentParticipants: 1200,
    startDate: '2025-02-15T00:00:00',
    endDate: '2025-04-15T23:59:59',
    userStatus: 'idle',
  },

  // ===== ÇEK TAPŞIRIQLARI (Brend əsaslı) =====
  {
    id: 6,
    icon: 'bravo',
    name: 'Bravo-dan çek skan et',
    description: 'Bravo marketdən istənilən çeki yüklə',
    link: null, // link yoxdur, çek skan ediləcək
    reward: 100,
    limit: 10000,
    currentParticipants: 4521,
    startDate: '2025-02-01T00:00:00',
    endDate: '2025-03-15T23:59:59',
    userStatus: 'idle',
    // Çek tapşırığı üçün əlavə parametrlər
    receiptCondition: {
      type: 'store', // store | minAmount | product
      store: 'Bravo Supermarket',
    },
  },
  {
    id: 7,
    icon: 'receipt',
    name: 'Minimum 100₼ çek yüklə',
    description: 'İstənilən mağazadan 100₼+ çek skan et',
    link: null,
    reward: 150,
    limit: 5000,
    currentParticipants: 890,
    startDate: '2025-02-10T00:00:00',
    endDate: '2025-03-10T23:59:59',
    userStatus: 'idle',
    receiptCondition: {
      type: 'minAmount',
      minAmount: 100,
    },
  },
  {
    id: 8,
    icon: 'coca-cola',
    name: 'Coca-Cola çeki yüklə',
    description: 'Coca-Cola məhsulu olan çeki skan et',
    link: null,
    reward: 75,
    limit: 2000,
    currentParticipants: 1456,
    startDate: '2025-02-15T00:00:00',
    endDate: '2025-02-28T23:59:59',
    userStatus: 'completed',
    receiptCondition: {
      type: 'product',
      productKeywords: ['Coca-Cola', 'Coca Cola', 'Fanta', 'Sprite'],
    },
  },
  {
    id: 9,
    icon: 'araz',
    name: 'Araz Market-dən alış-veriş',
    description: 'Araz marketdən min. 50₼ çek yüklə',
    link: null,
    reward: 80,
    limit: 3000,
    currentParticipants: 2100,
    startDate: '2025-02-20T00:00:00',
    endDate: '2025-03-20T23:59:59',
    userStatus: 'idle',
    receiptCondition: {
      type: 'store',
      store: 'Araz Market',
      minAmount: 50,
    },
  },
  {
    id: 10,
    icon: 'receipt',
    name: 'Bu həftə 3 çek yüklə',
    description: '7 gün ərzində 3 müxtəlif çek skan et',
    link: null,
    reward: 200,
    limit: null,
    currentParticipants: 3200,
    startDate: '2025-02-19T00:00:00',
    endDate: '2025-02-26T23:59:59',
    userStatus: 'idle',
    receiptCondition: {
      type: 'count',
      targetCount: 3,
      currentCount: 1, // user-in hazırda yüklədikləri
    },
  },
]
