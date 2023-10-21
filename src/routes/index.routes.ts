import auth from "./auth.routes";
import user from "./user.routes";
import newsletter from "./newsletter.routes";
import category from "./category.routes";
import listing from "./listing.routes";
import article from "./article.routes";
import property_request from "./property-request.routes";

const routes = {
  auth,
  user,
  newsletter,
  category,
  listing,
  article,
  property_request,
};

export default routes;
