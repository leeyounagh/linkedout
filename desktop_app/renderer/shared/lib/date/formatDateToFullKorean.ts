export function formatDateToFullKorean(dateString: string): string {
  const date = new Date(dateString);

  // 날짜가 유효하지 않으면 예외 처리
  if (isNaN(date.getTime())) {
    console.error(`Invalid date: ${dateString}`);
    return '유효하지 않은 날짜';
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };

  const formatter = new Intl.DateTimeFormat('ko-KR', options);
  const formattedDate = formatter.format(date);

  return formattedDate.replace(/\./g, '').replace(/(\d+)\s+(\d+)\s+(\d+)/, '$1년 $2월 $3일');
}