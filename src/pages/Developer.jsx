import './Developer.css'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const Developer = () => {
  const qc01w = useMemo(
    () => ({
      id: 'qc01w-reflash',
      title: 'QC01W – Reflash Image',
      description: 'Select an operating system to view the reflashing SOP.',
      osOptions: [
        {
          id: 'ubuntu-20-min',
          label: 'Ubuntu 20.04 (Minimal)',
          path: '/developer/qc01w/reflash/ubuntu-20-04-minimal'
        },
        {
          id: 'ubuntu-24',
          label: 'Ubuntu 24.04',
          path: '/developer/qc01w/reflash/ubuntu-24-04'
        },
        {
          id: 'qclinux',
          label: 'QCLinux',
          path: '/developer/qc01w/reflash/qclinux'
        },
        {
          id: 'android',
          label: 'Android',
          path: '/developer/qc01w/reflash/android'
        },
        {
          id: 'windows',
          label: 'Windows (IoT)',
          path: '/developer/qc01w/reflash/windows-iot'
        }
      ]
    }),
    []
  )

  const nvidiaDevices = useMemo(
    () => [
      {
        id: 'ncox_ncon',
        label: 'NCOX / NCON',
        versions: ['JetPack 5.1.2', 'JetPack 6.0', 'JetPack 6.1', 'JetPack 6.2'],
        methodsPerVersion: ['OTA reflash', 'USB reflash']
      },
      {
        id: 'psox_pson',
        label: 'PSOX / PSON',
        versions: ['JetPack 5.1.2', 'JetPack 6.1', 'JetPack 6.2'],
        methodsPerVersion: ['OTA reflash', 'USB reflash'],
        basePath: '/developer/nvidia/psox-pson'
      },
      {
        id: 'ucon',
        label: 'UCON',
        versions: ['JetPack 6.2'],
        methodsPerVersion: ['OTA reflash', 'USB reflash'],
        basePath: '/developer/nvidia/ucon'
      },
    ],
    []
  )

  const [qc01wOpen, setQc01wOpen] = useState(false)
  const [nvidiaOpenId, setNvidiaOpenId] = useState(null)

  const toggleQc01w = () => setQc01wOpen((prev) => !prev)
  const toggleNvidia = (id) => setNvidiaOpenId((prev) => (prev === id ? null : id))

  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>Developer</h1>

        <section className="developer-section">
          <h2>Qualcomm Platforms</h2>

          <div className="developer-card">
            <button
              type="button"
              className="dev-accordion-trigger"
              aria-expanded={qc01wOpen}
              onClick={toggleQc01w}
            >
              <span className="dev-accordion-title">{qc01w.title}</span>
              <span className="dev-accordion-icon" aria-hidden="true">
                {qc01wOpen ? '−' : '+'}
              </span>
            </button>

            {qc01wOpen ? (
              <div className="dev-accordion-content">
                <p className="developer-card-description">{qc01w.description}</p>

                <div className="dev-os-list" role="list" aria-label="QC01W OS options">
                  {qc01w.osOptions.map((os) => (
                    <Link
                      key={os.id}
                      to={os.path}
                      role="listitem"
                      className="dev-os-item dev-os-link"
                    >
                      {os.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="developer-section">
          <h2>NVIDIA Platforms</h2>

          <div className="dev-nvidia-list">
            {nvidiaDevices.map((device) => {
              const isOpen = nvidiaOpenId === device.id
              return (
                <div key={device.id} className="developer-card dev-nvidia-card">
                  <button
                    type="button"
                    className="dev-accordion-trigger dev-accordion-trigger-nvidia"
                    aria-expanded={isOpen}
                    onClick={() => toggleNvidia(device.id)}
                  >
                    <span className="dev-accordion-title">{device.label}</span>
                    <span className="dev-accordion-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen ? (
                    <div className="dev-accordion-content">
                      <p className="developer-card-description">Image reflashing versions:</p>
                      {device.versions.length > 0 ? (
                        device.methodsPerVersion ? (
                          <ul className="dev-jetpack-list dev-jetpack-list-by-version">
                            {device.versions.map((v) => (
                              <li key={v}>
                                <span className="dev-jetpack-version">{v}</span>
                                <ul className="dev-jetpack-methods">
                                  {device.methodsPerVersion.map((method) => {
                                    const jpSlug = v
                                      .replace('JetPack ', 'jp-')
                                      .replaceAll('.', '-')
                                    const methodSlug = method.startsWith('OTA') ? 'ota' : 'usb'
                                    const basePath = device.basePath || '/developer/nvidia/ncox-ncon'
                                    const to = `${basePath}/${jpSlug}/${methodSlug}`

                                    return (
                                      <li key={method}>
                                        <Link className="dev-nvidia-method-link" to={to}>
                                          {method}
                                        </Link>
                                      </li>
                                    )
                                  })}
                                </ul>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <ul className="dev-jetpack-list">
                            {device.versions.map((v) => (
                              <li key={v}>{v}</li>
                            ))}
                          </ul>
                        )
                      ) : (
                        <p className="dev-nvidia-coming">Coming soon.</p>
                      )}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Developer

