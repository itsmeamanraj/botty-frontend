import { apiFetch } from "./api";

export interface IndustryOption {
  value: string;
  label: string;
}

export async function fetchIndustries(): Promise<IndustryOption[]> {
  const data = await apiFetch<{ industries: IndustryOption[] }>(
    "/api/v1/industries",
  );
  return data.industries;
}
