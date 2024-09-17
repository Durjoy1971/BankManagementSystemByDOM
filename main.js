const users = [
  {
    userId: 1,
    userName: "DJ",
    passWord: "1",
    totalMoney: 0,
    historyTransaction: [
      {
        type: "Deposit",
        amount: 100,
      },
      {
        type: "Withdraw",
        amount: -20,
      },
      {
        type: "Transfer",
        amount: -30,
      },
    ],
  },
  {
    userId: 2,
    userName: "D",
    passWord: "1",
    totalMoney: 0,
    historyTransaction: [
      {
        type: "Deposit",
        amount: 100,
      },
    ],
  },
];

let id = 10;
let currentUser = {};

const welcomePage = document.querySelector("#welcomePage");
const mainPage = document.querySelector("#mainPage");

//* Welcome Page Works

const loginUserName = document.querySelector("#loginUserName");
const loginPassword = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");
const signUpPassword = document.querySelector("#signUpPassword");
const signUpBtn = document.querySelector("#signUpBtn");
const signUpUserName = document.querySelector("#signUpUserName");

const handleLoginBtn = () => {
  let userName = loginUserName.value.trim();
  let passWord = loginPassword.value.trim();

  if (userName === "" || passWord === "") {
    alert("Type UserName and Password Correctly");
  } else {
    // user ==> userId, userName, passWord, totalMoney, totalDeposit, totalWithdraw, totalTransfer

    let flag = userMatching(userName, passWord);

    if (flag === false) {
      alert("Type Your UserName and Password Correctly");
    } else {
      alert("Login Successfully");
      loginUserName.value = "";
      loginPassword.value = "";
      nextPage(userName);
    }
  }
};

const userMatching = (userName, passWord) => {
  let flag = false;
  users.map((user) => {
    if (user.userName === userName && user.passWord === passWord) {
      currentUser = user;
      flag = true;
    }
  });

  return flag;
};

const handleSignUpBtn = () => {
  let userName = signUpUserName.value.trim();
  let passWord = signUpPassword.value.trim();

  if (userName === "" || passWord === "") {
    alert("Type UserName and Password Correctly");
  }

  let flag = userMatching(userName, passWord);
  //* true means userName is not valid

  if (flag) {
    alert("UserName Exist. Type Another UserName");
    signUpUserName.value = "";
  } else {
    // user ==> userId, userName, passWord, totalMoney, totalDeposit, totalWithdraw, totalTransfer
    const user = {
      userId: ++id,
      userName: userName,
      passWord: passWord,
      totalMoney: 0,
      historyTransaction: [],
    };
    users.push(user);
    signUpUserName.value = "";
    signUpPassword.value = "";
    alert("Account Created Successfully");
  }
};

//* Main Page
const historyUserTransaction = document.querySelector(
  "#historyUserTransaction"
);
const welcomeUser = document.querySelector("#welcomeUser");
const userMoney = document.querySelector("#userMoney");

const displayUserNameMoney = () => {
  welcomeUser.textContent = currentUser.userName;
  userMoney.textContent = `Cash : ${currentUser.totalMoney}`;
};

const loadHistoryOfTransaction = (flag = false) => {
  // historyUserTransaction
  historyUserTransaction.innerHTML = "";
  currentUser.historyTransaction.map((types) => {
    if (flag) currentUser.totalMoney += types.amount;
    let text = `${types.type} : ${types.amount}`;
    const textElement = document.createElement("h1");
    textElement.textContent = text;
    historyUserTransaction.append(textElement);
    userMoney.textContent = `Cash : ${currentUser.totalMoney}`;
  });
};



//* transaction menu ==> selection
const transactionType = document.querySelector("#transactionType");
const transactionBtn = document.querySelector("#transactionBtn");

//* Transaction Konta Dhekaboo
const depositWithdraw = document.querySelector("#depositWithdraw");
const transfer = document.querySelector("#transfer");
const depositWithdrawTypes = document.querySelector("#depositWithdrawTypes");

