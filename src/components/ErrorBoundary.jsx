import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Log to error reporting service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, title, message, showRetry } = this.props;

    if (hasError) {
      // Custom fallback UI
      if (fallback) {
        return fallback(error, this.handleRetry);
      }

      return (
        <div
          className="error-boundary"
          style={{
            padding: '20px',
            border: '1px solid #ff6b6b',
            borderRadius: '4px',
            backgroundColor: '#ffe0e0',
            margin: '10px',
          }}
        >
          <h2 style={{ color: '#d63031', marginTop: 0 }}>{title || 'Something went wrong'}</h2>
          <p style={{ color: '#636e72' }}>
            {message || 'An unexpected error occurred. Please try refreshing the page.'}
          </p>

          {showRetry && (
            <button
              type="button"
              onClick={this.handleRetry}
              style={{
                backgroundColor: '#0984e3',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '10px',
              }}
            >
              Try Again
            </button>
          )}

          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#636e72',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Refresh Page
          </button>

          {process.env.NODE_ENV === 'development' && error && (
            <details style={{ marginTop: '20px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Error Details (Development Only)</summary>
              <pre
                style={{
                  backgroundColor: '#f8f9fa',
                  padding: '10px',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px',
                  marginTop: '10px',
                }}
              >
                {error.toString()}
                {'\n\n'}
                {errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    const { children } = this.props;
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  showRetry: PropTypes.bool,
};

ErrorBoundary.defaultProps = {
  fallback: null,
  title: null,
  message: null,
  showRetry: true,
};

export default ErrorBoundary;
