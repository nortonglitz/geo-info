export const Spinner = () => {
  return (
    <div className="relative w-fit h-fit">
      <div
        className="
          w-6
          h-6
          border-2
          rounded-full
          border-black/10
        "
      />
      <div
        className={`
          absolute 
          border-2
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
