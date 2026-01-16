// 귓속말 입력 형식: "@[닉네임](아이디) 메시지"
// - ^@\[(...)\]     : @[닉네임] 으로 시작
// - \((...)\)       : (아이디) 가 이어짐
// - \s+             : 닉네임/아이디 뒤에 공백 1개 이상
// - (.+)            : 실제 메시지(최소 1글자 이상)
const WHISPER_REGEX = /^@\[([^\]]+)\]\(([^)]+)\)\s+(.+)$/;

// 멘션만 입력된 상태인지 확인하는 정규식: "@[닉네임](아이디)"
// - 메시지가 없는 경우 전송을 막기 위한 용도
const AT_ONLY_REGEX = /^@\[[^\]]+\]\([^)]+\)$/;

// 입력창이 비었거나, 멘션 트리거(@)만 찍힌 상태인지 확인
export const isEmptyOrAt = (text: string) => text === '' || text === '@';

// "@[닉네임](아이디)" 형태로만 입력된 상태인지 확인 (메시지 없음)
export const isAtOnly = (text: string) => AT_ONLY_REGEX.test(text);

// 귓속말 형식이면 대상 정보 + 메시지를 파싱하고, 아니면 null 반환
// - 잘못된 형식(@@@@@, @))))) 등) 혹은 메시지 누락은 null 처리
export const parseWhisper = (text: string) => {
  const match = text.match(WHISPER_REGEX);
  if (!match) return null;

  return {
    targetNickname: match[1],
    targetId: match[2],
    message: match[3],
  };
};
