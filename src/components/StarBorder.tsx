'use client';
import React, { CSSProperties, ElementType } from 'react';
import './StarBorder.css';

interface StarBorderProps<T extends ElementType = 'div'> {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  children?: React.ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

function StarBorder<T extends ElementType = 'div'>({
  as,
  className = '',
  color = '#c084fc',
  speed = '4s',
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      className={`star-border-outer ${className}`}
      style={
        {
          '--star-color': color,
          '--star-speed': speed,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <span className="star-border-spin" />
      <span className="star-border-inner">{children}</span>
    </Component>
  );
}

export default StarBorder;
