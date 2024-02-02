import { useState } from 'react';
import './App.css';

function App() {
  let [rno, setrno] = useState('');
  let [name, setname] = useState('');
  let [sub1, setsub1] = useState('');
  let [sub2, setsub2] = useState('');
  let [sub3, setsub3] = useState('');
  let [sub4, setsub4] = useState('');
  let [sub5, setsub5] = useState('');
  let [marks, setmarks] = useState([]);
  let [set, reset] = useState([]);
  let total, min = 0, max = 0, per, cnt = 0, result;
  total = parseFloat(sub1) + parseFloat(sub2) + parseFloat(sub3) + parseFloat(sub4) + parseFloat(sub5);
  if (sub1 < sub2 && sub1 < sub3 && sub1 < sub4 && sub1 < sub5) {
    min = sub1;
  } else if (sub2 < sub2 && sub2 < sub3 && sub2 < sub4) {
    min = sub2;
  } else if (sub3 < sub4 && sub3 < sub5) {
    min = sub3;
  } else if (sub4 < sub5) {
    min = sub4;
  } else {
    min = sub5;
  }
  if (sub1 > sub2 && sub1 > sub3 && sub1 > sub4 && sub1 > sub5) {
    max = sub1;
  } else if (sub2 > sub2 && sub2 > sub3 && sub2 > sub4) {
    max = sub2;
  } else if (sub3 > sub4 && sub3 > sub5) {
    max = sub3;
  } else if (sub4 > sub5) {
    max = sub4;
  } else {
    max = sub5;
  }
  if (sub1 >= 35 && sub2 >= 35 && sub3 >= 35 && sub4 >= 35 && sub5 >= 35) {
    per = ((total / 5).toFixed(2));
  } else {
    per = 0;
  }
  if (sub1 < 35) {
    cnt++;
  }
  if (sub2 < 35) {
    cnt++;
  }
  if (sub3 < 35) {
    cnt++;
  }
  if (sub4 < 35) {
    cnt++;
  }
  if (sub5 < 35) {
    cnt++;
  }
  if (cnt == 0) {
    result = "PASS";
  } else if (cnt == 1 || cnt == 2) {
    result = "ATKT";
  } else {
    result = "FAIL";
  }
  const handlesubmit = () => {
    var obj = {
      rno: rno,
      name: name,
      sub1: sub1,
      sub2: sub2,
      sub3: sub3,
      sub4: sub4,
      sub5: sub5,
      total: total,
      min: min,
      max: max,
      per: per,
      result: result
    }
    setmarks([...marks, obj])
    reset([...set, obj])
    setrno('');
    setname('');
    setsub1('');
    setsub2('');
    setsub3('');
    setsub4('');
    setsub5('');
  }
  const selectper = (e) => {
    // alert(e.target.value);
    var demo1 = set.filter((item, index) => {
      return item.per >= parseFloat(e.target.value);
    })
    setmarks(demo1);
  }
  const selectresult = (e) => {
    // alert(e.target.value);
    var dispres = set.filter((item, index) => {
      return item.result == (e.target.value);
    })
    setmarks(dispres);
  }
  const all = () => {
    // alert();
    setmarks([...set]);
  }
  const sort = () => {
    // alert();
    const sortedMarks = [...set];
    sortedMarks.sort((a, b) => b.per - a.per);
    setmarks(sortedMarks);
  }
  return (
    <div className="App">
    <h2>Student Result</h2> 
      <div className='subject'>
        <table align='center'>
          <tr>
            <td>Rno</td>
            <td><input type='text' value={rno} onChange={(e) => setrno(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Name</td>
            <td><input type='text' value={name} onChange={(e) => setname(e.target.value)}></input>
            </td>
          </tr>
          <tr>
            <td>Sub1</td>
            <td><input type='text' value={sub1} onChange={(e) => setsub1(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Sub2</td>
            <td><input type='text' value={sub2} onChange={(e) => setsub2(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Sub3</td>
            <td><input type='text' value={sub3} onChange={(e) => setsub3(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Sub4</td>
            <td><input type='text' value={sub4} onChange={(e) => setsub4(e.target.value)}></input></td>
          </tr>
          <tr>
            <td>Sub5</td>
            <td><input type='text' value={sub5} onChange={(e) => setsub5(e.target.value)}></input></td>
          </tr>

        </table>


        <div className='allbtn'>
          <button onClick={handlesubmit}>Submit</button>

          <select onChange={selectper}>
            <option value={""}>Per</option>
            <option value={"90"}>90+</option>
            <option value={"80"}>80+</option>
            <option value={"70"}>70+</option>
            <option value={"50"}>50+</option>
            <option value={"40"}>40+</option>
            <option value={"30"}>30+</option>
            <option value={"0"}>0+</option>
          </select>

          <select onChange={selectresult}>
            <option value={""}>Result</option>
            <option value={"PASS"}>pass</option>
            <option value={"FAIL"}>fail</option>
            <option value={"ATKT"}>atkt</option>
          </select>

          <button onClick={all}>All Data</button>
          <button onClick={sort}>Sort Data</button>

        </div>

        <table border={1} align='center'>
          <thead>
            <tr className='heading'>
              <th>r_no</th>
              <th>Name</th>
              <th>sub1</th>
              <th>sub2</th>
              <th>sub3</th>
              <th>sub4</th>
              <th>sub5</th>
              <th>total</th>
              <th>min</th>
              <th>max</th>
              <th>per</th>
              <th>result</th>
            </tr>
          </thead>
          {
            marks.map((ele, ind) => (
              <tr key={ind} style={{ backgroundColor: ele.result === "PASS" ? "green" : ele.result === "ATKT" ? "blue" : "red" }}>
                <td>{ele.rno}</td>
                <td>{ele.name}</td>
                <td>{ele.sub1}</td>
                <td>{ele.sub2}</td>
                <td>{ele.sub3}</td>
                <td>{ele.sub4}</td>
                <td>{ele.sub5}</td>
                <td>{ele.total}</td>
                <td>{ele.min}</td>
                <td>{ele.max}</td>
                <td>{ele.per}</td>
                <td>{ele.result}</td>
              </tr>
            ))
          }
        </table>


      </div>
    </div>
  );
}

export default App;
