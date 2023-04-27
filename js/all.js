const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("date-picker");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElement = document.querySelectorAll("span");

const completeEl = document.getElementById("complete");
const completeInfo = document.getElementById("countdown-info");
const completeButton = document.getElementById("complete-button");

let countdownTitle = "";
let countdownDate = "";
let countdownValue = Date;
let countdownActive;
let saveCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// 設置今日日期
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

function updateDom() {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    inputContainer.hidden = true;

    if (distance < 0) {
      countdownEl.hidden = true;
      clearInterval(countdownActive);
      completeInfo.textContent = `Countdown Finished on ${countdownDate}`;
      completeEl.hidden = false;
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElement[0].textContent = `${days}`;
      timeElement[1].textContent = `${hours}`;
      timeElement[2].textContent = `${minutes}`;
      timeElement[3].textContent = `${seconds}`;
      completeEl.hidden = true;
      countdownEl.hidden = false;
    }
  }, second);
}

//表單取值
function updateCountdown(e) {
  e.preventDefault();
  countdownTitle = e.srcElement[0].value;
  countdownDate = e.srcElement[1].value;
  saveCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem("countdown", JSON.stringify(saveCountdown));

  if (countdownDate === "" || countdownTitle === "") {
    alert("日期或倒數標題不可為空");
  } else {
    //計算預計倒數數值
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

function reset() {
  //秀出表單 隱藏倒數畫面
  countdownEl.hidden = true;
  completeEl.hidden = true;
  inputContainer.hidden = false;

  //清空倒數
  clearInterval(countdownActive);
  //清空資料
  countdownTitle = "";
  countdownDate = "";
  localStorage.removeItem("countdown");
}

function restorePreviousCountdown() {
  if (localStorage.getItem("countdown")) {
    inputContainer.hidden = true;
    saveCountdown = JSON.parse(localStorage.getItem("countdown"));
    countdownTitle = saveCountdown.title;
    countdownDate = saveCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDom();
  }
}

//事件監聽
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", reset);
completeButton.addEventListener("click", reset);

//on load
restorePreviousCountdown();
