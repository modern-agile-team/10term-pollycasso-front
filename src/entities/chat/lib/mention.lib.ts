/**
 * 귓속말 입력을 파싱하기 위한 정규표현식
 * - ^@\[([^\]]+)\] : 문장 시작점에서 @[닉네임] 형식을 캡처
 * - \(([^)]+)\)    : 이어서 (아이디) 형식을 캡처
 * - \s+            : 대상 정보와 실제 메시지 사이의 공백 (1개 이상)
 * - (.+)           : 전송될 실제 메시지 내용 (최소 1글자)
 * @example "@[뚝배기](123) 안녕하세요"
 */
const WHISPER_REGEX = /^@\[([^\]]+)\]\(([^)]+)\)\s+(.+)$/;

/**
 * 메시지 없이 멘션 대상만 있는 상태인지 확인하는 정규표현식
 * - 멘션 선택 직후 메시지를 입력하지 않은 상태를 감지하여 전송을 방지함
 * @example "@[뚝배기](123)"
 */
const AT_ONLY_REGEX = /^@\[[^\]]+\]\([^)]+\)$/;

/**
 * 입력값이 비어있거나 멘션 트리거(@)만 입력된 상태인지 확인합니다.
 * @param text - 검사할 채팅 입력 문자열
 * @returns 비어있거나 @만 있다면 true
 */
export const isEmptyOrAt = (text: string): boolean =>
  text === '' || text === '@';

/**
 * 멘션 대상만 지정되고 실제 메시지 본문은 없는 상태인지 확인합니다.
 * @param text - 검사할 채팅 입력 문자열
 * @returns 메시지 없이 멘션만 있다면 true
 */
export const isAtOnly = (text: string): boolean => AT_ONLY_REGEX.test(text);

/**
 * 귓속말 형식(@[닉네임](아이디) 메시지)을 파싱하여 대상 정보와 메시지를 추출합니다.
 * - 형식이 맞지 않거나(@@@@@ 등), 메시지 내용이 누락된 경우 null을 반환합니다.
 * * @param text - 파싱할 전체 입력 문자열
 * @returns 파싱된 귓속말 객체 { targetNickname, targetId, message } 또는 null
 */
export const parseWhisper = (text: string) => {
  const match = text.match(WHISPER_REGEX);
  if (!match) return null;

  return {
    targetNickname: match[1],
    targetId: match[2],
    message: match[3],
  };
};
