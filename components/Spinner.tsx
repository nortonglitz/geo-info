interface ISpinner {
  size?: number
  thickness?: number
}

export const Spinner = ({ size, thickness }: ISpinner) => {
  return (
    <div className="relative w-fit h-fit">
      <div
        className={`
          ${size ? `w-${size}` : "w-6"}
          ${size ? `h-${size}` : "h-6"}
          ${thickness ? `border-${thickness}` : "border-2"}
          rounded-full
          border-black/10
        `}
      />
      <div
        className={`
          absolute 
          ${thickness ? `border-${thickness}` : "border-2"}
          rounded-full
          border-t-transparent
          border-b-transparent
          border-l-transparent
          animate-spin
          border-neutral-500/40
          top-0
          left-0
          right-0
          bottom-0
        `}
      />
    </div>
  )
}
