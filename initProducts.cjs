// ============================================================
//  Lifeline Pharmacy — Product Seeder
//  Run with: node initProducts.cjs
// ============================================================

require('dotenv').config({ override: true });
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String },
    size: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    rating: { type: Number, default: 4.5 },
    reviews: { type: Number, default: 0 },
    isPrescriptionRequired: { type: Boolean, default: false },
    expiryDate: { type: Date },
    isNewArrival: { type: Boolean, default: false },
    stockStatus: { type: String, enum: ['in_stock', 'low_stock', 'out_of_stock'], default: 'in_stock' },
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

const products = [
    // ── ANALGESICS ────────────────────────────────────────────
    {
        id: 'paracetamol-500',
        name: 'Paracetamol 500mg',
        category: 'Analgesics',
        tagline: 'Fever & General Pain Relief',
        size: 'Pack of 1000 tablets',
        description: 'The most commonly used OTC analgesic and antipyretic. Fast-acting relief for headache, toothache, menstrual pains, backache and fever.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        rating: 4.9, reviews: 412, isPrescriptionRequired: false, isNewArrival: false
    },
    {
        id: 'ibuprofen-400',
        name: 'Ibuprofen 400mg',
        category: 'Analgesics',
        tagline: 'Anti-inflammatory & Pain Relief',
        size: 'Pack of 100 tablets',
        description: 'Non-steroidal anti-inflammatory drug for effective relief of inflammation, mild to moderate pain, and fever.',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=600&q=80',
        rating: 4.7, reviews: 265, isPrescriptionRequired: false, isNewArrival: false
    },
    {
        id: 'diclofenac-50',
        name: 'Diclofenac 50mg',
        category: 'Analgesics',
        tagline: 'Musculoskeletal Pain Relief',
        size: 'Pack of 30 tablets',
        description: 'NSAID used for arthritis, muscle pain, back pain, and post-surgical pain management. Take with food.',
        price: 2200,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
        rating: 4.6, reviews: 177, isPrescriptionRequired: false, isNewArrival: false
    },

    // ── ANTIBIOTICS ───────────────────────────────────────────
    {
        id: 'amoxicillin-250',
        name: 'Amoxicillin 250mg',
        category: 'Antibiotics',
        tagline: 'Broad-Spectrum Antibiotic',
        size: 'Pack of 30 capsules',
        description: 'Effective for treatment of respiratory tract, ear, urinary tract, and skin infections. Requires valid prescription.',
        price: 3800,
        image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=600&q=80',
        rating: 4.8, reviews: 198, isPrescriptionRequired: true, isNewArrival: false
    },
    {
        id: 'amoxicillin-500',
        name: 'Amoxicillin 500mg',
        category: 'Antibiotics',
        tagline: 'Broad-Spectrum (High Dose)',
        size: 'Pack of 21 capsules',
        description: 'Higher dose amoxicillin for more severe bacterial infections. Complete the full course as prescribed.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        rating: 4.7, reviews: 134, isPrescriptionRequired: true, isNewArrival: false
    },
    {
        id: 'metronidazole-400',
        name: 'Metronidazole 400mg',
        category: 'Antibiotics',
        tagline: 'Antiprotozoal & Antibacterial',
        size: 'Pack of 21 tablets',
        description: 'Effective against anaerobic bacteria and protozoa including amoeba and Giardia. Avoid alcohol during use.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
        rating: 4.5, reviews: 223, isPrescriptionRequired: true, isNewArrival: false
    },
    {
        id: 'ciprofloxacin-500',
        name: 'Ciprofloxacin 500mg',
        category: 'Antibiotics',
        tagline: 'Fluoroquinolone Antibiotic',
        size: 'Pack of 10 tablets',
        description: 'Broad-spectrum fluoroquinolone antibiotic. Used for urinary tract, respiratory, and GI bacterial infections.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1550571017-4fcdbb59cc32?auto=format&fit=crop&w=600&q=80',
        rating: 4.6, reviews: 156, isPrescriptionRequired: true, isNewArrival: false
    },

    // ── ANTIMALARIAL ──────────────────────────────────────────
    {
        id: 'artemether-lumefantrine',
        name: 'Artemether/Lumefantrine 20/120mg',
        category: 'Antibiotics',
        tagline: 'Antimalarial Combination Therapy',
        size: 'Pack of 24 tablets',
        description: 'WHO-recommended first-line treatment for uncomplicated P. falciparum malaria. Complete full 3-day course.',
        price: 3200,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80',
        rating: 4.9, reviews: 312, isPrescriptionRequired: true, isNewArrival: false
    },

    // ── CHRONIC CARE ──────────────────────────────────────────
    {
        id: 'metformin-500',
        name: 'Metformin 500mg',
        category: 'Chronic Care',
        tagline: 'Type 2 Diabetes Management',
        size: 'Pack of 100 tablets',
        description: 'First-line treatment for type 2 diabetes. Helps control blood glucose levels. Take with or after meals.',
        price: 6200,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        rating: 4.8, reviews: 91, isPrescriptionRequired: true, isNewArrival: false
    },
    {
        id: 'losartan-50',
        name: 'Losartan 50mg',
        category: 'Chronic Care',
        tagline: 'Hypertension Management',
        size: 'Pack of 28 tablets',
        description: 'Angiotensin II receptor blocker (ARB) for treating hypertension and protecting kidneys in diabetic patients.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1550571017-4fcdbb59cc32?auto=format&fit=crop&w=600&q=80',
        rating: 4.7, reviews: 82, isPrescriptionRequired: true, isNewArrival: false, stockStatus: 'low_stock'
    },
    {
        id: 'amlodipine-5',
        name: 'Amlodipine 5mg',
        category: 'Chronic Care',
        tagline: 'Calcium Channel Blocker',
        size: 'Pack of 30 tablets',
        description: 'Used to treat high blood pressure and chest pain (angina). Taken once daily for consistent BP control.',
        price: 4800,
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80',
        rating: 4.6, reviews: 64, isPrescriptionRequired: true, isNewArrival: false
    },

    // ── SUPPLEMENTS ───────────────────────────────────────────
    {
        id: 'vitamin-c-1000',
        name: 'Vitamin C 1000mg',
        category: 'Supplements',
        tagline: 'Immune Defence Booster',
        size: 'Bottle of 60 effervescent tabs',
        description: 'High-dose vitamin C for immune support, collagen synthesis and antioxidant protection. Dissolve in water.',
        price: 4500,
        image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=600&q=80',
        rating: 4.9, reviews: 445, isPrescriptionRequired: false, isNewArrival: true
    },
    {
        id: 'omega-3',
        name: 'Omega-3 Fish Oil 1000mg',
        category: 'Supplements',
        tagline: 'Cardiovascular & Brain Health',
        size: 'Bottle of 90 softgels',
        description: 'Premium deep-sea fish oil rich in EPA and DHA. Supports heart health, brain function and joint flexibility.',
        price: 5800,
        image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=600&q=80',
        rating: 4.8, reviews: 334, isPrescriptionRequired: false, isNewArrival: false
    },
    {
        id: 'multivitamin-adult',
        name: 'Complete Multivitamin (Adult)',
        category: 'Supplements',
        tagline: 'Daily Nutritional Support',
        size: 'Bottle of 90 tablets',
        description: 'Comprehensive formula with 23 essential vitamins and minerals to fill nutritional gaps in daily diet.',
        price: 6500,
        image: 'https://images.unsplash.com/photo-1509330150-2a106a5207c6?auto=format&fit=crop&w=600&q=80',
        rating: 4.7, reviews: 289, isPrescriptionRequired: false, isNewArrival: false
    },

    // ── INJECTIONS ────────────────────────────────────────────
    {
        id: 'artesunate-60mg',
        name: 'Artesunate Injection 60mg',
        category: 'Injections',
        tagline: 'Severe Malaria Treatment',
        size: '60mg/vial',
        description: 'IV artesunate for treatment of severe P. falciparum malaria. For hospital and clinical use only.',
        price: 8500,
        image: 'https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?auto=format&fit=crop&w=600&q=80',
        rating: 4.9, reviews: 47, isPrescriptionRequired: true, isNewArrival: true
    },
    {
        id: 'ceftriaxone-1g',
        name: 'Ceftriaxone 1g (Rocephin)',
        category: 'Injections',
        tagline: 'Third-Generation Cephalosporin',
        size: '1g/vial',
        description: 'Broad-spectrum IV/IM antibiotic for serious infections including meningitis, sepsis, and pneumonia.',
        price: 4200,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=600&q=80',
        rating: 4.8, reviews: 89, isPrescriptionRequired: true, isNewArrival: false
    },
    {
        id: 'saline-500ml',
        name: 'Normal Saline 0.9% IV Fluid',
        category: 'Injections',
        tagline: 'IV Rehydration Therapy',
        size: '500ml bag',
        description: 'Isotonic sodium chloride solution for IV rehydration, drug dilution and fluid replacement. Clinical use.',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=600&q=80',
        rating: 4.9, reviews: 145, isPrescriptionRequired: true, isNewArrival: false
    },

    // ── FIRST AID ─────────────────────────────────────────────
    {
        id: 'first-aid-kit',
        name: 'Complete First Aid Kit',
        category: 'First Aid',
        tagline: 'Home & Office Emergency Kit',
        size: '72-piece kit',
        description: 'Comprehensive set with bandages, antiseptic wipes, sterile gauze, medical tape, scissors and gloves.',
        price: 5500,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&w=600&q=80',
        rating: 4.7, reviews: 198, isPrescriptionRequired: false, isNewArrival: false
    },
    {
        id: 'nitrile-gloves',
        name: 'Nitrile Exam Gloves (Medium)',
        category: 'First Aid',
        tagline: 'Powder-Free Medical Grade',
        size: 'Box of 100',
        description: 'Latex-free nitrile gloves for clinical examinations, wound care and sterile handling. Available in S/M/L.',
        price: 4200,
        image: 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=600&q=80',
        rating: 4.6, reviews: 112, isPrescriptionRequired: false, isNewArrival: false
    },
    {
        id: 'surgical-mask-50',
        name: '3-Ply Surgical Mask',
        category: 'First Aid',
        tagline: 'Medical Grade Protection',
        size: 'Box of 50 masks',
        description: 'WHO-grade 3-ply non-woven surgical mask. BFE ≥98%. Comfortable ear loop design. For clinical settings.',
        price: 3000,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
        rating: 4.5, reviews: 267, isPrescriptionRequired: false, isNewArrival: false
    }
];

