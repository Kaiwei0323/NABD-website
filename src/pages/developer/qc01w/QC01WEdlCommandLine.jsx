import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../../Developer.css'
import DeveloperContactCta from '../../../components/DeveloperContactCta'

const QC01WEdlCommandLine = () => {
  const navigate = useNavigate()
  const [copiedId, setCopiedId] = useState(null)

  const copyCommand = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    })
  }

  const CopyIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
  const CheckIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )

  const CodeBlock = ({ command, id }) => (
    <div className="dev-sop-inline-code dev-sop-inline-code-with-copy">
      <code>{command}</code>
      <button
        type="button"
        className="dev-sop-copy-btn"
        onClick={() => copyCommand(command, id)}
        title={copiedId === id ? 'Copied' : 'Copy command'}
        aria-label={copiedId === id ? 'Copied' : 'Copy command'}
      >
        {copiedId === id ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  )

  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>QC01W – Enter EDL via command line</h1>
        <p className="developer-subtitle">
          Reference for entering EDL (Emergency Download) mode using ADB/command line on supported operating
          systems.
        </p>

        <div className="developer-card">
          <button
            type="button"
            className="dev-back-link"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <h2 className="dev-sop-page-title">Supported operating systems (OS running on the device before reflashing)</h2>
          <p className="dev-sop-block-text">
            If ADB is not installed on your host computer, please refer to the{' '}
            <Link to="/developer/qc01w/adb-install">Install ADB on the host computer</Link> instructions before running
            the commands below.
          </p>

          <div className="dev-sop-stack">
            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">QCLinux (default image)</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the QCLinux image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>From the host PC terminal:
                  <CodeBlock command="adb shell reboot edl" id="qclinux-edl" />
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Ubuntu 20.04 (Minimal)</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the Ubuntu 20.04 (Minimal) image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>
                  From the host PC terminal, gain root ADB:
                  <CodeBlock command="adb root" id="ubuntu-root" />
                </li>
                <li>
                  Then reboot to EDL:
                  <CodeBlock command="adb reboot edl" id="ubuntu-edl" />
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Android</h3>
              <p className="dev-sop-block-text">
                When QC01W is running the Android image and ADB is available on the host computer:
              </p>
              <ol className="dev-sop-steps">
                <li>Connect QC01W to the host PC over USB cable.</li>
                <li>
                  From the host PC terminal, gain root ADB:
                  <CodeBlock command="adb root" id="android-root" />
                </li>
                <li>
                  Then reboot to EDL:
                  <CodeBlock command="adb reboot edl" id="android-edl" />
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Ubuntu 24.04</h3>
              <p className="dev-sop-block-text">
                Command-line EDL entry is not supported on Ubuntu 24.04. Please refer to the{' '}
                <strong>Using Hardware Buttons</strong> method in the image reflashing SOP page.
              </p>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Windows (IoT)</h3>
              <p className="dev-sop-block-text">
                Command-line EDL entry is not supported on Windows (IoT). Please refer to the{' '}
                <strong>Using Hardware Buttons</strong> method in the image reflashing SOP page.
              </p>
            </div>
          </div>
        </div>
        <DeveloperContactCta />
      </div>
    </div>
  )
}

export default QC01WEdlCommandLine

