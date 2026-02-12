export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',

  LOBBY_SEND: 'lobby:send',
  LOBBY_MESSAGE: 'lobby:message',

  ROOM_STATE_SYNC: 'room:stateSync',
  UPDATE_GAME_STATE: 'room:updateGameState',
  ROOM_JOIN: 'room:join',
  ROOM_READY_TOGGLE: 'room:readyToggle',
  ROOM_CHANGE_TEAM: 'room:changeTeam',
  ROOM_KICK_USER: 'room:kickUser',
  ROOM_LEAVE: 'room:leave',

  CHAT_SEND_MESSAGE: 'chat:sendMessage',
  CHAT_NEW_MESSAGE: 'chat:newMessage',

  GAME_TYPING: 'game:typing',
  GAME_TYPING_SHARE: 'game:shareTyping',
  GAME_FINALIZE: 'game:finalize',

  FRIEND_GET_ALL: 'friends:getList',
  FRIEND_GET_ALL_RESPONSE: 'friends:getList',

  FRIEND_GET_RECOMMENDED: 'friends:getRecommendedList',
  FRIEND_GET_RECOMMENDED_RESPONSE: 'friends:getRecommendedList',

  FRIEND_SEARCH: 'friends:search',
  FRIEND_SEARCH_RESPONSE: 'friends:search',

  FRIEND_REQUEST_SEND: 'friends:requestSend',
  FRIEND_ACCEPT: 'friends:requestAccept',
  FRIEND_REJECT: 'friends:requestReject',
  FRIEND_BLOCK: 'friends:block',
  FRIEND_DELETE: 'friends:delete',

  FRIEND_STATUS_UPDATE: 'friends:statusUpdate',
  GAME_USE_ITEM: 'game:useItem',
} as const;

export type SocketEventName =
  (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
