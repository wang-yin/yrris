import React from "react";

export default function Css3Icon({ className = "", size = 24, ...props }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      className={className}
      {...props}
    >
      <path
        fill="#264de4"
        d="M71.357 460.819 30.272 0h451.456l-41.129 460.746L255.724 512z"
      />
      <path fill="#2965f1" d="m405.388 431.408 35.148-393.73H256v435.146z" />
      <path
        fill="#ebebeb"
        d="m124.46 208.59 5.065 56.517H256V208.59zm-5.041-57.875H256V94.197H114.281z"
      />
      <path
        fill="#fff"
        d="M255.805 208.59v56.517H325.4l-6.56 73.299-63.035 17.013v58.8l115.864-32.112.85-9.549 13.28-148.792 1.38-15.176 10.203-114.393H255.805v56.518h79.639L330.3 208.59z"
      />
    </svg>
  );
}
