export function debounce (f, delay){
    let timer;
    return function (...args) {
      if(timer){
        clearTimeout(timer);
      }
      timer = setTimeout(() => f(...args), delay);
    }
  }