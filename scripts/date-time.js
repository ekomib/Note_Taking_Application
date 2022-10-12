
const now = new Date("January 21 2001 6:25:01");
const timeStamp = now.getTime();

const myDate = now.getFullYear(timeStamp);

console.log(myDate);

const pastDate1 = new Date("March 1 2023 12:00:00");
const pastDate2 = new Date();

const timeStamp1 = pastDate1.getTime();
const timeStamp2 = pastDate2.getTime();

if (timeStamp1 < timeStamp2) {
  console.log(pastDate1.toString());
} else if (timeStamp2 < timeStamp1) {
  console.log(pastDate2.toString());
}



const birthDate = moment();

birthDate.month(8).year(1994).date(8);
console.log(birthDate.format("MMM D, YYYY"));
