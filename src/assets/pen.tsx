export const Pen = ({ className, style, ...props }: PenProps) => {
  return (
    <span
      className={`material-symbols-outlined ${className || ''}`}
      style={{
        display: 'inline-block',
        userSelect: 'none',
        ...style,
      }}
      {...props}
    >
      ink_pen
    </span>
  );
};
