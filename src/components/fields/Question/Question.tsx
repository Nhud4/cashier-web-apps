import IMAGES from '@configs/images'

type Props = {
  icon?: string
  questionBottom?: string
  questionTop?: string
  title?: string
}

export const Question: React.FC<Props> = ({
  icon,
  title,
  questionTop,
  questionBottom,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 my-6">
      <img alt="icons" src={icon || IMAGES.Question} />
      <h1 className="text-base font-semibold">
        {title || 'Konfirmasi Penghapusan'}
      </h1>
      <div className="flex flex-col items-center">
        <p>{questionTop || 'Apakah Anda yakin ingin menghapus'}</p>
        <p>{questionBottom || 'secara permanen pada data yang dipilih?'}</p>
      </div>
    </div>
  )
}
