"use client";
import { use } from "react";
import PersonCard from "./PersonCard";
import moment from "moment";

async function fetchData(params) {
  const res = await fetch(`/api/hbdRem`, {
    cache: "no-store",
  });
  return res.json();
}
function daysUntilBirthday(dob) {
  const today = moment();
  const birthday = moment(dob, "MM/DD/YYYY").format("MM/DD");
  // Get today's date

  // Set the target date to this year's birthday
  const thisYearsBirthday = moment(birthday, "MM/DD").year(today.year());

  // If today's date is past this year's birthday, set the target date to next year
  if (today.isAfter(thisYearsBirthday)) {
    thisYearsBirthday.add(1, "years");
  }

  // Calculate the difference in days
  const daysLeft = thisYearsBirthday.diff(today, "days");

  return daysLeft;
}
const dataPromise = fetchData();
export default function HBDRemsContent() {
  const dataJson = use(dataPromise);
  const data = dataJson.hbdRems;
  const today = moment();

  //  Sort the array by the days until each person's next birthday

  const sortedData = data.sort((a, b) => {
    let nextBirthdayA = moment(a.dob).set("year", today.year());
    let nextBirthdayB = moment(b.dob).set("year", today.year());

    // If the next birthday has passed this year, set it to next year
    if (nextBirthdayA.isBefore(today)) {
      nextBirthdayA.add(1, "year");
    }
    if (nextBirthdayB.isBefore(today)) {
      nextBirthdayB.add(1, "year");
    }

    // Compare the days until each person's next birthday
    return (
      nextBirthdayA.diff(today, "days") - nextBirthdayB.diff(today, "days")
    );
  });
  return (
    <div class="mt-20 p-4 sm:ml-64">
      <div class="grid grid-cols-3 gap-4 mb-4 p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {sortedData.map((item) => {
          const Formateddob = moment.utc(item.dob).format("MM/DD/YYYY");
          let daysLeft = daysUntilBirthday(Formateddob) + 1;
          if (daysLeft >= 30) {
            const monthsLeft = String(Math.floor(daysLeft / 30)) + " months";
            const reminderdays = daysLeft % 30;
            if (reminderdays > 0) {
              daysLeft =
                monthsLeft + " and " + Math.floor(reminderdays) + " days";
            } else {
              daysLeft = monthsLeft;
            }
          } else {
            daysLeft = String(daysUntilBirthday(Formateddob)) + " days";
          }
          return (
            <PersonCard
              name={item.name}
              dob={Formateddob}
              daysLeft={daysLeft}
              id={item._id}
              key={item._id}
            />
          );
        })}
      </div>
    </div>
  );
}
