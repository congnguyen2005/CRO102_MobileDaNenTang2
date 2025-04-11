import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    // 1️⃣ Lấy chi tiết pokemon theo tên
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name.toLowerCase()}`,
    }),

    // 2️⃣ Lấy danh sách tất cả pokemon (tên + url)
    getPokemonList: builder.query({
      query: () => `pokemon?limit=100000&offset=0`,
    }),
  }),
});

export const {
  useLazyGetPokemonByNameQuery,
  useGetPokemonListQuery,
} = pokemonApi;
