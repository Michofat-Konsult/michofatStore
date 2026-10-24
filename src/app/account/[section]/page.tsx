import { notFound } from "next/navigation";
import { AccountDashboard } from "@/components/account-dashboard";
const sections = [
  "edit",
  "password",
  "address",
  "notifications",
  "orders",
  "downloads",
  "payments",
  "rewards",
  "returns",
  "transactions",
  "newsletter",
];
export const metadata = { title: "Customer Account" };
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!sections.includes(section)) notFound();
  return <AccountDashboard key={section} section={section} />;
}
