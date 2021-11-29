const mongoose = require('mongoose')

const RestaurantInfoSchema = new mongoose.Schema({
  about: { type: String, maxlength: 1000 },
  address: { type: String },
  name: { type: String },
  phone: { type: String, unique: true },
  emailContact: { type: String, unique: true }
})

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, select: false },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true },
    birthday: { type: Date, required: false },
    isRestaurant: { type: Boolean, required: true },
    restaurantInfo: {
      type: RestaurantInfoSchema,
      required: function () {
        return this.isRestaurant
      }
    }
  },
  { timestamps: true, _id: 'id' }
)

module.exports = mongoose.model('Users', UserSchema)
