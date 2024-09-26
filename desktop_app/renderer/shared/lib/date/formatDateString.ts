export function formatDateString(dateString: string): string {
  const datePart = dateString.split("T")[0];

  const formattedDate = datePart.replace(/-/g, ".");

  return formattedDate;
}
