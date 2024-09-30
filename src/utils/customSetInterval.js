export default function customSetInterval(callback, delay) {
  let intervalId;

  function repeat() {
    callback();
    intervalId = setTimeout(repeat, delay);
  }

  intervalId = setTimeout(repeat, delay);
  return intervalId;
}
