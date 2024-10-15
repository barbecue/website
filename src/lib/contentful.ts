import { isDevelopment } from "@/lib/utils";

async function fetchGraphQL(query: string, preview = isDevelopment) {
  const res = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  );
  if (!res.ok) return undefined;
  return res.json();
}

export async function getAllPostSlugs(preview = isDevelopment) {
  const entries = await fetchGraphQL(
    `query {
      blogCollection(preview: ${preview}) {
        items {
            slug
        }
      }
    }`,
    preview,
  );

  return entries?.data?.blogCollection?.items ?? [];
}

export async function getAllPosts(preview = isDevelopment) {
  const entries = await fetchGraphQL(
    `query {
      blogCollection(preview: ${preview}) {
        items {
            cover {
                url
                width
                height
            }
            slug
            title
            description
            sys {
                firstPublishedAt
                publishedAt
            }
        }
      }
    }`,
    preview,
  );

  return entries?.data?.blogCollection?.items ?? [];
}

export async function getPostSeo(slug: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      blogCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
            seo
            sys {
              firstPublishedAt
              publishedAt
            }
        }
      }
    }`,
    preview,
  );

  return entry?.data?.blogCollection?.items?.[0];
}

export async function getPageSeo(page: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      seoCollection(where: { page: "${page}" }, preview: ${preview}, limit: 1) {
        items {
            title
            description,
            imageTitle,
            imageDescription
        }
      }
    }`,
    preview,
  );

  return entry?.data?.seoCollection?.items?.[0];
}

export async function getProjects(preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      projectsCollection(preview: ${preview}) {
        items {
            image {
              url
              width
              height
            }
            title
            href
            role
            deprecated
            invert
            sys {
              publishedAt
            }
        }
      }
    }`,
    preview,
  );
  return entry?.data?.projectsCollection?.items ?? [];
}

export async function getSocials(preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      socialsCollection(preview: ${preview}) {
        items {
            name
            url
            icon
            sys {
              publishedAt
            }
        }
      }
    }`,
    preview,
  );
  return entry?.data?.socialsCollection?.items ?? [];
}

export async function getExperiences(preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      experiencesCollection(preview: ${preview}) {
        items {
            image {
              url
              width
              height
            }
            title
            description
            present
            role
            href
            startDate
            endDate
            invert
            sys {
              publishedAt
            }
        }
      }
    }`,
    preview,
  );
  return entry?.data?.experiencesCollection?.items ?? [];
}

export async function getTechnologies(preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      technologiesCollection(preview: ${preview}) {
        items {
            category
            data
            sys {
              firstPublishedAt
            }
        }
      }
    }`,
    preview,
  );
  return entry?.data?.technologiesCollection?.items ?? [];
}

export async function getPost(slug: string, preview = isDevelopment) {
  const entry = await fetchGraphQL(
    `query {
      blogCollection(where: { slug: "${slug}" }, preview: ${preview}, limit: 1) {
        items {
            cover {
                url
                width
                height
            }
            slug
            title
            description
            content {
                json
            }
            sys {
                firstPublishedAt
                publishedAt
            }
        }
      }
    }`,
    preview,
  );

  return entry?.data?.blogCollection?.items?.[0];
}
