import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  numeric,
  jsonb,
  boolean,
  date,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }),
  avatar: text("avatar"),
  phone: varchar("phone", { length: 20 }),
  role: varchar("role", { length: 20 })
    .default("user")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const venue = pgTable("venue", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  tagline: varchar("tagline", { length: 500 }),
  description: text("description"),
  capacityMin: integer("capacity_min"),
  capacityMax: integer("capacity_max"),
  floorArea: integer("floor_area"),
  amenities: jsonb("amenities").$type<string[]>(),
  address: text("address"),
  status: varchar("status", { length: 20 })
    .default("active")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  durationHours: integer("duration_hours").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  includes: text("includes"),
  maxCapacity: integer("max_capacity"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const addons = pgTable("addons", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 20 }).notNull(),
  requiresApproval: boolean("requires_approval").default(false).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingRef: varchar("booking_ref", { length: 20 }).notNull().unique(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  eventName: varchar("event_name", { length: 255 }).notNull(),
  eventType: varchar("event_type", { length: 20 }).notNull(),
  guestCount: integer("guest_count").notNull(),
  packageId: integer("package_id")
    .references(() => packages.id)
    .notNull(),
  eventStart: timestamp("event_start").notNull(),
  eventEnd: timestamp("event_end").notNull(),
  setupStart: timestamp("setup_start"),
  teardownEnd: timestamp("teardown_end"),
  specialRequests: text("special_requests"),
  eventBriefUrl: text("event_brief_url"),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 30 })
    .default("draft")
    .notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const bookingAddons = pgTable("booking_addons", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .references(() => bookings.id)
    .notNull(),
  addonId: integer("addon_id")
    .references(() => addons.id)
    .notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});

export const blockedDates = pgTable("blocked_dates", {
  id: serial("id").primaryKey(),
  blockStart: date("block_start").notNull(),
  blockEnd: date("block_end").notNull(),
  reason: text("reason"),
  showAsUnavailable: boolean("show_as_unavailable").default(true).notNull(),
  createdBy: integer("created_by")
    .references(() => users.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const payments = pgTable("payments", {
  id: serial("id").primaryKey(),
  bookingId: integer("booking_id")
    .references(() => bookings.id)
    .notNull(),
  provider: varchar("provider", { length: 20 }).notNull(),
  providerRef: varchar("provider_ref", { length: 255 }),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
  status: varchar("status", { length: 20 })
    .default("initiated")
    .notNull(),
  initiatedAt: timestamp("initiated_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

export const staffActivityLog = pgTable("staff_activity_log", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  targetType: varchar("target_type", { length: 50 }),
  targetId: integer("target_id"),
  details: jsonb("details"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Venue = typeof venue.$inferSelect;
export type Package = typeof packages.$inferSelect;
export type Addon = typeof addons.$inferSelect;
export type Booking = typeof bookings.$inferSelect;
export type BlockedDate = typeof blockedDates.$inferSelect;
export type Payment = typeof payments.$inferSelect;
