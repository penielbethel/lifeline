// Initialize products in the database
// Run this once: node initProducts.js

require('dotenv').config({ override: true });
const mongoose = require('mongoose');

// Product Schema
// Product Schema
const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tagline: { type: String },
    size: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    isPrescriptionRequired: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', ProductSchema);

const initialProducts = [
    {
        id: 'panadol',
        name: 'Panadol Extra',
        category: 'Analgesics',
        tagline: 'Fast Pain Relief',
        size: '10 Tablets',
        description: 'Effective temporary relief of pain and discomfort associated with headache, tension headache, migraine, muscular aches.',
        price: 500,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5e45c7540?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.8,
        reviews: 124,
        isPrescriptionRequired: false
    },
    {
        id: 'amoxicillin',
        name: 'Amoxil 500mg',
        category: 'Antibiotics',
        tagline: 'Broad-spectrum Antibiotic',
        size: '15 Capsules',
        description: 'Used to treat a variety of bacterial infections. Prescription required.',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 86,
        isPrescriptionRequired: true
    },
    {
        id: 'vitaminc',
        name: 'Vitamin C 1000mg',
        category: 'Supplements',
        tagline: 'Immune System Support',
        size: '30 Tablets',
        description: 'High-strength Vitamin C to support immune system function and collagen formation.',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1550572017-edb79aa42e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 5.0,
        reviews: 215,
        isPrescriptionRequired: false
    },
    {
        id: 'artemether',
        name: 'Artemether/Lumefantrine',
        category: 'Analgesics',
        tagline: 'Antimalarial Treatment',
        size: '24 Tablets',
        description: 'Highly effective combination therapy for the treatment of acute, uncomplicated malaria.',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.9,
        reviews: 98,
        isPrescriptionRequired: true
    },
    {
        id: 'rocephin',
        name: 'Rocephin 1g',
        category: 'Injections',
        tagline: 'Ceftriaxone Injection',
        size: '1 Vial',
        description: 'Broad-spectrum cephalosporin antibiotic for intravenous or intramuscular use.',
        price: 3500,
        image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 4.7,
        reviews: 142,
        isPrescriptionRequired: true
    },
    {
        id: 'firstaidkit',
        name: 'Family First Aid Kit',
        category: 'First Aid',
        tagline: 'Complete Emergency Kit',
        size: '1 Kit',
        description: 'Comprehensive first aid kit containing bandages, antiseptics, scissors, and other essentials for home emergencies.',
        price: 8000,
        image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        rating: 5.0,
        reviews: 310,
        isPrescriptionRequired: false
    }
];

async function initProducts() {
    try {
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        console.log('Connected to MongoDB successfully.');

        console.log('Cleaning existing products...');
        await Product.deleteMany({});
        console.log('Existing products cleared.');

        console.log(`Seeding ${initialProducts.length} pharmacy products...`);
        await Product.insertMany(initialProducts);
        console.log('Pharmacy products seeded successfully!');

        // Verify
        const products = await Product.find();
        console.log('\n📦 Products in database:');
        products.forEach(p => {
            console.log(`   - ${p.name} (${p.size}): ₦${p.price.toLocaleString()}`);
        });

        console.log('\n🎉 All done! You can now use the admin dashboard to edit prices.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

initProducts();
