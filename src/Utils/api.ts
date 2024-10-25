import axios from "axios";
import { API_KEY } from "@env";

const api = axios.create({
  baseURL: "https://instagram-scraper-api2.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": API_KEY,
    "x-rapidapi-host": "instagram-scraper-api2.p.rapidapi.com",
  },
});

export const getInfo = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/info",
    params: {
      username_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllPosts = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1.2/posts",
    params: {
      username_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllReels = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1.2/reels",
    params: {
      username_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data || [];
  } catch (error) {}
};

export const getStories = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/stories",
    params: {
      username_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

export const getHighlights = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/highlights",
    params: {
      username_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    return { items: [] };
  }
};

export const getHighlightInfo = async (highlightId: string) => {
  const options = {
    method: "GET",
    url: "v1/highlight_info",
    params: {
      highlight_id: highlightId,
    },
  };

  try {
    const response = await api.request(options);

    return response.data;
  } catch (error) {
    return { data: { items: [] } };
  }
};
export const getPostDetails = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/post_info",
    params: {
      code_or_id_or_url: query,
      include_insights: "true",
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getComments = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/comments",
    params: {
      code_or_id_or_url: query,
      sort_by: "popular",
    },
  };

  try {
    const response = await api.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLikes = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/likes",
    params: {
      code_or_id_or_url: query,
    },
  };

  try {
    const response = await api.request(options);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSimiliarAcc = async () => {
  const options = {
    method: "GET",
    url: "v1/similar_accounts",
    params: {
      username_or_id_or_url: "mrbeast",
    },
  };

  try {
    const response = await api.request(options);

    if (response.data && response.data.data) {
      const accounts = Object.values(response.data.data.items);
      return accounts.slice(11, 18);
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const searchUsers = async (query: string) => {
  const options = {
    method: "GET",
    url: "v1/search_users",
    params: {
      search_query: query,
    },
  };

  try {
    const response = await api.request(options);
    if (response.data.data) {
      const results = Object.values(response.data.data.items);
      return results.slice(0, 7);
    } else {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};