const handleTransactionBtn = () => {
  const chosen = transactionType.value;
  console.log(chosen);
  if (chosen === "Transfer") {
    transfer.classList = "";
    depositWithdraw.classList = "hidden";
    depositWithdrawTypes.textContent = chosen;
  } else {
    transfer.classList = "hidden";
    depositWithdraw.classList = "";
    depositWithdrawTypes.textContent = chosen;
  }
};

//* depositWithdraw r jonno
const depositWithdrawAmount = document.querySelector("#depositWithdrawAmount");

const depositWithdrawBtn = () => {
  const value = depositWithdrawAmount.value;
  let flag = false;
  if (depositWithdrawTypes.textContent === "Deposit") {
    if (value >= 1) {
      const currentAmount = Number(currentUser.totalMoney) + Number(value);
      currentUser.totalMoney = currentAmount;
      displayUserNameMoney();
      currentUser.historyTransaction.push({
        type: depositWithdrawTypes.textContent,
        amount: Number(value),
      });
      flag = true;
    } else {
      alert(`Negative Value Can't Be Deposit!! `);
    }
  } else {
    if (value <= Number(currentUser.totalMoney) && value >= 1) {
      const currentAmount = Number(currentUser.totalMoney) + Number(value * -1);
      currentUser.totalMoney = currentAmount;
      displayUserNameMoney();
      currentUser.historyTransaction.push({
        type: depositWithdrawTypes.textContent,
        amount: Number(value * -1),
      });
      flag = true;
      currentUser.historyTransaction.push({
        type: depositWithdrawTypes.textContent,
        amount: Number(value * -1),
      });
    } else {
      alert(`Insufficient Balance!! `);
    }
  }
  if (flag) {
    alert(`Transaction Successfull !! `);
    loadHistoryOfTransaction();
    depositWithdraw.classList = "hidden";
    transfer.classList = "hidden";
  }
};

//* transfer r jonno
const transferUserName = document.querySelector("#transferUserName");
const transferAmount = document.querySelector("#transferAmount");

const receiverMatching = (userName) => {
  let flag = false;
  users.map((user) => {
    if (user.userName === userName) {
      flag = true;
    }
  });

  return flag;
};

const transferBtn = () => {
  const value = Number(transferAmount.value);
  const receiver = transferUserName.value;
  let flag = false;

  //   console.log(value, receiver);

  if (
    value >= 1 &&
    value <= currentUser.totalMoney &&
    receiver != currentUser.userName &&
    receiverMatching(receiver)
  ) {
    let receiverUser = {};
    users.map((user) => {
      if (user.userName === receiver) {
        receiverUser = user;
      }
    });
    // console.log();
    receiverUser.historyTransaction.push({
      type: "Deposit",
      amount: value,
    });
    currentUser.totalMoney += value * -1;
    currentUser.historyTransaction.push({
      type: "Transfer",
      amount: value * -1,
    });
    flag = true;
  } else {
    alert(`Insufficient Balance!! `);
  }

  if (flag) {
    alert(`Transaction Successfull !! `);
    loadHistoryOfTransaction();
    depositWithdraw.classList = "hidden";
    transfer.classList = "hidden";
  }
};

//* For Combine Page
function initialPage() {
  //nextPage();
  previousPage();
}

function nextPage(loginUserName) {
  console.log(loginUserName);
  welcomePage.classList = "hidden";
  mainPage.classList = "";

  users.forEach((value,index) => {
    if(value.userName === loginUserName){
        currentUser = users[index];
    }
  })

  displayUserNameMoney();
  loadHistoryOfTransaction(true);
}

function previousPage() {
  mainPage.classList = "hidden";
  welcomePage.classList = "";
}

const logOutBtn = () => {
    previousPage();
    currentUser = {};
    alert('Log Out Successfull');
}

initialPage();
