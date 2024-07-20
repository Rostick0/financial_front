import useFetcher from "../utils/fetch";

interface authMethods {
  login: (...args: Array<any>) => Promise<any>;
  register: (...args: Array<any>) => Promise<any>;
  logout: (...args: Array<any>) => Promise<any>;
  me: (...args: Array<any>) => Promise<any>;
}

export default <authMethods>{
  login: async (data) => useFetcher().post(`/Auth/Login`, data),
  register: async (data) => useFetcher().post(`/Auth/Register`, data),
  logout: async (data) => useFetcher().post(`/Auth/Logout`, data),
  me: async (params, headers) => useFetcher().get(`/Auth/Me`, params, headers),
};
