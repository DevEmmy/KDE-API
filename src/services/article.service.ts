import { notFound } from "../config/errors.config";
import { ForbiddenError, NotFoundError } from "../helpers/error-responses";
import slugify from "../helpers/slugify";
import { IArticle } from "../interfaces/model/article.interface";
import Article from "../models/article.model";
import CategoryService from "./category.service";

export default class ArticleServices {
  private readonly categoryService: CategoryService;

  constructor() {
    this.categoryService = new CategoryService();
  }

  public findById = async (id: string): Promise<IArticle> => {
    const article = await Article.findById(id);

    if (!article) throw new NotFoundError("article does not exist");

    return article;
  };

  public getArticles = async (
    query: Partial<IArticle>
  ): Promise<IArticle[]> => {
    const articles = await Article.find<IArticle>(query);

    return articles;
  };

  public deleteArticle = async (userId: string, articleId: string) => {
    const article = await Article.findById(articleId);

    if (!article) throw new NotFoundError("Article does not exist");

    if (article.author.toString() != userId.toString())
      throw new ForbiddenError("This article does not belong to you");

    await article.deleteOne();
  };

  public addArticle = async (query: Omit<IArticle, "slug" | "_id">) => {
    let { title, cover, body, author, category } = query;

    category = await this.categoryService.getCategoryById(category as string);

    const slug = slugify(title);

    return await Article.create({
      author,
      title,
      cover,
      slug,
      category: category?._id,
      body,
    });
  };

  public editArticle = async (query: Partial<IArticle>): Promise<IArticle> => {
    let { _id, title, slug, cover, body, author, category } = query;
    category = await this.categoryService.getCategoryById(category as string);

    const article = await Article.findById(_id);

    if (!article) throw new NotFoundError("Article does not exist");

    if (article.author.toString() != author?.toString())
      article.title = title || article.title;
    article.slug = slugify(title || article.title);
    article.cover = cover || article.cover;
    article.body = body || article.body;

    return await article.save();
  };
}
