"use server";

import { redirect } from "next/navigation";

const { createClient } = require("@/utils/supabase/server");
const { revalidatePath } = require("next/cache");
const { headers } = require("next/headers");

export async function signUp(formData) {
  const supabase = await createClient();

  const credentials = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        username: credentials.username,
      },
    },
  });

  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  } else if (data?.user?.identities?.length === 0) {
    return {
      status: "El usuario con este email ya existe.",
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function signIn(formData) {
  const supabase = await createClient();

  const credentials = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error, data } = await supabase.auth.signInWithPassword(credentials);
  if (error) {
    return {
      status: error?.message,
      user: null,
    };
  }

  revalidatePath("/", "layout");
  return { status: "success", user: data.user };
}

export async function singOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
