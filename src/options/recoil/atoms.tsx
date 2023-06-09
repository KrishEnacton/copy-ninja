import { User } from "@supabase/supabase-js";
import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: JSON.parse(localStorage.getItem("user") ||  "{}") as any
})
export const isEditState = atom({
    key: 'isEditState',
    default: false as boolean,
  })