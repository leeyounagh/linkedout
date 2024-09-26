export function formatDateToKorean(dateString: string): string {
    // 문자열을 Date 객체로 변환
    const date = new Date(dateString);
  
    // 월과 일을 추출
    const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
  
    // '월'과 '일'을 붙여서 반환
    return `${month}월 ${day}일`;
  }
  