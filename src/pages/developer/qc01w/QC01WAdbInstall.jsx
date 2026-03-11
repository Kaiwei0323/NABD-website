import { useNavigate } from 'react-router-dom'
import '../../Developer.css'

const QC01WAdbInstall = () => {
  const navigate = useNavigate()

  return (
    <div className="developer-page">
      <div className="developer-container">
        <h1>QC01W – Install ADB on the host computer</h1>
        <p className="developer-subtitle">
          Instructions for installing Android Debug Bridge (ADB) on the host PC for different operating systems.
        </p>

        <div className="developer-card">
          <button
            type="button"
            className="dev-back-link"
            onClick={() => navigate(-1)}
          >
            Back
          </button>

          <h2 className="dev-sop-page-title">Install ADB on the host computer</h2>
          <p className="dev-sop-block-text" style={{ marginBottom: '1rem' }}>
            If ADB is not installed on your host PC, install it using one of the methods below depending on your host OS.
          </p>

          <div className="dev-sop-stack">
            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Windows</h3>
              <ol className="dev-sop-steps">
                <li>
                  Download{' '}
                  <a
                    href="https://developer.android.com/tools/releases/platform-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Android Platform Tools
                  </a>{' '}
                  (platform-tools zip) and extract it.
                </li>
                <li>
                  Extract to a folder (e.g. <code>C:\platform-tools</code>).
                </li>
                <li>
                  Add that folder to your system PATH, or open Command Prompt in that folder and run <code>adb</code> from
                  there.
                </li>
                <li>
                  Verify with <code>adb version</code>.
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">Linux (Ubuntu/Debian)</h3>
              <ol className="dev-sop-steps">
                <li>
                  Run: <code>sudo apt update && sudo apt install -y adb</code>
                </li>
                <li>
                  Verify with <code>adb version</code>.
                </li>
              </ol>
            </div>

            <div className="dev-sop-block">
              <h3 className="dev-sop-block-title">macOS</h3>
              <ol className="dev-sop-steps">
                <li>
                  With Homebrew: <code>brew install android-platform-tools</code>
                </li>
                <li>
                  Or download{' '}
                  <a
                    href="https://developer.android.com/tools/releases/platform-tools"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Platform Tools
                  </a>{' '}
                  and add the extracted folder to PATH.
                </li>
                <li>
                  Verify with <code>adb version</code>.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QC01WAdbInstall

