import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

// DayListItem COMPONENT:
export default function DayListItem(props) {
  function formatSpots(spots) {
    if (spots === 0) {
      return "no spots remaining";
    }
    if (spots === 1) {
      return "1 spot remaining";
    }
    if (spots > 1) {
      return `${spots} spots remaining`;
    }
  }

  const dayClass = classnames("day-list__item", {
    // FOR SELECTED DAY STYLE
    "day-list__item--selected": props.selected,

    // FOR NO SPOTS AVALIABLE STYLE
    "day-list__item--full": props.spots === 0,
  });

  return (
    <li
      data-testid="day"
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      {props.children}
      <h2 className={"text--regular"}>{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
