/**
 * Applies the saved theme before first paint so there is no flash of the wrong
 * colour scheme. Kept intentionally tiny and dependency-free.
 */
const script = `(function(){try{var s=localStorage.getItem("theme");var d=s==="dark"||((!s||s==="system")&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(e){}})();`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
