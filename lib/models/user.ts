import { model, models, Schema } from "mongoose";

const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true},
        username: { type: String, required: true},
        password: { type: String, required: true}
    },
    {
        timestamps: true,
    }

);
const User = models.User || model('User', UserSchema);
export default User;