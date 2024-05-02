import { ReactNode, useEffect, useState } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

function ErrorBoundary(props: ErrorBoundaryProps) {
  const [state, setState] = useState<ErrorBoundaryState>({ hasError: false });

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("ErrorBoundary caught an error:", event.error);
      setState({ hasError: true });
    };

    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (state.hasError) {
    return (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <h4 className="alert-heading"><i className="bi-exclamation-octagon-fill"></i> Oops ! Quelque chose s'est mal passé.</h4>
        <p>Il semble qu'une erreur se soit produite sur cette page</p>
        <hr />
        <p className="mb-0">Nous vous invitons à recharger la page ou retourner à la page de connexion</p>
      </div>
    );
  }

  return props.children;
}

export default ErrorBoundary;
