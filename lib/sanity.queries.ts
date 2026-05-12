import { client } from "./sanity";

export async function getAllPosts() {
  return client.fetch(`
    *[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      "author": author->{ name, role, image },
      "category": category->{ title, slug },
    }
  `);
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      body,
      seoTitle,
      seoDescription,
      "author": author->{ name, role, image, bio },
      "category": category->{ title, slug },
      "relatedPosts": relatedPosts[]->{ 
        _id, title, slug, excerpt, coverImage, publishedAt,
        "category": category->{ title }
      }
    }
  `,
    { slug }
  );
}

export async function getPostsByCategory(categorySlug: string) {
  return client.fetch(
    `
    *[_type == "post" && category->slug.current == $categorySlug && defined(publishedAt)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImage,
      "author": author->{ name, role },
      "category": category->{ title, slug },
    }
  `,
    { categorySlug }
  );
}

export async function getAllCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description
    }
  `);
}