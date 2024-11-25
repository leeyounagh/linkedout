export function formatDateString(dateString: string): string {
  const datePart = dateString.split("T")[0];

  const formattedDate = datePart.replace(/-/g, ".");

  return formattedDate;
}


export function formatDateFullString(dateString:string) {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = date.getMonth() + 1; 
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedDate = `${year}년 ${month.toString().padStart(2, '0')}월 ${day.toString().padStart(2, '0')}일 ${hours.toString().padStart(2, '0')}시 ${minutes.toString().padStart(2, '0')}분`;

  return formattedDate;
}