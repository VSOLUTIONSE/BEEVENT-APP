import { getDb } from "../api/queries/connection";
import { users, venue, packages, addons } from "./schema";
import { hashPassword } from "../api/lib/password";

async function seed() {
  const db = getDb();

  // Seed admin user
  const hashed = await hashPassword("admin123");
  await db.insert(users).values({
    email: "admin@velvethall.com",
    passwordHash: hashed,
    name: "Admin",
    role: "admin",
  });

  // Seed venue
  await db.insert(venue).values({
    name: "Velvet Hall",
    tagline: "Lagos' Premier Destination for Unforgettable Events",
    description:
      "Nestled in the heart of Lagos, Velvet Hall is an architectural masterpiece designed to transform your most cherished moments into timeless memories. With soaring ceilings adorned with hand-painted frescoes, crystal chandeliers that cast ethereal light, and Italian marble floors that echo with elegance, our venue offers an unparalleled setting for weddings, corporate gatherings, concerts, and intimate celebrations. Our dedicated team of event specialists ensures every detail is executed with precision, from custom lighting design to curated catering experiences. The main hall accommodates up to 500 guests, while our intimate garden terrace provides a serene outdoor option for smaller gatherings.",
    capacityMin: 50,
    capacityMax: 500,
    floorArea: 1200,
    amenities: [
    "Air Conditioning",
    "Projector & Screen",
    "Stage & Sound System",
    "VIP Parking (200 spaces)",
    "Bridal Suite",
    "Commercial Kitchen",
    "Backup Generator",
    "LED Lighting System",
    "Wi-Fi",
    "Wheelchair Accessible",
    "Outdoor Terrace",
    "Coat Check",
  ] as string[],
    address:
      "1 Velvet Drive, Lekki Phase 1, Lagos, Nigeria",
    status: "active",
  });

  // Seed packages
  await db.insert(packages).values([
    {
      name: "The Gala — Full Day",
      durationHours: 12,
      price: "2500000.00",
      includes:
        "Full venue access, Tables & chairs for 300, Basic sound system, Standard lighting, 2 security personnel, Cleaning crew, Event coordinator",
      maxCapacity: 500,
      imageUrl: "/images/package-fullday.jpg",
      isActive: true,
    },
    {
      name: "The Conference — Half Day",
      durationHours: 6,
      price: "1200000.00",
      includes:
        "Main hall access, Conference seating for 200, Projector & screen, Podium & microphones, Wi-Fi, Coffee break setup, 1 security personnel",
      maxCapacity: 200,
      imageUrl: "/images/package-halfday.jpg",
      isActive: true,
    },
    {
      name: "The Celebration — Weekend",
      durationHours: 24,
      price: "4500000.00",
      includes:
        "Full weekend venue access (Fri-Sun), Tables & chairs for 500, Premium sound & lighting, Stage setup, 4 security personnel, VIP cleaning crew, Dedicated event manager, Bridal suite access",
      maxCapacity: 500,
      imageUrl: "/images/package-weekend.jpg",
      isActive: true,
    },
  ]);

  // Seed add-ons
  await db.insert(addons).values([
    {
      name: "Generator / Power Backup",
      price: "150000.00",
      unit: "per_day",
      requiresApproval: false,
      isActive: true,
    },
    {
      name: "Event Decor — Basic",
      price: "300000.00",
      unit: "flat_fee",
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Event Decor — Premium",
      price: "750000.00",
      unit: "flat_fee",
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Security Personnel (Extra)",
      price: "50000.00",
      unit: "per_hour",
      requiresApproval: false,
      isActive: true,
    },
    {
      name: "AV Technician",
      price: "100000.00",
      unit: "per_day",
      requiresApproval: false,
      isActive: true,
    },
    {
      name: "Catering Service",
      price: "15000.00",
      unit: "per_hour",
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Photography & Videography",
      price: "400000.00",
      unit: "flat_fee",
      requiresApproval: true,
      isActive: true,
    },
    {
      name: "Red Carpet Entrance",
      price: "100000.00",
      unit: "flat_fee",
      requiresApproval: false,
      isActive: true,
    },
  ]);

  console.log("Seed complete!");
}

seed().catch(console.error);
