import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0F1117] text-[#E8EAF0] flex items-center justify-center p-6">
          <div className="max-w-lg text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h1 className="font-display text-2xl text-white mb-3">Error en la aplicación</h1>
            <p className="text-white/50 text-sm mb-4">
              {this.state.error?.message || "Ha ocurrido un error inesperado"}
            </p>
            <pre className="text-xs text-red-400/60 bg-black/30 rounded-lg p-4 text-left overflow-auto max-h-48 mb-6">
              {this.state.error?.stack}
            </pre>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = "/"; }}
              className="px-6 py-3 bg-[#3B6FD4] text-white rounded-lg font-mono text-sm hover:bg-[#2D5AB8] transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
