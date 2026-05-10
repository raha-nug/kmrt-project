"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui-elements/button";

export function SubmitButton({ disabled }: { disabled?: boolean }) {
  const { pending } = useFormStatus(); // Akan true saat form sedang diproses

  return (
    <Button disabled={disabled} label="Simpan" shape="rounded" type="submit" loading={pending} />
  );
}
