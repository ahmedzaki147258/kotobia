import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            validate: {
              validator: async function (value) {
                const user = await mongoose.model("User").findById(value);
                if (user === null) return false;
                return true;
              },
              message: (props) => `User with ID ${props.value} does not exist.`,
            },
          },
        books: {
            type: [{
                book: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book",
                    required: true,
                    validate: {
                      validator: async function (value) {
                        const book = await mongoose.model("Book").findById(value);
                        if (book === null) return false;
                        return true;
                      },
                      message: (props) => `Book with ID ${props.value} does not exist.`,
                    },
                  },
                quantity: {
                    type: Number,
                    required: true,
                    min: 0
                },
                price: {
                    type: Number,
                    required: true,
                }
            }],
            required: true,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'canceled'],
            default: 'pending',
        },
        session:{
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);
const Order = mongoose.model('Order', orderSchema);
export default Order;



