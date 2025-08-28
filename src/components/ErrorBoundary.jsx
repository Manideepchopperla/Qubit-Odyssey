import React from 'react';
import { AlertCircle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ChatBot Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
          <div className="pointer-events-auto bg-red-900/20 backdrop-blur-xl border border-red-500/30 rounded-2xl shadow-2xl w-96 p-6">
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle size={24} />
              <div>
                <h3 className="font-bold">ChatBot Error</h3>
                <p className="text-sm">Please refresh the page and try again.</p>
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;