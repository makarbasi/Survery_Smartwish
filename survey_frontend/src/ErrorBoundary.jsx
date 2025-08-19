import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 ERROR BOUNDARY CAUGHT ERROR:', {
      error: error.message,
      stack: error.stack,
      errorInfo: errorInfo,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    });
    
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h2>🚨 Something went wrong!</h2>
          <p>An error occurred while rendering this page.</p>
          <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', margin: '20px 0' }}>
            <summary>Error Details</summary>
            <p><strong>Error:</strong> {this.state.error?.toString()}</p>
            <p><strong>Stack:</strong> {this.state.error?.stack}</p>
          </details>
          <button 
            onClick={() => window.location.reload()} 
            style={{ padding: '10px 20px', fontSize: '16px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
