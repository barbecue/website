const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
  },
};

export async function getRaindrops(pageIndex = 0) {
  try {
    const queryParams = new URLSearchParams({
      page: pageIndex.toString(),
      perpage: "50",
    });
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_RAINDROP_API_URL}/raindrops/${process.env.NEXT_PUBLIC_RAINDROP_COLLECTION_ID}?${queryParams}`,
      options,
    );

    return await response.json();
  } catch (error) {
    return null;
  }
}
