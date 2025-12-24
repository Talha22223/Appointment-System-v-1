// scripts/updatePharmacistImages.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const imageUpdates = [
  {
    email: 'sarah.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
  },
  {
    email: 'michael.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
  },
  {
    email: 'emily.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop'
  },
  {
    email: 'david.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop'
  },
  {
    email: 'lisa.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop'
  },
  {
    email: 'robert.pharmacist@example.com',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop'
  }
];

async function updatePharmacistImages() {
  console.log('Updating pharmacist images...');
  
  try {
    for (const update of imageUpdates) {
      const pharmacist = await prisma.pharmacist.findUnique({
        where: { email: update.email }
      });
      
      if (pharmacist) {
        await prisma.pharmacist.update({
          where: { email: update.email },
          data: { image: update.image }
        });
        console.log(`✓ Updated image for ${pharmacist.name}`);
      } else {
        console.log(`✗ Pharmacist with email ${update.email} not found`);
      }
    }
    
    console.log('\n✓ Pharmacist images updated successfully!');
  } catch (error) {
    console.error('Error updating pharmacist images:', error);
  } finally {
    await prisma.$disconnect();
  }
}

updatePharmacistImages();
