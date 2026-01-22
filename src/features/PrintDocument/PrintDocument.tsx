import { formatIDR } from '@utils/index'
import { useEffect, useRef } from 'react'

type Props = {
  receiptData?: ReceiptData
}

export const PrintDocument: React.FC<Props> = ({ receiptData }) => {
  const receiptRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    if (!receiptRef.current) return

    // Buat iframe tersembunyi untuk print
    const printFrame = document.createElement('iframe')
    printFrame.style.position = 'absolute'
    printFrame.style.top = '-10000px'
    printFrame.style.left = '-10000px'
    document.body.appendChild(printFrame)

    // Tulis konten ke iframe
    const frameDoc = printFrame.contentWindow
    if (!frameDoc) {
      document.body.removeChild(printFrame)
      return
    }

    const printContent = receiptRef.current.innerHTML

    frameDoc.document.open()
    frameDoc.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print Nota</title>
          <style>
            @page {
              size: 80mm auto;
              margin: 0;
            }

            @media print {
              html, body {
                margin: 0 !important;
                padding: 0 !important;
                width: 80mm !important;
                max-width: 80mm !important;
              }

              * {
                box-sizing: border-box;
              }
            }
            
            body {
              margin: 0;
              padding: 0;
              width: 80mm;
              font-family: 'Courier New', monospace;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            .receipt-container {
              width: 80mm;
              padding: 2mm 2mm 0 2mm;
              font-size: 9pt;
              background: white;
              color: black;
            }
            
            .receipt-header {
              text-align: center;
              margin-bottom: 10px;
            }
            
            .store-icon {
              width: 60px;
              height: 60px;
              margin: 0 auto 8px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            
            .store-icon img {
              width: 100%;
              height: 100%;
              object-fit: contain;
            }
            
            .store-name {
              font-size: 14pt;
              font-weight: bold;
              margin: 5px 0;
            }
            
            .store-address {
              font-size: 9pt;
              line-height: 1.3;
              margin: 3px 0;
            }
            
            .divider {
              border-top: 1px dashed #000;
              margin: 8px 0;
            }
            
            .receipt-info {
              font-size: 10pt;
              margin: 5px 0;
            }
            
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 2px 0;
            }
            
            .items-section {
              margin: 10px 0;
            }
            
            .item {
              margin: 5px 0;
            }
            
            .item-header {
              display: flex;
              justify-content: space-between;
              font-weight: normal;
            }
            
            .item-detail {
              font-size: 9pt;
              margin-left: 0;
            }
            
            .totals-section {
              margin-top: 8px;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
            }
            
            .total-row.grand-total {
              font-weight: bold;
              font-size: 11pt;
              margin-top: 5px;
            }
            
            .footer {
              text-align: center;
              margin-top: 15px;
              font-size: 10pt;
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `)
    frameDoc.document.close()

    // Tunggu sebentar agar konten ter-load, lalu print
    setTimeout(() => {
      frameDoc.focus()
      frameDoc.print()

      // Hapus iframe setelah print
      setTimeout(() => {
        document.body.removeChild(printFrame)
      }, 100)
    }, 250)
  }

  useEffect(() => {
    if (receiptData) {
      handlePrint()
    }
  }, [receiptData])

  return (
    <div ref={receiptRef} style={{ display: 'none' }}>
      <div className="receipt-container">
        <div className="receipt-header">
          <div className="store-name">SaR-1</div>
          <div className="store-name">Cafe and Resto</div>
          <div className="store-address">{receiptData?.address}</div>
        </div>

        <div className="divider"></div>

        <div className="receipt-info">
          <div className="info-row">
            <span>No Pesanan:</span>
            <span>{receiptData?.orderNumber}</span>
          </div>
          <div className="info-row">
            <span>Tanggal:</span>
            <span>{receiptData?.date}</span>
          </div>
          <div className="info-row">
            <span>Jam:</span>
            <span>{receiptData?.time}</span>
          </div>
          <div className="info-row">
            <span>Customer:</span>
            <span>{receiptData?.customer}</span>
          </div>
          <div className="info-row">
            <span>No Meja:</span>
            <span>{receiptData?.table}</span>
          </div>
          <div className="info-row">
            <span>Kasir:</span>
            <span>{receiptData?.cashier}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="items-section">
          {receiptData?.items.map((item, index) => (
            <div className="item" key={index}>
              <div className="item-header">
                <span>{item.name}</span>
                <span>{formatIDR(item.qty * item.price)}</span>
              </div>
              <div className="item-detail">
                {item.qty} x {formatIDR(item.price)}
              </div>
            </div>
          ))}
        </div>

        <div className="divider"></div>

        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>{formatIDR(receiptData?.subtotal || 0)}</span>
          </div>
          <div className="total-row">
            <span>PPN 10%</span>
            <span>{formatIDR(receiptData?.tax || 0)}</span>
          </div>
          <div className="total-row grand-total">
            <span>Total</span>
            <span>{formatIDR(receiptData?.total || 0)}</span>
          </div>
          <div className="total-row">
            <span>Tunai</span>
            <span>{formatIDR(receiptData?.cash || 0)}</span>
          </div>
          <div className="total-row">
            <span>Kembalian</span>
            <span>{formatIDR(receiptData?.change || 0)}</span>
          </div>
        </div>

        <div className="footer">
          <p>Terimakasih atas pembelian anda</p>
        </div>
      </div>
    </div>
  )
}
