import AppRoutes from "@/AppRoutes";
import { TaskProvider } from "@/context/TaskContext";
import { AuthProvider } from "@/context/AuthContext";
import { BoardProvider } from "@/context/BoardContext";

function App() {
  return (
    <>
      <AuthProvider>
        <BoardProvider>
          <TaskProvider>
            <main>
              <AppRoutes />
            </main>
          </TaskProvider>
        </BoardProvider>
      </AuthProvider>
    </>
  );
}

export default App;
