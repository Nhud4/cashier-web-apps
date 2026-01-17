import Button from '@components/elements/Button'
import Dropdown from '@components/fields/Dropdown'
import TextInput from '@components/fields/TextInput'
import ICONS from '@configs/icons'

import styles from './styles.module.css'

export const SettingsMenu = () => {
  const options = [
    { label: 'Kabel', value: 'cable' },
    { label: 'Bluetooth', value: 'bluetooth' },
  ]
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="border border-border rounded-2xl h-full bg-white">
        <button className={styles.button}>
          <p>Pengaturan Printer</p>
          <ICONS.Arrow />
        </button>
      </div>

      <div className="col-span-2 space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline">Cek status printer</Button>
          <Button>Test printer</Button>
        </div>

        <div className="border rounded-2xl bg-white p-6">
          <h1 className="font-semibold">Form Pengaturan Printer</h1>
          <form className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Dropdown label="Jenis printer" name="type" options={options} />
              <TextInput label="Ukuran kertas" name="size" prefix="mm" />
            </div>
            <div className="flex justify-end w-full">
              <Button>Simpan pengaturan</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
