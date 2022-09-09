import React from 'react';

interface IProps {
  children: JSX.Element;
}

interface IState {
  hasError: boolean;
  error?: string;
}

export default class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: string) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <h1>{this.state.error}</h1>;
    }

    return this.props.children;
  }
}
