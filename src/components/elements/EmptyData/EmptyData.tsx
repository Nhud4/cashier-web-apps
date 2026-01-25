import IMAGES from '@configs/images'

export const EmptyData = () => {
  return (
    <div className="grid w-full place-items-center h-1/2">
      <div className="flex flex-col items-center">
        <img alt="Empty" className="w-[70%]" src={IMAGES.Empty} />
        <p className="font-semibold text-center text-black/80">
          Data tidak ditemukan.
        </p>
      </div>
    </div>
  )
}
