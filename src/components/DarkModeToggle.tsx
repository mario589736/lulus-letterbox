import { useState, useEffect } from 'react';

interface DarkModeToggleProps {
  className?: string;
}

export default function DarkModeToggle({ className = '' }: DarkModeToggleProps) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setIsDark(e.matches);
        if (e.matches) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className={`w-12 h-6 bg-gray-200 rounded-full ${className}`}>
        <div className="w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out translate-x-0.5 translate-y-0.5" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className={`
        relative w-12 h-6 rounded-full p-0.5 transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
        ${isDark 
          ? 'bg-gradient-to-r from-primary-600 to-secondary-600' 
          : 'bg-gray-200 hover:bg-gray-300'
        }
        ${className}
      `}
      aria-label={isDark ? 'Zu hellem Modus wechseln' : 'Zu dunklem Modus wechseln'}
    >
      {/* Toggle Circle */}
      <div
        className={`
          w-5 h-5 bg-white rounded-full shadow-sm transform transition-all duration-300 ease-in-out
          flex items-center justify-center
          ${isDark ? 'translate-x-6' : 'translate-x-0'}
        `}
      >
        {/* Icon */}
        {isDark ? (
          <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className={`
            absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 opacity-0
            transition-opacity duration-300 ease-in-out
            ${isDark ? 'opacity-100' : 'opacity-0'}
          `}
        />
      </div>
    </button>
  );
}

// Hook for using dark mode state in other components
export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkDarkMode();
    
    // Watch for changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  return { isDark, mounted };
} 