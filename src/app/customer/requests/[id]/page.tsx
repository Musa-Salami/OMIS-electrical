import { serviceRequests } from "@/lib/mockData"
import RequestDetailClient from "./RequestDetailClient"

export function generateStaticParams() {
  return serviceRequests.map((req) => ({
    id: req.id,
  }))
}

export default function RequestDetailPage() {
  return <RequestDetailClient />
}