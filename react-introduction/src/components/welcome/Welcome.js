import React from "react";

class Welcome extends React.Component {
  render() {
    if (this.props.name == null) {
      return <p data-cy="welcomeStranger">Hello, stranger!</p>;
    }

    return (
      <div>
        <h2 data-cy="welcomeElement">Hello, {this.props.name}</h2>
      </div>
    );
  }
}

export default Welcome;
