export default function slugify(str: string): string {
  str = str.replace(/^\s+|\s+$/g, ""); // trim whitespace
  str = str.toLowerCase(); // convert to lowercase
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid characters
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/-+/g, "-"); // collapse multiple dashes
  return str;
}
