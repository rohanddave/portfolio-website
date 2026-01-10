// Inline script to prevent flash of wrong theme
export default function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function getTheme() {
              const savedTheme = localStorage.getItem('theme');
              if (savedTheme) return savedTheme;
              return 'dark';
            }

            const theme = getTheme();
            document.documentElement.classList.add(theme);
            document.documentElement.setAttribute('data-theme', theme);
          })();
        `,
      }}
    />
  );
}
