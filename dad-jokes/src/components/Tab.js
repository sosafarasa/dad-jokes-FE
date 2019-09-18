import React from 'react';

const Tab = props => {

  return (
    <div
      className={`tab ${
        props.selectedTab === props.tab ? "active-tab" : null
      } `}
      onClick={() => {
        props.selectTabHandler(props.tab)
      }}
    >
    {/* <h2> This is a tab</h2> */}
      {props.tab.toUpperCase()}
    </div>
  );
};

export default Tab;