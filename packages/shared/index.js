import { z, ZodError } from "zod";

export { ZodError };
export const main = z.object({
  name: z.string(),
});

const contactValidator = z.object({
  address: z.string(),
  phone: z.string(),
});
export const userValidator = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["admin", "user"]),
  contact: z.union([z.null(), contactValidator])
});
export const updateUserValidator = userValidator.partial({
  name: true,
  email: true,
  password: true,
  role: true,
  contact: true,
});

export const userPasswordValidator = z
  .object({
    currentPassword: z.string().min(8),
    newPassword: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export const orderValidator = z.object({
  user: z.string().min(1, "User ID is required"),
  books: z
    .array(
      z.object({
        book: z.string().min(1, "Book ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        price: z.number().min(0, "price must be a positive number"),
      })
    )
    .nonempty("At least one book is required"),
  totalPrice: z.number().min(0, "Total price must be a positive number"),
  status: z.enum(["Completed", "Processing", "Pending", "Cancelled"]),
});

export const updateOrderValidator = z.object({
  status: z.enum(["Completed", "Processing", "Pending", "Cancelled"]),
});

export const userLoginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export * from "./cart.validator.js";
export * from "./error.validator.js";
export * from "./review.validator.js";
export * from "./book.validator.js";
export * from "./payment.validator.js";;
export * from './register.validator.js'
