import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Something went wrong</h1>
                    <p className="text-slate-300 mb-6">We encountered an error while loading the app.</p>
                    <pre className="bg-slate-800 p-4 rounded-lg text-left text-xs text-red-300 overflow-auto max-w-full italic mb-6">
                        {this.state.error?.message}
                    </pre>
                    <button
                        className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-medium transition-colors"
                        onClick={() => window.location.reload()}
                    >
                        Reload App
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
