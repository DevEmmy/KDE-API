import mongoose, { Types } from "mongoose";
import { IArticle } from "../interfaces/model/article.interface";
import { Collections } from "../interfaces/collections";

const ArticleSchema = new mongoose.Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true },
    cover: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: Types.ObjectId, ref: Collections.user, required: true },
    category: {
      type: Types.ObjectId,
      ref: Collections.category,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Article = mongoose.model(Collections.article, ArticleSchema);
export default Article;
