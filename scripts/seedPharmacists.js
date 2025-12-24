// scripts/seedPharmacists.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

const pharmacistsData = [
  {
    name: 'Sarah Johnson',
    email: 'sarah.pharmacist@example.com',
    password: 'password123',
    speciality: 'Clinical Pharmacy',
    degree: 'PharmD',
    experience: '8 Years',
    fees: 40,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    about: 'Clinical pharmacist with expertise in medication therapy management and patient counseling.',
    available: true
  },
  {
    name: 'Michael Chen',
    email: 'michael.pharmacist@example.com',
    password: 'password123',
    speciality: 'Hospital Pharmacy',
    degree: 'PharmD, BCPS',
    experience: '12 Years',
    fees: 50,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    about: 'Specialized in hospital pharmacy services and critical care medication management.',
    available: true
  },
  {
    name: 'Emily Rodriguez',
    email: 'emily.pharmacist@example.com',
    password: 'password123',
    speciality: 'Community Pharmacy',
    degree: 'B.Pharm',
    experience: '5 Years',
    fees: 35,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    about: 'Community pharmacist focusing on patient education and over-the-counter medication consultation.',
    available: true
  },
  {
    name: 'David Thompson',
    email: 'david.pharmacist@example.com',
    password: 'password123',
    speciality: 'Oncology Pharmacy',
    degree: 'PharmD, BCOP',
    experience: '10 Years',
    fees: 60,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    about: 'Oncology pharmacy specialist with extensive experience in chemotherapy management.',
    available: true
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa.pharmacist@example.com',
    password: 'password123',
    speciality: 'Pediatric Pharmacy',
    degree: 'PharmD, BCPPS',
    experience: '7 Years',
    fees: 45,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop',
    about: 'Pediatric pharmacy specialist providing medication consultation for children.',
    available: true
  },
  {
    name: 'Robert Williams',
    email: 'robert.pharmacist@example.com',
    password: 'password123',
    speciality: 'Geriatric Pharmacy',
    degree: 'PharmD, CGP',
    experience: '15 Years',
    fees: 55,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    about: 'Geriatric pharmacy specialist focusing on medication management for elderly patients.',
    available: true
  }
];

async function seedPharmacists() {
  console.log('Starting pharmacist seeding...');
  
  try {
    for (const pharmacist of pharmacistsData) {
      // Check if pharmacist already exists
      const existing = await prisma.pharmacist.findUnique({
        where: { email: pharmacist.email }
      });
      
      if (existing) {
        console.log(`Pharmacist ${pharmacist.name} already exists, skipping...`);
        continue;
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(pharmacist.password, 10);
      
      // Create pharmacist
      const created = await prisma.pharmacist.create({
        data: {
          ...pharmacist,
          password: hashedPassword
        }
      });
      
      console.log(`✓ Created pharmacist: ${created.name}`);
    }
    
    console.log('\n✓ Pharmacist seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding pharmacists:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPharmacists();
