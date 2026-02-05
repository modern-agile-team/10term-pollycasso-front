export const FRIEND_ERROR_MESSAGES: Record<string, string> = {
  ACCESS_TOKEN_MISSING: '로그인이 필요한 서비스입니다.',
  EXPIRED_ACCESS_TOKEN: '로그인이 만료되었습니다. 다시 로그인해주세요.',
  INVALID_ACCESS_TOKEN: '로그인 정보가 유효하지 않습니다.',

  INVALID_INPUT: '입력 값이 올바르지 않습니다.',
  USER_NOT_FOUND: '존재하지 않는 사용자입니다.',
  CANNOT_REQUEST_SELF: '자기 자신에게는 친구 신청을 할 수 없습니다.',
  ALREADY_SENT_REQUEST: '이미 친구 신청을 보낸 상대입니다.',
  ALREADY_FRIEND: '이미 친구 관계인 사용자입니다.',

  BLOCKED_BY_TARGET: '상대방에게 친구 신청을 보낼 수 없는 상태입니다.',
  BLOCKING_TARGET:
    '차단한 상대에게는 신청할 수 없습니다. 차단을 먼저 해제해주세요.',
  ALREADY_BLOCKED: '이미 차단된 사용자입니다.',

  REQUEST_NOT_FOUND: '해당 친구 요청을 찾을 수 없습니다.',
  CANNOT_CANCEL_RECEIVED_REQUEST: '받은 요청은 취소할 수 없습니다.',
  CANNOT_RESPOND_OWN_REQUEST: '자신의 요청에는 응답할 수 없습니다.',
  REQUEST_ALREADY_PROCESSED: '이미 처리된 요청입니다.',
  NOT_A_FRIEND: '친구 관계가 아닙니다.',
};
