import ICONS from '@configs/icons'
import { NotifyContext } from '@contexts/NotifyContext'
import { clsx } from '@utils/index'
import { useContext } from 'react'

import styles from './styles.module.css'

export const Notify: React.FC = (): React.ReactElement => {
  const { notify, setNotify } = useContext(NotifyContext)
  const { color, message, callback, isOpen } = notify
  const handleCloseNotify = () => {
    if (callback) {
      callback()
    }
    setNotify({ ...notify, isOpen: false })
  }

  return (
    <div className="absolute z-[999] -translate-x-1/2 top-5 left-1/2">
      {isOpen && (
        <div className="flex items-center p-2 bg-white border rounded-lg shadow-md min-w-[350px] space-x-2 relative">
          <div className={clsx(['w-2 h-12 rounded', styles[color]])} />
          <div className="self-start">
            <h6 className="font-semibold">{color.toUpperCase()}</h6>
            {message?.includes('~') ? (
              <div className="ml-4">
                <p className="-ml-4 text-sm font-semibold">
                  Params Not Allowed
                </p>
                <ul>
                  {message.split('~').map((item) => (
                    <li className="text-sm list-disc" key={item}>
                      <span>{item.split(':')[0]}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-sm">{message}</p>
            )}
          </div>
          <button
            className="absolute text-gray-500 top-2 right-2"
            onClick={handleCloseNotify}
          >
            <ICONS.Close height="20" width="20" />
          </button>
        </div>
      )}
    </div>
  )
}
