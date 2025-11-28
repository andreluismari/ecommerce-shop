/* eslint-disable prettier/prettier */
import { useFavoritesContext } from "../context/FavoritesContext";

export function useFavorites() {
  return useFavoritesContext();
}
