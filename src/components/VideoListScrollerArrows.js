import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

function VideoListScrollerArrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode,
  disabled: boolean,
  onClick: VoidFunction,
}) {
  return (
    <button
      className="video-list-scroller-component-menu-arrow"
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}

export function LeftVideoListScrollerArrow() {
  const {
    isFirstItemVisible,
    scrollPrev,
    visibleItemsWithoutSeparators,
    initComplete,
  } = React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <VideoListScrollerArrow disabled={disabled} onClick={() => scrollPrev()}>
      &lt;
    </VideoListScrollerArrow>
  );
}

export function RightVideoListScrollerArrow() {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  React.useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <VideoListScrollerArrow disabled={disabled} onClick={() => scrollNext()}>
      &gt;
    </VideoListScrollerArrow>
  );
}
