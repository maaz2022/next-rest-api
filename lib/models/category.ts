import { timeStamp } from "console";
import { model, models, Schema } from "mongoose";
import { title } from "process";

const CategorySchema = new Schema(
    {
        title: {type: "string", required: true},
        user: {type : Schema.Types.ObjectId, ref: "User"}
    },
    {
        timestamps: true,
    }
);
const Category = models.Category || model("Category", CategorySchema);
export default Category;