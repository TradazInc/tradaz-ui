export function hasRole(role: string | null | undefined, name: string) {
  return (
    !!role &&
    role
      .split(",")
      .map((r) => r.trim())
      .includes(name)
  );
}
