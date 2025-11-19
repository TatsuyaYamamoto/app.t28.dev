import Editor from "./components/Editor.tsx";
import Header from "./components/Header.tsx";

function App() {
  return (
    <>
      <div>
        <Header />
        <Editor original={`hoge hoge`} modified={`hoge fuga`} />
      </div>
    </>
  );
}

export default App;
