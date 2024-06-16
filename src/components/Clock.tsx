import React from 'react';

interface Props {
  clockName: string;
}

interface State {
  currentTime: string;
}

const getCurrentTime = () => {
  return new Date().toUTCString().slice(-12, -4);
};

export class Clock extends React.Component<Props, State> {
  state = {
    currentTime: getCurrentTime(),
  };

  timeId = 0;

  componentDidMount() {
    this.timeId = window.setInterval(() => {
      this.setState({ currentTime: getCurrentTime() });
    }, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timeId);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.clockName !== this.props.clockName) {
      // eslint-disable-next-line no-console
      console.debug(
        `Renamed from ${prevProps.clockName} to ${this.props.clockName}`,
      );
    }

    // eslint-disable-next-line no-console
    console.log(this.state.currentTime);
  }

  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.clockName}</strong>

        {' time is '}

        <span className="Clock__time">{this.state.currentTime}</span>
      </div>
    );
  }
}
