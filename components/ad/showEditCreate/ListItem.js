import React from "react";

const ListItems = (props) => {
  return (
    <ul className='pl-10 pr-3 sm:px-16 space-y-2 text-slate-600'>
      {props.items &&
        items.map((item, index) => (
          <li
            key={index}
            className='list-disc'>
            {item}
          </li>
        ))}
    </ul>
  );
};

export default ListItems;
