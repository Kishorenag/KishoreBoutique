// Save state to localStorage
export const saveStateToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (err) {
      console.error("Error saving state:", err);
    }
  };
  
  // Load state from localStorage
  export const loadStateFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined; // If no state is found, return undefined
      }
      return JSON.parse(serializedState); // Return the parsed state from localStorage
    } catch (err) {
      console.error("Error loading state:", err);
      return undefined;
    }
  };
  