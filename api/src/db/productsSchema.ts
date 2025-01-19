import { doublePrecision, integer, pgTable, varchar,text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description : text(),
  image : varchar({length : 255}),
  price : doublePrecision().notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  
});


// creates zod schemas with helper package drizzle-zod
export const createProductSchema = createInsertSchema(productsTable).omit({
    id : true,
})

export const updateProductSchema = createInsertSchema(productsTable).omit({
    id : true,
}).partial()