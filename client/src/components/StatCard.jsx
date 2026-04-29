import { useEffect, useRef, useState } from 'react';

function StatCard({ icon, number, label, target, className = '' }) {
  const countRef = useRef(null);
  const iconRef = useRef(null);
  const startedRef = useRef(false);
  const [currentValue, setCurrentValue] = useState(0);
  const value = typeof target === 'number' ? target : number;

  useEffect(() => {
    startedRef.current = false;
    setCurrentValue(0);
  }, [value]);

  useEffect(() => {
    if (value === undefined || value === null) {
      return;
    }

    const node = countRef.current;
    if (!node) {
      return;
    }

    const animate = () => {
      const duration = 1800; // 1.8s
      const start = performance.now();
      const startValue = 0;
      const stepSize = Math.max(1, Math.floor(value / 20)); // Increment in steps

      const step = (timestamp) => {
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // Ease-out
        const nextValue = Math.floor(startValue + (value - startValue) * eased);
        setCurrentValue(Math.min(nextValue, value));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCurrentValue(value);
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div className={`stat-card ${className}`.trim()}>
      <div className="stat-icon" ref={iconRef}>{icon}</div>
      <div className="stat-number" ref={countRef} data-target={value}>
        {currentValue.toLocaleString()}{value > 0 ? '+' : ''}
      </div>
      <p>{label}</p>
    </div>
  );
}

export default StatCard;
