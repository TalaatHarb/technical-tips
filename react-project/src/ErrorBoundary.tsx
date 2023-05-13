// https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/

import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h3>Sorry.. there was an error</h3>
                    <p>{this.state.error?.message}</p>
                    <p>{this.state.error?.stack}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
