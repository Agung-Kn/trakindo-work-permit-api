export const generateSlug = (title) => {
    let slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    return slug;
}

function generateArticleSlug(title) {
  return slugify(title, { lower: true, strict: true });
}

export async function generateUniqueSlug(title) {
  let baseSlug = generateArticleSlug(title);
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existing = await prisma.article.findUnique({
      where: { slug },
    });

    if (!existing) {
      return slug;
    }

    slug = `${baseSlug}-${counter++}`;
  }
}