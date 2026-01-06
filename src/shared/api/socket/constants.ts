export const SOCKET_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',

  LOBBY_SEND: 'lobby:send',
  LOBBY_MESSAGE: 'lobby:message',

  ROOM_STATE_SYNC: 'room:stateSync',
  ROOM_JOIN: 'room:join',
  ROOM_READY_TOGGLE: 'room:readyToggle',
  ROOM_CHANGE_TEAM: 'room:changeTeam',
  ROOM_KICK_USER: 'room:kickUser',
  ROOM_LEAVE: 'room:leave',

  CHAT_SEND_MESSAGE: 'chat:sendMessage',
  CHAT_NEW_MESSAGE: 'chat:newMessage',

  GAME_TYPING: 'game:typing',
  GAME_TYPING_SHARE: 'game:shareTyping',
  GAME_THEME_SUBMIT: 'game:themeSubmit',
} as const;

export type SocketEventName =
  (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS];
