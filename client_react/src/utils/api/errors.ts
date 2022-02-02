export const getErrorMessage = (message: string) => {
  if (!message) return errorMessages.UNKNOWN_ERROR;
  return errorMessages[getCodeFromMessage(message)];
};

const getCodeFromMessage = (message: string) => {
  return message.toUpperCase().replace(/\s/g, '_');
};

const errorMessages = {
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다.',

  USER_DOES_EXISTS: '이미 존재하는 계정이네요. 로그인 해보세요!',
  USER_DOES_NOT_EXISTS: '존재하지 않는 계정이에요. 다시 확인해보세요!',
} as { [x: string]: string };
