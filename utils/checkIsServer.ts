export default function checkIsServer(){
  try {
    return typeof window === 'undefined'
  } catch (_){
    return true;
  }
};