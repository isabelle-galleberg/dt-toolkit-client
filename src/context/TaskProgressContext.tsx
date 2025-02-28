import React, { createContext, useContext, useState } from 'react';

interface TaskProgressContextType {
  completedTasks: Record<string, boolean>;
  markTaskComplete: (task: string) => void;
  markTaskUndone: (task: string) => void;
  isTaskComplete: (task: string) => boolean;
}

const TaskProgressContext = createContext<TaskProgressContextType | undefined>(
  undefined
);

export const TaskProgressProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>(
    {}
  );

  const markTaskComplete = (task: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [task]: true,
    }));
  };

  const markTaskUndone = (task: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [task]: false,
    }));
  };

  const isTaskComplete = (task: string) => !!completedTasks[task];

  return (
    <TaskProgressContext.Provider
      value={{
        completedTasks,
        markTaskComplete,
        markTaskUndone,
        isTaskComplete,
      }}
    >
      {children}
    </TaskProgressContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskProgress = () => {
  const context = useContext(TaskProgressContext);
  if (!context) {
    throw new Error(
      'useTaskProgress must be used within a TaskProgressProvider'
    );
  }
  return context;
};
