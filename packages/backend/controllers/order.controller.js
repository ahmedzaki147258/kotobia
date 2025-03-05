import Order from '../models/order.model.js';
import { orderValidator, updateOrderValidator } from '../../shared/index.js';

export const createOrder = async (order) => {
    try {
        const totalPrice = order.books.reduce((total, book) => total + book.price * book.quantity, 0);
        order.totalPrice = totalPrice;
        await orderValidator.parseAsync(order);
        return await Order.create(order);

    } catch (err) {
        throw err;
    }
}

export const getById = async (Id) => {
    return await Order.find({ _id: Id }).populate("user", "name")
        .populate("books.book", "title");

}

export const updateOrder = async (data, id) => {
    try {
        const validatedData = updateOrderValidator.parse(data);
        const totalPrice = validatedData.books.reduce((total, book) => total + book.price * book.quantity, 0);
        validatedData.totalPrice = totalPrice;
        return await Order.findByIdAndUpdate(id, validatedData, { new: true, runValidators: true });
    } catch (err) {
        throw err;
    }
}

export const getAllOrder = async (isAdmin) => {
    if (isAdmin) {
        return await Order.find();
    }
    return await Order.find({ user: "67c2ddbc036f7cae384d9895" });
}

