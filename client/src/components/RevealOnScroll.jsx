import { useEffect, useRef } from 'react';

function RevealOnScroll({ as: Component = 'div', className = '', children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries, observerTarget) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerTarget.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component ref={ref} className={`fade-up ${className}`.trim()} {...props}>
      {children}
    </Component>
  );
}

export default RevealOnScroll;
