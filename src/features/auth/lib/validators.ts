export const validateUsername = (value: string) => {
  if (
    !value ||
    value.length < 5 ||
    value.length > 20 ||
    !/^[a-z0-9_-]+$/.test(value)
  ) {
    return '아이디는 5~20자 이내의 영어 소문자(a-z), 숫자(0-9), 특수문자(_, -)로 구성되어야 합니다.';
  }
  return true;
};

export const validateNickname = (value: string) => {
  const koreanChars = value.match(/[가-힣]/g) || [];
  if (
    !value ||
    value.length < 2 ||
    value.length > 30 ||
    !/^[가-힣a-zA-Z0-9]+$/.test(value) ||
    koreanChars.length > 10
  ) {
    return '닉네임은 한글 10자, 영문/숫자 30자 이내로 구성되어야 합니다.';
  }
  return true;
};

export const validatePassword = (value: string) => {
  if (
    !value ||
    value.length < 8 ||
    value.length > 20 ||
    !/[a-zA-Z]/.test(value) ||
    !/\d/.test(value) ||
    !/[^a-zA-Z0-9]/.test(value)
  ) {
    return '비밀번호는 8~20자이며, 영문자, 숫자, 특수문자를 각각 1자 이상 포함해야 합니다.';
  }
  return true;
};
