import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 m-4 border border-red-300 bg-red-50 rounded-xl text-sm text-red-700">
          <p className="font-semibold mb-2">Something went wrong.</p>
          <pre className="whitespace-pre-wrap text-xs opacity-75">{String(this.state.error)}</pre>
          {this.props.onReset && (
            <button onClick={this.props.onReset} className="mt-3 px-3 py-1 rounded bg-red-600 text-white text-xs">Reset</button>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
