import React from 'react';
import { clsx } from 'clsx';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
  asChild?: boolean;
};

/**
 * Button — Conor primary and ghost variants
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', children, ...props }, ref) => {
    const styles = clsx(
      'btn',
      variant === 'primary' ? 'btn-primary' : 'btn-ghost',
      className
    );
    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
