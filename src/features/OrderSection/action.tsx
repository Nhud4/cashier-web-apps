/* eslint-disable @typescript-eslint/no-explicit-any */

export const PrintStruk = () => {
  const electronAPI = (window as any).electronAPI
  if (electronAPI && electronAPI.isElectron) {
    window.alert('Running in Electron!')

    // Get available printers
    electronAPI
      .getPrinters()
      .then((printersResult: any[]) => {
        window.alert(`Available printers:, ${printersResult}`)

        // Data struk sesuai format UdinFood Resto
        const receiptData = {
          cashierName: 'Wahyudin',
          change: 400,

          items: [
            { name: 'Mie goreng aceh', price: 12000, qty: 1 },
            { name: 'Nasi goreng aceh', price: 12000, qty: 1 },
            { name: 'Es teh manis', price: 6000, qty: 2 },
          ],

          orderDate: '2026-02-10',

          orderNumber: '12345',

          orderTime: '10.20 WIB',

          payment: 40000,

          printerName: 'default',

          storeAddress:
            'Jl Dr Wahidin No.100, Kepatihan, Kec. Bojonegoro, Kab. Bojonegoro',
          // atau nama printer spesifik
          storeName: 'UdinFood Resto',
          subtotal: 36000,
          tax: 3600,
          taxPercent: 10,
          total: 39600,
        }

        // Print
        electronAPI
          .printReceipt(receiptData)
          .then((result: { success: boolean; error?: string }) => {
            if (result.success) {
              alert('Print berhasil!')
            } else {
              alert('Print gagal: ' + result.error)
            }
          })
          .catch((error: any) => {
            alert('Print error: ' + error)
          })
      })
      .catch((error: any) => {
        window.alert(`Error getting printers: ${error}`)
      })
  }
}
