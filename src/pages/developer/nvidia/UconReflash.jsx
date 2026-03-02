import { Link, useParams } from 'react-router-dom'
import { useMemo } from 'react'
import '../../Developer.css'
import SftpPassword from '../../../components/SftpPassword'

const UconReflash = () => {
  const { jetpack, method } = useParams()

  const page = useMemo(() => {
    const jpMap = {
      'jp-6-2': 'JetPack 6.2'
    }
    const methodMap = { ota: 'OTA reflash', usb: 'USB reflash' }

    return {
      jpLabel: jpMap[jetpack] || jetpack,
      methodLabel: methodMap[method] || method
    }
  }, [jetpack, method])

  const config = useMemo(() => {
    const key = `${jetpack}-${method}`
    const configs = {
      'jp-6-2-ota': {
        packageTitle: 'Download OTA package',
        packageDescription:
          'Download the OTA package from the SFTP server. Then follow the manual below to refresh the image over Ethernet.',
        sftpPath: '/Files/ucon/JP6.2/UC_dev_6.2_V03_OTA',
        manualPdf: 'AIM-Edge psox_pson Image Refresh over Ethernet Manual V2.0.pdf',
        manualDir: 'jp6.2/ota'
      },
      'jp-6-2-usb': {
        packageTitle: 'Download USB package',
        packageDescription:
          'Download the USB package from the SFTP server. Then follow the manual below to refresh the image.',
        sftpPath: '/Files/ucon/JP6.2/UC_dev_6.2_V03_USB',
        manualPdf: 'AIM-Edge psox_pson Developer Image Refresh Manual V2.0.pdf',
        manualDir: 'jp6.2/usb'
      }
    }
    return configs[key] || null
  }, [jetpack, method])

  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>UCON</h1>
        <p className="developer-subtitle">
          {page.jpLabel} • {page.methodLabel}
        </p>

        <div className="developer-card">
          <Link to="/developer" className="dev-back-link">
            Back to Developer
          </Link>

          <h2 className="dev-sop-page-title">{page.methodLabel} instructions</h2>

          {config ? (
            <div className="dev-sop-stack">
              <div className="dev-sop-block">
                <h3 className="dev-sop-block-title">{config.packageTitle}</h3>
                <p className="dev-sop-block-text">{config.packageDescription}</p>

                <ol className="dev-sop-steps">
                  <li>
                    Connect to SFTP:
                    <ul className="dev-sop-sublist">
                      <li>Host: <code>99.64.152.69</code></li>
                      <li>Port: <code>22</code></li>
                      <li>Username: <code>orin</code></li>
                      <li>Password: <SftpPassword /></li>
                    </ul>
                  </li>
                  <li>
                    Download:
                    <div className="dev-sop-inline-code">
                      <code>{config.sftpPath}</code>
                    </div>
                  </li>
                </ol>
              </div>

              <div className="dev-sop-block">
                <h3 className="dev-sop-block-title">Manual</h3>
                <p className="dev-sop-block-text">
                  Detailed steps are documented in the manual. Download the PDF:
                </p>
                <a
                  href={`/image_reflash/ucon/${config.manualDir}/${encodeURIComponent(config.manualPdf)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dev-manual-link"
                >
                  {config.manualPdf}
                </a>
              </div>
            </div>
          ) : (
            <p className="developer-card-description">
              Instructions for {page.jpLabel} {page.methodLabel} are coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default UconReflash

