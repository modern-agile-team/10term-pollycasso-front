// - ^@\[([^\]]+)\] : @[닉네임] 으로 시작
// - \(([^)]+)\) : (아이디) 가 이어짐
// - \s+ : 하나 이상의 공백
// - (.+) : 그 뒤에 오는 실제 메세지 내용
const WHISPER_REGEX = /^@\[([^\]]+)\]\(([^)]+)\)\s+(.+)$/;

// @@@@@, @)))))) 등 귓속말 양식이 아니거나 일반 채널일 때 -> global 전송
// 단, 멘션만 있고 메세지가 없는 경우(@[이름](id))는 전송하지 않음
const AT_ONLY_REGEX = /^@\[[^\]]+\]\([^)]+\)$/;

export const isEmptyOrAt = (text: string) => text === '' || text === '@';
export const isAtOnly = (text: string) => AT_ONLY_REGEX.test(text);
export const parseWhisper = (text: string) => {
  const match = text.match(WHISPER_REGEX);
  if (!match) return null;
  return {
    targetNickname: match[1],
    targetId: match[2],
    message: match[3],
  };
};
