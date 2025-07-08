export interface City {
  name: string;
  country: string;
  displayName: string;
  searchTerms: string[];
}

export const cities: City[] = [
  // 한국 주요 도시
  { name: "Seoul", country: "KR", displayName: "서울", searchTerms: ["서울", "seoul", "korea"] },
  { name: "Busan", country: "KR", displayName: "부산", searchTerms: ["부산", "busan", "pusan"] },
  { name: "Incheon", country: "KR", displayName: "인천", searchTerms: ["인천", "incheon"] },
  { name: "Daegu", country: "KR", displayName: "대구", searchTerms: ["대구", "daegu", "taegu"] },
  { name: "Daejeon", country: "KR", displayName: "대전", searchTerms: ["대전", "daejeon", "taejon"] },
  { name: "Gwangju", country: "KR", displayName: "광주", searchTerms: ["광주", "gwangju", "kwangju"] },
  { name: "Ulsan", country: "KR", displayName: "울산", searchTerms: ["울산", "ulsan"] },
  { name: "Suwon", country: "KR", displayName: "수원", searchTerms: ["수원", "suwon"] },
  
  // 일본 주요 도시
  { name: "Tokyo", country: "JP", displayName: "도쿄", searchTerms: ["도쿄", "tokyo", "일본", "japan"] },
  { name: "Osaka", country: "JP", displayName: "오사카", searchTerms: ["오사카", "osaka"] },
  { name: "Kyoto", country: "JP", displayName: "교토", searchTerms: ["교토", "kyoto"] },
  { name: "Yokohama", country: "JP", displayName: "요코하마", searchTerms: ["요코하마", "yokohama"] },
  { name: "Nagoya", country: "JP", displayName: "나고야", searchTerms: ["나고야", "nagoya"] },
  
  // 중국 주요 도시
  { name: "Beijing", country: "CN", displayName: "베이징", searchTerms: ["베이징", "beijing", "중국", "china"] },
  { name: "Shanghai", country: "CN", displayName: "상하이", searchTerms: ["상하이", "shanghai"] },
  { name: "Guangzhou", country: "CN", displayName: "광저우", searchTerms: ["광저우", "guangzhou"] },
  { name: "Shenzhen", country: "CN", displayName: "선전", searchTerms: ["선전", "shenzhen"] },
  
  // 미국 주요 도시
  { name: "New York", country: "US", displayName: "뉴욕", searchTerms: ["뉴욕", "new york", "nyc", "미국", "usa"] },
  { name: "Los Angeles", country: "US", displayName: "로스앤젤레스", searchTerms: ["로스앤젤레스", "los angeles", "la"] },
  { name: "Chicago", country: "US", displayName: "시카고", searchTerms: ["시카고", "chicago"] },
  { name: "Houston", country: "US", displayName: "휴스턴", searchTerms: ["휴스턴", "houston"] },
  { name: "Miami", country: "US", displayName: "마이애미", searchTerms: ["마이애미", "miami"] },
  { name: "San Francisco", country: "US", displayName: "샌프란시스코", searchTerms: ["샌프란시스코", "san francisco"] },
  { name: "Las Vegas", country: "US", displayName: "라스베이거스", searchTerms: ["라스베이거스", "las vegas"] },
  
  // 유럽 주요 도시
  { name: "London", country: "GB", displayName: "런던", searchTerms: ["런던", "london", "영국", "uk"] },
  { name: "Paris", country: "FR", displayName: "파리", searchTerms: ["파리", "paris", "프랑스", "france"] },
  { name: "Berlin", country: "DE", displayName: "베를린", searchTerms: ["베를린", "berlin", "독일", "germany"] },
  { name: "Madrid", country: "ES", displayName: "마드리드", searchTerms: ["마드리드", "madrid", "스페인", "spain"] },
  { name: "Rome", country: "IT", displayName: "로마", searchTerms: ["로마", "rome", "이탈리아", "italy"] },
  { name: "Amsterdam", country: "NL", displayName: "암스테르담", searchTerms: ["암스테르담", "amsterdam", "네덜란드"] },
  { name: "Barcelona", country: "ES", displayName: "바르셀로나", searchTerms: ["바르셀로나", "barcelona"] },
  { name: "Vienna", country: "AT", displayName: "비엔나", searchTerms: ["비엔나", "vienna", "오스트리아"] },
  
  // 동남아시아 주요 도시
  { name: "Bangkok", country: "TH", displayName: "방콕", searchTerms: ["방콕", "bangkok", "태국", "thailand"] },
  { name: "Singapore", country: "SG", displayName: "싱가포르", searchTerms: ["싱가포르", "singapore"] },
  { name: "Kuala Lumpur", country: "MY", displayName: "쿠알라룸푸르", searchTerms: ["쿠알라룸푸르", "kuala lumpur", "말레이시아"] },
  { name: "Jakarta", country: "ID", displayName: "자카르타", searchTerms: ["자카르타", "jakarta", "인도네시아"] },
  { name: "Manila", country: "PH", displayName: "마닐라", searchTerms: ["마닐라", "manila", "필리핀"] },
  { name: "Ho Chi Minh City", country: "VN", displayName: "호치민", searchTerms: ["호치민", "ho chi minh", "베트남"] },
  
  // 기타 주요 도시
  { name: "Sydney", country: "AU", displayName: "시드니", searchTerms: ["시드니", "sydney", "호주", "australia"] },
  { name: "Melbourne", country: "AU", displayName: "멜버른", searchTerms: ["멜버른", "melbourne"] },
  { name: "Toronto", country: "CA", displayName: "토론토", searchTerms: ["토론토", "toronto", "캐나다", "canada"] },
  { name: "Vancouver", country: "CA", displayName: "밴쿠버", searchTerms: ["밴쿠버", "vancouver"] },
  { name: "Dubai", country: "AE", displayName: "두바이", searchTerms: ["두바이", "dubai", "아랍에미리트"] },
  { name: "Mumbai", country: "IN", displayName: "뭄바이", searchTerms: ["뭄바이", "mumbai", "인도", "india"] },
  { name: "Delhi", country: "IN", displayName: "델리", searchTerms: ["델리", "delhi", "뉴델리"] },
];

export const searchCities = (query: string): City[] => {
  if (!query.trim()) return cities.slice(0, 10);
  
  const lowerQuery = query.toLowerCase();
  return cities.filter(city => 
    city.searchTerms.some(term => term.toLowerCase().includes(lowerQuery))
  ).slice(0, 10);
};