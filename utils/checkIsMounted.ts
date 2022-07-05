export default function checkIsMounted(){
  try {
    return typeof window !== 'undefined'
  } catch (_){
    return false;
  }
};