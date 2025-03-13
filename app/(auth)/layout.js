import { redirect } from "next/navigation";
import { getUserSession } from "./login/actions";

export default async function AuthLayout({ children }) {
  const response = await getUserSession();
  if (response?.user) {
    redirect("/");
  }
  return <>{children}</>;
}
