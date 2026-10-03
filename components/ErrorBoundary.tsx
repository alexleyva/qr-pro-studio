import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  componentStack: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: '' };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Esto queda visible en la consola para facilitar el diagnóstico
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    this.setState({ componentStack: errorInfo.componentStack || '' });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
          <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
              !
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Algo salió mal</h1>
            <p className="text-sm text-gray-500 mb-4">
              Ocurrió un error inesperado. Copia el mensaje de abajo para poder solucionarlo.
            </p>
            <pre className="text-left text-xs font-mono bg-red-50 border border-red-100 text-red-700 rounded-lg p-3 mb-4 overflow-auto whitespace-pre-wrap break-words">
              {this.state.error?.message || 'Error desconocido'}
            </pre>
            {this.state.componentStack && (
              <pre className="text-left text-[11px] font-mono bg-slate-50 border border-slate-200 text-slate-600 rounded-lg p-3 mb-6 overflow-auto whitespace-pre-wrap break-words max-h-48">
                {this.state.componentStack}
              </pre>
            )}
            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Reintentar
              </button>
              <button
                onClick={this.handleReload}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Recargar página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
