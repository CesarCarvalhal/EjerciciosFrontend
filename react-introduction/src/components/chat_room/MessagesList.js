import React from "react";

class MessagesList extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <ul>
        {this.props.receivedList.map(object => <li key={object.key}>{object.message}</li>)}
      </ul>
    );
  }
}

export default MessagesList;
