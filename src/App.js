import "./App.css";
import { useState } from "react";
import happy from "./images/happy.svg";
import unhappy from "./images/unhappy.svg";
import ReactLoading from 'react-loading'

function App() {
  const [birthday, setBirthday] = useState("");
  const [output, setOutput] = useState(null);

  const datesInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function changeBirthday(event) {
    setBirthday(event.target.value);
  }

  function showOutput(event) {
    event.preventDefault();
    setOutput(<div className="output"><ReactLoading color="#192841" /></div>)
    setTimeout(() => {
      checkPalindrome();
    }, 3000)
  }

  function checkPalindrome() {
    const dateArray = birthday.split("-");
    const inputYear = dateArray[0];
    const inputMonth = dateArray[1];
    const inputDate = dateArray[2];
    let setFlag = checkAllCombi(inputYear, inputMonth, inputDate);
    let newoutput = "";
    let palindrome = null;
    if (setFlag) {
      newoutput = `It's a palindrome in format ${setFlag}, yay 🥳!!!`;
      palindrome = (true);
    } else {
      let [nextdate, diff] = findNextDate(inputDate, inputMonth, inputYear);
      newoutput = `Umm! Your birthdate is not palindrome. FYI, Nearest palindrome date is ${nextdate}. You missed it by ${diff} days.`;
      palindrome = (false);
    }
    setOutput(
      <div className="output">
        <p>{newoutput}</p>
        <br/>
        {palindrome === true && <img src={happy} alt="happy-img" />}
        {palindrome === false && <img src={unhappy} alt="unhappy-img" />}
      </div>
    )
  }

  function checkAllCombi(yyyy, mm, dd) {
    const dateFormat1 = yyyy + mm + dd;

    const dateFormat2 = dd + mm + yyyy;

    const dateFormat3 = mm + dd + yyyy.substring(2);

    const dateFormat4 = Number(mm) + dd + yyyy;

    if (isPalindrome(dateFormat1)) {
      return `${yyyy}-${mm}-${dd}`;
    } else if (isPalindrome(dateFormat2)) {
      return `${dd}-${mm}-${yyyy}`;
    } else if (isPalindrome(dateFormat3)) {
      return `${mm}-${dd}-${yyyy.substring(2)}`;
    } else if (isPalindrome(dateFormat4)) {
      return `${Number(mm)}-${dd}-${yyyy}`;
    } else {
      return null;
    }
  }

  function isPalindrome(stringCheck) {
    const max = Math.floor(stringCheck.length / 2);
    for (let i = 0; i < max; i++) {
      if (stringCheck[i] !== stringCheck[stringCheck.length - 1 - i]) {
        return false;
      }
    }
    return true;
  }

  function findNextDate(date, month, year) {
    let ddNo1 = Number(date);
    let mmNo1 = Number(month);
    let yyNo1 = Number(year);
    let ddNo2 = Number(date);
    let mmNo2 = Number(month);
    let yyNo2 = Number(year);

    for (let i = 1; i > 0; i++) {
      ddNo1 = ddNo1 + 1;
      if (ddNo1 > Number(datesInMonth[mmNo1 - 1])) {
        ddNo1 = 1;
        mmNo1 = mmNo1 + 1;
        if (mmNo1 > 12) {
          mmNo1 = 1;
          yyNo1 = yyNo1 + 1;
        }
      }
      let yyString = yyNo1.toString();
      let mmString = mmNo1.toString();
      let ddString = ddNo1.toString();
      if (mmString.length === 1) {
        mmString = "0" + mmString;
      }
      if (ddString.length === 1) {
        ddString = "0" + ddString;
      }
      let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
      if (setFlagNextDate) {
        return [`${setFlagNextDate}`, i];
      }

      if (yyNo2 > 1) {
        ddNo2 = ddNo2 - 1;
        if (ddNo2 < 1) {
          mmNo2 = mmNo2 - 1;
          if (mmNo2 < 1) {
            mmNo2 = 12;
            yyNo2 = yyNo2 - 1;
            if (yyNo2 < 1) {
              break;
            }
            ddNo2 = datesInMonth[mmNo2 - 1];
          }
        }
        let yyString = yyNo2.toString();
        let mmString = mmNo2.toString();
        let ddString = ddNo2.toString();
        if (mmString.length === 1) {
          mmString = "0" + mmString;
        }
        if (ddString.length === 1) {
          ddString = "0" + ddString;
        }
        let setFlagNextDate = checkAllCombi(yyString, mmString, ddString);
        if (setFlagNextDate) {
          return [`${setFlagNextDate}`, i];
        }
      }
    }
  }
  return (
    <div className="App">
      <header>
        <h1>Is your birthdate a palindrome?</h1>
      </header>

      <div className="section">
        <div className="content">
          <h3>Enter your Birthdate to find whether it's a palindrome....</h3>
          <h5>
            {" "}
            <span>ⓘ</span>This app checks your birthdate in 4 formats{" "}
            <i>yyyy-mm-dd, dd-mm-yyyy, mm-dd-yy, mm-dd-yyyy</i>. for e.g. if
            your birthdate is 01 Aug 1995, then app will check for 19950801,
            01081995, 080195, 1081995
          </h5>
          <hr />
          <form onSubmit={showOutput}>
            <h3>Birth Date</h3>
            <input
              className="birthday"
              type="date"
              placeholder="Select your birth date"
              onChange={changeBirthday}
              value={birthday}
              required
            />
            <br />
            <button type="submit">Check</button>
          </form>
          <hr />
          {output}
        </div>
      </div>

      <footer>
        <div>
          <span className="footerLink github">
            <a href="https://github.com/rkreddy99">
              <i className="fab fa-github"></i>
            </a>
          </span>
          <span className="footerLink twitter">
            <a href="https://twitter.com/rkreddy99778320">
              <i className="fab fa-twitter"></i>
            </a>
          </span>
          <span className="footerLink linkedin">
            <a href="https://www.linkedin.com/in/rkreddy99">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </span>
          <span className="footerLink portfolio">
            <a href="https://rkreddy99.netlify.app/">
              <i className="fas fa-briefcase"></i>
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
