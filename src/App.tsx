import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';

function ErrorComponent() {
  const rnd = Math.random();
  if (rnd <= 0.5) {
    throw new Error("Something went wrong!");
  }
  return <div>OK!</div>
}

// エラーキャッチされず，アプリケーションが終了してしまう.
function RapTryCatch() {
  try {
    return (<ErrorComponent />)
  } catch {
    return <p>Error !</p>
  }
}

// エラーをキャッチし，緊急時の画面をレンダリングしてくれる
// yarn start 時は，Error の内容が報告される
// yarn build 時は，Error 画面は出ず，fallback に指定したコンポーネントがレンダリングされる
function RapBoundary() {
  const fallback = ({error, resetErrorBoundary}) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )
  }
  
  return (
  <ErrorBoundary FallbackComponent={fallback}>
    <ErrorComponent />
  </ErrorBoundary>
  )
}

function App() {
  return (
    <RapBoundary />
  );
}

export default App;
