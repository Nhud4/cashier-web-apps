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
              font-family: 'Courier New', 'Consolas', monospace;
            }
            
            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            .receipt-container {
              width: 80mm;
              padding: 3mm 3mm 0 3mm;
              font-size: 11pt;
              background: white;
              color: #000;
              font-weight: 600;
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
              font-size: 15pt;
              font-weight: 800;
              margin: 4px 0;
              letter-spacing: 0.3px;
              color: #000;
            }
            
            .store-address {
              font-size: 10pt;
              line-height: 1.4;
              margin: 3px 0;
              font-weight: 600;
            }
            
            .divider {
              border-top: 2px dashed #000;
              margin: 8px 0;
            }
            
            .receipt-info {
              font-size: 11pt;
              margin: 5px 0;
              font-weight: 600;
            }
            
            .info-row {
              display: flex;
              justify-content: space-between;
              margin: 3px 0;
              line-height: 1.3;
            }
            
            .items-section {
              margin: 10px 0;
            }
            
            .item {
              margin: 6px 0;
            }
            
            .item-header {
              display: flex;
              justify-content: space-between;
              font-weight: 700;
              font-size: 11pt;
            }
            
            .item-detail {
              font-size: 10pt;
              margin-left: 0;
              margin-top: 2px;
              font-weight: 600;
            }
            
            .totals-section {
              margin-top: 8px;
              font-weight: 700;
            }
            
            .total-row {
              display: flex;
              justify-content: space-between;
              margin: 4px 0;
              font-size: 11pt;
            }
            
            .total-row.grand-total {
              font-weight: 900;
              font-size: 13pt;
              margin-top: 6px;
              padding-top: 3px;
              border-top: 1px solid #000;
            }
            
            .footer {
              text-align: center;
              margin-top: 15px;
              font-size: 11pt;
              font-weight: 700;
            }
            
            .footer p {
              margin: 5px 0;
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

        <div className="info-row">
          <span>
            No. <br /> {receiptData?.orderNumber.split('TRX-')}
          </span>
          <span>
            {receiptData?.date} <br /> {receiptData?.time}
          </span>
        </div>

        <div className="divider"></div>

        <div className="receipt-info">
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
          <div className="info-row">
            <span>Order:</span>
            <span className="capitalize">{receiptData?.orderType}</span>
          </div>
        </div>

        <div className="divider"></div>

        <div className="items-section">
          {receiptData?.items.map((item, index) => {
            const priceDiscount = item.discount
              ? (item.price * item.discount) / 100
              : 0
            return (
              <div className="item" key={index}>
                <div className="item-header">
                  <span>{item.name}</span>
                  <span>
                    {formatIDR(item.qty * (item.price - priceDiscount))}
                  </span>
                </div>
                {item.discount ? (
                  <div className="item-header">
                    <span>
                      {item.qty} x {formatIDR(item.price - priceDiscount)}
                    </span>
                    <span>Diskon ({item.discount})%</span>
                  </div>
                ) : (
                  <div className="item-detail">
                    {item.qty} x {formatIDR(item.price - priceDiscount)}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        <div className="divider"></div>

        <div className="totals-section">
          <div className="total-row">
            <span>Subtotal</span>
            <span>{formatIDR(receiptData?.subtotal || 0)}</span>
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
