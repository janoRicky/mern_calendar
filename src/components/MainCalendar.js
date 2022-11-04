import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'node-calendar';

export default function MainCalendar() {

  const today = new Date();

  let curDate = new Date();

  const llYear = 1970;
  const ulYear = today.getFullYear() + 50;

  const [dates, setDates] = useState({
    'pmStartDay': 0,
    'pmDays': 0,
    'cmStartDay': 0,
    'cmDays': 0,
    'nmStartDay': 0,
    'nmDays': 0,
    'remCalTiles': 0,
    'totCalTiles': 0
  });
  const updateCalendar = () => {
    let pMonth = Calendar.monthrange(curDate.getFullYear(), (curDate.getMonth() === 0 ? 12 : curDate.getMonth()));
    let cMonth = Calendar.monthrange(curDate.getFullYear(), curDate.getMonth() + 1);
    let nMonth = Calendar.monthrange(curDate.getFullYear(), (curDate.getMonth() === 11 ? 1 : curDate.getMonth() + 2));

    // let remCalTiles = (nMonth[0] === 5 ? 0 : 7 - (nMonth[0] + 1));
    let remCalTiles = 7 - (Calendar.weekday(curDate.getFullYear(), curDate.getMonth() + 1, cMonth[1]) + 2);
    remCalTiles = (remCalTiles < 0 ? 6 : remCalTiles)
    // console.log(curDate.getFullYear(), curDate.getMonth() + 1, cMonth[1]);
    let cmStartDay = (cMonth[0] == 6 ? -1 : cMonth[0]);

    setDates({
      'pmStartDay': pMonth[0],
      'pmDays': pMonth[1],
      'cmStartDay': cmStartDay,
      'cmDays': cMonth[1],
      'nmStartDay': nMonth[0],
      'nmDays': nMonth[1],
      'remCalTiles': remCalTiles,
      'totCalTiles': cMonth[1] + (cmStartDay + 1 == 7 ? 0 : cmStartDay + 1) + remCalTiles
    });
  };
  const [selectDate, setSelectDate] = useState({
    'y': curDate.getFullYear(),
    'm': curDate.getMonth(),
    'd': curDate.getDay()
  });
  useEffect(() => {
    curDate.setFullYear(selectDate.y, selectDate.m, selectDate.d);

    if (selectDate) {

    }

    updateCalendar();
  }, [selectDate]);


  let yearSelection = [];
  for (let i = today.getFullYear() + 50; i >= 1970; i--) {
    yearSelection.push(i);
  }


  return (
    <div className="col-span-9">
      <div className="grid grid-cols-7 gap-x-2 gap-y-2">{selectDate.y}
        <div className="flex">
          <select value={selectDate.m} onChange={ (e) => setSelectDate({ ...selectDate, 'm': e.target.value }) }>
            { [...Array(12)].map((x, i) => (
              <option key={i} value={i}>{Calendar.month_name[i + 1]}</option>
            ))}
          </select>
          <div className="flex flex-col">
            <button className="flex-auto bg-blue-400 rounded m-1 p-1" onClick={() => (selectDate.m < 11 ? setSelectDate({ ...selectDate, 'm': parseInt(selectDate.m) + 1 }) : false)}>U</button>
            <button className="flex-auto bg-blue-400 rounded m-1 p-1" onClick={() => (selectDate.m > 0 ? setSelectDate({ ...selectDate, 'm': parseInt(selectDate.m) - 1 }) : false)}>D</button>
          </div>
        </div>
        <div className="flex">
          <select value={selectDate.y} onChange={ (e) => setSelectDate({ ...selectDate, 'y': e.target.value }) }>
            { yearSelection.map((x, i) => (
              <option key={i} value={x}>{x}</option>
            ))}
          </select>
          <div className="flex flex-col">
            <button className="flex-auto bg-blue-400 rounded m-1 p-1" onClick={() => (selectDate.y < ulYear ? setSelectDate({ ...selectDate, 'y': parseInt(selectDate.y) + 1 }) : false)}>U</button>
            <button className="flex-auto bg-blue-400 rounded m-1 p-1" onClick={() => (selectDate.y > llYear ? setSelectDate({ ...selectDate, 'y': parseInt(selectDate.y) - 1 }) : false)}>D</button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-2 gap-y-2">
        <div className="text-center mb-4 border-b-2 border-red-300">Sun</div>
        <div className="text-center mb-4 border-b-2">Mon</div>
        <div className="text-center mb-4 border-b-2">Tue</div>
        <div className="text-center mb-4 border-b-2">Wed</div>
        <div className="text-center mb-4 border-b-2">Thu</div>
        <div className="text-center mb-4 border-b-2">Fri</div>
        <div className="text-center mb-4 border-b-2 border-red-300">Sat</div>
        { [...Array(dates.totCalTiles)].map((x, i) => (
          (i > dates.cmStartDay && (i - dates.cmStartDay) <= dates.cmDays) ? (
            <div key={'cTile' + i} className="rounded text-end shadow-inner p-1 shadow-md font-bold 
              hover:border-t-4 hover:border-l-2 border-t-0 border-l-0 
              border-b-4 border-r-2 hover:border-b-0 hover:border-r-0 
              bg-gray-100 border-gray-300 
              hover:bg-gray-100 hover:border-gray-0">
              {i - dates.cmStartDay}
            </div>
          ) : (
            <div key={'cTile' + i} className="rounded text-end shadow-inner p-1 shadow-md font-bold 
              hover:border-t-4 hover:border-l-2 border-t-0 border-l-0 
              border-b-4 border-r-2 hover:border-b-0 hover:border-r-0 
              hover:bg-gray-300 hover:border-gray-200 
              bg-gray-300 border-gray-400">
              {(i < dates.cmDays) ? (dates.pmDays + i) - dates.cmStartDay : (i - dates.cmStartDay) - dates.cmDays}
            </div>
          )
        ))}
      </div>
    </div>
  )
}
