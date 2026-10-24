import { ReturnForm } from "@/components/return-form";
export const metadata = { title: "Product Returns" };
export default function Page() {
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  return <ReturnForm today={today} />;
}