async function seedProducts() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000
        });
        console.log('✅ Connected successfully.\n');

        const existing = await Product.countDocuments();
        console.log(`📦 Found ${existing} existing products. Clearing...`);
        await Product.deleteMany({});
        console.log('🗑️  Existing products removed.\n');

        console.log(`🌱 Seeding ${products.length} pharmacy products...`);
        const result = await Product.insertMany(products);
        console.log(`\n✅ Successfully seeded ${result.length} products:\n`);

        // Print summary by category
        const categories = [...new Set(products.map(p => p.category))];
        categories.forEach(cat => {
            const count = products.filter(p => p.category === cat).length;
            console.log(`   • ${cat}: ${count} product(s)`);
        });

        const verified = await Product.countDocuments();
        console.log(`\n📊 Total products in database: ${verified}`);

    } catch (err) {
        console.error('\n❌ Seeding failed:', err.message);
        if (err.message.includes('ECONNREFUSED') || err.message.includes('getaddrinfo')) {
            console.error('   → Network/DNS issue. Check your internet connection.');
        }
        if (err.message.includes('MongoServerSelectionError')) {
            console.error('   → Cannot reach MongoDB Atlas. Ensure your IP is whitelisted.');
        }
    } finally {
        console.log('\n🔒 Closing connection...');
        await mongoose.connection.close();
        console.log('Done. ✨');
        process.exit(0);
    }
}

seedProducts();
