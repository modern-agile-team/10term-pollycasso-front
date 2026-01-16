import type { Friend } from '@/shared/model';

export const MENTION_STYLE = {
  control: {
    backgroundColor: 'transparent',
    fontSize: 18,
    fontWeight: 'normal',
    width: '100%',
    lineHeight: '1.5',
    letterSpacing: 'normal',
  },

  '&singleLine': {
    display: 'inline-block',
    width: '100%',

    highlighter: {
      padding: '10px 12px',
      border: '2px solid transparent',
      margin: 0,
      color: 'transparent',
    },

    input: {
      padding: '10px 12px',
      border: '2px solid transparent',
      outline: 'none',
      margin: 0,
      color: 'black',
      caretColor: 'black',
    },
  },

  suggestions: {
    list: {
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      fontSize: 16,
      overflow: 'hidden',
      marginTop: 24,
      zIndex: 9999,
    },
    item: {
      padding: '8px 12px',
      '&focused': {
        backgroundColor: '#e5e7eb',
      },
    },
  },
};

export const mapFriendsToSuggestions = (friends: Friend[]) =>
  friends.map((f) => ({ id: String(f.id), display: f.name }));
