"use server";

import { redirect } from "next/navigation";

const { createClient } = require("@/utils/supabase/server");
const { revalidatePath } = require("next/cache");
const { headers } = require("next/headers");

export async function getUserSession() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    return null;
  }
  return { status: "success", user: data.session?.user };
}

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

  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profiles").insert([
      {
        email: data?.user.email,
        username: data?.user?.user_metadata?.username,
      },
    ]);
    if (insertError) {
      return {
        status: insertError?.message,
        user: null,
      };
    }
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

export async function signInWithGithub() {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/error");
  } else if (data.url) {
    return redirect(data.url);
  }
}

export async function forgotPassword(formData) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email"),
    {
      redirectTo: `${origin}/reset-password`,
    }
  );

  if (error) {
    return {
      status: error?.message,
    };
  }

  return { status: "success" };
}

export async function resetPassword(formData, code) {
  const supabase = await createClient();
  const { error: CodeError } = await supabase.auth.exchangeCodeForSession(code);

  if (CodeError) {
    return { status: CodeError?.message };
  }

  const { error } = await supabase.auth.updateUser({
    password: formData.get("password"),
  });

  if (error) {
    return { status: error?.message };
  }
  return { status: "success" };
}
